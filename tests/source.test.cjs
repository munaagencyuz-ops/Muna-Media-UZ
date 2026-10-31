const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const baselineRevision = '3f0ce23773891b776b387cb7b7dccfd79b603e75';
const original = p => execFileSync('git', ['show', `${baselineRevision}:${p}`], {cwd:root, encoding:'utf8'});
const formFiles = ['sections.jsx','about-sections.jsx','influence-sections.jsx','services-uzbekistan-sections.jsx'];
const bundles = ['index','about','influence','services','service-detail','case-detail','cases','koronapay'];

test('pipeline explicitly builds all eight shipped entrypoints', () => {
  const script = read('scripts/build-bundles.cjs');
  for (const bundle of bundles) assert.ok(script.includes(`assets/bundles/${bundle}.bundle.js`), bundle);
});

test('20 required fields have stable labels, names, autofill; input contracts are preserved', () => {
  let total=0;
  for (const file of formFiles) {
    const text = read(file);
    const fields = [...text.matchAll(/<(input|textarea|select)\b[\s\S]*?(?:\/>|(?<![=])>)/g)].map(m=>m[0]).filter(t=>/value=\{form\./.test(t));
    assert.equal(fields.length,5,file);
    for (const tag of fields) {
      const key = tag.match(/value=\{form\.(\w+)\}/)[1];
      assert.match(tag,new RegExp(`name="${key}"`),`${file}:${key}`);
      const id = tag.match(/\bid="([^"]+)"/)?.[1];
      assert.ok(id,`${file}:${key} id`);
      assert.ok(text.includes(`htmlFor="${id}"`),`${file}:${key} label`);
      const token = {name:'name',company:'organization',phone:'tel',email:'email',task:'off'}[key];
      assert.ok(tag.includes(`autoComplete="${token}"`),`${file}:${key} autofill`);
      assert.match(tag,/\brequired\b/);
      total++;
    }
    // Changes must not silently alter visible budget choices or required data.
    assert.deepEqual([...text.matchAll(/<option[^>]*>[\s\S]*?<\/option>/g)].map(m=>m[0]),[...original(file).matchAll(/<option[^>]*>[\s\S]*?<\/option>/g)].map(m=>m[0]));
  }
  assert.equal(total,20);
});

test('homepage placeholders repaired without a fabricated Calendly account', () => {
  const text = read('sections.jsx');
  assert.ok(!text.includes('href="#"'));
  assert.match(text,/href="https:\/\/t.me\/munamedia"/);
  assert.match(text,/href="#contact"[^>]*className="btn lime final-cta-link"/);
  assert.ok(text.includes('Обсудить рекламную кампанию'));
});

