// Dual-channel submission receipts only. Never persist or log lead payloads.
const MAX_BODY=16384;
export const FIELDS=['name','company','phone','email','task','page'];
export const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const failure=(status,error,code='INVALID_REQUEST')=>json({ok:false,stored:false,error,code},status);
export function leadCaptureAvailable(env={}){
 return env.LEAD_CAPTURE_ENABLED==='true'&&/^-[1-9][0-9]{0,15}$/.test(env.TELEGRAM_CHAT_ID||'')&&Number.isSafeInteger(Number(env.TELEGRAM_CHAT_ID))&&typeof env.TELEGRAM_BOT_TOKEN==='string'&&!!env.TELEGRAM_BOT_TOKEN&&typeof env.LEAD_HASH_KEY==='string'&&!!env.LEAD_HASH_KEY&&typeof env.LEAD_EMAIL?.send==='function'&&typeof env.LEAD_DELIVERY?.idFromName==='function'&&typeof env.LEAD_DELIVERY?.get==='function';
}
export async function onRequestPost({request,env}){
 if(new URL(request.url).origin!=='https://munamedia.uz'||request.headers.get('origin')!==new URL(request.url).origin)return failure(403,"So'rov manbasi tasdiqlanmadi.");
 if(!/^application\/json(?:\s*;.*)?$/i.test(request.headers.get('content-type')||''))return failure(415,'JSON formatida yuboring.');
 if(Number(request.headers.get('content-length')||0)>MAX_BODY)return failure(413,'Ariza hajmi juda katta.');
 let data;
 try{
  const reader=request.body?.getReader();if(!reader)return failure(400,"Ariza bo'sh.");
  let size=0;const chunks=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BODY){await reader.cancel();return failure(413,'Ariza hajmi juda katta.');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 }catch{return failure(400,'Ariza formatini tekshiring.');}
 if(!data||Array.isArray(data)||typeof data!=='object'||Object.keys(data).some(k=>!FIELDS.includes(k))||FIELDS.some(k=>typeof data[k]!=='string'))return failure(400,'Ariza maydonlarini tekshiring.');
 const lead=Object.fromEntries(FIELDS.map(k=>[k,data[k].trim()]));
 const limits={name:120,company:200,phone:40,email:254,task:4000,page:200};
 if(FIELDS.some(k=>!lead[k]||lead[k].length>limits[k]||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(lead[k])))return failure(400,"Barcha maydonlarni to'g'ri to'ldiring.");
 if(!/^\+?[0-9][0-9 ()-]{6,38}$/.test(lead.phone)||!/^[0-9]{7,15}$/.test(lead.phone.replace(/\D/g,'')))return failure(400,'Telefon raqamini tekshiring.');
 if(/[\r\n]/.test(data.email)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))return failure(400,'Email manzilini tekshiring.');
 if(!/^\/(?:[a-z0-9][a-z0-9/-]*)?$/.test(lead.page)||lead.page.includes('//')||lead.page.includes('..'))return failure(400,'Sahifa manzilini tekshiring.');
 const nonce=request.headers.get('Idempotency-Key')||'';
 // Validate ordinary payloads first, preserving the existing invalid-input boundary.
 if(!UUID.test(nonce))return failure(400,"Yuborish kaliti noto'g'ri. Sahifani yangilang.",'INVALID_IDEMPOTENCY_KEY');
 if(!leadCaptureAvailable(env))return failure(503,"Ariza qabul qilish hozir ishlamayapti. Telegram yoki email orqali bog'laning.",'UNAVAILABLE');
 try{
  const stub=env.LEAD_DELIVERY.get(env.LEAD_DELIVERY.idFromName(nonce.toLowerCase()));
  return await stub.fetch(new Request('https://lead.internal/',{method:'POST',headers:{'content-type':'application/json','Idempotency-Key':nonce.toLowerCase()},body:JSON.stringify(lead)}));
 }catch{return failure(503,"Yuborish tasdig'i olinmadi. Shu arizani qayta tekshiring yoki biz bilan bog'laning.",'DELIVERY_UNCONFIRMED');}
}
export async function onRequestGet({env}={}){return json({available:leadCaptureAvailable(env)});}
