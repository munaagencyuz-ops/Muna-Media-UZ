// Muna Media — Korona Pay Case Study Page Sections
const { useState, useEffect, useRef } = React;


// ─────────────────────────────────────────────────────────────
// 1. HERO (Overview & Key Metrics)
// ─────────────────────────────────────────────────────────────
function KPHero() {
  return (
    <section id="kp-hero" style={{paddingTop: 100, paddingBottom: 60, overflow: 'hidden'}}>
      <div className="blob-shape" style={{
        width: 400, height: 400, background: 'var(--accent)',
        top: -100, right: -100, opacity: .12, filter: 'blur(80px)'
      }} />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28}}>
          <span className="pill solid"><span className="dot" /> Финтех-кейс</span>
          <span className="mono" style={{color: 'var(--muted)'}}>Korona Pay · Локализация</span>
        </div>
        <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1200, lineHeight: 1.05}}>
          KoronaPay: кампания для роста переводов и <span className="serif" style={{fontFamily: 'Instrument Serif', fontStyle: 'italic'}}>доверия</span> в Узбекистане.
        </h1>
        
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap', marginBottom: 44}}>
          <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 820, margin: 0, color: 'var(--ink-soft)'}}>
            За 2021-2022 годы Muna Media помогла KoronaPay провести масштабную кампанию по всему Узбекистану: интеграции с инфлюенсерами, наружные размещения и логика рекламы на результат работали на загрузки, регистрации и снижение дефицита доверия.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 0,
          border: '1.5px solid var(--ink)',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'var(--cream-card)'
        }}>
          {[
            ['344 762', 'просмотра у инфлюенсеров'],
            ['4 918', 'взаимодействий с контентом'],
            ['2 486', 'кликов после интеграций'],
            ['$300k', 'бюджет кампании'],
          ].map(([n, t], i) => (
            <div key={i} style={{
              padding: '24px 28px',
              borderRight: '1.5px solid var(--ink)',
              borderBottom: '1.5px solid var(--ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div className="num-big" style={{fontSize: 48, color: 'var(--accent)'}}>{n}</div>
              <div className="mono" style={{color: 'var(--muted)', fontSize: 11}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. CHALLENGE (Проблема & Цели)
// ─────────────────────────────────────────────────────────────
function KPChallenge() {
  return (
    <section id="kp-challenge" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="grid-2" style={{gap: 56, alignItems: 'center'}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 02 — Вызов</span>
            </div>
            <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 28px', lineHeight: 1.05}}>
              Задача: перевести аудиторию из офлайна в приложение.
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 20px'}}>
              Клиенту нужно было инициировать трехмесячную маркетинговую кампанию по всему Узбекистану и увеличить объем переводов в Россию через приложение KoronaPay.
            </p>
            <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', margin: 0}}>
              Главный барьер заключался в стимулировании загрузок и регистраций при одновременном преодолении значительного дефицита доверия к финансовым переводам.
            </p>
          </div>
          <div className="card" style={{padding: 40, display: 'flex', flexDirection: 'column', gap: 20}}>
            <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>КЛЮЧЕВЫЕ БАРЬЕРЫ:</span>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              <div>
                <strong>✕ Рынок:</strong> коридор денежных переводов из Узбекистана в Россию.
              </div>
              <div>
                <strong>✕ Проблема:</strong> санкционный фон и мошенничество усилили дефицит доверия.
              </div>
              <div>
                <strong>✕ Конкуренты:</strong> локальные SuperApps вроде Uzum и Click удерживали привычку пользователей.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. SOLUTION (Решение Muna)
// ─────────────────────────────────────────────────────────────
function KPSolution() {
  const steps = [
    { title: 'Позиционирование', desc: 'Создали категорию одного: KoronaPay как специалист по безопасной трансграничной поддержке семей.' },
    { title: 'Тройная гарантия безопасности', desc: 'Сделали акцент на европейской лицензии EMI, PCI DSS и поддержке 24/7, чтобы снизить страх перед переводом.' },
    { title: 'Гибридные медиа', desc: 'Соединили рекламу на результат с наружной рекламой, LED-экранами, автобусами, метро и инфлюенс-маркетингом для формирования доверия.' }
  ];
  return (
    <section id="kp-solution" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 56}}>
          <div className="pill solid" style={{marginBottom: 16}}><span className="dot" /> 03 — Стратегия</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Стратегическая реализация</h2>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {steps.map((s, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700, fontSize: 13}}>STAGE 0{idx+1} //</span>
              <h3 className="display" style={{fontSize: 22, margin: 0}}>{s.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. RESULTS (Итоговые результаты)
// ─────────────────────────────────────────────────────────────
function KPResults() {
  return (
    <section id="kp-results" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 04 — Результаты</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Оцифрованные достижения</h2>
          </div>
        </div>
        <div className="card cta-grid" style={{padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center'}}>
          <div className="ph" style={{height: 320}}>
            [Медиамикс KoronaPay]
          </div>
          <div>
            <span className="sticker" style={{marginBottom: 16}}>344 762 просмотра</span>
            <h3 className="display" style={{fontSize: 32, margin: '0 0 20px'}}>Измеримое влияние кампании</h3>
            <p style={{fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 24px'}}>
              Кампания успешно перевела пользователей из офлайн-каналов в мобильное приложение и снизила операционные расходы. Интеграции с инфлюенсерами дали 344 762 просмотра, 4 918 взаимодействий и 2 486 кликов, а наружная реклама усилил доверие в ключевых городских точках.
            </p>
            <div style={{display: 'flex', gap: 24}}>
              <div>
                <div className="num-big" style={{fontSize: 36, color: 'var(--accent)'}}>27</div>
                <div className="mono" style={{fontSize: 10, color: 'var(--muted)'}}>LED-экранов</div>
              </div>
              <div>
                <div className="num-big" style={{fontSize: 36, color: 'var(--accent)'}}>15</div>
                <div className="mono" style={{fontSize: 10, color: 'var(--muted)'}}>станций метро</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. CONCLUSIONS (Выводы для бизнеса)
// ─────────────────────────────────────────────────────────────
function KPConclusions() {
  return (
    <section id="kp-conclusions" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container" style={{maxWidth: 1000}}>
        <div style={{textAlign: 'center', marginBottom: 48}}>
          <div className="pill solid" style={{marginBottom: 20}}><span className="dot" /> Выводы</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Выводы для fintech-брендов</h2>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 32, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)'}}>
          <p>
            1. <strong>Доверие первее рекламы.</strong> В финансовом секторе сначала нужно доказать безопасность и понятность продукта, а уже потом масштабировать рекламу на результат.
          </p>
          <p>
            2. <strong>Гибридные медиа усиливают привычку пользоваться сервисом.</strong> Наружная реклама формирует узнаваемость, а интеграции с инфлюенсерами дают человеческое доказательство и переходы в приложение.
          </p>
          <p>
            3. <strong>Локальный контекст решает.</strong> Кампания должна говорить с аудиторией через привычные каналы и учитывать конкуренцию локальных SuperApps.
          </p>
        </div>
        <div style={{textAlign: 'center', marginTop: 56}}>
          <a href="index.html#contact" className="btn lime" style={{background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
            Запустить аналогичный проект
            <span className="arrow">→</span>
          </a>
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

Object.assign(window, {
  KPHero,
  KPChallenge,
  KPSolution,
  KPResults,
  KPConclusions,
  Footer
});
