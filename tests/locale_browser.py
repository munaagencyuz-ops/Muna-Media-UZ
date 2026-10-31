"""Additional loopback UX assertions; all submission responses are intercepted fixtures."""
import argparse,json,re
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--base',required=True);p.add_argument('--out',required=True);a=p.parse_args();assert urlsplit(a.base).hostname in {'localhost','127.0.0.1'}
root=Path(__file__).resolve().parents[1];out=Path(a.out);out.mkdir(parents=True,exist_ok=True);manifest=json.loads((root/'.build/route-manifest.json').read_text());checks=[]
with sync_playwright() as p:
 b=p.chromium.launch()
 def guard(r):
  if r.request.method not in ['GET','HEAD']:r.abort();raise AssertionError('unmocked submission blocked')
  if urlsplit(r.request.url).hostname in ['127.0.0.1','localhost','fonts.googleapis.com','fonts.gstatic.com']:r.continue_()
  else:r.abort()
 ctx=b.new_context(viewport={'width':390,'height':844});ctx.route('**/*',guard)
 page=ctx.new_page()
 # Every non-historical Uzbek journey has rendered Uzbek copy, including all service details.
 for path in [x for x in manifest['originalPaths'] if x not in ['/cases','/xiaomi','/unionpay','/koronapay']]:
  page.goto(a.base+path);page.wait_for_timeout(100);text=page.locator('body').inner_text().replace('Русский','');assert not re.search('[А-Яа-яЁё]',text),(path,[x for x in text.splitlines() if re.search('[А-Яа-яЁё]',x)])
  assert page.locator('html').get_attribute('lang')=='uz';checks.append({'kind':'visible_uzbek','path':path})
 page.goto(a.base+'/shaharlar');assert page.locator('[data-soato]').count()==120
 page.locator('#city-filter').fill('Chirchiq');assert page.locator('.city-entry:not([hidden])').count()>0
 visible=page.locator('.city-entry:visible');assert visible.count()<120
 target=visible.first.locator('a').get_attribute('href');page.goto(a.base+target);assert 'SOATO' in page.locator('[name="task"]').input_value();checks.append({'kind':'directory_filter_and_form_prefill','link':target})
 page.goto(a.base+'/shaharlar/toshkent');assert page.locator('a[lang="ru"]').get_attribute('href')=='/ru/shaharlar/toshkent'
 page.goto(a.base+'/ru/about');assert page.locator('[data-locale-switch]').first.get_attribute('href')=='/about';checks.append({'kind':'equivalent_language_switch'})
 # A 200 response without durable storage is NOT success in the actual shipped form code.
 for path in ['/','/about','/influence','/services-uzbekistan']:
  page=ctx.new_page();page.route('**/api/contact',lambda r:r.fulfill(status=200,content_type='application/json',body='{"ok":true,"stored":false}'))
  page.goto(a.base+path);form=page.locator('form')
  for k,v in {'name':'SYNTHETIC QA','company':'SYNTHETIC ONLY','phone':'+998000000000','email':'synthetic@example.invalid'}.items():form.locator('[name="'+k+'"]').fill(v)
  field=form.locator('[name="task"]')
  if field.evaluate('(x)=>x.tagName')=='SELECT':field.select_option(field.locator('option').nth(1).get_attribute('value'))
  else:field.fill('SYNTHETIC NO DELIVERY')
  form.locator('button[type="submit"]').click();page.wait_for_timeout(100);assert page.locator('form').count()==1;assert page.get_by_text("Arizani yuborib bo'lmadi. Keyinroq qayta urinib ko'ring.").is_visible();checks.append({'kind':'missing_durable_receipt_denied','path':path});page.close()
 # Without scripts, useful copy and an email fallback remain; no form can leak a GET query.
 nojs=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});nojs.route('**/*',guard)
 for path in ['/','/about','/services-uzbekistan']:
  page=nojs.new_page();page.goto(a.base+path);assert page.locator('h1').count()==1;assert page.locator('a[href="mailto:info@munamedia.me"]').is_visible();assert page.locator('form').count()==0;checks.append({'kind':'nojs_email_fallback','path':path});page.close()
 page=ctx.new_page();page.goto(a.base+'/');page.screenshot(path=str(out/'home-mobile.png'),full_page=False)
 page.goto(a.base+'/shaharlar/toshkent');page.screenshot(path=str(out/'city-mobile.png'),full_page=True)
 page.goto(a.base+'/shaharlar');page.locator('#city-filter').fill('Chirchiq');page.screenshot(path=str(out/'directory-filter-mobile.png'),full_page=False)
 b.close()
summary={'checks':len(checks),'passed':len(checks),'live_posts':0,'mocked_missing_receipt_submissions':4};(out/'checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2));(out/'summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2))
