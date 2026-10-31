"""Shipped UI -> real contact handler -> real DO logic, with offline provider/storage doubles.
No production HTTP, credential reads, paid scans, or public diagnostic routes.
Run after npm run build: python3 tests/lead_browser_acceptance.py
"""
import functools,http.server,json,subprocess,threading
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
class Static(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  url=urlsplit(self.path)
  if '.' not in Path(url.path).name and not url.path.endswith('/'):
   self.path=url.path+'.html'+('?' + url.query if url.query else '')
  super().do_GET()
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Static,directory=str(ROOT/'dist')))
thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
backend=subprocess.Popen(['node',str(ROOT/'tests/lead-browser-backend.cjs')],stdin=subprocess.PIPE,stdout=subprocess.PIPE,text=True,cwd=ROOT)
base=f'http://127.0.0.1:{server.server_port}'
rows=[];blocked=[]
def call(data):
 backend.stdin.write(json.dumps(data)+'\n');backend.stdin.flush()
 result=json.loads(backend.stdout.readline());assert not result.get('bridgeError');return result
try:
 with sync_playwright() as p:
  system_chrome=Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
  browser=p.chromium.launch(headless=True,**({'executable_path':str(system_chrome)} if system_chrome.exists() else {}))
  routes=['/','/about','/influence','/services-uzbekistan','/ru/','/ru/about','/ru/influence','/ru/services-uzbekistan']
  for route_path in routes:
   for scenario in ['success','partial','unknown','unavailable','network']:
    ctx=browser.new_context(viewport={'width':390,'height':844})
    page=ctx.new_page();requests=[];mode=[scenario];errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    def guard(route):
     req=route.request;u=urlsplit(req.url)
     if u.hostname not in {'127.0.0.1','localhost'}:blocked.append(u.hostname);route.abort();return
     if u.path!='/api/contact':route.continue_();return
     data={'method':req.method,'mode':mode[0]}
     if req.method=='POST':
      data.update(body=req.post_data_json,nonce=req.header_value('Idempotency-Key'))
      if mode[0]=='network':requests.append({'nonce':data['nonce'],'body':data['body'],'network':True});route.abort();return
     result=call(data)
     if req.method=='POST':requests.append({**result,'nonce':data['nonce'],'payload':data['body']})
     route.fulfill(status=result['status'],content_type='application/json',body=json.dumps(result['body']))
    ctx.route('**/*',guard)
    page.goto(base+route_path,wait_until='domcontentloaded');form=page.locator('form');expect(form).to_be_visible()
    expect(form.locator('[role="status"]')).to_contain_text('недоступна' if scenario=='unavailable' and route_path.startswith('/ru') else 'ishlamayapti' if scenario=='unavailable' else 'настроена' if route_path.startswith('/ru') else 'sozlangan')
    values={'name':'SYNTHETIC QA','company':'SYNTHETIC ONLY','phone':'+998000000000','email':'synthetic@example.invalid','task':'SYNTHETIC NO DELIVERY'}
    for key in ['name','company','phone','email']:form.locator(f'[name="{key}"]').fill(values[key])
    task=form.locator('[name="task"]')
    if task.evaluate('(x)=>x.tagName')=='SELECT':values['task']=task.locator('option').nth(1).get_attribute('value');task.select_option(values['task'])
    else:task.fill(values['task'])
    def submit():
     n=len(requests);form.locator('button[type="submit"]').click()
     for _ in range(100):
      if len(requests)>n:break
      page.wait_for_timeout(20)
     assert len(requests)==n+1
     page.wait_for_timeout(100)
    submit()
    if scenario=='success':
     expect(form).to_have_count(0);assert requests[0]['body']['delivered']=={'telegram':True,'email':True}
    else:
     expect(form).to_be_visible();expect(form.locator('[name="name"]')).to_have_value(values['name']);expect(form.locator('button[type="submit"]')).to_be_enabled()
     if scenario!='network':assert requests[0]['body']['ok'] is False and requests[0]['body']['stored'] is False
     mode[0]='success';submit();assert requests[0]['nonce']==requests[1]['nonce'];assert requests[0].get('payload',requests[0].get('body'))==requests[1]['payload']
     if scenario=='unknown':
      expect(form).to_be_visible();assert requests[1]['body']['code']=='DELIVERY_UNKNOWN';assert requests[1]['calls']==requests[0]['calls']
     else:
      expect(form).to_have_count(0);assert requests[1]['body']['delivered']=={'telegram':True,'email':True}
      if scenario=='partial':assert requests[1]['calls']['telegram']==requests[0]['calls']['telegram'] and requests[1]['calls']['email']==requests[0]['calls']['email']+1
    assert not errors,errors
    # The helper may retain nonce/payload only in RAM; neither browser store is used.
    assert page.evaluate('()=>localStorage.length===0 && sessionStorage.length===0')
    rows.append({'path':route_path,'scenario':scenario,'posts':len(requests),'stable_nonce':scenario!='success','production_calls':0});ctx.close()
  # Existing no-JS fallback has email contact and no active form controls.
  for route_path in routes:
   ctx=browser.new_context(java_script_enabled=False)
   ctx.route('**/*',lambda r:r.continue_() if urlsplit(r.request.url).hostname in {'127.0.0.1','localhost'} else r.abort())
   page=ctx.new_page();page.goto(base+route_path)
   assert page.locator('form').count()==0  # React-only form cannot submit without its handler.
   assert page.locator('a[href="mailto:info@munamedia.me"]').count()>0
   rows.append({'path':route_path,'scenario':'no-js','production_calls':0});ctx.close()
  browser.close()
 print(json.dumps({'scenarios':len(rows),'pass':len(rows),'production_calls':0,'external_browser_requests_blocked':len(blocked),'rows':rows},indent=2))
finally:
 backend.stdin.close();backend.wait(timeout=10);server.shutdown();server.server_close();thread.join(timeout=5)
