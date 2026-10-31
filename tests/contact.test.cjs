const {test}=require('node:test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const load=()=>import(pathToFileURL(path.resolve(__dirname,'../server/contact-handler.mjs')));
const env={};
const payload={name:'SYNTHETIC QA',company:'SYNTHETIC ONLY',phone:'+998000000000',email:'synthetic@example.invalid',task:'SYNTHETIC NO DELIVERY',page:'/'};
const request=(body=payload,headers={})=>new Request('https://munamedia.uz/api/contact',{method:'POST',headers:{origin:'https://munamedia.uz','content-type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
async function recording(fn){const old=global.fetch,logs=[];const oldlog=console.error,oldwarn=console.warn;console.error=(...x)=>logs.push(x);console.warn=(...x)=>logs.push(x);try{await fn();assert.deepEqual(logs,[]);}finally{global.fetch=old;console.error=oldlog;console.warn=oldwarn;}}
for(const [name,body,headers,status] of [
 ['null',null,{},400],['array',[],{},400],['nested field',{...payload,name:{}},{},400],['unknown field',{...payload,extra:'no'},{},400],['numeric field',{...payload,phone:998000000000},{},400],['masked phone',{...payload,phone:'+998****0000'},{},400],['short phone',{...payload,phone:'123'},{},400],['bad email',{...payload,email:'bad'},{},400],['external page',{...payload,page:'https://evil.invalid'},{},400],['double-slash page',{...payload,page:'//evil.invalid'},{},400],['control char',{...payload,name:'a\u0000b'},{},400],['bad JSON','{',{},400],['body bound','x'.repeat(16385),{},413],['content length',payload,{'content-length':'16385'},413],['origin missing',payload,{origin:''},403],['origin hostile',payload,{origin:'https://evil.invalid'},403],['bad type',payload,{'content-type':'text/plain'},415]
])test('capture rejects '+name+' before transport',()=>recording(async()=>{let calls=0;global.fetch=async()=>{calls++;throw Error('must not send')};const fn=await load();const res=await fn.onRequestPost({request:request(body,headers),env});assert.equal(res.status,status);assert.equal((await res.json()).stored,false);assert.equal(calls,0);}));
test('unapproved same-origin host cannot invoke capture',()=>recording(async()=>{global.fetch=async()=>{throw Error('must not send')};const fn=await load();const r=await fn.onRequestPost({request:new Request('https://unapproved.invalid/api/contact',{method:'POST',headers:{origin:'https://unapproved.invalid','content-type':'application/json'},body:JSON.stringify(payload)}),env});assert.equal(r.status,403);}));
