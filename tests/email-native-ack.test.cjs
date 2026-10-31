const {test}=require('node:test');
const assert=require('node:assert/strict');
const {isolated,payload,randomUUID}=require('./lead-harness.cjs');
for(const messageId of ['<synthetic-native-acceptance@notifications.munamedia.uz>','synthetic-opaque-id']){
 test('email native acknowledgement accepted without replay: '+messageId,()=>isolated(async h=>{
  h.email=()=>({messageId});const nonce=randomUUID();
  const first=await(await h.post(payload,nonce)).json();assert.equal(first.ok,true);assert.equal(first.delivered.email,true);
  const record=await h.stores.get(nonce).get('receipt');assert.equal(record.email.ack,messageId);
  h.recreate();const replay=await(await h.post(payload,nonce)).json();assert.equal(replay.ok,true);assert.equal(replay.receipt,first.receipt);assert.equal(h.calls.email.length,1);assert.equal(h.calls.telegram.length,1);
 }));
}
for(const messageId of ['<synthetic@example.invalid>','<synthetic@notifications.munamedia.uz>\r\nInjected: no','<'+ 'a'.repeat(161)+'@notifications.munamedia.uz>','secret provider response with spaces']){
 test('email non-ack provider data remains quarantined: '+messageId.slice(0,45),()=>isolated(async h=>{
  h.email=()=>({messageId});const nonce=randomUUID();const first=await(await h.post(payload,nonce)).json();assert.equal(first.ok,false);assert.equal(first.code,'DELIVERY_UNKNOWN');
  const record=await h.stores.get(nonce).get('receipt');assert.equal(record.email.status,'unknown');assert.equal(record.email.ack,undefined);
  h.recreate();await h.post(payload,nonce);assert.equal(h.calls.email.length,1);
 }));
}
