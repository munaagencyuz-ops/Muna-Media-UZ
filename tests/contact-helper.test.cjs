const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {isolated,payload}=require('./lead-harness.cjs');
function helper(fetch,city=''){
 const context=vm.createContext({crypto,fetch,window:{location:{pathname:'/'}},munaCityTask:()=>city,munaText:(ru,uz)=>uz});
 vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../contact-helper.jsx'),'utf8')+'\nthis.submit=submitLeadForm;',context);return context.submit;
}
test('shared browser helper uses actual dual-channel backend; stable nonce on retry, changed payload gets new nonce',()=>isolated(async h=>{
 const requests=[];h.email=()=>{throw Object.assign(Error('private'),{code:'E_RATE_LIMIT_EXCEEDED'});};
 const submit=helper(async(url,options)=>{const body=JSON.parse(options.body),nonce=options.headers['Idempotency-Key'];requests.push({body,nonce});return h.post(body,nonce);});
 await assert.rejects(submit(payload,'/'));await assert.rejects(submit({...payload,task:'changed'},'/'));h.email=null;
 const result=await submit(payload,'/');assert.equal(result.delivered.email,true);assert.equal(requests[0].nonce,requests[2].nonce);assert.notEqual(requests[0].nonce,requests[1].nonce);assert.equal(h.calls.telegram.length,2);assert.equal(h.calls.email.length,3);
}));
for(const delivered of [{telegram:true,email:false},{telegram:false,email:true},undefined])test('helper rejects stored/ok without BOTH acknowledgements '+JSON.stringify(delivered),async()=>{
 const nonces=[],submit=helper(async(url,options)=>{nonces.push(options.headers['Idempotency-Key']);return Response.json({ok:true,stored:true,delivered,receipt:'lead.00000000-0000-4000-8000-000000000000'});});
 await assert.rejects(submit(payload,'/'));await assert.rejects(submit(payload,'/'));assert.equal(nonces[0],nonces[1]);
});
test('city prefill included once and all six exact fields passed to real backend',()=>isolated(async h=>{
 let sent;const city='SOATO: 1726266',submit=helper(async(url,options)=>{sent=JSON.parse(options.body);return h.post(sent,options.headers['Idempotency-Key']);},city);
 await submit({...payload,task:city+'\nOriginal task'},'/');assert.equal(sent.task,city+'\nOriginal task');assert.deepEqual(Object.keys(sent),['name','company','phone','email','task','page']);
}));
