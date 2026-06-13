// Muna Media — About Us Sections
const { useState, useEffect, useRef } = React;


// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function AboutHero({ variant }) {
  return (
    <section id="about-hero" style={{paddingTop: 100, paddingBottom: 60, position:'relative', overflow:'hidden'}}>
      {/* decorative background blobs */}
      <div className="blob-shape" style={{
        width: 400, height: 400, background: 'var(--accent)',
        top: -100, right: -100, opacity: .12, filter:'blur(80px)'
      }} />
      
      <div className="container" style={{position:'relative', zIndex: 1}}>
        <div style={{display:'flex', alignItems:'center', gap: 14, marginBottom: 28}}>
          <span className="pill solid"><span className="dot"  /> Группа Muna Media</span>
          <span className="mono" style={{color:'var(--muted)'}}>Стандарт для крупных клиентов</span>
        </div>

        <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 100px)', margin: '0 0 28px', maxWidth: 1100, lineHeight: 1.05}}>
          Muna Media — рекламное агентство полного цикла для бизнес-клиентов и эффективного продвижения брендов.
        </h1>

        <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color:'var(--ink-soft)'}}>
          Мы не просто агентство. Мы — ваш надежный партнер в Узбекистане, связывающий маркетинг, IT и финансы для достижения результатов уровня крупных брендов.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// POSITIONING
