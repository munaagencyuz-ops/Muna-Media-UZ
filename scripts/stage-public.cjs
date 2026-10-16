// Explicit static allowlist + Wrangler-compiled Functions only. No root upload.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const build = path.join(root, '.build');
const files = require('./public-files.json');
const forbidden = /(^|\/)(node_modules|studio|functions|scripts|tests|\.git|\.env[^/]*|\.dev\.vars)(\/|$)|\.(jsx|ts|map)$|(^|\/)package[^/]*\.json$/;
if (new Set(files).size !== files.length) throw new Error('Duplicate public allowlist entry');
for (const file of files) {
  if (file.includes('..') || path.isAbsolute(file) || forbidden.test(file)) throw new Error(`Forbidden public file: ${file}`);
  if (!fs.lstatSync(path.join(root, file)).isFile()) throw new Error(`Not a regular public file: ${file}`);
}
fs.rmSync(dist, {recursive:true, force:true});
fs.mkdirSync(dist, {recursive:true});
fs.mkdirSync(path.join(build, 'functions'), {recursive:true});
for (const file of files) {
  fs.mkdirSync(path.dirname(path.join(dist, file)), {recursive:true});
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
execFileSync(path.join(root, 'node_modules/.bin/wrangler'), [
  'pages', 'functions', 'build', 'functions',
  '--outdir', path.join(build, 'functions'),
  '--output-routes-path', path.join(dist, '_routes.json'),
  '--compatibility-date=2025-01-01',
], {cwd:root, stdio:'inherit'});
fs.copyFileSync(path.join(build, 'functions/index.js'), path.join(dist, '_worker.js'));
const manifest = [...files, '_worker.js', '_routes.json'].sort().map(file => ({
  file,
  bytes: fs.statSync(path.join(dist, file)).size,
  sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(dist, file))).digest('hex'),
}));
fs.writeFileSync(path.join(build, 'public-manifest.json'), JSON.stringify(manifest, null, 2)+'\n');
console.log(`Staged ${manifest.length} allowlisted files (including compiled Functions); manifest: .build/public-manifest.json`);
