const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = async file => import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(path.join(__dirname,'..',file),'utf8')).toString('base64'));
const env = {SANITY_PROJECT_ID:'synthetic-only',SANITY_DATASET:'synthetic',SANITY_API_TOKEN:'synthetic-not-a-credential',TELEGRAM_BOT_TOKEN:'synthetic-not-a-credential',TELEGRAM_CHAT_ID:'synthetic-only'};
const post = {title:'SYNTHETIC опубликованная статья',slug:'synthetic-published',excerpt:'Только локальная fixture.',publishedAt:'2026-01-02T00:00:00Z',body:[{_type:'block',children:[{_type:'span',text:'SYNTHETIC текст статьи.'}]}]};

for (const file of ['functions/blog/[[slug]].js','functions/blog/[slug].js']) {
  test(`${file}: published article stays indexable and canonical uses public host`, async () => {
    const old=global.fetch; const calls=[];
    global.fetch=async (url,options)=>{calls.push({url,options});return Response.json({result:post});};
    try {
      const fn=await load(file);
      const res=await fn.onRequestGet({request:new Request('https://preview.invalid/blog/synthetic-published'),env,params:{slug:'synthetic-published'}});
      const html=await res.text();
      assert.equal(res.status,200);
      assert.ok(html.includes('SYNTHETIC текст статьи.'));
      assert.match(html,/<link rel="canonical" href="https:\/\/munamedia.uz\/blog\/synthetic-published">/);
      assert.ok(!/noindex/i.test(html));
      assert.ok(!/href="\/\/(services-uzbekistan|cases|about)"/.test(html));
      assert.equal(calls.length,1);
      assert.equal(new URL(calls[0].url).hostname,'synthetic-only.api.sanity.io');
    } finally {global.fetch=old;}
  });
  test(`${file}: missing article is a true404`, async()=>{
    const fn=await load(file);
    const res=await fn.onRequestGet({request:new Request('https://preview.invalid/blog/not-published'),env:{},params:{slug:'not-published'}});
    assert.equal(res.status,404);
  });
}

test('blog empty fallback is public copy, not editorial Sanity instructions',async()=>{
  const fn=await load('functions/blog/[[slug]].js');
  const response=await fn.onRequestGet({request:new Request('https://preview.invalid/blog'),env:{},params:{}});
  const html=await response.text();
  assert.equal(response.status,200);
  assert.ok(!/Sanity|Blog Posts|Публикуйте статьи|Создайте первую статью/.test(html));
  assert.ok(html.includes('https://munamedia.uz/blog'));
});

test('blog populated index stays indexable, renders existing article, public canonical',async()=>{
  const old=global.fetch;
  global.fetch=async()=>Response.json({result:[post]});
  try{
    const fn=await load('functions/blog/[[slug]].js');
    const response=await fn.onRequestGet({request:new Request('https://preview.invalid/blog'),env,params:{}});
    const html=await response.text();
    assert.equal(response.status,200);
    assert.ok(!/noindex/i.test(html));
    assert.ok(html.includes('/blog/synthetic-published'));
    assert.ok(html.includes('https://munamedia.uz/blog'));
  }finally{global.fetch=old;}
});

// Contact capture is tested separately against a private-dataset mock transport.
