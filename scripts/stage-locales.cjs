const fs=require('node:fs'),path=require('node:path');
const cities=require('../locales/cities.cjs'),services=require('../locales/services-uz.cjs');
const catalog=require('../locales/uz.json');
const roster=require('../locales/city-roster.json');
const {createHash}=require('node:crypto');
const {renderHub}=require('./city-hub/render.cjs');
if(roster.cities.length!==120 || new Set(roster.cities.map(c=>c.soato_code)).size!==120)throw Error('City roster count mismatch');
const ORIGIN='https://munamedia.uz';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const pair=p=>`<link rel="alternate" hreflang="uz" href="${ORIGIN}${p}"><link rel="alternate" hreflang="ru" href="${ORIGIN}/ru${p==='/'?'/':p}"><link rel="alternate" hreflang="x-default" href="${ORIGIN}${p}">`;
const special={
 index:["Toshkentdagi reklama agentligi | Muna Media","O'zbekistondagi brendlar uchun reklama: tashqi reklama, SMM, Telegram, blogerlar va tadbirlar. Shahar, auditoriya va budjetga mos reja."],
 about:["Muna Media haqida | O'zbekistonda reklama","O'zbekistondagi brendlar uchun strategiya, reklama rejalashtirish, pudratchilar nazorati va hisobot. Muna Media ish tartibi va bog'lanish."],
 'services-uzbekistan':["O'zbekistonda reklama xizmatlari | Muna Media","Tashqi reklama, SMM, qidiruv reklamasi, SEO, Telegram, blogerlar va tadbirlar. Vazifa, shahar va budjetga mos xizmatni tanlang."],
 influence:["Blogerlar bilan reklama | Muna Media","O'zbekistondagi auditoriya uchun bloger tanlash, tekshiruv, brif, reklama xaridi va natija hisobi."],
 'influencer-marketing':["Blogerlar bilan reklama xizmatlari | Muna Media","Bloger auditoriyasi, til, hudud va obro'ni tekshirish. Nashrlar, shartnomalar va natijani hisoblash tartibi."],
 cases:["Reklama loyihalari arxivi | Muna Media","Xiaomi, UnionPay va KoronaPay tarixiy loyihalari. Arxiv natijalari yangi kampaniya uchun kafolat emas."],
 xiaomi:["Xiaomi loyihasi arxivi | Muna Media","Xiaomi bilan ishlash tarixiy loyihasi. Asl matn va loyiha raqamlari rus tilida saqlangan."],
 unionpay:["UnionPay loyihasi arxivi | Muna Media","UnionPay promo kampaniyasi arxivi. Asl matn va tarixiy raqamlar saqlangan, yangi natija va'da qilinmaydi."],
 koronapay:["KoronaPay loyihasi arxivi | Muna Media","KoronaPay tarixiy loyihasi. Asl materiallar rus tilida saqlangan. Natijalar yangi kampaniyaga kafolat emas."],
 blog:["Marketing va reklama blogi | Muna Media","O'zbekistonda reklamani rejalashtirish va boshqarish haqida maqolalar."]
};
function metadata(file,html){
 const key=file.replace('.html','');if(special[key])return special[key];
 const serviceKey=html.match(/window\.SERVICE_KEY\s*=\s*['"]([^'"]+)/)?.[1];
 const service=services[serviceKey];if(!service)throw Error('Missing locale metadata: '+file);
 return [service.title+" O'zbekistonda | Muna Media",service.intro];
}
function seo(html,p,uz,title,description){
 const canonical=ORIGIN+(uz?p:'/ru'+(p==='/'?'/':p));
 html=html.replace(/<html lang="[^"]+"/,'<html lang="'+(uz?'uz':'ru')+'"').replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`)
 .replace(/<meta name="description" content="[^"]*"\s*\/?>/,`<meta name="description" content="${esc(description)}">`)
 .replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="${canonical}">`)
 .replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*/,(_,x)=>x+esc(title))
 .replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*/,(_,x)=>x+esc(description))
 .replace(/(<meta property="og:url" content=")[^"]*/,(_,x)=>x+canonical);
 html=html.replace(/<script type="application\/ld\+json" data-static-seo>([\s\S]*?)<\/script>/,(_,raw)=>{
  const graph=JSON.parse(raw);for(const node of graph){if(['WebPage','Service','BreadcrumbList'].includes(node['@type'])){if(node.url)node.url=canonical;if(node['@type']==='WebPage'){node.name=title;node.description=description;node.inLanguage=uz?'uz':'ru';}if(node['@type']==='Service')node.name=title;if(node['@type']==='BreadcrumbList'){node.itemListElement[0].name=uz?'Bosh sahifa':'Главная';node.itemListElement[0].item=ORIGIN+(uz?'/':'/ru/');const last=node.itemListElement.at(-1);last.name=title;last.item=canonical;}}if(node['@type']==='WebSite')node.inLanguage=['uz','ru'];}
  return '<script type="application/ld+json" data-static-seo>'+JSON.stringify(graph).replaceAll('<','\\u003c')+'</script>';
 });
 return html.replace('</head>',pair(p)+'\n</head>');
}
module.exports=function generate(root,dist,files){
 const generated=[];const routes=[];
 const write=(f,s)=>{fs.mkdirSync(path.dirname(path.join(dist,f)),{recursive:true});fs.writeFileSync(path.join(dist,f),s);generated.push(f);};
 const pages=files.filter(f=>!f.includes('/')&&f.endsWith('.html')&&f!=='404.html');
 for(const file of pages){
  const p=file==='index.html'?'/':'/'+file.replace('.html','');routes.push(p,'/ru'+(p==='/'?'/':p));
  const raw=fs.readFileSync(path.join(root,file),'utf8').replaceAll('webvisor:true','webvisor:false').replace(/((?:src|href)=")assets\//g,'$1/assets/');
  const [title,description]=metadata(file,raw);
  const ruTitle=raw.match(/<title>([\s\S]*?)<\/title>/)[1],ruDescription=raw.match(/<meta name="description" content="([^"]*)"/)?.[1]||'';
  let uz=seo(raw,p,true,title,description),ru=seo(raw,p,false,ruTitle,ruDescription);
  // The original full React block hierarchy remains. This fallback is available before JS and without it.
  const fallback=`<main class="seo-fallback"><h1>${esc(title.replace(' | Muna Media',''))}</h1><p>${esc(description)}</p><nav aria-label="Asosiy bo'limlar"><a href="/services-uzbekistan">Xizmatlar</a><a href="/shaharlar">Shaharlar</a><a href="/cases">Loyihalar</a><a href="/about">Biz haqimizda</a><a href="mailto:info@munamedia.me">Email orqali yozish</a><a href="/ru${p==='/'?'/':p}" lang="ru">Русский</a></nav></main>`;
  uz=uz.replace(/<main class="seo-fallback"[\s\S]*?<\/main>/,fallback);
  if(file==='blog.html'){
   uz=uz.replace(/<meta http-equiv="refresh"[^>]*>/,'').replace(/<body>[\s\S]*?<\/body>/,'<body>'+fallback+'</body>');
   ru=ru.replace(/<meta http-equiv="refresh"[^>]*>/,'').replace(/<body>[\s\S]*?<\/body>/,'<body><main class="seo-fallback"><h1>Блог Muna Media</h1><p>Материалы о рекламе в Узбекистане.</p><a href="/">Главная</a></main></body>');
  }
  ru=ru.replace(/href="\/(?!assets\/|cms\/|api\/|favicon|site\.webmanifest|ru\/)([^"\s]*)"/g,(m,x)=>x.startsWith('/')?m:`href="/ru/${x}"`);
  // Canonical/alternate are absolute; assets stay shared and root-absolute.
  write(file,uz);write('ru/'+file,ru);
 }
 const template=fs.readFileSync(path.join(dist,'index.html'),'utf8');
 function cityPage(p,uz,title,desc,body){
  let html=seo(template.replace(/<link rel="alternate"[^>]*>/g,''),p,uz,title,desc);
  html=html.replace(/<div id="root">[\s\S]*?<\/main><\/div>/,`<div id="root">${body}</div>`)
   .replace(/<script src="\/assets\/(?:vendor|bundles)\/[^>]+><\/script>/g,'');
  const canonical=ORIGIN+(uz?p:'/ru'+p);
  const breadcrumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:uz?'Bosh sahifa':'Главная',item:ORIGIN+(uz?'/':'/ru/')},{'@type':'ListItem',position:2,name:uz?'Shaharlar':'Города',item:ORIGIN+(uz?'':'/ru')+'/shaharlar'},...(p==='/shaharlar'?[]:[{'@type':'ListItem',position:3,name:title.replace(' | Muna Media',''),item:canonical}])]};
  html=html.replace('</head>','<style>.city-nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding-bottom:24px;border-bottom:1.5px solid var(--ink)}.city-nav a{font-size:14px;text-decoration:none}.city-nav img{max-width:42vw;height:auto}.seo-fallback ol li,.seo-fallback ul li{margin-bottom:10px}</style></head>');
  return html.replace('</head>','<script type="application/ld+json">'+JSON.stringify(breadcrumbs).replaceAll('<','\\u003c')+'</script></head>').replace('</body>','<script src="/assets/city-directory.js" defer></script></body>');
 }
 for(const uz of [true,false]){
  const prefix=uz?'':'/ru',hub=prefix+'/shaharlar';routes.push(hub);
  const nav=`<nav class="city-nav" aria-label="${uz?'Asosiy bo\'limlar':'Основные разделы'}"><a href="${prefix}/"><img src="/assets/logo/muna-media-navbar-logo.jpg" alt="MUNA MEDIA" width="156" height="60" style="object-fit:contain;display:block"></a><a href="${prefix}/services-uzbekistan">${uz?'Xizmatlar':'Услуги'}</a><a href="${prefix}/#contact">${uz?'Brif yuborish':'Отправить бриф'}</a><a href="${uz?'/ru/shaharlar':'/shaharlar'}" lang="${uz?'ru':'uz'}">${uz?'Русский':"O'zbekcha"}</a></nav>`;
  const rendered=renderHub(roster,cities,uz);
  // Hub-only assets are content addressed: /assets/* is immutable for one year.
  const hubAssets={};
  for(const ext of ['css','js']){
   const content=fs.readFileSync(path.join(__dirname,'city-hub/hub.'+ext),'utf8');
   const hash=createHash('sha256').update(content).digest('hex').slice(0,16);
   const asset='assets/city-hub.'+hash+'.'+ext;
   write(asset,content);hubAssets[ext]='/'+asset;
  }
  let hubHtml=cityPage('/shaharlar',uz,rendered.title,rendered.description,rendered.body)
   .replace(/<style>[\s\S]*?<\/style>/g,'')
   .replace('</head>',`<link rel="stylesheet" href="${hubAssets.css}"></head>`)
   .replace('<script src="/assets/city-directory.js" defer></script>',`<script src="${hubAssets.js}" defer></script>`);
  write((uz?'':'ru/')+'shaharlar.html',hubHtml);
  cities.forEach((c,i)=>{
   const name=uz?c.name:c.ruName,focus=uz?c.focus:c.ruFocus;
   const official=roster.launch_centers.find(x=>x.name_uz===c.name);
   if(!official)throw Error('Missing official center: '+c.name);
   const p='/shaharlar/'+c.slug;routes.push(prefix+p);
   const title=uz?name+" uchun reklama rejasi | Muna Media":'План рекламы: '+name+' | Muna Media';
   const checklist=uz?c.checklist:c.ruChecklist;
   const related=[cities[(i+1)%cities.length],cities[(i+cities.length-1)%cities.length]];
   const scope=uz?"Media reja, matn va hisobotni masofadan tayyorlaymiz. Mahalliy suratga olish, montaj, tadbir yoki joylashtirish kerak bo'lsa, pudratchi, ruxsat, logistika va muddatni alohida tekshiramiz. Bu shaharda ofisimiz yoki tayyor inventarimiz borligi haqidagi da'vo emas.":'Медиаплан, тексты и отчетность готовим дистанционно. Для местной съемки, монтажа, события или размещения отдельно проверяем подрядчика, разрешения, логистику и сроки. Это не заявление о местном офисе или готовом инвентаре.';
   const body=`<main class="seo-fallback">${nav}<p><a href="${hub}">${uz?'Barcha shaharlar':'Все города'}</a> / ${esc(name)}</p><h1>${esc(title.replace(' | Muna Media',''))}</h1><p>${esc(uz?c.region:c.ruRegion)}</p><section><h2>${esc(focus)}</h2><p>${esc(uz?c.intro:c.ruIntro)}</p></section><section><h2>${uz?'Brifga nimalarni kiriting':'Что включить в бриф'}</h2><ol>${checklist.map(x=>'<li>'+esc(x)+'</li>').join('')}</ol></section><section><h2>${uz?'Rejalashtirish misoli':'Пример планирования'}</h2><p>${esc(uz?c.scenario:c.ruScenario)}</p><p>${uz?'Bu bajarilgan kampaniya yoki kafolatlangan natija emas.':'Это не выполненная кампания и не гарантированный результат.'}</p></section><section><h2>${uz?'Bajarish doirasi va tekshiruvlar':'Исполнение и проверки'}</h2><p>${esc(scope)}</p><ul><li>${uz?'Ish hajmi va narx faqat brifdan keyin kelishiladi.':'Объем и цена согласуются только после брифа.'}</li><li>${uz?'Reklama joylari va mahalliy pudratchilar mavjudligi tasdiqlanadi.':'Наличие рекламных мест и местных подрядчиков подтверждается отдельно.'}</li><li>${uz?'Davr, ruxsatlar va hisobot turi yozma kelishiladi.':'Период, разрешения и отчетность согласуются письменно.'}</li></ul></section><section><h2>${uz?'Mos xizmatlar':'Подходящие услуги'}</h2>${c.services.map(slug=>{return `<p><a href="${prefix}/${slug}">${esc(uz?special[slug]?.[0]?.replace(' | Muna Media','')||catalog[{'context-ads':'Контекстная реклама','seo-optimization':'SEO-оптимизация','smm':'SMM','led-screens':'LED-экраны','telegram-marketing':'Telegram-маркетинг','influencer-marketing':'Инфлюенс-маркетинг','event-management':'Ивент-менеджмент','mall-ads':'Реклама в торговых центрах'}[slug]]||'SMM':{'context-ads':'Контекстная реклама','seo-optimization':'SEO','smm':'SMM','led-screens':'LED-экраны','telegram-marketing':'Telegram-маркетинг','influencer-marketing':'Инфлюенс-маркетинг','event-management':'События','mall-ads':'Реклама в ТЦ'}[slug])}</a></p>`}).join('')}<a class="btn lime" href="${prefix}/?soato=${official.city_soato_code}#contact">${uz?'Shahar va vazifani yozish':'Указать город и задачу'}</a></section><section><h2>${uz?'Boshqa shaharlar briflari':'Брифы других городов'}</h2>${related.map(x=>`<p><a href="${hub}/${x.slug}">${esc(uz?x.name:x.ruName)}</a></p>`).join('')}</section><p>${uz?'O\'zbekiston bo\'ylab reklama. Aloqa:':'Реклама в Узбекистане. Контакт:'} <a href="mailto:info@munamedia.me">info@munamedia.me</a></p></main>`;
   let html=cityPage(p,uz,title,uz?c.intro:c.ruIntro,body);
   // City language switch must point to the exact equivalent, not the hub.
   html=html.replace(`href="${uz?'/ru/shaharlar':'/shaharlar'}" lang=`,`href="${uz?'/ru':''}${p}" lang=`);
   write((uz?'':'ru/')+'shaharlar/'+c.slug+'.html',html);
  });
 }
 write('assets/city-directory.js',`document.querySelector('#city-filter')?.addEventListener('input',e=>{let n=0;const q=e.target.value.toLocaleLowerCase();document.querySelectorAll('.city-entry').forEach(x=>{x.hidden=!x.dataset.city.toLocaleLowerCase().includes(q);if(!x.hidden)n++});document.querySelector('#city-count').textContent=String(n)});`);
 const sitemap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>`<url><loc>${ORIGIN}${p}</loc></url>`).join('')+'</urlset>\n';write('sitemap.xml',sitemap);
 fs.writeFileSync(path.join(root,'.build/route-manifest.json'),JSON.stringify({baselineRoutes:22,originalPaths:pages.map(f=>f==='index.html'?'/':'/'+f.replace('.html','')),routes,cities,directory:roster.cities.map(c=>({soato:c.soato_code,name:c.name_uz_display,region:c.region_name_uz_source,serviceVerified:false})),coverage:'120 official-snapshot directory choices; 14 editorial launch guides; no verified city inventory or offices',sourceVerification:roster.verification},null,2)+'\n');
 return [...new Set(generated)];
};
