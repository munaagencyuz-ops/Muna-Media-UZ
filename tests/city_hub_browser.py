"""Loopback-only city hub acceptance. No live POSTs, providers, credentials or deployment.
Run after npm run build. Owns and stops ephemeral static servers in finally.
"""
import argparse,functools,http.server,json,re,threading
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser()
p.add_argument('--out',type=Path,default=ROOT.parent/'media-city-hub-evidence')
p.add_argument('--baseline',type=Path)
a=p.parse_args();a.out.mkdir(parents=True,exist_ok=True)
checks=[];network={'blocked_external':set(),'blocked_posts':0,'server_posts':0};servers=[]
class Static(http.server.SimpleHTTPRequestHandler):
 def log_message(self,format,*args):pass
 def do_GET(self):
  url=urlsplit(self.path)
  if '.' not in Path(url.path).name and not url.path.endswith('/'):
   self.path=url.path+'.html'+('?' + url.query if url.query else '')
  super().do_GET()
 def do_POST(self):
  network['server_posts']+=1;self.send_error(405)
def serve(directory):
 server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Static,directory=str(directory)))
 threading.Thread(target=server.serve_forever,daemon=True).start();servers.append(server)
 return f'http://127.0.0.1:{server.server_port}'
def guard(route):
 req=route.request;u=urlsplit(req.url)
 if req.method not in ['GET','HEAD']:
  network['blocked_posts']+=1;route.abort();return
 if u.hostname in ['127.0.0.1','localhost','fonts.googleapis.com','fonts.gstatic.com']:
  route.continue_()
 else:
  network['blocked_external'].add(u.hostname);route.abort()
