// Capture is authoritative; notification is best-effort. Never log PII/provider bodies.
const MAX_BODY=16384,FIELDS=['name','company','phone','email','task','page'];
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const failure=(status,error)=>json({ok:false,stored:false,error},status);
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
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))return failure(400,'Email manzilini tekshiring.');
 if(!/^\/(?:[a-z0-9][a-z0-9/-]*)?$/.test(lead.page)||lead.page.includes('//')||lead.page.includes('..'))return failure(400,'Sahifa manzilini tekshiring.');
 const project=env.SANITY_LEAD_PROJECT_ID||env.SANITY_PROJECT_ID,dataset=env.SANITY_LEAD_DATASET,token=env.SANITY_LEAD_API_TOKEN||env.SANITY_API_TOKEN;
 // Explicit private receiver required; never fall back to public content dataset.
 if(!project||!dataset||!token||env.SANITY_LEAD_DATASET_PRIVATE!=='true'||!/^[a-z0-9-]+$/.test(project)||!/^[a-z0-9_-]+$/.test(dataset))return failure(503,"Ariza qabul qilish hozir ishlamayapti. Telegram yoki email orqali bog'laning.");
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(lead)));
 const receipt='webLead.'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 const document={_id:receipt,_type:'lead',...lead,status:'new',submittedAt:new Date().toISOString(),source:'munamedia.uz'};
 let created=false;
 try{
  const response=await fetch(`https://${project}.api.sanity.io/v2025-01-01/data/mutate/${dataset}?returnIds=true&returnDocuments=false`,{method:'POST',redirect:'manual',headers:{'content-type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({mutations:[{createIfNotExists:document}]}),signal:AbortSignal.timeout(8000)});
  if(!response.ok)return failure(502,"Arizani saqlab bo'lmadi. Keyinroq qayta urinib ko'ring.");
  const result=await response.json(),row=result.results?.find(r=>r.id===receipt);
  if(!row||!['create','none'].includes(row.operation))return failure(502,"Saqlash tasdig'i olinmadi. Qayta urinib ko'ring.");
  created=row.operation==='create';
 }catch{return failure(502,"Saqlash tasdig'i olinmadi. Qayta urinib ko'ring.");}
 let notified=false;
 if(created&&env.TELEGRAM_BOT_TOKEN&&env.TELEGRAM_CHAT_ID){try{
  const response=await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:'POST',redirect:'manual',headers:{'content-type':'application/json'},body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text:['Muna Media: yangi ariza',...FIELDS.map(k=>`${k}: ${lead[k]}`)].join('\n'),disable_web_page_preview:true}),signal:AbortSignal.timeout(5000)});
  const result=response.ok?await response.json():null;
  notified=result?.ok===true&&Number.isInteger(result.result?.message_id)&&result.result.message_id>0&&String(result.result?.chat?.id)===String(env.TELEGRAM_CHAT_ID);
 }catch{/* An unknown notification outcome must not cause duplicate capture or resend. */}}
 return json({ok:true,stored:true,receipt,duplicate:!created,notified,message:"Arizangiz saqlandi. Jamoamiz siz bilan bog'lanadi."});
}
export async function onRequestGet(){return json({ok:true,message:'Muna Media contact endpoint. Use POST.'});}
