const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const builds = [
  {
    out: 'assets/bundles/index.bundle.js',
    inputs: ['nav.jsx', 'sections.jsx', 'app.jsx'],
  },
  {
    out: 'assets/bundles/about.bundle.js',
    inputs: ['nav.jsx', 'contact-helper.jsx', 'about-sections.jsx', 'about-app.jsx'],
  },
  {
    out: 'assets/bundles/influence.bundle.js',
    inputs: ['nav.jsx', 'contact-helper.jsx', 'influence-sections.jsx', 'influence-app.jsx'],
  },
  {
    out: 'assets/bundles/services.bundle.js',
    inputs: ['nav.jsx', 'contact-helper.jsx', 'services-uzbekistan-sections.jsx', 'services-uzbekistan-app.jsx'],
  },
];

async function buildOne({ out, inputs }) {
  const source = inputs
    .map((file) => `// ---- ${file} ----\n${fs.readFileSync(file, 'utf8')}`)
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
  fs.writeFileSync(out, result.code + '\n');
  console.log(`built ${out} from ${inputs.join(', ')}`);
}

(async () => {
  for (const build of builds) await buildOne(build);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
