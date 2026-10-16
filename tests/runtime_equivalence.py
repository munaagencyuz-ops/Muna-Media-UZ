"""Compare Pages file-based Functions and compiled advanced-mode staging locally."""
import argparse,concurrent.futures,hashlib,json,urllib.request,urllib.error,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--staged',required=True);p.add_argument('--out',required=True);a=p.parse_args()
assert all(urlsplit(u).hostname in {'localhost','127.0.0.1'} for u in [a.source,a.staged])
ROOT=Path(__file__).resolve().parents[1];OUT=Path(a.out);OUT.mkdir(parents=True,exist_ok=True)
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
def get(base,path,method='GET',data=None):
 req=urllib.request.Request(base+path,data=data,method=method,headers={'content-type':'application/json'} if data else {})
 try:r=opener.open(req,timeout=30)
 except urllib.error.HTTPError as e:r=e
 body=r.read();headers={k.lower():v.replace(base,'http://LOCAL') for k,v in r.headers.items() if k.lower() in {'content-type','cache-control','x-frame-options','x-content-type-options','referrer-policy','permissions-policy','location'}}
 return {'status':r.status,'headers':headers,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body)}
paths=[urlsplit(str(n.text)).path for n in ET.fromstring((ROOT/'sitemap.xml').read_bytes()).iter() if n.tag.endswith('loc')]
targets=set(paths)
for x in paths:
 targets.add((x or '/')+'.html' if x!='/' else '/index.html')
 targets.add(x+'/' if x!='/' else '/')
targets.update('/'+p for p in json.loads((ROOT/'scripts/public-files.json').read_text()) if not p.endswith('.html'))
targets.update(['/cms/','/cms/index.html','/api/contact','/blog/not-published','/blog/one/two','/no-such-page-implementation','/no-such-directory/deep'])
def pair(route):
 src=get(a.source,route);stage=get(a.staged,route)
 equal=src==stage
 return {'path':route,'source':src,'staged':stage,'equal':equal}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:rows=list(pool.map(pair,sorted(targets)))
failures=[r['path'] for r in rows if not r['equal']]
for r in rows:
 if r['path'] in ['/no-such-page-implementation','/no-such-directory/deep','/blog/not-published'] and r['staged']['status']!=404:failures.append(r['path']+' expected404')
leaks=[]
for route in ['/sections.jsx','/nav.jsx','/package.json','/package-lock.json','/.env','/.dev.vars','/studio/sanity.config.js','/functions/api/contact.js','/scripts/stage-public.cjs','/_worker.js','/_worker.js/index','/_routes.json','/%5froutes.json']:
 d=get(a.staged,route);leaks.append({'path':route,**d});
 if d['status']!=404:failures.append(route+' source leak')
# Synthetic invalid payload exercises validation but cannot reach either sender.
post=[]
for base in [a.source,a.staged]:post.append(get(base,'/api/contact','POST',b'{}'))
assert post[0]==post[1] and post[0]['status']==400
(OUT/'routes.json').write_text(json.dumps(rows,indent=2));(OUT/'leak-probes.json').write_text(json.dumps(leaks,indent=2));(OUT/'invalid-synthetic-post.json').write_text(json.dumps(post,indent=2))
summary={'compared_targets':len(rows),'equivalent':sum(r['equal'] for r in rows),'leak_probes':len(leaks),'invalid_local_synthetic_posts':len(post),'production_posts':0,'failures':failures}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2));assert not failures
