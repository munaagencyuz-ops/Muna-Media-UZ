const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const phone = '+998901381313';
const stale = /\+998331301313|\+998 33 130 13 13|\+998\*{4}1313/;
const bundles = ['index','about','influence','services','service-detail','case-detail','cases','koronapay'];

test('owner-approved Second Brain telephone is in all authoring agency schemas and generated city/locale schemas', () => {
  const sources = fs.readdirSync(root).filter(f => f.endsWith('.html'));
  const staged = fs.readdirSync(path.join(root,'dist'), {recursive:true}).filter(f => f.endsWith('.html'));
  let sourceAgencies = 0, stagedAgencies = 0;
  for (const [prefix, files] of [['', sources], ['dist/', staged]]) {
    for (const file of files) {
      const html = read(prefix+file);
      assert.ok(!stale.test(html), prefix+file+' stale phone');
      for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
        const data = JSON.parse(match[1]);
        for (const node of Array.isArray(data) ? data : [data]) {
          if (node['@type'] !== 'AdvertisingAgency') continue;
          assert.equal(node.contactPoint[0].telephone, phone, prefix+file);
          if (prefix) stagedAgencies++; else sourceAgencies++;
        }
      }
    }
  }
  assert.equal(sourceAgencies, 21);
  assert.equal(stagedAgencies, 72); // 21 original pages in two languages + 30 city hub/guide pages.
});

test('all eight bundles carry canonical telephone and the approved footer image, not a fabricated blob wordmark', () => {
  for (const file of ['nav.jsx','sections.jsx','about-sections.jsx','services-uzbekistan-sections.jsx',...bundles.map(b=>'assets/bundles/'+b+'.bundle.js')]) {
    const text = read(file);
    assert.ok(!stale.test(text),file+' stale phone');
    assert.ok(text.includes('+998 90 138 13 13'),file+' visible canonical phone');
    if (!file.endsWith('services-uzbekistan-sections.jsx')) assert.ok(text.includes('tel:'+phone),file+' dial link');
  }
  const footer = read('nav.jsx').split('function MunaFooter')[1];
  assert.ok(footer.includes('src="/assets/logo/muna-media-navbar-logo.png"'));
  assert.ok(footer.includes('alt="Muna Media"'));
  assert.ok(!footer.includes('className="blob"'));
  for (const bundle of bundles) {
    const footerBundle = read('assets/bundles/'+bundle+'.bundle.js').split('function MunaFooter')[1];
    assert.ok(footerBundle.includes('/assets/logo/muna-media-navbar-logo.png'),bundle);
  }
});
