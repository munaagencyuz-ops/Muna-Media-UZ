// Muna Media — sections
const { useState, useEffect, useRef } = React;


// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function Hero({ variant }) {
  return (
    <section id="hero" style={{paddingTop: 80, paddingBottom: 60, position:'relative', overflow:'hidden'}}>
      {/* decorative blobs */}
      <div className="blob-shape" style={{
        width: 380, height: 380, background: 'var(--accent)',
        top: -80, right: -120, opacity: .15, filter:'blur(80px)'
      }} />
      <div className="blob-shape" style={{
        width: 280, height: 280, background: 'var(--accent-2)',
        bottom: -60, left: -80, opacity: .10, filter:'blur(90px)'
      }} />

      <div className="container" style={{position:'relative', zIndex: 1}}>
        <div style={{display:'flex', alignItems:'center', gap: 14, marginBottom: 28, flexWrap: 'wrap'}}>
          <span className="pill solid"><span className="dot" /> Выход на рынок Узбекистана</span>
        </div>

        <h1 className="display" style={{fontSize: 'clamp(44px, 7vw, 96px)', margin: '0 0 28px', maxWidth: 1200, lineHeight: 1.05}}>
          Рекламное агентство в Ташкенте для <span className="serif" style={{fontStyle:'italic', fontFamily:'Instrument Serif'}}>международных брендов.</span>
        </h1>

        <div className="hero-main-row" style={{display:'flex', alignItems:'flex-start', gap: 40, flexWrap:'wrap', marginBottom: 44}}>
          <p style={{fontSize: 20, lineHeight: 1.5, maxWidth: 720, margin: 0, color:'var(--ink-soft)'}}>
            Muna Media — стратегический партнер для безопасного и эффективного выхода брендов на рынок Узбекистана. Связываем технологии, маркетинг и финансы, управляя юнит-экономикой, прозрачностью бюджета и репутацией.
          </p>
          <div className="hero-actions" style={{display:'flex', gap: 14, flexWrap:'wrap', marginTop: 6}}>
            <a href="#cases" className="btn ghost">
              Смотреть кейсы
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn lime">
              Запустить проект
              <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Hero strip — micro stats */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 0,
          border: '1.5px solid var(--ink)',
          borderRadius: 24,
          overflow:'hidden',
          background: 'var(--cream-card)'
        }} className="hero-strip">
          {[
            ['180+', 'проектов реализовано с 2019'],
            ['70+', 'топ-инфлюенсеров в сети'],
            ['Узбекистан', 'фокусный рынок присутствия'],
            ['24/7', 'регламент ответа и поддержка для крупных команд'],
          ].map(([n, t], i) => (
            <div key={i} style={{
              padding: '24px 28px',
              borderRight: '1.5px solid var(--ink)',
              borderBottom: '1.5px solid var(--ink)',
              display:'flex', flexDirection:'column', gap: 4
            }} className="hero-strip-item">
              <div className="num-big" style={{fontSize: 48}}>{n}</div>
              <div className="mono" style={{color:'var(--muted)'}}>{t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* spinning badge */}
      <div style={{
        position:'absolute', top: 100, right: 56,
        width: 140, height: 140, zIndex: 2,
        display: variant === 'minimal' ? 'none' : 'block'
      }} className="hero-badge">
        <div className="spin" style={{width:'100%', height:'100%'}}>
          <svg viewBox="0 0 140 140" width="140" height="140">
            <defs>
              <path id="circ" d="M 70, 70 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
            </defs>
            <text fontFamily="JetBrains Mono" fontSize="11" letterSpacing="3" fill="var(--ink)" fontWeight="600">
              <textPath href="#circ">МУНА МЕДИА · ПРОЗРАЧНОСТЬ И РОСТ · </textPath>
            </text>
          </svg>
        </div>
        <div style={{
          position:'absolute', top: '50%', left: '50%',
          transform:'translate(-50%, -50%)',
          width: 56, height: 56, borderRadius: 999,
          background:'var(--accent)', border:'1.5px solid var(--ink)',
          display:'grid', placeItems:'center',
          fontSize: 22
        }}>★</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TOP CASES (2)
// ─────────────────────────────────────────────────────────────
function TopCases() {
  const cases = [
    {
      brand: 'Xiaomi',
      glyph: 'Mi',
      logoSrc: 'assets/cases/xiaomi-logo.png',
      logoWidth: 174,
      tag: 'Запуск продукта',
      title: 'Продвижение Xiaomi в Узбекистане',
      desc: 'Полная маркетинговая поддержка официального представительства: ведение соцсетей, визуальный контент, коллаборации и презентация Xiaomi 13T в Узбекистане.',
      metrics: [
        ['Соцсети', 'Instagram, Telegram, Facebook'],
        ['13T', 'презентация новой линейки'],
        ['PUBG', 'брендовая коллаборация'],
      ],
      bg: 'var(--accent)',
      tags: ['Инфлюенсеры', 'Наружка и ритейл', 'Медиазакупка'],
      href: 'xiaomi.html',
    },
    {
      brand: 'UnionPay',
      glyph: 'UP',
      logoSrc: 'assets/cases/unionpay-logo.png',
      logoWidth: 210,
      tag: 'Промо / Ритейл',
      title: 'UnionPay — рост транзакций и узнаваемости',
      desc: '6-месячная промо-акция для роста транзакций в системе HUMO: сайт, Telegram-бот, розничные точки, таргетированная реклама, инфлюенсеры и Telegram-маркетинг.',
      metrics: [
        ['6 мес', 'промо-кампания'],
        ['38', 'Telegram-каналов'],
        ['1.15M', 'охват публикаций'],
      ],
      bg: 'var(--accent-2)',
      tags: ['Промо-активация', 'Ритейл', 'Узнаваемость'],
      href: 'unionpay.html',
    },
  ];

  return (
    <section id="cases" style={{paddingTop: 40}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 01 — Кейсы</span>
              <span className="mono" style={{color:'var(--muted)'}}>Результаты, выраженные в цифрах</span>
            </div>
            <h2 className="display sec-title" style={{margin:0}}>
              Топ-2 <span className="serif">кейса</span>.
            </h2>
          </div>
        </div>

        <div className="grid-2 cases-grid">
          {cases.map((c, i) => (
            <article key={i} className="card" style={{
              padding: 0,
              overflow:'hidden',
              display:'flex',
              flexDirection:'column',
            }}>
              <div className="case-card-head" style={{
                background: c.bg,
                borderBottom:'1.5px solid var(--ink)',
                padding: '32px 32px 26px',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                gap: 16,
                color: c.bg === 'var(--cream-card)' ? 'var(--ink)' : 'var(--bg)'
              }}>
                <div className="case-card-logo" style={{'--case-logo-w': `${c.logoWidth}px`}}>
                  <img src={c.logoSrc} alt={c.brand} />
                </div>
                <span className="mono" style={{color: c.bg === 'var(--cream-card)' ? 'var(--ink)' : 'var(--bg)'}}>{c.tag}</span>
              </div>

              <div className="case-card-body" style={{padding: '32px', display:'flex', flexDirection:'column', gap: 22, flex: 1}}>
                <h3 className="display" style={{fontSize: 'clamp(24px, 3vw, 36px)', margin: 0, fontWeight: 700}}>
                  {c.title}
                </h3>
                <p style={{margin: 0, fontSize: 17, color:'var(--ink-soft)', lineHeight: 1.55}}>{c.desc}</p>

                <div style={{display:'flex', gap: 8, flexWrap:'wrap'}}>
                  {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                <div className="case-metrics" style={{
                  marginTop:'auto',
                  display:'grid',
                  gridTemplateColumns:'repeat(3, 1fr)',
                  gap: 0,
                  borderTop:'1.5px solid var(--ink)',
                  paddingTop: 22,
                }}>
                  {c.metrics.map(([n, t], j) => (
                    <div key={j} style={{paddingRight: 16, borderRight: j < 2 ? '1px dashed var(--ink)' : 'none', paddingLeft: j > 0 ? 16 : 0}}>
                      <div className="num-big" style={{fontSize: 38, lineHeight: 1}}>{n}</div>
                      <div className="mono" style={{color:'var(--muted)', marginTop: 8, fontSize: 11}}>{t}</div>
                    </div>
                  ))}
                </div>
                <a href={c.href} className="btn ghost" style={{justifyContent: 'center'}}>
                  Открыть кейс
                  <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PARTNERS RIBBON
// ─────────────────────────────────────────────────────────────
function Partners() {
  const partners = [
    { name: 'Xiaomi', src: 'assets/partners/marquee/group.png', width: 184 },
    { name: 'UnionPay', src: 'assets/partners/marquee/unionpay.png', width: 126 },
    { name: 'Yadea', src: 'assets/partners/marquee/clip-path-group.png', width: 140 },
    { name: 'Honor', src: 'assets/partners/marquee/honor.png', width: 148 },
    { name: 'flydubai', src: 'assets/partners/marquee/flydubai.png', width: 150 },
    { name: 'Huawei', src: 'assets/partners/marquee/huawei.png', width: 82 },
    { name: 'UZBAT', src: 'assets/partners/marquee/uzbat.png', width: 126 },
    { name: 'UNICEF', src: 'assets/partners/marquee/unicef.png', width: 146 },
  ];
  const items = [...partners, ...partners];

  return (
    <section style={{padding: 0}}>
      <div className="container" style={{paddingTop: 24, paddingBottom: 24}}>
        <div style={{display:'flex', alignItems:'center', gap: 24, justifyContent:'space-between', flexWrap:'wrap'}}>
          <div className="mono" style={{color:'var(--muted)'}}>02 — Нам доверяют</div>
          <div style={{fontSize: 15, color:'var(--ink-soft)'}}>
            Сотрудничаем с крупными международными брендами
          </div>
        </div>
      </div>
      <div className="marquee partner-marquee">
        <div className="marquee-track">
          {items.map((partner, i) => (
            <div key={`${partner.name}-${i}`} className="logo-chip brand-logo-chip">
              <img
                src={partner.src}
                alt={partner.name}
                style={{'--logo-w': `${partner.width}px`}}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WHY MUNA — 3 theses
// ─────────────────────────────────────────────────────────────
function WhyMuna() {
  const points = [
    {
      n: '01',
      title: 'Радикальная прозрачность',
      proof: 'Модель открытого ценообразования. Все клиенты видят чистую стоимость рекламного инвентаря и инфлюенсеров в реальном времени через личный кабинет Minora AI. Никаких скрытых наценок.',
      cta: 'Личный кабинет Minora AI',
      accent: 'var(--accent)',
    },
    {
      n: '02',
      title: 'Гарантии для крупных клиентов',
      proof: 'Жесткий регламент ответа с ответом на любой запрос в течение 15 минут в режиме 24/7. Постоплата до 120 дней для крупных международных корпораций.',
      cta: 'Условия работы',
      accent: 'var(--accent-2)',
    },
    {
      n: '03',
      title: 'Защита репутации',
      proof: 'Собственные ORM/SERM-стратегии для мониторинга и блокировки репутационных угроз в инфополе до того, как они повлияют на ваши продажи и доверие к бренду.',
      cta: 'Защитить репутацию',
      accent: 'var(--cream-card)',
    },
  ];

  return (
    <section id="why">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 03 — Стандарты работы</span>
            </div>
            <h2 className="display sec-title" style={{margin:0, maxWidth: 900}}>
              Три вещи, которые гарантируют вашу <span className="hl">безопасность</span>.
            </h2>
          </div>
        </div>

        <div className="grid-3">
          {points.map((p, i) => (
            <div key={i} className="card" style={{padding: 32, display:'flex', flexDirection:'column', gap: 18, minHeight: 360}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <span className="mono" style={{color:'var(--muted)'}}>{p.n}</span>
                <div style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: p.accent, border:'1.5px solid var(--ink)'
                }} />
              </div>
              <h3 className="display" style={{fontSize: 26, margin: '8px 0 0', fontWeight: 700, lineHeight: 1.1}}>{p.title}</h3>
              <p style={{margin: 0, color:'var(--ink-soft)', fontSize: 16, lineHeight: 1.55}}>{p.proof}</p>
              <a href="#contact" className="mono" style={{marginTop:'auto', display:'inline-flex', alignItems:'center', gap: 8, textDecoration:'none', fontWeight: 600}}>
                {p.cta} <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICES — by client task
// ─────────────────────────────────────────────────────────────
function Services() {
  const packs = [
    {
      headline: 'Безопасный вход на рынок',
      icon: '🛡️',
      who: 'Для международных брендов, заходящих в регион',
      includes: [
        'Исследование выхода на рынок и локализация позиционирования',
        'Юридическая проверка и адаптация договоров',
        'Запуск локальных соцсетей и сети инфлюенсеров (10–30 блогеров)',
        'PR и GR поддержка в местных СМИ и Telegram-каналах',
      ],
      timeline: '6–8 недель',
      from: 'индивидуально',
      bg: 'var(--accent)',
    },
    {
      headline: 'Узнаваемость за 30 дней',
      icon: '⚡',
      who: 'Для продуктов с готовой дистрибуцией',
      includes: [
        'Массовый запуск: 40+ инфлюенсеров одновременно',
        'Креативный продакшн (8-12 коротких вирусных видео)',
        'Рекламные инструменты: Meta, Yandex, Telegram',
        'Интеграция с локальными LED-экранами и наружной рекламой',
      ],
      timeline: '30 дней',
      from: 'индивидуально',
      bg: 'var(--accent-2)',
    },
    {
      headline: 'Доминирование в нише технологий, финтеха и ритейла',
      icon: '📈',
      who: 'Омниканальный рост и управление стоимостью привлечения',
      includes: [
        'Результативный маркетинг с оплатой за транзакции / целевые заявки',
        'Управление репутацией и кризисные коммуникации',
        'Оптимизация юнит-экономики и аудит сквозной аналитики',
        'Постоянная поддержка и выделенная команда 24/7',
      ],
      timeline: 'от 3 месяцев',
      from: 'индивидуально',
      bg: 'var(--ink)',
      dark: true,
    },
  ];

  const serviceCategories = [
    {
      group: 'Наружная реклама',
      items: [
        { id: 'service-led', href: 'led-screens.html', title: 'LED-экраны', desc: 'Размещения на городских LED-экранах с подбором локаций по трафику и аудитории.' },
        { id: 'service-gas', href: 'gas-station-ads.html', title: 'Реклама на АЗС', desc: 'Видимые форматы на заправках для автомобилистов и ежедневных маршрутов.' },
        { id: 'service-malls', href: 'mall-ads.html', title: 'Реклама в торговых центрах', desc: 'Навигация, внутренние носители и промо-точки в местах покупки.' },
        { id: 'service-buses', href: 'bus-ads.html', title: 'Реклама на автобусах', desc: 'Брендирование транспорта для широкого городского охвата.' },
        { id: 'service-bus-stops', href: 'bus-stop-ads.html', title: 'Реклама на автобусных остановках', desc: 'Сити-форматы и остановочные павильоны в точках ожидания.' },
        { id: 'service-metro', href: 'metro-ads.html', title: 'Реклама в метро', desc: 'Размещения на станциях и в переходах с высокой частотой контакта.' },
        { id: 'service-airport', href: 'airport-ads.html', title: 'Реклама в аэропорту', desc: 'Премиальные форматы для деловой и туристической аудитории.' },
      ],
    },
    {
      group: 'Онлайн и поиск',
      items: [
        { id: 'service-seo', href: 'seo-optimization.html', title: 'SEO-оптимизация', desc: 'Техническая, контентная и локальная оптимизация для роста поискового спроса.' },
        { id: 'service-context', href: 'context-ads.html', title: 'Контекстная реклама', desc: 'Поисковые и медийные кампании с прозрачной аналитикой и контролем заявок.' },
      ],
    },
    {
      group: 'Соцсети и инфлюенсеры',
      items: [
        { id: 'service-smm', href: 'smm.html', title: 'SMM', desc: 'Ведение социальных сетей, контент-план, визуальная система и регулярная коммуникация.' },
        { id: 'service-influence', href: 'influencer-marketing.html', title: 'Инфлюенс-маркетинг', desc: 'Подбор блогеров, проверка аудитории, интеграции и отчетность по результатам.' },
        { id: 'service-telegram', href: 'telegram-marketing.html', title: 'Telegram-маркетинг', desc: 'Посевы, закупка в каналах, спецпроекты и работа с локальными сообществами.' },
      ],
    },
    {
      group: 'События',
      items: [
        { id: 'service-events', href: 'event-management.html', title: 'Ивент-менеджмент', desc: 'Презентации, промо-мероприятия, запуск продукта и управление подрядчиками.' },
      ],
    },
  ];
  const [activeServiceGroup, setActiveServiceGroup] = useState(0);
  const activeCategory = serviceCategories[activeServiceGroup];
  const serviceCount = activeCategory.items.length;
  const goServiceGroup = (direction) => {
    setActiveServiceGroup((activeServiceGroup + direction + serviceCategories.length) % serviceCategories.length);
  };

  return (
    <section id="services" style={{background: 'var(--bg-2)', borderTop:'1.5px solid var(--ink)', borderBottom:'1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 04 — Решения</span>
              <span className="mono" style={{color:'var(--muted)'}}>Пакеты под ваши задачи</span>
            </div>
            <h2 className="display sec-title" style={{margin:0, maxWidth: 1000}}>
              Не инструменты. <span className="serif">Решения</span> под ваш бриф.
            </h2>
          </div>
          <p style={{maxWidth: 380, fontSize: 16, color:'var(--ink-soft)', margin: 0}}>
            Сфокусированные пакетные решения с четкими сроками и прозрачной структурой бюджета.
          </p>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24
        }}>
          {packs.map((p, i) => (
            <article key={i} className="card service-card" style={{
              padding: 32,
              display:'flex',
              flexDirection:'column',
              gap: 18,
              background: p.dark ? 'var(--ink)' : 'var(--cream-card)',
              color: p.dark ? 'var(--bg)' : 'var(--ink)',
              minHeight: 480,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 16}}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: p.bg, border:'1.5px solid ' + (p.dark ? 'var(--bg)' : 'var(--ink)'),
                  display:'grid', placeItems:'center',
                  fontSize: 26
                }}>{p.icon}</div>
                <div style={{textAlign:'right'}}>
                  {p.from !== 'индивидуально' && <div className="mono" style={{opacity: .7}}>от</div>}
                  <div className="num-big" style={{fontSize: p.from === 'индивидуально' ? 24 : 36}}>{p.from}</div>
                </div>
              </div>

              <h3 className="display" style={{fontSize: '28px', margin: '8px 0 0', fontWeight: 700, lineHeight: 1.15}}>
                {p.headline}
              </h3>
              <div className="mono" style={{opacity: .75, fontSize: 11}}>{p.who}</div>

              <ul style={{margin: '12px 0', padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10}}>
                {p.includes.map((it, j) => (
                  <li key={j} style={{display:'flex', gap: 10, fontSize: 15, lineHeight: 1.45}}>
                    <span style={{
                      flexShrink: 0,
                      width: 18, height: 18, marginTop: 3,
                      borderRadius: 6,
                      background: p.dark ? 'var(--accent)' : 'var(--ink)',
                      color: p.dark ? 'var(--ink)' : 'var(--bg)',
                      display:'grid', placeItems:'center',
                      fontSize: 12, fontWeight: 700,
                    }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>

              <div style={{
                marginTop:'auto',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                gap: 16,
                borderTop: '1px dashed ' + (p.dark ? 'var(--bg)' : 'var(--ink)'),
                paddingTop: 20,
              }}>
                <div>
                  <div className="mono" style={{opacity: .7}}>Срок</div>
                  <div style={{fontWeight: 600, fontSize: 18}}>{p.timeline}</div>
                </div>
                <a href="#contact" className="btn" style={{
                  background: p.dark ? 'var(--accent)' : 'var(--ink)',
                  color: p.dark ? 'var(--ink)' : 'var(--bg)',
                  borderColor: p.dark ? 'var(--accent)' : 'var(--ink)',
                  padding:'14px 22px'
                }}>
                  Обсудить
                  <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="service-catalog" style={{marginTop: 64}}>
          <div className="card" style={{padding: 'clamp(24px, 4vw, 38px)', overflow: 'hidden', background: 'var(--bg)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 26}}>
              <div>
                <span className="pill solid" style={{marginBottom: 16}}><span className="dot" /> Каталог услуг</span>
                <h3 className="display" style={{fontSize: 'clamp(30px, 4vw, 54px)', margin: 0}}>
                  Выберите направление
                </h3>
              </div>
              <div style={{display: 'flex', gap: 10}}>
                <button
                  aria-label="Предыдущая категория"
                  onClick={() => goServiceGroup(-1)}
                  style={{width: 48, height: 48, borderRadius: 999, border: '1.5px solid var(--ink)', background: 'var(--bg)', fontSize: 22, fontWeight: 800, cursor: 'pointer'}}
                >
                  ←
                </button>
                <button
                  aria-label="Следующая категория"
                  onClick={() => goServiceGroup(1)}
                  style={{width: 48, height: 48, borderRadius: 999, border: '1.5px solid var(--ink)', background: 'var(--accent)', color: 'white', fontSize: 22, fontWeight: 800, cursor: 'pointer'}}
                >
                  →
                </button>
              </div>
            </div>

            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28}}>
              {serviceCategories.map((category, idx) => (
                <button
                  key={category.group}
                  onClick={() => setActiveServiceGroup(idx)}
                  className="pill"
                  style={{
                    cursor: 'pointer',
                    borderColor: 'var(--ink)',
                    background: idx === activeServiceGroup ? 'var(--ink)' : 'var(--bg)',
                    color: idx === activeServiceGroup ? 'var(--bg)' : 'var(--ink)',
                    transform: idx === activeServiceGroup ? 'translateY(-2px)' : 'none',
                    boxShadow: idx === activeServiceGroup ? '3px 3px 0 0 var(--ink)' : 'none',
                    transition: 'transform .22s ease, box-shadow .22s ease, background .22s ease, color .22s ease'
                  }}
                >
                  <span className="dot" /> {category.group}
                </button>
              ))}
            </div>

            <div style={{position: 'relative'}}>
              <div
                key={activeCategory.group}
                style={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridAutoColumns: 'minmax(280px, 360px)',
                  gap: 18,
                  overflowX: 'auto',
                  padding: '4px 4px 18px',
                  scrollSnapType: 'x mandatory',
                  animation: 'serviceSlideIn .42s ease both'
                }}
              >
                {activeCategory.items.map((service, idx) => (
                  <article
                    id={service.id}
                    key={service.id}
                    className="card service-tile"
                    style={{
                      padding: 28,
                      minHeight: 310,
                      boxShadow: idx === 0 ? 'var(--shadow)' : 'none',
                      borderRadius: 22,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      scrollSnapAlign: 'start',
                      scrollMarginTop: 110,
                      background: idx === 0 ? 'var(--ink)' : 'var(--cream-card)',
                      color: idx === 0 ? 'var(--bg)' : 'var(--ink)',
                      transform: `translateY(${idx % 2 ? 10 : 0}px)`,
                      transition: 'transform .24s ease, box-shadow .24s ease, background .24s ease'
                    }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
                      <span className="mono" style={{color: idx === 0 ? 'rgba(255,255,255,.68)' : 'var(--muted)'}}>
                        {String(idx + 1).padStart(2, '0')} / {String(serviceCount).padStart(2, '0')}
                      </span>
                      <span style={{width: 12, height: 12, borderRadius: 999, background: 'var(--accent)', flexShrink: 0}} />
                    </div>
                    <h3 className="display" style={{fontSize: 30, lineHeight: 1.02, margin: '10px 0 0', color: idx === 0 ? 'var(--bg)' : 'var(--ink)'}}>
                      {service.title}
                    </h3>
                    <p style={{margin: 0, color: idx === 0 ? 'rgba(255,255,255,.76)' : 'var(--ink-soft)', fontSize: 16, lineHeight: 1.55}}>
                      {service.desc}
                    </p>
                    <a
                      href={service.href}
                      className={idx === 0 ? 'btn lime' : 'btn ghost'}
                      style={{
                        justifyContent: 'center',
                        padding: '14px 18px',
                        fontSize: 15,
                        marginTop: 'auto',
                        background: idx === 0 ? 'var(--accent)' : 'transparent',
                        color: idx === 0 ? 'white' : 'var(--ink)',
                        borderColor: idx === 0 ? 'var(--accent)' : 'var(--ink)'
                      }}
                    >
                      Подробнее
                      <span className="arrow">→</span>
                    </a>
                  </article>
                ))}
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 14, flexWrap: 'wrap'}}>
                <div className="mono" style={{color: 'var(--muted)'}}>
                  {activeCategory.group} · {serviceCount} услуг
                </div>
                <div style={{display: 'flex', gap: 8}}>
                  {serviceCategories.map((category, idx) => (
                    <button
                      key={category.group}
                      aria-label={category.group}
                      onClick={() => setActiveServiceGroup(idx)}
                      style={{
                        width: idx === activeServiceGroup ? 28 : 10,
                        height: 10,
                        border: '1.5px solid var(--ink)',
                        borderRadius: 999,
                        background: idx === activeServiceGroup ? 'var(--accent)' : 'var(--bg)',
                        cursor: 'pointer',
                        transition: 'width .24s ease, background .24s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes serviceSlideIn {
              from { opacity: 0; transform: translateX(28px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .service-catalog [style*="overflow-x: auto"]::-webkit-scrollbar { height: 8px; }
            .service-catalog [style*="overflow-x: auto"]::-webkit-scrollbar-thumb {
              background: var(--ink);
              border-radius: 999px;
            }
          ` }} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    {
      quote: 'Muna Media взяла на себя все финансовые риски, налоговую отчетность и валютный контроль в регионе, обеспечив нам абсолютно прозрачный медиабаинг без скрытых комиссий.',
      name: 'Алина Каримова',
      role: 'CMO CIS',
      brand: 'NL International',
      glyph: 'NL',
      bg: 'var(--accent)',
    },
    {
      quote: 'Не просто подрядчик, а стратегический партнер по росту. Интегрировали дашборд Minora AI, спорили по поводу бизнес-показателей и помогли снизить стоимость привлечения клиента на 35%.',
      name: 'Бекзод Юсупов',
      role: 'Brand Director',
      brand: 'UnionPay UZ',
      glyph: 'UP',
      bg: 'var(--cream-card)',
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 05 — Отзывы</span>
            </div>
            <h2 className="display sec-title" style={{margin:0, maxWidth: 920}}>
              Что говорят клиенты, когда мы не в комнате.
            </h2>
          </div>
        </div>

        <div className="grid-2">
          {items.map((t, i) => (
            <article key={i} className="card" style={{
              padding: 32, display:'flex', flexDirection:'column', gap: 24,
              background: t.dark ? 'var(--ink)' : 'var(--cream-card)',
              color: t.dark ? 'var(--bg)' : 'var(--ink)',
              minHeight: 320,
            }}>
              <div style={{
                fontFamily:'Instrument Serif', fontStyle:'italic',
                fontSize: 92, lineHeight: 0.6, height: 38,
                color: t.bg === 'var(--cream-card)' || t.bg === 'var(--ink)' ? 'var(--accent)' : t.bg,
              }}>“</div>
              <p style={{margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing:'-0.01em', fontWeight: 500}}>
                {t.quote}
              </p>
              <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 16, flexWrap:'wrap'}}>
                <div>
                  <div style={{fontWeight: 600, fontSize: 17}}>{t.name}</div>
                  <div className="mono" style={{opacity:.7, marginTop: 4}}>{t.role}</div>
                </div>
                <div className="logo-chip" style={{
                  fontSize: 18,
                  color: t.dark ? 'var(--bg)' : 'var(--ink)',
                  opacity: 1
                }}>
                  <span className="glyph" style={{
                    background: t.bg,
                    color: t.bg === 'var(--ink)' ? 'var(--bg)' : 'var(--ink)',
                    borderColor: t.dark ? 'var(--bg)' : 'var(--ink)'
                  }}>{t.glyph}</span>
                  {t.brand}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: 'Как вы обеспечиваете прозрачность маркетингового бюджета?',
      a: 'Через личный кабинет Minora AI с доступом к расходам в реальном времени.'
    },
    {
      q: 'Работаете ли вы по бизнес-показателям?',
      a: 'Да, мы привязываем маркетинговые затраты к бизнес-показателям : стоимости привлечения и ценности клиента.'
    },
    {
      q: 'В чем ваша главная экспертиза на рынке Узбекистана?',
      a: 'Синтез глобальных методологий с глубоким пониманием локальных культурных кодов.'
    },
  ];

  return (
    <section id="faq">
      <div className="container" style={{maxWidth: 1100}}>
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 06 — Вопросы</span>
            </div>
            <h2 className="display sec-title" style={{margin:0}}>
              Частые вопросы.
            </h2>
          </div>
          <p style={{maxWidth: 360, color:'var(--ink-soft)', fontSize: 16, margin: 0}}>
            Ответы на ключевые возражения и особенности взаимодействия.
          </p>
        </div>

        <div>
          {items.map((it, i) => (
            <div
              key={i}
              className={'faq-item ' + (open === i ? 'open' : '')}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq-q">
                <div style={{display:'flex', alignItems:'center', gap: 20}}>
                  <span className="mono" style={{color:'var(--muted)', width: 32}}>{String(i+1).padStart(2,'0')}</span>
                  <h3 className="faq-title" style={{margin:0}}>{it.q}</h3>
                </div>
                <div className="faq-toggle">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="faq-a" style={{paddingLeft: 52, paddingRight: 60}}>
                {it.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', task: '' });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card final-cta-card" style={{
          background:'var(--ink)',
          color:'var(--bg)',
          padding: 'clamp(40px, 6vw, 80px)',
          position:'relative',
          overflow:'hidden',
        }}>
          {/* decorative blobs */}
          <div style={{
            position:'absolute', top: -100, right: -100,
            width: 360, height: 360, borderRadius: 999,
            background:'var(--accent)', opacity: .3,
            border:'1.5px solid var(--bg)',
          }} />
          <div style={{
            position:'absolute', bottom: -80, left: -80,
            width: 220, height: 220, borderRadius: 999,
            background:'var(--accent-2)', opacity: .2,
            border:'1.5px solid var(--bg)',
          }} />

          <div style={{position:'relative', zIndex: 1, display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 56}} className="cta-grid">
            <div style={{display:'flex', flexDirection:'column', gap: 24}}>
              <div className="sec-eyebrow">
                <span className="pill solid" style={{borderColor:'var(--bg)', color:'var(--bg)'}}>
                  <span className="dot" /> 07 — Масштабирование
                </span>
              </div>
              <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 72px)', margin: 0, color:'var(--bg)', lineHeight: 1.05}}>
                Готовы масштабировать бизнес в Узбекистане?
              </h2>
              <p style={{margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.78)', maxWidth: 480}}>
                Оставьте заявку, и мы подготовим расчет снижения стоимости привлечения клиента в Узбекистане.
              </p>
              <a href="#" className="btn lime final-cta-link" style={{alignSelf:'flex-start', marginTop: 8}}>
                Забронировать 30 минут в Calendly
                <span className="arrow">→</span>
              </a>

              <div style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop:'1px solid rgba(255,255,255,0.18)',
                display:'flex', gap: 32, flexWrap:'wrap'
              }}>
                <div>
                  <div className="mono" style={{opacity:.6}}>Email</div>
                  <a href="mailto:hello@muna.media" style={{color:'var(--bg)', textDecoration:'none', fontSize: 18, fontWeight: 600}}>
                    hello@muna.media
                  </a>
                </div>
                <div>
                  <div className="mono" style={{opacity:.6}}>Telegram</div>
                  <a href="#" style={{color:'var(--bg)', textDecoration:'none', fontSize: 18, fontWeight: 600}}>
                    @munamedia
                  </a>
                </div>
              </div>
            </div>

            {/* form */}
            <div className="contact-form-card" style={{
              background:'var(--bg)',
              color:'var(--ink)',
              border:'1.5px solid var(--bg)',
              borderRadius: 24,
              padding: 32,
              position:'relative',
            }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap: 16}}>
                  <div>
                    <label className="mono" style={{color:'var(--muted)', display:'block', marginBottom: 8}}>Имя</label>
                    <input
                      className="input"
                      placeholder="Камила Усманова"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="mono" style={{color:'var(--muted)', display:'block', marginBottom: 8}}>Компания</label>
                    <input
                      className="input"
                      placeholder="Brand Co."
                      value={form.company}
                      onChange={e => setForm({...form, company: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="mono" style={{color:'var(--muted)', display:'block', marginBottom: 8}}>Задача & Бюджет</label>
                    <textarea
                      className="input"
                      placeholder="Выход на рынок Узбекистана к сентябрю. Бюджет обсуждается индивидуально."
                      value={form.task}
                      onChange={e => setForm({...form, task: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit" className="btn" style={{justifyContent:'center', marginTop: 4}}>
                    Получить расчет
                    <span className="arrow">→</span>
                  </button>
                  <div className="mono" style={{color:'var(--muted)', textAlign:'center', marginTop: 4, fontSize: 10}}>
                    Первичный расчет высылаем в течение 48 часов
                  </div>
                </form>
              ) : (
                <div style={{display:'flex', flexDirection:'column', gap: 16, alignItems:'center', textAlign:'center', padding: '20px 0'}}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 999,
                    background:'var(--accent)', border:'1.5px solid var(--ink)',
                    display:'grid', placeItems:'center', fontSize: 32
                  }}>✓</div>
                  <h3 className="display" style={{fontSize: 32, margin: 0}}>Свяжемся с вами!</h3>
                  <p style={{margin: 0, color:'var(--ink-soft)'}}>Бриф принят. Аналитики подготовят предварительные расчеты для вашей ниши в течение 48 часов.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer() {
  return <MunaFooter />;
}

Object.assign(window, { Hero, TopCases, Partners, WhyMuna, Services, Testimonials, FAQ, FinalCTA, Footer });
