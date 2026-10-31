// Actual workerd + SQLite Durable Object integration. Synthetic providers only.
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const path=require('node:path');
const {build}=require('esbuild');
const {Miniflare,convertV4MiniflareOptions}=require('miniflare');
(async()=>{
 const compiled=await build({entryPoints:[path.resolve('worker.entry.mjs')],bundle:true,format:'esm',platform:'neutral',external:['cloudflare:*','node:*'],write:false});
 const telegram=[],seenRejected=new Set();let ip=0;
 const provider=`import {WorkerEntrypoint} from 'cloudflare:workers';
 let emailCalls=0; const counts=new Map();
 export class Email extends WorkerEntrypoint { async send(message){
  if(message.to!=='info@munamedia.me'||message.from!=='leads@notifications.munamedia.uz'||!message.text||!message.html||!message.replyTo)throw Error('INVALID_SYNTHETIC_EMAIL');
  emailCalls++;return{messageId:'<synthetic-workerd-'+emailCalls+'@notifications.munamedia.uz>'};
 }}
 export class Limiter extends WorkerEntrypoint { async limit({key}){const n=(counts.get(key)||0)+1;counts.set(key,n);return{success:n<=5};}}
 export default {fetch(){return Response.json({emailCalls})}};`;
 const options=convertV4MiniflareOptions({...(process.env.MUNA_WORKERD_SERVE_ONLY==='1'?{host:'127.0.0.1',port:8897}:{}),workers:[{
  name:'site',modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-10-28',
  bindings:{LEAD_CAPTURE_ENABLED:'true',TELEGRAM_BOT_TOKEN:'synthetic-token-no-network',TELEGRAM_CHAT_ID:'-100000000001',LEAD_HASH_KEY:'synthetic-workerd-hmac-key'},
  durableObjects:{LEAD_DELIVERY:{className:'LeadDelivery',useSQLite:true}},
  serviceBindings:{LEAD_EMAIL:{name:'provider',entrypoint:'Email'},LEAD_RATE_LIMITER:{name:'provider',entrypoint:'Limiter'},ASSETS:()=>new Response('Synthetic assets not used',{status:404})},
  outboundService:async request=>{
   assert.equal(new URL(request.url).origin,'https://api.telegram.org');assert.equal(new URL(request.url).pathname,'/botsynthetic-token-no-network/sendMessage');
   const body=await request.json();assert.equal(body.chat_id,'-100000000001');assert.equal(body.parse_mode,undefined);telegram.push(body);
   if(body.text.includes('SYNTHETIC UNKNOWN'))return new Response('unconfirmed',{status:502});
   const receipt=body.text.match(/Receipt: (lead\.[0-9a-f-]+)/)?.[1];
   if(body.text.includes('SYNTHETIC REJECT')&&!seenRejected.has(receipt)){seenRejected.add(receipt);return Response.json({ok:false,error_code:429},{status:429});}
   return Response.json({ok:true,result:{message_id:telegram.length,chat:{id:-100000000001}}});
  }
 },{name:'provider',modules:true,script:provider,compatibilityDate:'2026-10-28',outboundService:()=>{throw Error('SYNTHETIC NETWORK DENIED');}}]});
 const mf=new Miniflare(options);const results=[];
 if(process.env.MUNA_WORKERD_SERVE_ONLY==='1'){
  console.log('Synthetic workerd preflight target ready: '+await mf.ready);
  const stop=async()=>{await mf.dispose();process.exit(0);};process.on('SIGTERM',stop);process.on('SIGINT',stop);
  await new Promise(()=>{});return;
 }
 const lead={name:'SYNTHETIC QA',company:'SYNTHETIC ONLY',phone:'+998000000000',email:'synthetic@example.invalid',task:'SYNTHETIC WORKERD NO REAL DELIVERY',page:'/'};
 async function post(body=lead,nonce=randomUUID(),headers={}){return mf.dispatchFetch('https://munamedia.uz/api/contact',{method:'POST',redirect:'manual',headers:{origin:'https://munamedia.uz','content-type':'application/json','Idempotency-Key':nonce,'CF-Connecting-IP':'192.0.2.'+(++ip),...headers},body:JSON.stringify(body)});}
 async function mailCount(){const worker=await mf.getWorker('provider');return(await(await worker.fetch('https://synthetic.invalid/status')).json()).emailCalls;}
 try{
  const ready=await mf.dispatchFetch('https://munamedia.uz/api/contact');assert.deepEqual(await ready.json(),{available:true});results.push('actual compiled API and DO binding ready');
  const nonce=randomUUID();const responses=await Promise.all(Array.from({length:12},()=>post(lead,nonce)));assert.ok(responses.every(r=>r.status===200));const data=await Promise.all(responses.map(r=>r.json()));assert.equal(new Set(data.map(r=>r.receipt)).size,1);assert.equal(telegram.length,1);assert.equal(await mailCount(),1);results.push('12 concurrent requests: one SQLite receipt, one send per provider');
  const replay=await(await post(lead,nonce)).json();assert.equal(replay.duplicate,true);assert.equal(telegram.length,1);assert.equal(await mailCount(),1);results.push('durable replay does not resubmit');
  assert.equal((await post({...lead,task:'SYNTHETIC CHANGED'},nonce)).status,409);assert.equal(telegram.length,1);results.push('changed nonce payload conflicts without sends');
  const unknownKey=randomUUID(),unknownLead={...lead,task:'SYNTHETIC UNKNOWN'};const unknown=await(await post(unknownLead,unknownKey)).json();assert.equal(unknown.code,'DELIVERY_UNKNOWN');assert.equal(unknown.delivered.email,true);await post(unknownLead,unknownKey);assert.equal(telegram.length,2);assert.equal(await mailCount(),2);results.push('unknown Telegram result fenced, email acknowledged, no replay');
  const rejectedKey=randomUUID(),rejectedLead={...lead,task:'SYNTHETIC REJECT'};const rejected=await(await post(rejectedLead,rejectedKey)).json();assert.equal(rejected.code,'DELIVERY_PARTIAL');assert.equal(rejected.delivered.email,true);const recovered=await(await post(rejectedLead,rejectedKey)).json();assert.equal(recovered.ok,true);assert.equal(telegram.length,4);assert.equal(await mailCount(),3);results.push('explicit rejected Telegram retry skips accepted email');
  const before=telegram.length,mailBefore=await mailCount();assert.equal((await post({...lead,email:'bad'})).status,400);assert.equal((await post(lead,randomUUID(),{origin:'https://not-authorized.invalid'})).status,403);assert.equal((await post(lead,'invalid')).status,400);assert.equal(telegram.length,before);assert.equal(await mailCount(),mailBefore);results.push('invalid payload/origin/nonce denied before transport');
  const limited=[];for(let i=0;i<6;i++)limited.push(await post(lead,randomUUID(),{'CF-Connecting-IP':'198.51.100.99'}));assert.deepEqual(limited.map(r=>r.status),[200,200,200,200,200,429]);results.push('wrapper enforces 5/60 decision from synthetic limiter (not a native global-rate claim)');
  const setup=await mf.dispatchFetch('https://munamedia.uz/api/_setup',{method:'POST',body:JSON.stringify({action:'inspect'})});assert.equal(setup.status,404);results.push('setup route denies unauthenticated caller');
  console.log(JSON.stringify({ok:true,runtime:'actual workerd + SQLite DO',realProviderCalls:0,checks:results},null,2));
 }finally{await mf.dispose();}
})().catch(error=>{console.error(error);process.exitCode=1;});
