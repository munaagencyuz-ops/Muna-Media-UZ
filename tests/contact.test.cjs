const {test}=require('node:test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const load=()=>import(pathToFileURL(path.resolve(__dirname,'../server/contact-handler.mjs')));
const env={SANITY_PROJECT_ID:'synthetic-only',SANITY_DATASET:'public-content',SANITY_API_TOKEN:'synthetic-only',SANITY_LEAD_DATASET:'private-leads',SANITY_LEAD_DATASET_PRIVATE:'true',TELEGRAM_BOT_TOKEN:'synthetic-only',TELEGRAM_CHAT_ID:'synthetic-only'};
const payload={name:'SYNTHETIC QA',company:'SYNTHETIC ONLY',phone:'+998000000000',email:'synthetic@example.invalid',task:'SYNTHETIC NO DELIVERY',page:'/'};
const request=(body=payload,headers={})=>new Request('https://munamedia.uz/api/contact',{method:'POST',headers:{origin:'https://munamedia.uz','content-type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
async function recording(fn){const old=global.fetch,logs=[];const oldlog=console.error,oldwarn=console.warn;console.error=(...x)=>logs.push(x);console.warn=(...x)=>logs.push(x);try{await fn();assert.deepEqual(logs,[]);}finally{global.fetch=old;console.error=oldlog;console.warn=oldwarn;}}
for(const [name,body,headers,status] of [
 ['null',null,{},400],['array',[],{},400],['nested field',{...payload,name:{}},{},400],['unknown field',{...payload,extra:'no'},{},400],['numeric field',{...payload,phone:998000000000},{},400],['masked phone',{...payload,phone:'+998****0000'},{},400],['short phone',{...payload,phone:'123'},{},400],['bad email',{...payload,email:'bad'},{},400],['external page',{...payload,page:'https://evil.invalid'},{},400],['double-slash page',{...payload,page:'//evil.invalid'},{},400],['control char',{...payload,name:'a\u0000b'},{},400],['bad JSON','{',{},400],['body bound','x'.repeat(16385),{},413],['content length',payload,{'content-length':'16385'},413],['origin missing',payload,{origin:''},403],['origin hostile',payload,{origin:'https://evil.invalid'},403],['bad type',payload,{'content-type':'text/plain'},415]
])test('capture rejects '+name+' before transport',()=>recording(async()=>{let calls=0;global.fetch=async()=>{calls++;throw Error('must not send')};const fn=await load();const res=await fn.onRequestPost({request:request(body,headers),env});assert.equal(res.status,status);assert.equal((await res.json()).stored,false);assert.equal(calls,0);}));
test('capture refuses content dataset as implicit fallback and requires private attestation',()=>recording(async()=>{global.fetch=async()=>{throw Error('must not send')};const fn=await load();for(const missing of ['SANITY_LEAD_DATASET','SANITY_LEAD_DATASET_PRIVATE']){const e={...env};delete e[missing];const r=await fn.onRequestPost({request:request(),env:e});assert.equal(r.status,503);assert.equal((await r.json()).stored,false);}}));
function transport(mode='ok'){
 const docs=new Map(),calls=[];let telegram=0;
 global.fetch=async(url,options)=>{
  assert.equal(options.redirect,'manual');
  calls.push({host:new URL(url).hostname,options});
  if(new URL(url).hostname==='api.telegram.org'){telegram++;if(mode==='throw')throw Error('provider includes PII and token, must not log');return Response.json({ok:mode==='ok',result:{message_id:1,chat:{id:env.TELEGRAM_CHAT_ID}}},{status:mode==='http-fail'?502:200});}
  assert.match(url,/\/private-leads\?/);assert.ok(!url.includes('/public-content'));
  const mutation=JSON.parse(options.body).mutations[0];assert.deepEqual(Object.keys(mutation),['createIfNotExists']);const d=mutation.createIfNotExists;
  const operation=docs.has(d._id)?'none':'create';docs.set(d._id,docs.get(d._id)||d);
  return Response.json({results:[{id:d._id,operation}]});
 };return {docs,calls,get telegram(){return telegram}};
}
test('parallel equal payloads create one immutable durable receipt and notify at most once',()=>recording(async()=>{
 const t=transport(),fn=await load();const responses=await Promise.all(Array.from({length:12},()=>fn.onRequestPost({request:request(),env})));const data=await Promise.all(responses.map(r=>r.json()));
 assert.ok(data.every(x=>x.ok&&x.stored));assert.equal(new Set(data.map(x=>x.receipt)).size,1);assert.equal(t.docs.size,1);assert.equal(t.telegram,1);assert.equal(data.filter(x=>!x.duplicate).length,1);
 const document=[...t.docs.values()][0];for(const [k,v] of Object.entries(payload))assert.equal(document[k],v);
}));
for(const mode of ['throw','http-fail','body-fail'])test('stored receipt remains success when Telegram '+mode,()=>recording(async()=>{const t=transport(mode),fn=await load();const r=await fn.onRequestPost({request:request(),env});assert.equal(r.status,200);const d=await r.json();assert.equal(d.stored,true);assert.equal(d.notified,false);const retry=await(await fn.onRequestPost({request:request(),env})).json();assert.equal(retry.receipt,d.receipt);assert.equal(t.telegram,1);}));
test('distinct valid payloads get distinct receipts; no notification credentials still stores honestly',()=>recording(async()=>{const t=transport(),fn=await load();const e={...env};delete e.TELEGRAM_BOT_TOKEN;for(const task of ['ONE','TWO']){const d=await(await fn.onRequestPost({request:request({...payload,task}),env:e})).json();assert.ok(d.stored);assert.equal(d.notified,false);}assert.equal(t.docs.size,2);assert.equal(t.telegram,0);}));
for(const kind of ['http','throw','invalid-receipt'])test('Sanity '+kind+' never reports stored or sends Telegram',()=>recording(async()=>{let calls=0;global.fetch=async()=>{calls++;if(kind==='throw')throw Error('secret provider detail');return kind==='http'?new Response('',{status:502}):Response.json({ok:true});};const fn=await load();const r=await fn.onRequestPost({request:request(),env});assert.equal(r.status,502);assert.equal((await r.json()).stored,false);assert.equal(calls,1);}));

test('lost create acknowledgement reconciles to the same receipt without a second notification',()=>recording(async()=>{
 const fn=await load();let document,calls=0;global.fetch=async(url,options)=>{calls++;assert.ok(!url.includes('api.telegram.org'));const d=JSON.parse(options.body).mutations[0].createIfNotExists;if(!document){document=d;throw Error('lost acknowledgement');}assert.equal(d._id,document._id);return Response.json({results:[{id:d._id,operation:'none'}]});};
 const first=await fn.onRequestPost({request:request(),env});assert.equal(first.status,502);assert.equal((await first.json()).stored,false);
 const second=await(await fn.onRequestPost({request:request(),env})).json();assert.equal(second.receipt,document._id);assert.equal(second.stored,true);assert.equal(second.duplicate,true);assert.equal(second.notified,false);assert.equal(calls,2);
}));

test('unapproved same-origin host cannot invoke capture',()=>recording(async()=>{global.fetch=async()=>{throw Error('must not send')};const fn=await load();const r=await fn.onRequestPost({request:new Request('https://unapproved.invalid/api/contact',{method:'POST',headers:{origin:'https://unapproved.invalid','content-type':'application/json'},body:JSON.stringify(payload)}),env});assert.equal(r.status,403);}));
