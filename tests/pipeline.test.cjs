const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
test('all-eight build propagates shared nav, versions every HTML reference and is deterministic',()=>{
  const {builds}=require('../scripts/build-bundles.cjs');
  assert.equal(builds.length,8);
  fs.mkdirSync(path.join(root,'.build'),{recursive:true});
  const tmp=fs.mkdtempSync(path.join(root,'.build/bundle-test-'));
  try{
    for(const file of new Set(builds.flatMap(b=>b.inputs)))fs.copyFileSync(path.join(root,file),path.join(tmp,file));
    fs.mkdirSync(path.join(tmp,'assets'),{recursive:true});
    fs.copyFileSync(path.join(root,'assets/layout-fixes.css'),path.join(tmp,'assets/layout-fixes.css'));
    const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
    for(const f of pages)fs.copyFileSync(path.join(root,f),path.join(tmp,f));
    const build=()=>execFileSync(process.execPath,[path.join(root,'scripts/build-bundles.cjs')],{cwd:tmp,stdio:'pipe'});
    build();const before=builds.map(b=>hash(path.join(tmp,b.out)));
    fs.appendFileSync(path.join(tmp,'nav.jsx'),'\nwindow.__SYNTHETIC_NAV_PROPAGATION = true;\n');
    build();const after=builds.map(b=>hash(path.join(tmp,b.out)));
    assert.ok(after.every((h,i)=>h!==before[i]));
    for(const file of pages){
      const html=fs.readFileSync(path.join(tmp,file),'utf8');
      for(const [,asset,version] of html.matchAll(/(assets\/bundles\/[a-z-]+\.bundle\.js)\?v=([a-f0-9]{16})/g))assert.equal(version,hash(path.join(tmp,asset)).slice(0,16));
      for(const [,asset] of html.matchAll(/(assets\/bundles\/[a-z-]+\.bundle\.js)/g))assert.ok(html.includes(asset+'?v='+hash(path.join(tmp,asset)).slice(0,16)),file);
    }
    const firstHtml=pages.map(f=>hash(path.join(tmp,f)));
    build();assert.deepEqual(builds.map(b=>hash(path.join(tmp,b.out))),after);
    assert.deepEqual(pages.map(f=>hash(path.join(tmp,f))),firstHtml);
  }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
