const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {renderHub,esc}=require('../scripts/city-hub/render.cjs');
const roster=require('../locales/city-roster.json'),guides=require('../locales/cities.cjs');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'.build/route-manifest.json')));
const read=p=>fs.readFileSync(path.join(dist,p),'utf8');
const decode=s=>s.replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('&amp;','&');
const text=html=>decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/g,'').replace(/<[^>]*>/g,' '));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const uz of [true,false])test(`client-facing city hub ${uz?'uz':'ru'} preserves exact geography, guide routes and metadata`,()=>{
 const prefix=uz?'':'/ru',html=read((uz?'':'ru/')+'shaharlar.html');
 const body=html.match(/<body>[\s\S]*<\/body>/)[0];
 const visible=text(body);
 assert.doesNotMatch(visible,/SOATO|MHOBT|SIAT|klassifikator|классификатор|\bnull\b|\bundefined\b/i);
 if(!uz)assert.doesNotMatch(visible,/viloyati|tumani|Respublikasi|shahri/);
 if(uz)assert.doesNotMatch(visible,/[‘’ʻʼ`]/);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.ok(html.includes(`<html lang="${uz?'uz':'ru'}"`));
 assert.ok(html.includes(`rel="canonical" href="https://munamedia.uz${prefix}/shaharlar"`));
 for(const lang of ['uz','ru','x-default'])assert.ok(html.includes(`hreflang="${lang}"`));
 assert.equal((body.match(/<main\b/g)||[]).length,1);
 assert.ok(body.includes('<header class="hub-header">'));assert.ok(body.includes('<footer class="hub-footer">'));
 const ids=[...body.matchAll(/data-soato="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,120);assert.equal(new Set(ids).size,120);
 assert.deepEqual(ids.slice().sort(),roster.cities.map(c=>c.soato_code).sort());
 for(const c of roster.cities)assert.ok(html.includes(`href="${prefix}/?soato=${c.soato_code}#contact"`));
 assert.equal((body.match(/<details\b/g)||[]).length,14);
 assert.equal((body.match(/data-guide="/g)||[]).length,14);
 for(const guide of guides)assert.ok(html.includes(`href="${prefix}/shaharlar/${guide.slug}"`));
 assert.match(visible,uz?/tayyorgarlik materiallari/:/материалы для подготовки кампании/);
 assert.ok(body.includes('href="tel:+998901381313"'));assert.ok(visible.includes('+998 90 138 13 13'));
 assert.ok(body.includes('mailto:info@munamedia.me'));
 assert.ok(body.includes('/assets/logo/muna-media-navbar-logo.jpg'));
 assert.ok(body.includes('class="hub-filter" hidden'));
 assert.ok(body.includes('id="city-empty" hidden'));
 assert.ok(body.includes('role="status" aria-live="polite" aria-atomic="true"'));
 assert.ok(!body.includes('assets/bundles/'));assert.ok(!body.includes('city-directory.js'));
 for(const match of html.matchAll(/(?:src|href)="(\/assets\/city-hub\.([a-f0-9]{16})\.(?:js|css))"/g)){
  assert.equal(hash(fs.readFileSync(path.join(dist,match[1]))).slice(0,16),match[2]);
 }
 assert.equal((html.match(/\/assets\/city-hub\.[a-f0-9]{16}\./g)||[]).length,2);
 for(const [,raw] of body.matchAll(/href="([^"]+)"/g)){
  const href=decode(raw);
  if(/^(tel:|mailto:)/.test(href))continue;
  const url=new URL(href,'https://munamedia.uz'+prefix+'/shaharlar');
  assert.equal(url.origin,'https://munamedia.uz');
  assert.ok(manifest.routes.includes(url.pathname),'Missing route '+url.pathname);
  if(url.pathname===prefix+'/shaharlar'&&url.hash)assert.ok(html.includes(`id="${url.hash.slice(1)}"`));
 }
});
test('city hub renderer escapes all display text and attribute values',()=>{
 assert.equal(esc('<a "x" \'y\'>&'), '&lt;a &quot;x&quot; &#39;y&#39;&gt;&amp;');
 const custom=structuredClone(roster);custom.cities[0].name_ru_source='<img src=x onerror="alert(1)">';
 const html=renderHub(custom,guides,false).body;
 assert.ok(!html.includes('<img src=x'));assert.ok(html.includes('&lt;img src=x'));
 const customGuides=structuredClone(guides);customGuides[0].ruFocus='<script>alert(1)</script>';
 assert.ok(!renderHub(roster,customGuides,false).body.includes('<script>'));
});
test('bounded hub release preserves non-hub HTML, compiled UI bundles and legacy city script byte for byte',()=>{
 const fixture=require('./city-hub-preservation.json');
 for(const [file,expected] of Object.entries(fixture))assert.equal(hash(fs.readFileSync(path.join(dist,file))),expected,file+' changed outside hub scope');
});
