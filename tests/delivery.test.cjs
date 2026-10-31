const {test}=require('node:test');
const assert=require('node:assert/strict');
const {payload,isolated,randomUUID,FakeStorage}=require('./lead-harness.cjs');
test('all readiness gates fail closed without Sanity fallback; GET discloses only boolean',()=>isolated(async h=>{
 assert.deepEqual(await(await h.handler.onRequestGet({env:h.env})).json(),{available:true});
 for(const missing of ['LEAD_CAPTURE_ENABLED','TELEGRAM_BOT_TOKEN','TELEGRAM_CHAT_ID','LEAD_HASH_KEY','LEAD_EMAIL','LEAD_DELIVERY']){
  const env={...h.env,SANITY_PROJECT_ID:'unused',SANITY_DATASET:'public',SANITY_API_TOKEN:'unused'};delete env[missing];
  const r=await h.handler.onRequestPost({request:h.request(),env});assert.equal(r.status,503,missing);assert.equal((await r.json()).stored,false);
  assert.deepEqual(await(await h.handler.onRequestGet({env})).json(),{available:false});
 }
 for(const chat of ['@group','123','-0','-01',' -123','-9007199254740992'])assert.equal(h.handler.leadCaptureAvailable({...h.env,TELEGRAM_CHAT_ID:chat}),false);
 assert.equal(h.calls.telegram.length+h.calls.email.length,0);
}));
test('UUID mandatory after payload validation; v4 case canonicalized',()=>isolated(async h=>{
 for(const nonce of ['', 'bad','00000000-0000-1000-8000-000000000000'])assert.equal((await h.post(payload,nonce)).status,400);
 const invalid=await(await h.post({...payload,email:'invalid'},'')).json();assert.notEqual(invalid.code,'INVALID_IDEMPOTENCY_KEY');
 const nonce=randomUUID();assert.equal((await h.post(payload,nonce.toUpperCase())).status,200);assert.equal((await h.post(payload,nonce)).status,200);assert.equal(h.calls.telegram.length,1);
}));
test('parallel same nonce submits both channels once; recreation replays durable receipt',()=>isolated(async h=>{
 const nonce=randomUUID(),responses=await Promise.all(Array.from({length:12},()=>h.post(payload,nonce))),rows=await Promise.all(responses.map(r=>r.json()));
 assert.ok(rows.every(x=>x.ok&&x.stored&&x.delivered.telegram&&x.delivered.email));assert.equal(new Set(rows.map(x=>x.receipt)).size,1);assert.equal(rows.filter(x=>!x.duplicate).length,1);assert.equal(h.calls.telegram.length,1);assert.equal(h.calls.email.length,1);
 h.recreate();const replay=await(await h.post(payload,nonce)).json();assert.equal(replay.receipt,rows[0].receipt);assert.equal(replay.duplicate,true);assert.equal(h.calls.email.length,1);
}));
test('changed payload reuse 409; distinct nonce accepted independently',()=>isolated(async h=>{
 const nonce=randomUUID(),first=await(await h.post(payload,nonce)).json(),changed=await h.post({...payload,task:'different'},nonce);assert.equal(changed.status,409);assert.equal((await changed.json()).stored,false);
 const second=await(await h.post({...payload,task:'different'})).json();assert.notEqual(first.receipt,second.receipt);assert.equal(h.calls.telegram.length,2);assert.equal(h.calls.email.length,2);
}));
for(const channel of ['telegram','email'])test(channel+' definite rejection retries only missing channel',()=>isolated(async h=>{
 const nonce=randomUUID();if(channel==='telegram')h.telegram=()=>Response.json({ok:false,error_code:429,description:'private provider text'},{status:429});else h.email=()=>{throw Object.assign(Error('private provider text'),{code:'E_RATE_LIMIT_EXCEEDED'});};
 const first=await(await h.post(payload,nonce)).json();assert.equal(first.ok,false);assert.equal(first.stored,false);assert.equal(first.code,'DELIVERY_PARTIAL');assert.equal(first.retryable,true);assert.equal(first.delivered[channel],false);
 h[channel]=null;h.recreate();const second=await(await h.post(payload,nonce)).json();assert.equal(second.ok,true);assert.equal(second.receipt,first.receipt);assert.equal(second.duplicate,true);assert.equal(h.calls[channel].length,2);assert.equal(h.calls[channel==='email'?'telegram':'email'].length,1);
}));
for(const kind of ['throw','http-fail','body-fail','wrong-chat','zero-id','redirect','oversized','bad-ok'])test('Telegram '+kind+' unknown never succeeds or replays',()=>isolated(async h=>{
 const nonce=randomUUID();h.telegram=()=>{
  if(kind==='throw')throw Error('PII synthetic@example.invalid token');if(kind==='http-fail')return new Response('',{status:502});if(kind==='body-fail')return new Response('{');if(kind==='redirect')return new Response('',{status:302});if(kind==='oversized')return new Response('x'.repeat(32769));
  return Response.json({ok:kind!=='bad-ok',result:{message_id:kind==='zero-id'?0:1,chat:{id:kind==='wrong-chat'?'-100999':h.env.TELEGRAM_CHAT_ID}}});
 };
 const first=await(await h.post(payload,nonce)).json();assert.equal(first.ok,false);assert.equal(first.stored,false);assert.equal(first.code,'DELIVERY_UNKNOWN');assert.deepEqual(first.delivered,{email:true,telegram:false});
 h.telegram=null;h.recreate();const second=await(await h.post(payload,nonce)).json();assert.equal(second.code,'DELIVERY_UNKNOWN');assert.equal(second.receipt,first.receipt);assert.equal(h.calls.telegram.length,1);assert.equal(h.calls.email.length,1);
}));
for(const mode of ['throw','no-id','unsafe-id','internal','delivery-failed'])test('Email '+mode+' unknown never succeeds or replays',()=>isolated(async h=>{
 const nonce=randomUUID();h.email=()=>{if(mode==='throw')throw Error('private token PII');if(mode==='internal'||mode==='delivery-failed')throw Object.assign(Error('private'),{code:mode==='internal'?'E_INTERNAL_SERVER_ERROR':'E_DELIVERY_FAILED'});return mode==='unsafe-id'?{messageId:'synthetic@example.invalid'}:{};};
 const first=await(await h.post(payload,nonce)).json();assert.equal(first.ok,false);assert.equal(first.code,'DELIVERY_UNKNOWN');assert.deepEqual(first.delivered,{telegram:true,email:false});
 h.email=null;h.recreate();assert.equal((await(await h.post(payload,nonce)).json()).stored,false);assert.equal(h.calls.email.length,1);assert.equal(h.calls.telegram.length,1);
}));
test('durable fence precedes sends; lost ack persistence becomes unknown after recreation',()=>isolated(async h=>{
 const nonce=randomUUID();let failed=false;h.telegram=async()=>{const store=h.stores.get(nonce),r=await store.get('receipt');assert.equal(r.telegram[0].status,'fenced');store.beforePut=(_,value)=>{if(!failed&&value.telegram[0].status==='ack'){failed=true;throw Error('synthetic disk failure');}};return Response.json({ok:true,result:{message_id:1,chat:{id:h.env.TELEGRAM_CHAT_ID}}});};
 assert.equal((await h.post(payload,nonce)).status,503);assert.equal(h.calls.email.length,0);h.recreate();h.telegram=null;const row=await(await h.post(payload,nonce)).json();assert.equal(row.code,'DELIVERY_UNKNOWN');assert.equal(h.calls.telegram.length,1);assert.equal(h.calls.email.length,1);
}));
test('failed pre-send fence sends nothing; persisted crash fence quarantined',()=>isolated(async h=>{
 const nonce=randomUUID(),store=new FakeStorage();h.stores.set(nonce,store);store.beforePut=(_,r)=>{if(r.telegram[0].status==='fenced')throw Error('fence failed');};assert.equal((await h.post(payload,nonce)).status,503);assert.equal(h.calls.telegram.length+h.calls.email.length,0);
 store.beforePut=null;const r=await store.get('receipt');r.telegram[0]={status:'fenced',at:Date.now()};await store.put('receipt',r);h.recreate();assert.equal((await(await h.post(payload,nonce)).json()).code,'DELIVERY_UNKNOWN');assert.equal(h.calls.telegram.length,0);assert.equal(h.calls.email.length,1);
}));
test('all fields reach fixed destinations; HTML escaped; no raw PII in storage or logs',()=>isolated(async(h,logs)=>{
 const lead={...payload,name:'<b>QA & "test"</b>',task:"<script>no()</script> & 'data'"},nonce=randomUUID(),result=await(await h.post(lead,nonce,{'CF-Connecting-IP':'192.0.2.99'})).json();assert.equal(result.ok,true);
 const mail=h.calls.email[0],telegram=h.calls.telegram[0];assert.equal(mail.from,'leads@notifications.munamedia.uz');assert.equal(mail.to,'info@munamedia.me');assert.equal(mail.replyTo,lead.email);assert.ok(!mail.subject.includes(lead.name));
 for(const [key,value]of Object.entries(lead)){assert.ok(mail.text.includes(`${key}: ${value}`));assert.ok(telegram.text.includes(`${key}: ${value}`));}
 assert.ok(mail.html.includes('&lt;script&gt;'));assert.ok(mail.html.includes('&#39;data&#39;'));assert.ok(!mail.html.includes('<script>'));assert.equal(telegram.disable_web_page_preview,true);assert.equal(telegram.parse_mode,undefined);
 const history=JSON.stringify([...h.stores.values()].flatMap(x=>x.history));for(const value of [...Object.values(lead),'192.0.2.99',h.env.TELEGRAM_BOT_TOKEN,h.env.LEAD_HASH_KEY])if(value!=='/')assert.ok(!history.includes(value),value);
 const record=await h.stores.get(nonce).get('receipt');assert.match(record.digest,/^[a-f0-9]{64}$/);assert.deepEqual(Object.keys(record).sort(),['version','nonce','digest','receipt','createdAt','expiresAt','telegram','email'].sort());assert.deepEqual(logs,[]);
}));
test('maximum Unicode lead chunks preserve all text; acknowledged chunks never duplicated',()=>isolated(async h=>{
 const lead={...payload,name:'N'.repeat(120),company:'C'.repeat(200),task:'🙂'.repeat(2000),page:'/'+'p'.repeat(199)},nonce=randomUUID();
 h.telegram=()=>h.calls.telegram.length===2?Response.json({ok:false,error_code:429},{status:429}):Response.json({ok:true,result:{message_id:1,chat:{id:h.env.TELEGRAM_CHAT_ID}}});
 const first=await(await h.post(lead,nonce)).json();assert.equal(first.ok,false);assert.equal(h.calls.telegram.length,2);assert.equal(h.calls.email.length,1);
 const original=h.calls.telegram.map(x=>x.text);assert.equal(original.join(''),h.delivery.leadText(lead,first.receipt));for(const part of original){assert.ok(part.length<=3500);assert.ok(!/[\uD800-\uDBFF]$/.test(part));assert.ok(!/^[\uDC00-\uDFFF]/.test(part));}
 h.telegram=null;h.recreate();assert.equal((await(await h.post(lead,nonce)).json()).ok,true);assert.equal(h.calls.telegram.length,3);assert.equal(h.calls.telegram[2].text,original[1]);assert.equal(h.calls.email.length,1);
}));
test('7-day expiry alarm deletes metadata only; early alarm reschedules without sends',()=>isolated(async h=>{
 const nonce=randomUUID();await h.post(payload,nonce);const store=h.stores.get(nonce),record=await store.get('receipt');assert.equal(record.expiresAt-record.createdAt,h.delivery.RECEIPT_TTL_MS);assert.equal(store.alarm,record.expiresAt);await h.objects.get(nonce).alarm();assert.ok(await store.get('receipt'));
 record.expiresAt=Date.now()-1;await store.put('receipt',record);await h.objects.get(nonce).alarm();assert.equal(await store.get('receipt'),undefined);assert.equal(h.calls.telegram.length,1);assert.equal(h.calls.email.length,1);
}));
test('whole email attempt timeout remains unknown across late ack and explicit retry',()=>isolated(async h=>{
 const nonce=randomUUID();let acknowledge;h.email=()=>new Promise(resolve=>{acknowledge=resolve;});
 const started=Date.now(),row=await(await h.post(payload,nonce)).json();assert.equal(row.code,'DELIVERY_UNKNOWN');assert.ok(Date.now()-started<12000);
 acknowledge({messageId:'late-ack'});h.email=null;h.recreate();assert.equal((await(await h.post(payload,nonce)).json()).code,'DELIVERY_UNKNOWN');assert.equal(h.calls.email.length,1);
}));
test('chunk boundary never splits a surrogate pair at exactly 3500 UTF-16 units',()=>isolated(async h=>{
 const text='a'.repeat(3499)+'🙂'+'b'.repeat(3500),parts=h.delivery.telegramChunks(text);assert.equal(parts.join(''),text);assert.equal(parts[0].length,3499);assert.ok(parts.every(x=>x.length<=3500));
}));
test('private GET exposes nothing; streaming malformed UTF8 and CRLF header injection rejected',()=>isolated(async h=>{
 const o=new h.delivery.LeadDelivery({storage:{}},h.env);assert.equal((await o.fetch(new Request('https://lead.internal/'))).status,405);
 for(const lead of [{...payload,email:'valid@invalid.test\r\nBcc: evil@invalid.test'},{...payload,task:'x'.repeat(4001)}])assert.equal((await h.post(lead)).status,400);
 const request=new Request('https://munamedia.uz/api/contact',{method:'POST',headers:{origin:'https://munamedia.uz','content-type':'application/json'},body:new Uint8Array([0xc0,0xaf])});assert.equal((await h.handler.onRequestPost({request,env:h.env})).status,400);
}));