// ─────────────────────────────────────────────────────────────
function Positioning() {
  return (
    <section id="positioning" style={{paddingTop: 40, borderTop:'1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head" style={{marginBottom: 56}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 01 — Кто мы</span>
            </div>
            <h2 className="display sec-title" style={{margin:0, maxWidth: 900}}>
              Наша миссия: снижение рисков при выходе международных корпораций на незнакомый рынок.
            </h2>
          </div>
        </div>

        <div className="grid-2" style={{gap: 40}}>
          <div className="card" style={{padding: 40, display: 'flex', flexDirection: 'column', gap: 20}}>
            <span className="mono" style={{color: 'var(--accent)', fontWeight: 700, fontSize: 13}}>01. Для международных брендов</span>
            <h3 className="display" style={{fontSize: 32, margin: 0}}>Безопасный вход и локализация</h3>
            <p style={{margin:0, color:'var(--ink-soft)', fontSize: 17, lineHeight: 1.6}}>Безопасный вход, локализация, юридическая безопасность для брендов уровня UnionPay и Xiaomi.</p>
          </div>
          <div className="card" style={{padding: 40, display: 'flex', flexDirection: 'column', gap: 20}}>
            <span className="mono" style={{color: 'var(--accent)', fontWeight: 700, fontSize: 13}}>02. Для локальных лидеров</span>
            <h3 className="display" style={{fontSize: 32, margin: 0}}>Стратегия, статус и аналитика</h3>
            <p style={{margin:0, color:'var(--ink-soft)', fontSize: 17, lineHeight: 1.6}}>Стратегия, аналитика и статус для финтеха, ритейла и e-commerce в Узбекистане.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SACRIFICE (Отличие Muna)
// ─────────────────────────────────────────────────────────────
function Sacrifice() {
  return (
    <section id="sacrifice" style={{background: 'var(--ink)', color: 'var(--bg)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      {/* decorative glow */}
      <div className="blob-shape" style={{
        width: 350, height: 350, background: 'var(--accent)',
        bottom: -50, right: -50, opacity: .2, filter:'blur(80px)'
      }} />

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 32, marginBottom: 56, flexWrap: 'wrap'}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill solid" style={{borderColor:'var(--bg)', color:'var(--bg)'}}>
                <span className="dot" /> 02 — Закон жертвы
              </span>
            </div>
            <h2 className="display sec-title" style={{margin:0, color: 'var(--bg)'}}>
              От чего мы отказались,<br /> чтобы стать лучшими.
            </h2>
          </div>
          <p style={{maxWidth: 380, color: 'rgba(255, 255, 255, 0.7)', margin: 0}}>От чего мы отказались, чтобы стать лучшими.</p>
        </div>

        <div className="grid-3" style={{gap: 32}}>
          {[
            ['Нет разовым проектам', 'Работаем только вдолгую по модели фиксированной комиссии и бонуса за результат.'],
            ['Индивидуальные бюджеты', 'Фокус на сегменте крупных клиентов с расчетом бюджетов под задачи бизнеса.'],
            ['Нет теневому инвентарю', 'Только оцифрованные данные через Minora AI.'],
          ].map(([title, desc], i) => (
            <div key={i} style={{
              padding: '32px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              <div className="mono" style={{color: 'var(--accent)', fontSize: 13, fontWeight: 700}}>0{i+1} // {title}</div>
              <p style={{margin:0, color: 'rgba(255, 255, 255, 0.8)', fontSize: 16, lineHeight: 1.6}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// LEADERSHIP & TEAM
// ─────────────────────────────────────────────────────────────
function Leadership() {
  return (
    <section id="leadership">
      <div className="container">
        <div className="sec-head" style={{marginBottom: 56}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 03 — Экспертиза</span>
            </div>
            <h2 className="display sec-title" style={{margin:0}}>
              Команда экспертов
            </h2>
          </div>
        </div>

        <div className="grid-2" style={{alignItems: 'center', gap: 56}}>
          <div>
            <p style={{fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 24px'}}>
              [Фото и видеовизитки ключевых руководителей]
            </p>
            <p style={{fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', margin: 0}}>
              Наш подход: синтез глобальных методологий с глубоким пониманием локальных культурных кодов Узбекистана.
            </p>
          </div>
          
          <div className="card cta-grid" style={{padding: 24, background: 'var(--bg-2)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center'}}>
            <div className="ph" style={{height: 240, background: 'var(--bg)'}}>
              [Фото основателей]
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              <div style={{fontWeight: 700, fontSize: 20}}>Руководство Muna</div>
              <div className="mono" style={{color: 'var(--muted)', fontSize: 11}}>Ташкент · Узбекистан</div>
              <p style={{margin: 0, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.4}}>
                Ключевые партнеры лично вовлечены во все проекты уровня крупных клиентов и несут репутационную ответственность за результат.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GUARANTEES (Стандарт крупных клиентов)
// ─────────────────────────────────────────────────────────────
function Guarantees() {
  const items = [
    {
      title: 'Постоплата до 120 дней',
      desc: 'Для крупнейших корпоративных партнеров мы предлагаем гибкие условия постоплаты и рассрочки платежей, снижая нагрузку на финансовые департаменты при выходе на рынок.'
    },
    {
      title: 'Радикальная прозрачность и открытое ценообразование',
      desc: 'Никаких скрытых наценок. Клиенты видят реальные входящие счета от инфлюенсеров и операторов рекламы в реальном времени. Фиксируется только наша оговоренная комиссия.'
    },
    {
      title: 'Тотальный аудит субподрядчиков',
      desc: 'Полный аудит субподрядчиков и легализация процессов для финансовой и операционной безопасности.'
    }
  ];

  return (
    <section id="guarantees" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 04 — Безопасность</span>
            </div>
            <h2 className="display sec-title" style={{margin:0}}>
              Гарантии для крупных клиентов
            </h2>
          </div>
          <p style={{maxWidth: 380, fontSize: 16, color:'var(--ink-soft)', margin: 0}}>
            Мы берем на себя операционные риски, чтобы обеспечить полную финансовую предсказуемость вашего маркетинга.
          </p>
        </div>

        <div className="grid-3" style={{gap: 32}}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--accent)', display: 'grid', placeItems: 'center',
                fontWeight: 700, fontSize: 18
              }}>✓</div>
              <h3 className="display" style={{fontSize: 22, margin: 0, fontWeight: 700}}>{it.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6}}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SLA (Service Level Agreement)
// ─────────────────────────────────────────────────────────────
function SLA() {
  return (
    <section id="sla">
      <div className="container">
        <div className="sec-head" style={{marginBottom: 56}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 05 — Регламенты</span>
            </div>
            <h2 className="display sec-title" style={{margin:0}}>
              Жесткий Service Level Agreement
            </h2>
          </div>
        </div>

        <div className="grid-2" style={{gap: 40}}>
          <div className="card" style={{
            padding: 48,
            background: 'var(--ink)',
            color: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 20
          }}>
            <div className="num-big" style={{fontSize: 'clamp(64px, 8vw, 100px)', color: 'var(--accent)'}}>99.99%</div>
            <div style={{fontWeight: 700, fontSize: 24, margin: 0}}>Доступность технологической инфраструктуры</div>
            <p style={{margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: 16, lineHeight: 1.6}}>
              Наши сквозные дашборды, системы трекинга инфлюенсеров и аналитические базы данных работают бесперебойно в режиме 24/7.
            </p>
          </div>

          <div className="card" style={{
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 20
          }}>
            <div className="num-big" style={{fontSize: 'clamp(64px, 8vw, 100px)', color: 'var(--accent)'}}>15 мин</div>
            <div style={{fontWeight: 700, fontSize: 24, margin: 0, color: 'var(--ink)'}}>Время ответа поддержки</div>
            <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>
              Каждому крупному клиенту выделяется личный аккаунт-директор и команда аналитиков в Telegram-чате с регламентированной скоростью реагирования.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PRINCIPLES & MANIFEST
// ─────────────────────────────────────────────────────────────
function Principles() {
  return (
    <section id="principles" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container" style={{maxWidth: 1000}}>
        <div style={{textAlign: 'center', marginBottom: 48}}>
          <div className="pill solid" style={{marginBottom: 20}}><span className="dot" /> Принципы Muna</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Манифест ответственности</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 32, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)'}}>
          <blockquote style={{
            margin: 0,
            paddingLeft: 24,
            borderLeft: '4px solid var(--accent)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--ink)',
            fontFamily: 'Instrument Serif'
          }}>
            «Решения принимаются на данных, а не интуиции. Мы кредитуем клиента и несем ответственность за юнит-экономику.»
          </blockquote>
          <p>
            1. <strong>Данные вместо интуиции.</strong> Каждый шаг опирается на цифры, тесты и прогнозную юнит-экономику.
          </p>
          <p>
            2. <strong>Ответственность за юнит-экономику.</strong> Мы кредитуем клиента и связываем маркетинговые решения с стоимостью привлечения и ценностью клиента.
          </p>
          <p>
            3. <strong>Защита репутации заранее.</strong> Мы защищаем вашу репутацию до того, как угрозы обрушат воронку продаж.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CTA & CONTACTS
// ─────────────────────────────────────────────────────────────
function AboutCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', task: '' });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="about-cta" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card" style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          padding: 'clamp(40px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* background blob */}
          <div style={{
            position:'absolute', top: -100, right: -100,
            width: 360, height: 360, borderRadius: 999,
            background:'var(--accent)', opacity: .3,
            border:'1.5px solid var(--bg)',
          }} />

          <div style={{position:'relative', zIndex: 1, display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 56}} className="cta-grid">
            <div style={{display:'flex', flexDirection:'column', gap: 24}}>
              <div className="sec-eyebrow">
                <span className="pill solid" style={{borderColor:'var(--bg)', color:'var(--bg)'}}>
                  <span className="dot" /> 06 — Контакты
                </span>
              </div>
              <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0, color:'var(--bg)', lineHeight: 1.05}}>
                Хотите обсудить стратегию выхода на рынок Узбекистана?
              </h2>
              <p style={{margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.78)', maxWidth: 480}}>
                Забронируйте встречу, и мы обсудим безопасный вход, локализацию и маркетинговую архитектуру для вашего бренда.
              </p>
              
              <div style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop:'1px solid rgba(255,255,255,0.18)',
                display:'flex', flexDirection: 'column', gap: 16
              }}>
                <div style={{fontSize: 16, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)'}}>
                  <strong>Головной офис Ташкент:</strong><br />
                  Узбекистан, г. Ташкент, ул. Амира Темура, 107Б<br />
                  Бизнес-центр «International», 4 этаж
                </div>
                <div>
                  <div className="mono" style={{opacity:.6, fontSize: 11}}>Прямая линия</div>
                  <a href="mailto:hello@muna.media" style={{color:'var(--bg)', textDecoration:'none', fontSize: 18, fontWeight: 600}}>
                    hello@muna.media
                  </a>
                </div>
              </div>
            </div>

            {/* form */}
            <div style={{
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
                    <label className="mono" style={{color:'var(--muted)', display:'block', marginBottom: 8}}>Планируемый бюджет</label>
                    <select
                      className="input"
                      value={form.task}
                      onChange={e => setForm({...form, task: e.target.value})}
                      required
                      style={{height: 58}}
                    >
                      <option value="">Выберите диапазон бюджетов</option>
                      <option value="10k-20k">от $10,000 до $20,000 / мес</option>
                      <option value="20k-50k">от $20,000 до $50,000 / мес</option>
                      <option value="50k+">более $50,000 / мес</option>
                    </select>
                  </div>
                  <button type="submit" className="btn" style={{justifyContent:'center', marginTop: 4}}>
                    Забронировать встречу
                    <span className="arrow">→</span>
                  </button>
                </form>
              ) : (
                <div style={{display:'flex', flexDirection:'column', gap: 16, alignItems:'center', textAlign:'center', padding: '20px 0'}}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 999,
                    background:'var(--accent)', border:'1.5px solid var(--ink)',
                    display:'grid', placeItems:'center', fontSize: 32
                  }}>✓</div>
                  <h3 className="display" style={{fontSize: 32, margin: 0}}>Запрос отправлен!</h3>
                  <p style={{margin: 0, color:'var(--ink-soft)'}}>Управляющий партнер свяжется с вами по указанному email для подбора времени конфиденциального звонка.</p>
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

Object.assign(window, { AboutHero, Positioning, Sacrifice, Leadership, Guarantees, SLA, Principles, AboutCTA, Footer });