test('existing unique metadata, case evidence, sender, and language controls are retained', () => {
  for (const file of fs.readdirSync(root).filter(x=>x.endsWith('.html') && x!=='404.html')) {
    const before = original(file), after = read(file);
    for (const regex of [/<title>[\s\S]*?<\/title>/, /<meta name="description"[^>]*>/]) {
      if (file === 'about.html' && regex.source.startsWith('<meta name=')) {
        assert.equal(after.match(regex)?.[0], '<meta name="description" content="Muna Media — рекламное агентство для брендов Узбекистана: стратегия, наружная реклама, digital, SMM, Telegram, инфлюенсеры и мероприятия." />', 'owner-approved local about description');
      } else {
        assert.equal(after.match(regex)?.[0],before.match(regex)?.[0],file);
      }
    }
  }
  for (const file of ['case-study-sections.jsx','koronapay-sections.jsx']) assert.equal(read(file),original(file),file);
  // Sender blocks remain identical except the explicit durable-receipt requirement.
  for (const file of formFiles) {
    const sender=t=>t.match(/async function handleSubmit\(e\) \{[\s\S]*?\n  \}/)?.[0];
    let expected=sender(original(file));
    if(file==='sections.jsx') {
      // The homepage now shares the nonce/dual-ack helper. Preserve the rest of
      // its original submit/clear/error lifecycle byte-for-byte.
      expected=expected.replace(/      const response = await fetch\('\/api\/contact',[\s\S]*?\n      \}\n/, '      await submitLeadForm(form, window.location.pathname);\n');
    }
    assert.equal(sender(read(file)),expected,file);
    assert.match(sender(read(file)),/await submitLeadForm\(form, window.location.pathname\)/);
    const phoneLinks=t=>[...t.matchAll(/href="tel:[^"]*"/g)].map(m=>m[0]);
    assert.deepEqual(phoneLinks(read(file)),phoneLinks(original(file)).map(()=>'href="tel:+998901381313"'),file+' owner-approved public phone links');
  }
});

test('local-brand offer is synchronized without rewriting international case history', () => {
  const home = read('sections.jsx'), about = read('about-sections.jsx'), services = read('services-uzbekistan-sections.jsx');
  const statement = 'Muna Media помогает брендам Узбекистана планировать и запускать рекламу: наружные размещения, digital, SMM, Telegram, инфлюенс-маркетинг и мероприятия.';
  assert.ok(home.includes('брендов Узбекистана.'));
  assert.ok(home.includes('Реклама для брендов Узбекистана') && !home.includes('Выход на рынок Узбекистана'));
  const serviceData = read('service-detail-data.jsx');
  assert.ok(!serviceData.includes('Мы специализируемся на корпоративных и международных брендах'));
  assert.ok(!serviceData.includes('Для части задач можем подключать и рынки Центральной Азии'));
  assert.ok(home.includes(statement) && read('index.html').includes(statement));
  assert.ok(services.includes(statement));
  assert.ok(!home.includes('Для международных брендов, заходящих в регион'));
  assert.ok(!about.includes('снижение рисков при выходе международных корпораций'));
  assert.ok(about.includes('Наша миссия — помогать брендам Узбекистана'));
  const aboutHtml = read('about.html');
  const metaDescription = aboutHtml.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const schema = JSON.parse(aboutHtml.match(/<script type="application\/ld\+json" data-static-seo>([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.find(x=>x['@type']==='WebPage').description, metaDescription);
  for (const file of ['case-study-sections.jsx','koronapay-sections.jsx']) assert.equal(read(file), original(file), file);
});

test('404 is an actual explicit document and middleware does not index error responses', () => {
  assert.ok(fs.existsSync(path.join(root,'404.html')));
  assert.match(read('404.html'),/noindex/);
  assert.match(read('functions/_middleware.js'),/response\.status\s*(?:!==\s*200|>=\s*400)/);
});

test('robots exposes sitemap and rendering assets while retaining training opt-outs', () => {
  const robots=read('robots.txt');
  assert.ok(robots.includes('Sitemap: https://munamedia.uz/sitemap.xml'));
  assert.ok(!robots.includes('Disallow: /assets/vendor/'));
  for(const agent of ['GPTBot','ClaudeBot','CCBot','Google-Extended','Applebot-Extended']) assert.match(robots,new RegExp(`User-agent: ${agent}\\s+Disallow: /`));
});

test('llms has truthful host scope with no unverified influence link', () => {
  const text=read('llms.txt');
  assert.ok(text.includes('https://munamedia.uz'));
  assert.ok(text.includes('https://munadigital.uz'));
  assert.ok(text.includes('performance'));
  assert.ok(!/https?:\/\/(?:www\.)?munaagency\.uz(?:\/|\b)/i.test(text));
});

test('staging excludes application, package, studio and credential sources', () => {
  const config=JSON.parse(read('wrangler.json'));
  assert.equal(config.pages_build_output_dir,'./dist');
  const files=[];
  function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else files.push(path.relative(path.join(root,'dist'),p));}}
  walk(path.join(root,'dist'));
  assert.ok(files.includes('_worker.js'));
  assert.ok(files.includes('_routes.json'));
  assert.ok(files.includes('_redirects'));
  assert.ok(files.includes('_headers'));
  assert.ok(files.length>30);
  assert.deepEqual(files.filter(p=>/\.jsx$|(^|\/)(package[^/]*\.json|\.env[^/]*|\.dev\.vars|node_modules|studio|functions|scripts|tests)(\/|$)/.test(p)),[]);
});
