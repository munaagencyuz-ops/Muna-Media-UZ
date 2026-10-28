"""Read-only loopback staging checks. Never sends POST or contacts production."""
import argparse,json,urllib.request,urllib.error
from pathlib import Path
from urllib.parse import urlsplit
p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--out',required=True);a=p.parse_args()
assert urlsplit(a.base).hostname in {'localhost','127.0.0.1'}
root=Path(__file__).resolve().parents[1];out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
checks=[]
def check(path,status,contains=None,location=None):
 try:r=opener.open(a.base+path,timeout=20)
 except urllib.error.HTTPError as e:r=e
 body=r.read().decode('utf8',errors='replace');row={'path':path,'status':r.status,'expected':status,'location':r.headers.get('location'),'ok':r.status==status}
 if contains:row['ok'] &= contains in body
 if location:row['ok'] &= r.headers.get('location')==location
 checks.append(row)
manifest=json.loads((root/'.build/route-manifest.json').read_text())
for path in manifest['routes']:check(path,200)
for path in manifest['originalPaths']:
 alias='/index.html' if path=='/' else path+'.html';check(alias,301,location='https://munamedia.uz'+path)
for path in ['/sections.jsx','/nav.jsx','/package.json','/package-lock.json','/.env','/.dev.vars','/studio/sanity.config.js','/functions/api/contact.js','/server/contact-handler.mjs','/locales/uz.json','/locales/city-roster.json','/scripts/stage-public.cjs','/_worker.js','/_worker.js/index','/_routes.json','/%5froutes.json','/_headers','/_redirects','/no-such-page-implementation','/no-such-directory/deep','/blog/not-published','/shaharlar/not-in-manifest']:
 check(path,404)
check('/cms',308,location='/cms/')
for path in ['/cms/','/cms/deep-route']:
 check(path,200,contains='sanity')
check('/api/contact',200,contains='Use POST')
summary={'checks':len(checks),'passed':sum(x['ok'] for x in checks),'posts':0,'external_requests':0,'failures':[x for x in checks if not x['ok']]}
(out/'checks.json').write_text(json.dumps(checks,indent=2));(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2));assert not summary['failures']
