const {randomUUID,webcrypto}=require('node:crypto');
if(!global.crypto)global.crypto=webcrypto;
const payload={name:'SYNTHETIC QA',company:'SYNTHETIC ONLY',phone:'+998000000000',email:'synthetic@example.invalid',task:'SYNTHETIC NO DELIVERY',page:'/'};
class FakeStorage {
 constructor(){this.rows=new Map();this.history=[];this.alarm=null;this.beforePut=null;}
 async get(key){return structuredClone(this.rows.get(key));}
 async put(key,value){if(this.beforePut)await this.beforePut(key,value);this.rows.set(key,structuredClone(value));this.history.push(structuredClone(value));}
 async setAlarm(at){this.alarm=at;}
 async deleteAll(){this.rows.clear();}
}
async function createHarness(){
 const handler=await import('../server/contact-handler.mjs');
 const delivery=await import('../server/lead-delivery.mjs');
 const stores=new Map(),objects=new Map(),calls={telegram:[],email:[]};
 const h={handler,delivery,stores,objects,calls,telegram:null,email:null};
 const env={LEAD_CAPTURE_ENABLED:'true',TELEGRAM_BOT_TOKEN:'synthetic-token-no-network',TELEGRAM_CHAT_ID:'-100000000001',LEAD_HASH_KEY:'synthetic-hmac-key-no-secret',
  LEAD_EMAIL:{send:async message=>{calls.email.push(message);return h.email?h.email(message):{messageId:'<synthetic-email-ack@notifications.munamedia.uz>'};}},
  LEAD_DELIVERY:{idFromName:name=>name,get:id=>({fetch:request=>{if(!stores.has(id))stores.set(id,new FakeStorage());if(!objects.has(id))objects.set(id,new delivery.LeadDelivery({storage:stores.get(id)},env));return objects.get(id).fetch(request);}})}};
 h.env=env;
 h.fetch=async(url,options)=>{
  if(!String(url).startsWith('https://api.telegram.org/botsynthetic-token-no-network/sendMessage'))throw Error('SYNTHETIC NETWORK DENIED');
  const body=JSON.parse(options.body);calls.telegram.push(body);
  return h.telegram?h.telegram(body,options):Response.json({ok:true,result:{message_id:calls.telegram.length,chat:{id:env.TELEGRAM_CHAT_ID}}});
 };
 h.request=(body=payload,nonce=randomUUID(),headers={})=>new Request('https://munamedia.uz/api/contact',{method:'POST',headers:{origin:'https://munamedia.uz','content-type':'application/json','Idempotency-Key':nonce,...headers},body:typeof body==='string'?body:JSON.stringify(body)});
 h.post=(body=payload,nonce=randomUUID(),headers={})=>handler.onRequestPost({request:h.request(body,nonce,headers),env});
 h.recreate=()=>objects.clear();
 return h;
}
async function isolated(run){
 const oldFetch=global.fetch,logs=[],old={};
 for(const key of ['log','warn','error','info','debug']){old[key]=console[key];console[key]=(...x)=>logs.push(x);}
 try{const h=await createHarness();global.fetch=h.fetch;await run(h,logs);require('node:assert/strict').deepEqual(logs,[]);}
 finally{global.fetch=oldFetch;for(const key of Object.keys(old))console[key]=old[key];}
}
module.exports={payload,FakeStorage,createHarness,isolated,randomUUID};
