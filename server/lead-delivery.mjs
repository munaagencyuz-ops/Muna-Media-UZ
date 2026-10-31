import {FIELDS,UUID,json,leadCaptureAvailable} from './contact-handler.mjs';

export const RECEIPT_TTL_MS=7*24*60*60*1000;
const PROVIDER_TIMEOUT_MS=8000;
const rejectedMailCodes=new Set([
 'E_VALIDATION_ERROR','E_FIELD_MISSING','E_TOO_MANY_RECIPIENTS','E_TOO_MANY_ATTACHMENTS',
 'E_SENDER_NOT_VERIFIED','E_RECIPIENT_NOT_ALLOWED','E_RECIPIENT_SUPPRESSED',
 'E_ACCOUNT_SUSPENDED','E_SENDER_DOMAIN_NOT_AVAILABLE','E_CONTENT_TOO_LARGE',
 'E_RATE_LIMIT_EXCEEDED','E_DAILY_LIMIT_EXCEEDED','E_HEADER_NOT_ALLOWED',
 'E_HEADER_USE_API_FIELD','E_HEADER_VALUE_INVALID','E_HEADER_VALUE_TOO_LONG',
 'E_HEADER_NAME_INVALID','E_HEADERS_TOO_LARGE','E_HEADERS_TOO_MANY'
]); // Documented pre-acceptance rejection only; delivery/internal errors remain unknown.
const emptyStatus=()=>({status:'pending'});
const escapeHtml=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function leadText(lead,receipt){
 return ['Muna Media: yangi ariza',`Receipt: ${receipt}`,...FIELDS.map(k=>`${k}: ${lead[k]}`)].join('\n');
}
export function telegramChunks(text){
 const chunks=[];
 for(let start=0;start<text.length;){
  let end=Math.min(start+3500,text.length);
  if(end<text.length&&/[\uD800-\uDBFF]/.test(text[end-1])&&/[\uDC00-\uDFFF]/.test(text[end]))end--;
  chunks.push(text.slice(start,end));start=end;
 }
 return chunks;
}
async function payloadDigest(lead,key){
 const encoder=new TextEncoder();
 const secret=await crypto.subtle.importKey('raw',encoder.encode(key),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const digest=await crypto.subtle.sign('HMAC',secret,encoder.encode(JSON.stringify(Object.fromEntries(FIELDS.map(k=>[k,lead[k]])))));
 return Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
}
async function bounded(action){
 let timer;
 try{return await Promise.race([action(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('PROVIDER_TIMEOUT')),PROVIDER_TIMEOUT_MS);})]);}
 finally{clearTimeout(timer);}
}
async function telegramSend(env,text){
 try{return await bounded(async()=>{
  const response=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
   method:'POST',redirect:'manual',headers:{'content-type':'application/json'},
   body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text,disable_web_page_preview:true}),
   signal:AbortSignal.timeout(PROVIDER_TIMEOUT_MS)
  });
  if(response.redirected||response.status>=300&&response.status<400)return {status:'unknown'};
  // Keep even a malicious/malformed provider response bounded; never store its body.
  const reader=response.body?.getReader();if(!reader)return {status:'unknown'};
  let size=0;const chunks=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();return {status:'unknown'};}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
  const result=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  if(response.ok&&result.ok===true&&Number.isSafeInteger(result.result?.message_id)&&result.result.message_id>0&&String(result.result?.chat?.id)===env.TELEGRAM_CHAT_ID)return {status:'ack',ack:result.result.message_id};
  if(result.ok===false&&[400,401,403,429].includes(result.error_code)&&response.status===result.error_code)return {status:'rejected'};
  return {status:'unknown'};
 });}catch{return {status:'unknown'};}
}
async function emailSend(env,lead,receipt,text){
 try{
  const result=await bounded(()=>env.LEAD_EMAIL.send({
   from:'leads@notifications.munamedia.uz',to:'info@munamedia.me',
   subject:`Muna Media enquiry — ${receipt.slice(0,20)}`,text,
   html:`<pre>${escapeHtml(text)}</pre>`,replyTo:lead.email
  }));
  // Native Email Sending returns an RFC 5322 Message-ID on this account.
  // Retain the opaque-ID form too; reject bodies/addresses outside the sender domain.
  return typeof result?.messageId==='string'&&/^(?:[A-Za-z0-9_-]{1,200}|<[A-Za-z0-9._+-]{1,160}@notifications\.munamedia\.uz>)$/.test(result.messageId)?{status:'ack',ack:result.messageId}:{status:'unknown'};
 }catch(error){return {status:rejectedMailCodes.has(error?.code)?'rejected':'unknown'};}
}

