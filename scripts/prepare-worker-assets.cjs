// Keep deployment-control/source files out of the static asset upload.
const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve(__dirname, '../dist');
if (!fs.existsSync(path.join(output, '_worker.js'))) throw new Error('Build dist before preparing Worker assets');
const assets = path.resolve(__dirname, '../.build/worker-assets');
fs.rmSync(assets, { recursive: true, force: true });
const controls = new Set(['_worker.js', '_routes.json', '_headers', '_redirects', '.assetsignore', 'cms']);
fs.cpSync(output, assets, { recursive: true, filter: (source) => {
  const relative = path.relative(output, source);
  return !controls.has(relative.split(path.sep)[0]) && !relative.endsWith('.map');
}});
console.log('Prepared isolated marketing Worker assets; CMS and Pages control files excluded.');
