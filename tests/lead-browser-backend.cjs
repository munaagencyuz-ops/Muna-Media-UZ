// Synthetic-only stdin bridge, never a public diagnostic endpoint.
const readline=require('node:readline');
const {createHarness}=require('./lead-harness.cjs');
(async()=>{
 const h=await createHarness();global.fetch=h.fetch;
 for await(const line of readline.createInterface({input:process.stdin})){
  try{
   const x=JSON.parse(line);
   h.env.LEAD_CAPTURE_ENABLED=x.mode==='unavailable'?'false':'true';
   h.email=x.mode==='partial'?()=>{throw Object.assign(Error('synthetic rejection'),{code:'E_RATE_LIMIT_EXCEEDED'});}:x.mode==='unknown'?()=>{throw Error('synthetic unknown');}:null;
   const res=x.method==='GET'?await h.handler.onRequestGet({env:h.env}):await h.post(x.body,x.nonce);
   process.stdout.write(JSON.stringify({status:res.status,body:await res.json(),calls:{telegram:h.calls.telegram.length,email:h.calls.email.length}})+'\n');
  }catch{process.stdout.write(JSON.stringify({bridgeError:true})+'\n');}
 }
})().catch(()=>{process.exitCode=1;});
