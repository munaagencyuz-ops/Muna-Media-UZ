"""Local-only browser acceptance. Never contacts production or submits to a real sender."""
import argparse,json,sys,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--out',required=True);p.add_argument('--baseline',action='store_true');p.add_argument('--forms',action='store_true');args=p.parse_args()
assert urlsplit(args.base).hostname in {'localhost','127.0.0.1'},'loopback only'
ROOT=Path(__file__).resolve().parents[1];OUT=Path(args.out);OUT.mkdir(parents=True,exist_ok=True)
paths=[urlsplit(str(n.text)).path for n in ET.fromstring((ROOT/'dist/sitemap.xml').read_bytes()).iter() if n.tag.endswith('loc')]
manifest=json.loads((ROOT/'.build/route-manifest.json').read_text());assert len(manifest['originalPaths'])==22
assert len(paths)==len(set(paths))==len(manifest['routes'])
rows=[];forms=[];blocked=[];failures=[]
EVAL='''() => ({title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:[...document.querySelectorAll('h1')].map(x=>x.innerText),canonical:[...document.querySelectorAll('link[rel="canonical"]')].map(x=>x.href),viewport:innerWidth,client:document.documentElement.clientWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,text:document.body.innerText,sections:[...document.querySelectorAll('section')].map(x=>({id:x.id,h:x.getBoundingClientRect().height,display:getComputedStyle(x).display})),headings:[...document.querySelectorAll('h1,h2,h3')].map(x=>x.innerText),links:[...document.querySelectorAll('a[href]')].map(x=>({href:x.getAttribute('href'),text:x.innerText})),fields:[...document.querySelectorAll('form input,form textarea,form select')].map(x=>({tag:x.tagName,id:x.id,name:x.name,label:x.labels?.[0]?.textContent,autocomplete:x.autocomplete,required:x.required,placeholder:x.placeholder})),jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),offenders:[...document.querySelectorAll('section h1,section h2,section h3,section p,section a,section input,section select,section textarea,section .card')].filter(x=>{const r=x.getBoundingClientRect();return r.width && (r.left < -1 || r.right>document.documentElement.clientWidth+1)}).map(x=>({tag:x.tagName,cls:x.className,text:x.textContent.slice(0,160),left:x.getBoundingClientRect().left,right:x.getBoundingClientRect().right,width:x.getBoundingClientRect().width,html:x.outerHTML.slice(0,800)}))})'''
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 ctx=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
 def guard(route):
  r=route.request;u=urlsplit(r.url)
  if r.method not in {'GET','HEAD'} or any(d in r.url for d in ['mc.yandex','metrika','google-analytics','googletagmanager']):
   blocked.append({'url':r.url,'method':r.method});route.abort()
  elif u.hostname in {'127.0.0.1','localhost','fonts.googleapis.com','fonts.gstatic.com'}:route.continue_()
  else:blocked.append({'url':r.url,'method':r.method});route.abort()
 ctx.route('**/*',guard)
 for width in [360,390,430,1440]:
  for route_path in paths:
   page=ctx.new_page();page.set_viewport_size({'width':width,'height':1000 if width==1440 else 844});errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   slug=route_path.strip('/').replace('/','_') or 'home'
   try:
    response=page.goto(args.base+route_path,wait_until='domcontentloaded',timeout=30000)
    page.wait_for_timeout(250)
    page.evaluate('document.fonts.ready')
    d=page.evaluate(EVAL);d.update(path=route_path,width=width,status=response.status,errors=list(errors))
    for field in ['document','body','viewport']:
     if d[field]>width+1:failures.append(f'{route_path}@{width} {field}={d[field]}')
    if response.status!=200 or errors or len(d['h1'])!=1:failures.append(f'{route_path}@{width} status/errors/H1')
    for x in d['fields']:
     if not all(x.get(k) for k in ['id','name','label','autocomplete']):failures.append(f'{route_path}@{width} field semantics: {x}')
    if any(x['href']=='#' for x in d['links']):failures.append(f'{route_path}@{width} placeholder CTA')
    if width==390:
     (OUT/(slug+'.rendered.html')).write_text(page.content())
    if route_path in ['/','/about','/services-uzbekistan','/influencer-marketing','/koronapay','/blog'] and width in [390,1440]:
     page.screenshot(path=str(OUT/f'{slug}-{width}.png'),full_page=True,animations='disabled')
    rows.append(d)
    with (OUT/'census.jsonl').open('a') as f:f.write(json.dumps(d,ensure_ascii=False)+'\n')
   except Exception as e:failures.append(f'{route_path}@{width}: {e}');rows.append({'path':route_path,'width':width,'error':str(e)})
   finally:page.close()
 if args.forms:
  for route_path in ['/','/about','/influence','/services-uzbekistan','/ru/','/ru/about','/ru/influence','/ru/services-uzbekistan']:
   for success in [False,True]:
    page=ctx.new_page();captured=[]
    def fake_contact(route):
     req=route.request
     if req.method=='GET':
      route.fulfill(status=200,content_type='application/json',body=json.dumps({'available':True}));return
     assert req.method=='POST'
     assert req.header_value('Idempotency-Key')
     captured.append(req.post_data_json)
     route.fulfill(status=200 if success else 502,content_type='application/json',body=json.dumps({'ok':success,'stored':success,'delivered':{'telegram':success,'email':success},'receipt':'lead.00000000-0000-4000-8000-000000000000',**({} if success else {'code':'DELIVERY_PARTIAL'})}))
    page.route('**/api/contact',fake_contact)
    page.goto(args.base+route_path,wait_until='domcontentloaded');page.wait_for_selector('form')
    expected={'name':'SYNTHETIC QA','company':'SYNTHETIC ONLY','phone':'+998000000000','email':'synthetic@example.invalid','task':'SYNTHETIC NO DELIVERY','page':route_path}
    form=page.locator('form')
    if not success:
     # Prove label activation, not just the presence of matching strings.
     for field in form.locator('input,textarea,select').all():
      ident=field.get_attribute('id');assert ident
      page.locator(f'label[for="{ident}"]').click()
      assert field.evaluate('(x)=>document.activeElement===x'),(route_path,ident)
    for key in ['name','company','phone','email']:form.locator(f'[name="{key}"]').fill(expected[key])
    task=form.locator('[name="task"]')
    if task.evaluate('(x)=>x.tagName')=='SELECT':
     expected['task']=task.locator('option').nth(1).get_attribute('value');task.select_option(expected['task'])
    else:task.fill(expected['task'])
    form.locator('button[type="submit"]').click();page.wait_for_timeout(150)
    assert captured==[expected],(route_path,captured,expected)
    if success:assert page.locator('form').count()==0
    else:
     assert page.locator('form').count()==1
     assert form.locator('[name="name"]').input_value()==expected['name']
     assert page.get_by_text('Ariza ikkala kanalga ham yuborilmadi.',exact=False).is_visible() if not route_path.startswith('/ru') else page.get_by_text('Заявка отправлена не в оба канала.',exact=False).is_visible()
    forms.append({'path':route_path,'success_fixture':success,'payload':captured[0],'outbound':False});page.close()
 browser.close()
(OUT/'census.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));(OUT/'forms.json').write_text(json.dumps(forms,ensure_ascii=False,indent=2));(OUT/'blocked.json').write_text(json.dumps(blocked,ensure_ascii=False,indent=2))
summary={'routes':len(paths),'viewports':[360,390,430,1440],'attempts':len(rows),'expected_attempts':len(paths)*4,'failures':failures,'synthetic_form_scenarios':len(forms),'production_posts':0}
(OUT/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
print(json.dumps({**summary,'failures':failures[:20]},ensure_ascii=False,indent=2))
assert len(rows)==len(paths)*4
if not args.baseline:assert not failures,f'{len(failures)} failed assertions; see summary.json'
