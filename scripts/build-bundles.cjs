const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const sharedUiInputs = ['nav.jsx', 'tweaks-panel.jsx'];

const builds = [
  {
    out: 'assets/bundles/index.bundle.js',
    inputs: [...sharedUiInputs, 'sections.jsx', 'app.jsx'],
  },
  {
    out: 'assets/bundles/about.bundle.js',
    inputs: [...sharedUiInputs, 'contact-helper.jsx', 'about-sections.jsx', 'about-app.jsx'],
  },
  {
    out: 'assets/bundles/influence.bundle.js',
    inputs: [...sharedUiInputs, 'contact-helper.jsx', 'influence-sections.jsx', 'influence-app.jsx'],
  },
  {
    out: 'assets/bundles/services.bundle.js',
    inputs: [...sharedUiInputs, 'contact-helper.jsx', 'services-uzbekistan-sections.jsx', 'services-uzbekistan-app.jsx'],
  },
  {
    out: 'assets/bundles/service-detail.bundle.js',
    inputs: [...sharedUiInputs, 'service-detail-data.jsx', 'service-detail-sections.jsx', 'service-detail-app.jsx'],
  },
  {
    out: 'assets/bundles/case-detail.bundle.js',
    inputs: [...sharedUiInputs, 'case-study-sections.jsx', 'case-study-app.jsx'],
  },
  {
    out: 'assets/bundles/cases.bundle.js',
    inputs: [...sharedUiInputs, 'cases-sections.jsx', 'cases-app.jsx'],
  },
  {
    out: 'assets/bundles/koronapay.bundle.js',
    inputs: [...sharedUiInputs, 'koronapay-sections.jsx', 'koronapay-app.jsx'],
  },
];

async function buildOne({ out, inputs }) {
  const localeDir = path.resolve(__dirname, '../locales');
  const serviceCopy = require(path.join(localeDir, 'services-uz.cjs'));
  const cityNames = Object.fromEntries(require(path.join(localeDir,'city-roster.json')).cities.map(c=>[c.soato_code,c.name_uz_display]));
  const source = 'const MUNA_CITY_NAMES = '+JSON.stringify(cityNames)+';\n'+fs.readFileSync(path.join(localeDir, 'runtime.jsx'), 'utf8') + '\n' + inputs
    .map((file) => `// ---- ${file} ----\n${fs.readFileSync(file, 'utf8')}` + (file === 'service-detail-data.jsx' ? `\nif (MUNA_UZ) Object.entries(${JSON.stringify(serviceCopy)}).forEach(([key,value]) => {if(SERVICE_PAGES[key]) Object.assign(SERVICE_PAGES[key],value)});` : ''))
    .join('\n\n');
  const result = await esbuild.transform(source, {
    loader: 'jsx',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es2018',
    format: 'iife',
    banner: '// @ts-nocheck',
  });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const catalog = require(path.join(localeDir, 'uz.json'));
  const localized = result.code.replace(/"(?:[^"\\]|\\.)*"/g, token => {
    let value; try { value=JSON.parse(token.replace(/\\x([a-f0-9]{2})/gi, '\\u00$1')); } catch { return token; }
    if (!Object.hasOwn(catalog,value)) return token;
    const uz=value.match(/^\s*/)[0]+catalog[value].trim()+value.match(/\s*$/)[0];
    return `munaText(${token},${JSON.stringify(uz)})`;
  });
  fs.writeFileSync(out, localized.trimEnd() + '\n');
  console.log(`built ${out} from ${inputs.join(', ')}`);
}

async function buildAll() {
  for (const build of builds) await buildOne(build);
  // Immutable assets need a new URL whenever their bytes change.
  const crypto = require('crypto');
  for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
    const html = fs.readFileSync(file, 'utf8');
    const styleVersion = crypto.createHash('sha256').update(fs.readFileSync('assets/layout-fixes.css')).digest('hex').slice(0, 16);
    let updated = html.replace(/<link rel="stylesheet" href="\/assets\/layout-fixes\.css[^\"]*"\s*\/?>\n?/g, '');
    if (updated.includes('assets/bundles/')) {
      updated = updated.replace('</head>', `<link rel="stylesheet" href="/assets/layout-fixes.css?v=${styleVersion}" />\n</head>`);
      // Remove inherited page-level clipping; decorative section masks stay intact.
      updated = updated.replace(/(body\s*\{[^}]*?)overflow-x:\s*hidden;?/g, '$1');
      updated = updated.replace(/(text-rendering: optimizeLegibility;\n)[ \t]*\n/g, '$1');
    }
    updated = updated.replace(/(assets\/bundles\/[a-z-]+\.bundle\.js)(?:\?[^"']*)?/g, (_, asset) => {
      const version = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex').slice(0, 16);
      return `${asset}?v=${version}`;
    });
    if (updated !== html) fs.writeFileSync(file, updated);
  }
}

module.exports = { builds, buildAll };
if (require.main === module) buildAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
