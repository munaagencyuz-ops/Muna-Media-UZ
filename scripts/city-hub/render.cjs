// Customer-facing display layer only. Verified geography and guide sources stay immutable.
const regions = {
 'Toshkent shahri': ['Toshkent', 'Ташкент'],
 'Qoraqalpog‘iston Respublikasi': ["Qoraqalpog'iston Respublikasi", 'Республика Каракалпакстан'],
 'Andijon viloyati': ['Andijon viloyati', 'Андижанская область'],
 'Buxoro viloyati': ['Buxoro viloyati', 'Бухарская область'],
 'Jizzax viloyati': ['Jizzax viloyati', 'Джизакская область'],
 'Qashqadaryo viloyati': ['Qashqadaryo viloyati', 'Кашкадарьинская область'],
 'Navoiy viloyati': ['Navoiy viloyati', 'Навоийская область'],
 'Namangan viloyati': ['Namangan viloyati', 'Наманганская область'],
 'Samarqand viloyati': ['Samarqand viloyati', 'Самаркандская область'],
 'Surxondaryo viloyati': ['Surxondaryo viloyati', 'Сурхандарьинская область'],
 'Sirdaryo viloyati': ['Sirdaryo viloyati', 'Сырдарьинская область'],
 'Toshkent viloyati': ['Toshkent viloyati', 'Ташкентская область'],
 'Farg‘ona viloyati': ["Farg'ona viloyati", 'Ферганская область'],
 'Xorazm viloyati': ['Xorazm viloyati', 'Хорезмская область']
};
const straight = s => String(s).replace(/[‘’ʻʼ`]/g, "'");
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const copy = {
 uz: {
  title: "O'zbekiston shaharlarida reklama | Muna Media",
  description: "Kampaniya uchun shaharni tanlang. Reklama yo'nalishlari, 14 shahar uchun rejalashtirish qo'llanmalari va Muna Media bilan bog'lanish.",
  nav: ['Shaharlar', 'Xizmatlar', "Qo'llanmalar"], brief: 'Vazifani muhokama qilish', lang: 'Tilni tanlash', home: 'Bosh sahifa', skip: "Mazmunga o'tish",
  eyebrow: "MUNA MEDIA / O'ZBEKISTON", h1: "Reklamani qaysi shaharda boshlaymiz?",
  intro: "Bitta shahar yoki bir nechta hudud. Kerakli geografiyani tanlang, maqsadingizni yozing. Shunga qarab reklama rejasini muhokama qilamiz.",
  choose: 'Shaharni tanlash', heroNote: "Avval geografiya. Keyin kanal va reja.",
  panelTitle: 'Brifni nimadan boshlash kerak?', panel: [['Qayerda?', 'Shahar va xizmat hududi'], ['Kim uchun?', 'Auditoriya va taklif'], ['Qachon?', 'Muddat va rejalashtirilgan budjet']],
  chooseTitle: 'Kampaniya uchun shaharni tanlang', chooseIntro: "Hududni oching yoki nom bo'yicha qidiring. Shaharni bossangiz, u so'rov shakliga qo'shiladi.",
  search: 'Shahar yoki hudud', placeholder: 'Masalan, Toshkent yoki Xiva', region: 'Hudud', all: 'Barcha hududlar', reset: 'Tozalash',
  count: 'Tanlash uchun shaharlar: 120', empty: 'Shahar topilmadi', emptyText: "Nomni boshqacha yozing yoki filtrlarni tozalang. Kerakli joyni brifda ham ko'rsatishingiz mumkin.", city: 'shahar', selectCity: 'Shaharni tanlash',
  note: "Hisob-kitobdan oldin reklama joylari va mahalliy ishlarni bajarish imkoniyatini tekshiramiz.",
  guidesTitle: "Reja tuzishga yordam beradigan qo'llanmalar", guidesIntro: "14 shahar uchun brif savollari va rejalashtirish misollari. Bular bajarilgan loyihalar emas, kampaniyaga tayyorgarlik materiallari.", guide: "Qo'llanmani o'qish",
  servicesTitle: 'Vazifaga mos reklama yo\'nalishi', servicesIntro: "Shahar bilan birga auditoriya va maqsadni ham hisobga olamiz.",
  services: [ ['context-ads', 'Qidiruv reklamasi', "Mahsulot yoki xizmatni izlayotgan auditoriya uchun."], ['smm', 'SMM', "Ijtimoiy tarmoqlarda kontent va brend bilan muloqot."], ['telegram-marketing', 'Telegram', "Kanallarni tanlash va reklama xabarini tayyorlash."], ['led-screens', 'Tashqi reklama', "LED ekranlarda joylashtirishni rejalashtirish."], ['influencer-marketing', 'Blogerlar bilan reklama', "Auditoriyaga mos bloger, brif va reklama materiali."], ['event-management', 'Tadbirlar', "Tadbir vazifasi, mehmonlar va ish rejasini kelishish."] ],
  processTitle: "Tanlovdan ish rejasigacha", steps: [['Vazifani yozasiz', 'Shahar, mahsulot, auditoriya, muddat va budjetni yuboring.'], ['Tafsilotlarni aniqlaymiz', "Xizmat hududi, kanallar va bajarish shartlarini muhokama qilamiz."], ['Rejani kelishamiz', "Ish hajmi, muddat, xarajatlar va hisobot tartibini belgilaymiz."]],
  ctaTitle: "Shaharni tanladingizmi? Vazifangizni ayting.", ctaText: "Bir nechta shahar kerak bo'lsa yoki joy ro'yxatda bo'lmasa, barchasini bitta brifda yozing.", footer: "Brendlar uchun reklama va kommunikatsiya.", allServices: 'Barcha xizmatlar', about: 'Biz haqimizda'
 },
 ru: {
  title: 'Реклама по городам Узбекистана | Muna Media',
  description: 'Выберите город для кампании. Рекламные направления, материалы по планированию для 14 городов и связь с Muna Media.',
  nav: ['Города', 'Услуги', 'Материалы'], brief: 'Обсудить задачу', lang: 'Выбор языка', home: 'Главная', skip: 'К содержанию',
  eyebrow: 'MUNA MEDIA / УЗБЕКИСТАН', h1: 'В каком городе запускаем рекламу?',
  intro: 'Один город или несколько регионов. Выберите географию и расскажите о задаче. На этой основе обсудим рекламный план.',
  choose: 'Выбрать город', heroNote: 'Сначала география. Затем каналы и план.',
  panelTitle: 'С чего начать бриф?', panel: [['Где?', 'Город и территория услуги'], ['Для кого?', 'Аудитория и предложение'], ['Когда?', 'Сроки и планируемый бюджет']],
  chooseTitle: 'Выберите город для кампании', chooseIntro: 'Откройте регион или найдите город по названию. Нажмите на город, чтобы добавить его в форму обращения.',
  search: 'Город или регион', placeholder: 'Например, Ташкент или Хива', region: 'Регион', all: 'Все регионы', reset: 'Сбросить',
  count: 'Города для выбора: 120', empty: 'Город не найден', emptyText: 'Попробуйте другое название или сбросьте фильтры. Нужное место также можно указать в брифе.', city: 'городов', selectCity: 'Выбрать город',
  note: 'Перед расчетом проверим доступность рекламных мест и возможность местного исполнения.',
  guidesTitle: 'Материалы для подготовки плана', guidesIntro: 'Вопросы для брифа и примеры планирования для 14 городов. Это не выполненные проекты, а материалы для подготовки кампании.', guide: 'Открыть материал',
  servicesTitle: 'Рекламное направление под задачу', servicesIntro: 'Помимо города учитываем аудиторию и цель кампании.',
  services: [ ['context-ads', 'Поисковая реклама', 'Для аудитории, которая уже ищет продукт или услугу.'], ['smm', 'SMM', 'Контент и общение с аудиторией в социальных сетях.'], ['telegram-marketing', 'Telegram', 'Подбор каналов и подготовка рекламного сообщения.'], ['led-screens', 'Наружная реклама', 'Планирование размещений на LED-экранах.'], ['influencer-marketing', 'Инфлюенсер-маркетинг', 'Подбор блогеров, бриф и рекламный материал.'], ['event-management', 'События', 'Задача мероприятия, гости и план работ.'] ],
  processTitle: 'От выбора города к плану работ', steps: [['Вы описываете задачу', 'Укажите город, продукт, аудиторию, сроки и бюджет.'], ['Уточняем детали', 'Обсудим территорию услуги, каналы и условия исполнения.'], ['Согласуем план', 'Определим объем работ, сроки, расходы и порядок отчетности.']],
  ctaTitle: 'Город выбран? Расскажите о задаче.', ctaText: 'Если нужно несколько городов или вашего места нет в списке, укажите всё в одном брифе.', footer: 'Реклама и коммуникации для брендов.', allServices: 'Все услуги', about: 'О нас'
 }
};
function renderHub(roster, guides, uz) {
 const t = copy[uz?'uz':'ru'], prefix = uz?'':'/ru', home = prefix+'/', hub = prefix+'/shaharlar';
 const local = names => names[uz?0:1];
 const displayName = c => c.administrative_status==='capital_city' ? (uz?'Toshkent':'Ташкент') : straight(uz?c.name_uz_display:c.name_ru_source);
 const groups = Object.entries(regions).map(([source,names]) => {
  const entries = roster.cities.filter(c=>c.region_name_uz_source===source)
   .sort((a,b)=>displayName(a).localeCompare(displayName(b),uz?'uz':'ru'));
  if (!entries.length) throw Error('Missing city region: '+source);
  return {id:entries[0].region_soato_code, names, entries};
 });
 if (groups.reduce((n,g)=>n+g.entries.length,0)!==120) throw Error('Incomplete hub geography');
 const logo = `<a class="hub-brand" href="${home}" aria-label="Muna Media · ${esc(t.home)}"><img src="/assets/logo/muna-media-navbar-logo.jpg" alt="MUNA MEDIA" width="156" height="60"></a>`;
 const button = (href,text,secondary=false) => `<a class="hub-button${secondary?' hub-button-secondary':''}" href="${href}">${esc(text)}<span aria-hidden="true">↗</span></a>`;
 const directory = groups.map(g=>`<details class="hub-region" data-region="${esc(g.id)}"${g.id==='1726'?' open':''}><summary><span>${esc(local(g.names))}</span><span class="hub-region-count">${g.entries.length}</span></summary><ul class="hub-city-list">${g.entries.map(c=>{
  const name = displayName(c);
  const aliases=[c.name_uz_display,c.name_ru_source,c.name_uz_cyrillic_source,...g.names].filter(Boolean).map(straight).join(' ');
  return `<li class="city-entry" data-soato="${esc(c.soato_code)}" data-city="${esc(aliases)}"><a href="${home}?soato=${esc(c.soato_code)}#contact" aria-label="${esc(name+' · '+local(g.names)+' · '+t.selectCity)}"><span>${esc(name)}</span><span aria-hidden="true">↗</span></a></li>`;
 }).join('')}</ul></details>`).join('');
 const cards = guides.map(c=>`<a class="hub-guide" data-guide="${esc(c.slug)}" href="${hub}/${esc(c.slug)}"><span class="hub-guide-city">${esc(uz?c.name:c.ruName)}</span><span class="hub-guide-focus">${esc(uz?c.focus:c.ruFocus)}</span><span class="hub-guide-link">${esc(t.guide)} <span aria-hidden="true">↗</span></span></a>`).join('');
 const body = `<a class="hub-skip" href="#hub-main">${esc(t.skip)}</a><header class="hub-header"><div class="hub-wrap hub-header-inner">${logo}<nav aria-label="${esc(uz?"Asosiy bo'limlar":'Основные разделы')}"><a href="#choose-city">${esc(t.nav[0])}</a><a href="#hub-services">${esc(t.nav[1])}</a><a href="#hub-guides">${esc(t.nav[2])}</a></nav><div class="hub-languages" aria-label="${esc(t.lang)}"><a href="/shaharlar" lang="uz"${uz?' aria-current="page"':''}>UZ</a><a href="/ru/shaharlar" lang="ru"${!uz?' aria-current="page"':''}>RU</a></div></div></header>
 <main class="seo-fallback" id="hub-main"><section class="hub-hero hub-wrap"><div><p class="hub-eyebrow">${esc(t.eyebrow)}</p><h1>${esc(t.h1)}</h1><p class="hub-lead">${esc(t.intro)}</p><div class="hub-actions">${button('#choose-city',t.choose)}<a class="hub-text-link" href="${home}#contact">${esc(t.brief)}</a></div><p class="hub-small">${esc(t.heroNote)}</p></div><aside class="hub-brief"><h2>${esc(t.panelTitle)}</h2><ol>${t.panel.map(([a,b],i)=>`<li><span class="hub-step-number">0${i+1}</span><div><strong>${esc(a)}</strong><p>${esc(b)}</p></div></li>`).join('')}</ol></aside></section>
 <section class="hub-section hub-tinted" id="choose-city"><div class="hub-wrap"><div class="hub-section-head"><p class="hub-eyebrow">01 / ${esc(t.nav[0])}</p><h2>${esc(t.chooseTitle)}</h2><p>${esc(t.chooseIntro)}</p></div><div class="hub-filter" hidden><div><label for="city-filter">${esc(t.search)}</label><input id="city-filter" type="search" placeholder="${esc(t.placeholder)}" autocomplete="off" aria-controls="hub-directory"></div><div><label for="region-filter">${esc(t.region)}</label><select id="region-filter" aria-controls="hub-directory"><option value="">${esc(t.all)}</option>${groups.map(g=>`<option value="${esc(g.id)}">${esc(local(g.names))}</option>`).join('')}</select></div><button id="city-reset" type="button">${esc(t.reset)}</button></div><p class="hub-result" id="city-count" role="status" aria-live="polite" aria-atomic="true">${esc(t.count)}</p><div id="hub-directory">${directory}</div><div class="hub-empty" id="city-empty" hidden><h3>${esc(t.empty)}</h3><p>${esc(t.emptyText)}</p><a class="hub-text-link" href="${home}#contact">${esc(t.brief)}</a></div><p class="hub-availability">${esc(t.note)}</p></div></section>
 <section class="hub-section hub-wrap" id="hub-guides"><div class="hub-section-head"><p class="hub-eyebrow">02 / ${esc(t.nav[2])}</p><h2>${esc(t.guidesTitle)}</h2><p>${esc(t.guidesIntro)}</p></div><div class="hub-guide-grid">${cards}</div></section>
 <section class="hub-section hub-tinted" id="hub-services"><div class="hub-wrap"><div class="hub-section-head"><p class="hub-eyebrow">03 / ${esc(t.nav[1])}</p><h2>${esc(t.servicesTitle)}</h2><p>${esc(t.servicesIntro)}</p></div><div class="hub-service-grid">${t.services.map(([slug,name,desc])=>`<a class="hub-service" href="${prefix}/${slug}"><h3>${esc(name)} <span aria-hidden="true">↗</span></h3><p>${esc(desc)}</p></a>`).join('')}</div><a class="hub-text-link hub-all-services" href="${prefix}/services-uzbekistan">${esc(t.allServices)} <span aria-hidden="true">↗</span></a></div></section>
 <section class="hub-section hub-wrap" id="hub-process"><div class="hub-section-head"><h2>${esc(t.processTitle)}</h2></div><ol class="hub-process-grid">${t.steps.map(([title,text],i)=>`<li><span class="hub-step-number">0${i+1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}</ol></section>
 <section class="hub-cta"><div class="hub-wrap"><h2>${esc(t.ctaTitle)}</h2><p>${esc(t.ctaText)}</p>${button(home+'#contact',t.brief,true)}</div></section></main>
 <footer class="hub-footer"><div class="hub-wrap"><div class="hub-footer-main"><div>${logo}<p>${esc(t.footer)}</p></div><div class="hub-contacts"><a href="tel:+998901381313">+998 90 138 13 13</a><a href="mailto:info@munamedia.me">info@munamedia.me</a></div></div><div class="hub-footer-bottom"><span>Muna Media</span><nav aria-label="${esc(uz?'Qo\'shimcha havolalar':'Дополнительные ссылки')}"><a href="${prefix}/services-uzbekistan">${esc(t.allServices)}</a><a href="${prefix}/about">${esc(t.about)}</a></nav></div></div></footer>`;
 return {title:t.title, description:t.description, body};
}
module.exports = {renderHub, regions, copy, esc};
