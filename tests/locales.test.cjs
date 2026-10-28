const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'.build/route-manifest.json'),'utf8'));
const read=p=>fs.readFileSync(path.join(dist,p),'utf8');
const file=p=>p==='/'?'index.html':p==='/ru/'?'ru/index.html':p.slice(1)+'.html';
test('22 historic paths, both locales, 14 guides, 120 unique SOATO directory choices',()=>{
 assert.equal(manifest.originalPaths.length,22);assert.equal(manifest.cities.length,14);assert.equal(manifest.directory.length,120);assert.equal(new Set(manifest.directory.map(x=>x.soato)).size,120);assert.equal(new Set(manifest.routes).size,74);
 for(const city of manifest.directory)assert.equal(city.serviceVerified,false);
 for(const locale of ['','ru/']){const html=read(locale+'shaharlar.html');assert.equal([...html.matchAll(/data-soato="/g)].length,120);assert.equal([...html.matchAll(/data-guide="/g)].length,14);}
});
for(const p of manifest.routes)test('locale SEO '+p,()=>{
 const html=read(file(p)),ru=p.startsWith('/ru/'),base=ru?p.slice(3)||'/':p;
 assert.match(html,new RegExp('<html lang="'+(ru?'ru':'uz')+'"'));
 assert.ok(html.includes('<link rel="canonical" href="https://munamedia.uz'+p+'">'),p);
 for(const [lang,target] of [['uz',base],['ru','/ru'+(base==='/'?'/':base)],['x-default',base]])assert.ok(html.includes('hreflang="'+lang+'" href="https://munamedia.uz'+target+'"'),p+lang);
 assert.equal([...html.matchAll(/rel="canonical"/g)].length,1);assert.ok(!/noindex/.test(html));
 assert.ok(html.includes('<meta name="description" content="'));assert.equal([...html.matchAll(/<h1\b/g)].length,1);
 if(!ru&&!['/cases','/xiaomi','/unionpay','/koronapay','/blog'].includes(p)){const text=html.match(/<main class="seo-fallback"[\s\S]*?<\/main>/)?.[0];assert.ok(text);assert.ok(!/[А-Яа-яЁё]/.test(text.replace(/<[^>]+>/g,'').replaceAll('Русский','')),p);}
});
test('city guides have unique briefs, questions, scenarios and exact city-prefill links',()=>{
 assert.equal(new Set(manifest.cities.map(c=>c.focus)).size,14);assert.equal(new Set(manifest.cities.map(c=>c.scenario)).size,14);assert.equal(new Set(manifest.cities.flatMap(c=>c.checklist)).size,42);
 for(const c of manifest.cities){const html=read('shaharlar/'+c.slug+'.html');for(const text of [c.intro,...c.checklist,c.scenario])assert.ok(html.includes(text.replaceAll('&','&amp;').replaceAll('"','&quot;')));assert.ok(html.includes('?soato='));assert.ok(html.includes('ofisimiz'));assert.ok(html.includes('mavjudligi'));}
});
test('all eight bundles contain real compiled Uzbek UI and unchanged historic source is separate',()=>{
 const {builds}=require('../scripts/build-bundles.cjs');for(const b of builds){const code=read(b.out);assert.ok(code.includes('function munaText'));assert.ok(code.includes('MUNA_UZ'));assert.ok(code.includes('MunaLanguageLink'));assert.ok(!code.includes('type="text/babel"'));}
});