// Legacy fetch-style Durable Object, supported with SQLite-backed KV storage.
// One object per random nonce; the in-instance promise queue serializes external I/O.
// Only metadata is persisted. A restarted pre-send fence is UNKNOWN, never replayable.
export class LeadDelivery {
 constructor(ctx,env){this.ctx=ctx;this.env=env;this.tail=Promise.resolve();}
 exclusive(action){const run=this.tail.then(action);this.tail=run.catch(()=>{});return run;}
 fetch(request){return this.exclusive(()=>this.deliver(request)).catch(()=>json({ok:false,stored:false,code:'RECEIPT_UNCONFIRMED',error:"Yuborish tasdig'i olinmadi. Shu arizani qayta tekshiring yoki biz bilan bog'laning."},503));}
 async deliver(request){
  if(request.method!=='POST')return json({ok:false,stored:false,code:'METHOD_NOT_ALLOWED'},405);
  if(!leadCaptureAvailable(this.env))return json({ok:false,stored:false,code:'UNAVAILABLE'},503);
  const nonce=request.headers.get('Idempotency-Key')||'';
  if(!UUID.test(nonce))return json({ok:false,stored:false,code:'INVALID_IDEMPOTENCY_KEY'},400);
  const lead=await request.json(); // Only the validated Worker can invoke this private binding.
  const digest=await payloadDigest(lead,this.env.LEAD_HASH_KEY);
  const storage=this.ctx.storage;
  let record=await storage.get('receipt');
  if(record&&record.expiresAt<=Date.now()){await storage.deleteAll();record=null;}
  const duplicate=!!record;
  if(record&&(record.digest!==digest||record.nonce!==nonce))return json({ok:false,stored:false,code:'IDEMPOTENCY_CONFLICT',error:'Bu yuborish kaliti boshqa ariza uchun ishlatilgan.'},409);
  const receipt=record?.receipt||`lead.${crypto.randomUUID()}`;
  const text=leadText(lead,receipt),parts=telegramChunks(text);
  if(!record){
   const now=Date.now();
   record={version:1,nonce,digest,receipt,createdAt:now,expiresAt:now+RECEIPT_TTL_MS,telegram:parts.map(emptyStatus),email:emptyStatus()};
   // Schedule cleanup BEFORE any send/fence. An orphan alarm contains no lead data.
   await storage.setAlarm(record.expiresAt);
   await storage.put('receipt',record);
  }
  if(record.telegram.length!==parts.length)throw new Error('RECEIPT_VERSION');
  for(const status of [...record.telegram,record.email])if(status.status==='fenced'){status.status='unknown';status.at=Date.now();}
  await storage.put('receipt',record);
  // Every provider attempt has a durable fence BEFORE external I/O. Do not catch
  // storage failures as provider rejection, or automatically retry unknown outcomes.
  const attempt=async(status,send)=>{
   if(!['pending','rejected'].includes(status.status))return;
   status.status='fenced';status.at=Date.now();delete status.ack;
   await storage.put('receipt',record);
   const result=await send();
   Object.assign(status,result,{at:Date.now()});
   await storage.put('receipt',record);
  };
  for(let i=0;i<parts.length;i++){
   await attempt(record.telegram[i],()=>telegramSend(this.env,parts[i]));
   if(record.telegram[i].status!=='ack')break; // Preserve message order across explicit retries.
  }
  await attempt(record.email,()=>emailSend(this.env,lead,receipt,text));
  const delivered={telegram:record.telegram.every(x=>x.status==='ack'),email:record.email.status==='ack'};
  if(delivered.telegram&&delivered.email)return json({ok:true,stored:true,delivered,receipt,duplicate});
  const unknown=[...record.telegram,record.email].some(x=>x.status==='unknown');
  return json({ok:false,stored:false,delivered,receipt,duplicate,code:unknown?'DELIVERY_UNKNOWN':'DELIVERY_PARTIAL',retryable:!unknown,
   error:unknown?"Yuborish to'liq tasdiqlanmadi. Yangi ariza yubormang; email yoki Telegram orqali biz bilan bog'laning.":"Ariza ikkala kanalga ham yuborilmadi. Maydonlarni o'zgartirmay qayta urinib ko'ring."},502);
 }
 alarm(){return this.exclusive(async()=>{
  const record=await this.ctx.storage.get('receipt');
  if(record&&record.expiresAt>Date.now()){await this.ctx.storage.setAlarm(record.expiresAt);return;}
  await this.ctx.storage.deleteAll();
 });}
}