def check(kind,**kwargs):
 checks.append({'kind':kind,**kwargs})
 (a.out/'browser-checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
def clean_text(page):
 return page.locator('body').inner_text()
def overflow(page):
 return page.evaluate('''() => ({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(x=>x.getBoundingClientRect().width && (x.getBoundingClientRect().right>innerWidth+1||x.getBoundingClientRect().left < -1)).map(x=>({tag:x.tagName,class:x.className,width:x.getBoundingClientRect().width})).filter(x=>x.class!=='hub-skip').slice(0,20)})''')
def screenshot(page,name,full=False):
 page.screenshot(path=str(a.out/name),full_page=full)
def count(page,n):
 expect(page.locator('.city-entry:not([hidden])')).to_have_count(n)
 numbers=[int(x) for x in re.findall(r'\d+',page.locator('#city-count').inner_text())]
 assert numbers==[n,120],numbers
base=serve(ROOT/'dist')
try:
 with sync_playwright() as pw:
  system=Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
  browser=pw.chromium.launch(headless=True,**({'executable_path':str(system)} if system.exists() else {}))
  if a.baseline:
   before=serve(a.baseline)
   ctx=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');ctx.route('**/*',guard)
   page=ctx.new_page();page.goto(before+'/ru/shaharlar');page.evaluate('document.fonts.ready');
   text=clean_text(page)
   assert 'SOATO' in text and 'viloyati' in text and 'null' in text
   assert page.locator('[data-soato]').count()==120 and page.locator('[data-guide]').count()==14
   screenshot(page,'before-ru-1440.png')
   page.set_viewport_size({'width':390,'height':844});screenshot(page,'before-ru-390.png')
   check('baseline_semantics',visible_codes=True,untranslated_regions=True,null_parent=True,cities=120,guides=14)
   ctx.close()
  manifest=json.loads((ROOT/'.build/route-manifest.json').read_text())
  for ru in [False,True]:
   locale='ru' if ru else 'uz';prefix='/ru' if ru else '';hub=prefix+'/shaharlar'
   ctx=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');ctx.route('**/*',guard)
   page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(base+hub);page.evaluate('document.fonts.ready');expect(page.locator('.hub-filter')).to_be_visible()
   text=clean_text(page)
   assert not re.search(r'SOATO|классификатор|klassifikator|\bnull\b|\bundefined\b',text,re.I)
   if ru:assert not re.search('viloyati|tumani|Respublikasi|shahri',text)
   else:assert not re.search('[А-Яа-яЁё‘’ʻʼ`]',text)
   assert page.locator('h1').count()==1
   assert page.locator('html').get_attribute('lang')==locale
   assert page.locator('link[rel="canonical"]').get_attribute('href')=='https://munamedia.uz'+hub
   assert page.locator('link[rel="alternate"][hreflang]').count()==3
   expect(page.locator('.hub-languages a[aria-current]')).to_have_text(locale.upper())
   assert page.locator('.hub-languages a:not([aria-current])').get_attribute('href')==('/shaharlar' if ru else '/ru/shaharlar')
   assert page.locator('[data-soato]').count()==120
   assert len(set(page.locator('[data-soato]').evaluate_all('(xs)=>xs.map(x=>x.dataset.soato)')))==120
   assert page.locator('[data-guide]').count()==14
   assert set(page.locator('[data-guide]').evaluate_all('(xs)=>xs.map(x=>x.getAttribute("href"))'))=={hub+'/'+x['slug'] for x in manifest['cities']}
   for image in page.locator('.hub-brand img').all():assert image.evaluate('(x)=>x.complete&&x.naturalWidth>0')
   expect(page.locator('a[href="tel:+998901381313"]')).to_have_text('+998 90 138 13 13')
   check('semantics_metadata_logo_contacts',locale=locale)
   # Every hub anchor has a real route target; every hub-local fragment exists.
   hrefs=set(page.locator('a[href]').evaluate_all('(xs)=>xs.map(x=>x.getAttribute("href"))'))
   for href in hrefs:
    if href.startswith(('tel:','mailto:')):continue
    if href.startswith('#'):assert page.locator(href).count()==1;continue
    u=urlsplit(href);assert u.path in manifest['routes'],href
    response=ctx.request.get(base+href);assert response.status==200,(href,response.status)
   check('internal_link_http_targets',locale=locale,links=len(hrefs))
   for width,height in [(320,844),(390,844),(768,1024),(1440,1000)]:
    page.set_viewport_size({'width':width,'height':height});page.evaluate('window.scrollTo(0,0)')
    ov=overflow(page);assert ov['document']<=width and ov['body']<=width,ov
    # Actual touch target sizes, not just authored CSS.
    controls=page.locator('.hub-filter input,.hub-filter select,.hub-filter button,.hub-languages a,.hub-header nav a').evaluate_all('(xs)=>xs.map(x=>({tag:x.tagName,h:x.getBoundingClientRect().height,w:x.getBoundingClientRect().width}))')
    assert all(x['h']>=44 for x in controls),controls
    screenshot(page,f'{locale}-{width}-top.png')
    screenshot(page,f'{locale}-{width}-full.png',True)
    check('viewport_geometry',locale=locale,**ov,controls=controls)
   page.set_viewport_size({'width':390,'height':844})
   # Native keyboard disclosure: Enter opens, Space closes, focus survives.
   disclosure=page.locator('.hub-region').nth(1);summary=disclosure.locator('summary')
   summary.focus();page.keyboard.press('Enter');assert disclosure.get_attribute('open') is not None
   assert page.evaluate('document.activeElement.tagName')=='SUMMARY'
   page.keyboard.press('Tab');assert page.evaluate('document.activeElement.closest(".city-entry")!==null')
   page.keyboard.press('Shift+Tab')
   page.keyboard.press('Space');assert disclosure.get_attribute('open') is None
   check('native_keyboard_disclosure',locale=locale)
   # Latin/Cyrillic aliases work in either locale, and matching groups open.
   for query in ['Chirchiq','Чирчик']:
    page.locator('#city-filter').fill(query);count(page,1)
    expect(page.locator('.city-entry:visible')).to_have_count(1)
    assert page.locator('.city-entry:visible').inner_text().strip() in ['Chirchiq\n↗','Чирчик\n↗']
   for query in ['Toshkent viloyati','Ташкентская область']:
    page.locator('#city-filter').fill(query);count(page,16)
   for query in ["Farg'ona",'Farg‘ona','Fargona','Ферганская область']:
    page.locator('#city-filter').fill(query);count(page,9)
   page.locator('#city-filter').fill('Chirchiq');page.locator('#region-filter').select_option('1727');count(page,1)
   screenshot(page,f'{locale}-390-search.png')
   page.locator('#region-filter').select_option('1703');count(page,0)
   expect(page.locator('#city-empty')).to_be_visible()
   page.locator('#city-reset').click();count(page,120)
   assert page.locator('#city-filter').input_value()=='' and page.locator('#region-filter').input_value()==''
   expect(page.locator('#city-filter')).to_be_focused();expect(page.locator('#city-empty')).to_be_hidden()
   page.locator('#city-filter').fill('<img src=x onerror=alert(1)>');count(page,0)
   assert page.locator('#city-empty img').count()==0
   page.locator('#city-filter').fill('xyz-no-city-987');count(page,0)
   screenshot(page,f'{locale}-390-empty.png')
   page.locator('#city-filter').fill('Chirchiq');count(page,1)
   check('search_alias_region_reset_empty_injection_recovery',locale=locale)
   # Follow an actual directory link into the untouched homepage form; never submit.
   link=page.locator('.city-entry:visible a').get_attribute('href')
   assert link.startswith(prefix+'/?soato=') and link.endswith('#contact')
   page.locator('.city-entry:visible a').click();page.wait_for_url(base+link)
   expect(page.locator('form [name="task"]')).to_be_visible()
   value=page.locator('form [name="task"]').input_value()
   assert 'SOATO' in value and ('Chirchiq' in value or 'Чирчик' in value),value
   screenshot(page,f'{locale}-390-form-prefill.png')
   check('actual_city_link_form_prefill_no_submission',locale=locale,href=link,task=value)
   assert not errors,errors
   ctx.close()
   # All functional city links are reachable with scripts disabled.
   nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844});nojs.route('**/*',guard)
   page=nojs.new_page();page.goto(base+hub)
   expect(page.locator('.hub-filter')).to_be_hidden()
   for group in page.locator('.hub-region').all():
    if group.get_attribute('open') is None:group.locator('summary').click()
   expect(page.locator('.city-entry:visible')).to_have_count(120)
   expect(page.locator('[data-guide]:visible')).to_have_count(14)
   assert page.locator('.hub-cta a').get_attribute('href')==prefix+'/#contact'
   expect(page.locator('a[href="mailto:info@munamedia.me"]')).to_be_visible()
   page.locator('#choose-city').scroll_into_view_if_needed()
   screenshot(page,f'{locale}-390-nojs-directory.png')
   check('nojs_all_disclosures_cities_guides_cta_contacts',locale=locale,cities=120,guides=14)
   nojs.close()
   # Script failure also leaves usable native directory; no dead search controls.
   broken=browser.new_context(viewport={'width':390,'height':844});broken.route('**/*',guard)
   broken.route('**/assets/city-hub.*.js',lambda r:r.abort())
   page=broken.new_page();page.goto(base+hub);expect(page.locator('.hub-filter')).to_be_hidden()
   page.locator('.hub-region').nth(1).locator('summary').click()
   assert page.locator('.city-entry:visible').count()>1
   check('script_load_failure_progressive_access',locale=locale);broken.close()
  browser.close()
 assert network['server_posts']==0 and network['blocked_posts']==0,network
 summary={'checks_passed':len(checks),'live_posts':0,'attempted_posts':network['blocked_posts'],'server_posts':network['server_posts'],'blocked_external_hosts':sorted(network['blocked_external']),'static_servers_stopped':True}
 (a.out/'browser-summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2))
finally:
 for server in servers:server.shutdown();server.server_close()
