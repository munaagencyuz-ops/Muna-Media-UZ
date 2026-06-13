// Muna Media — Cases Hub Sections

function CasesHero() {
  return (
    <section id="cases-hero" style={{paddingTop: 100, paddingBottom: 60, overflow: 'hidden'}}>
      <div className="blob-shape" style={{
        width: 400, height: 400, background: 'var(--accent)',
        top: -100, right: -100, opacity: .12, filter: 'blur(80px)'
      }} />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap'}}>
          <span className="pill solid"><span className="dot" /> Case Hub</span>
          <span className="mono" style={{color: 'var(--muted)'}}>Результаты и примеры работ</span>
        </div>
        <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1150, lineHeight: 1.05}}>
          Кейсы и примеры работ | <span className="serif" style={{fontFamily: 'Instrument Serif', fontStyle: 'italic'}}>Muna Media</span>
        </h1>
        <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: 'var(--ink-soft)'}}>
          Подборка проектов Muna Media для международных и локальных брендов: запуск продуктов, промо, инфлюенсеры, наружная реклама и результативный маркетинг с привязкой к бизнес-метрикам.
        </p>
      </div>
    </section>
  );
}

function CasesGrid() {
  const cases = [
    {
      brand: 'Xiaomi',
      glyph: 'Mi',
      tag: 'Запуск продукта',
      title: 'Кейс Xiaomi',
      desc: 'Полная маркетинговая поддержка официального представительства: ведение соцсетей, визуальный контент, коллаборации и презентация Xiaomi 13T в Узбекистане.',
      metrics: [['Соцсети', 'социальные сети'], ['13T', 'презентация линейки'], ['PUBG', 'коллаборация']],
      href: 'xiaomi.html',
      tags: ['Инфлюенсеры', 'Наружка', 'Ритейл']
    },
    {
      brand: 'UnionPay',
      glyph: 'UP',
      tag: 'Промо / Ритейл',
      title: 'Кейс UnionPay',
      desc: '6-месячная промо-акция для роста транзакций в системе HUMO: сайт, Telegram-бот, розничные точки, таргетированная реклама, инфлюенсеры и Telegram-маркетинг.',
      metrics: [['6 мес', 'промо-кампания'], ['38', 'Telegram-каналов'], ['1.15M', 'охват публикаций']],
      href: 'unionpay.html',
      tags: ['Промо', 'Ритейл', 'Узнаваемость']
    },
    {
      brand: 'KoronaPay',
      glyph: 'KP',
      tag: 'Финтех / Кейс',
      title: 'Кейс Золотая Корона',
      desc: 'Трехмесячная маркетинговая кампания по всему Узбекистану для роста переводов через приложение и преодоления дефицита доверия.',
      metrics: [['344 762', 'просмотра'], ['4 918', 'взаимодействий'], ['2 486', 'кликов']],
      href: 'koronapay.html',
      tags: ['Финтех', 'Инфлюенсеры', 'Наружка']
    }
  ];

  return (
    <section id="case-list" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 01 — Кейсы</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Хаб кейсов</h2>
          </div>
          <p style={{maxWidth: 420, color: 'var(--ink-soft)', margin: 0}}>
            Детальные страницы доступны для Xiaomi, UnionPay и KoronaPay: можно открыть каждый кейс и посмотреть задачи, механику и результаты.
          </p>
        </div>

        <div className="grid-3" style={{gap: 28}}>
          {cases.map((item, idx) => (
            <article key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 440}}>
              <div style={{display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start'}}>
                <div className="logo-chip" style={{fontSize: 24, opacity: 1}}>
                  <span className="glyph">{item.glyph}</span>
                  {item.brand}
                </div>
                <span className="mono" style={{color: 'var(--muted)', textAlign: 'right'}}>{item.tag}</span>
              </div>
              <h3 className="display" style={{fontSize: 30, margin: 0}}>{item.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{item.desc}</p>
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1.5px solid var(--ink)', paddingTop: 18, marginTop: 'auto'}}>
                {item.metrics.map(([n, label], i) => (
                  <div key={i} style={{paddingRight: 12, paddingLeft: i > 0 ? 12 : 0, borderRight: i < 2 ? '1px dashed var(--ink)' : 'none'}}>
                    <div className="num-big" style={{fontSize: 30, color: 'var(--accent)'}}>{n}</div>
                    <div className="mono" style={{fontSize: 10, color: 'var(--muted)', marginTop: 8}}>{label}</div>
                  </div>
                ))}
              </div>
              <a
                href={item.href}
                className={item.disabled ? 'btn ghost' : 'btn lime'}
                style={{justifyContent: 'center', pointerEvents: item.disabled ? 'none' : 'auto', opacity: item.disabled ? .55 : 1}}
              >
                {item.disabled ? 'Скоро' : 'Открыть кейс'}
                <span className="arrow">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesCTA() {
  return (
    <section id="cases-cta" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card" style={{padding: 'clamp(40px, 6vw, 72px)', background: 'var(--ink)', color: 'var(--bg)', textAlign: 'center'}}>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 20px', color: 'var(--bg)'}}>
            Хотите такой же разбор для вашего бренда?
          </h2>
          <p style={{margin: '0 auto 28px', maxWidth: 720, color: 'rgba(255,255,255,.78)', fontSize: 18}}>
            Оставьте заявку, и мы подготовим сценарий выхода на рынок Узбекистана с прогнозом стоимости привлечения, ценности клиента и репутационных рисков.
          </p>
          <a href="index.html#contact" className="btn lime" style={{background: 'var(--accent)', color: 'var(--bg)'}}>
            Запустить проект
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <MunaFooter />;
}

Object.assign(window, { CasesHero, CasesGrid, CasesCTA, Footer });
