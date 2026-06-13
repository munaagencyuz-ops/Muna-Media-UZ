// Muna Media — Influence Marketing Landing Page Sections
const { useState, useEffect, useRef } = React;


// ─────────────────────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────────────────────
function InfluenceHero() {
  return (
    <section id="influence-hero" style={{paddingTop: 100, paddingBottom: 60, overflow: 'hidden'}}>
      <div className="blob-shape" style={{
        width: 400, height: 400, background: 'var(--accent)',
        top: -100, right: -100, opacity: .12, filter: 'blur(80px)'
      }} />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28}}>
          <span className="pill solid"><span className="dot" /> Система инфлюенс-маркетинга</span>
          <span className="mono" style={{color: 'var(--muted)'}}>Оцифрованный окупаемость</span>
        </div>
        <h1 className="display" style={{fontSize: 'clamp(44px, 7vw, 88px)', margin: '0 0 28px', maxWidth: 1200, lineHeight: 1.05}}>
          Инфлюенс-маркетинг | <span className="serif" style={{fontFamily: 'Instrument Serif', fontStyle: 'italic'}}>Muna Media</span>
        </h1>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap', marginBottom: 44}}>
          <p style={{fontSize: 20, lineHeight: 1.5, maxWidth: 780, margin: 0, color: 'var(--ink-soft)'}}>
            Muna Media обеспечивает оптимизацию ценности клиента и стоимости привлечения для инфлюенс-маркетинга. Мы защищаем вашу репутацию, гарантируем прозрачное ценообразование и результаты.
          </p>
          <div style={{display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6}}>
            <a href="#influence-cta" className="btn lime" style={{background: 'var(--accent)', color: 'white'}}>
              Заказать медиаплан
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. THE PROBLEM
// ─────────────────────────────────────────────────────────────
function InfluenceProblem() {
  const problems = [
    { title: 'Скрытые агентские наценки и откаты', desc: 'Бюджет уходит в непрозрачные комиссии, а реальная стоимость инвентаря остается скрытой.' },
    { title: 'Непредсказуемый окупаемость', desc: 'Кампании часто оценивают по охватам и лайкам, без отслеживания бизнес-метрик стоимость привлечения и ценность клиента.' },
    { title: 'Репутационный ущерб', desc: 'Плохо проверенные локальные инфлюенсеры могут создавать комплаенс- и культурные риски.' },
    { title: 'Кассовые разрывы', desc: 'Авансовые платежи за размещения создают финансовую нагрузку до получения результата.' }
  ];
  return (
    <section id="influence-problem" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 02 — Проблематика</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Теряете деньги на непрозрачных кампаниях с инфлюенсерами?</h2>
          </div>
          <p style={{maxWidth: 400, color: 'var(--ink-soft)', margin: 0}}>
            Модель открытого ценообразования от Muna Media и жесткий регламент ответа гарантируют прозрачность, аудит каждого креатора и связь расходов с продажами.
          </p>
        </div>
        <div className="grid-2" style={{gap: 32}}>
          {problems.map((p, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>РИСК 0{idx+1} //</span>
              <h3 className="display" style={{fontSize: 24, margin: 0}}>{p.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. WHY TRADITIONAL ADS AREN'T ENOUGH
// ─────────────────────────────────────────────────────────────
function InfluenceWhyAds() {
  return (
    <section id="influence-ads" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="grid-2" style={{gap: 56, alignItems: 'center'}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 03 — Усталость рынка</span>
            </div>
            <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 28px', lineHeight: 1.05}}>
              Почему ведущие бренды выбирают Инфлюенс-маркетинг с Muna Media?
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 20px'}}>
              Защита репутации (аудит репутации): мы проверяем каждого инфлюенсера, чтобы исключить комплаенс- и культурные риски.
            </p>
            <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', margin: 0}}>
              Прозрачная юнит-экономика: расходы на инфлюенсеров напрямую связываются с стоимость привлечения и ценность клиента. Финансовое плечо: постоплата до 120 дней снижает риски кампаний.
            </p>
          </div>
          <div className="card" style={{padding: 40, background: 'var(--ink)', color: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 24}}>
            <h3 className="display" style={{fontSize: 28, margin: 0, color: 'var(--bg)'}}>Ключевые преимущества</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span>Защита репутации</span>
                  <span style={{color: 'var(--accent)'}}>аудит репутации</span>
                </div>
                <div style={{height: 8, background: '#333', borderRadius: 4, overflow: 'hidden'}}>
                  <div style={{width: '92%', height: '100%', background: 'var(--accent)'}} />
                </div>
              </div>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span>Постоплата и открытая смета</span>
                  <span>120 дней</span>
                </div>
                <div style={{height: 8, background: '#333', borderRadius: 4, overflow: 'hidden'}}>
                  <div style={{width: '14%', height: '100%', background: '#fff'}} />
                </div>
              </div>
            </div>
            <p style={{margin: 0, fontSize: 13, color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic'}}>
              * По данным внутренних исследований Muna Media за 1 квартал 2026 года среди финтех- и ритейл-брендов в Узбекистане.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. THE INFLUENCE SYSTEM
// ─────────────────────────────────────────────────────────────
function InfluenceSystem() {
  const features = [
    { title: 'Анализ и проверка', desc: 'Глубокий аудит инфлюенсеров на безопасность бренда и пересечение аудиторий.' },
    { title: 'Медиазакупка с открытой сметой', desc: 'Ноль скрытых комиссий; вы видите точную стоимость инвентаря.' },
    { title: 'Дашборды в реальном времени', desc: 'Прямой доступ к Minora AI для отслеживания стоимости привлечения и ценности клиента онлайн.' },
    { title: 'регламент ответа и поддержка', desc: 'Поддержка 24/7 с гарантированным временем ответа 15 минут.' }
  ];
  return (
    <section id="influence-system" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 56}}>
          <div className="pill solid" style={{marginBottom: 16}}><span className="dot" /> 04 — Система Muna</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Комплексное решение для крупных брендов</h2>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {features.map((f, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--accent)', display: 'grid', placeItems: 'center',
                fontWeight: 700, fontSize: 18, color: 'white'
              }}>{idx+1}</div>
              <h3 className="display" style={{fontSize: 22, margin: 0}}>{f.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. AUTHORITY & BRAND TRUST
// ─────────────────────────────────────────────────────────────
function InfluenceTrust() {
  const partners = [
    { name: 'UnionPay', src: 'assets/partners/unionpay.svg', width: 118 },
    { name: 'Yadea', src: 'assets/partners/yadea.svg', width: 104 },
    { name: 'Yandex Eda', src: 'assets/partners/yandex-eda.svg', width: 130 },
    { name: 'flydubai', src: 'assets/partners/flydubai.png', width: 122 },
    { name: 'Honor', src: 'assets/partners/honor.png', width: 112 },
    { name: 'Huawei', src: 'assets/partners/huawei.jpg', width: 108 },
    { name: 'Airbus', src: 'assets/partners/airbus.png', width: 116 },
    { name: 'UNICEF', src: 'assets/partners/unicef.jpg', width: 112 },
    { name: 'UZBAT', src: 'assets/partners/uzbat.png', width: 108 },
    { name: 'Xiaomi', src: 'assets/partners/xiaomi.png', width: 120 },
  ];

  return (
    <section style={{padding: '60px 0', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24}}>
          <span className="mono" style={{color: 'var(--muted)', fontSize: 12}}>Нам доверяют глобальные лидеры:</span>
          <div style={{display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end'}}>
            {partners.map((partner) => (
              <span key={partner.name} className="logo-chip brand-logo-chip compact">
                <img
                  src={partner.src}
                  alt={partner.name}
                  style={{'--logo-w': `${partner.width}px`}}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. PERFORMANCE CASE STUDY
// ─────────────────────────────────────────────────────────────
function InfluenceCase() {
  return (
    <section id="influence-case" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 06 — Доказанный успех</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Xiaomi: запуск Redmi Note 14</h2>
          </div>
          <a href="koronapay.html" className="btn ghost">
            Читать другие кейсы
            <span className="arrow">→</span>
          </a>
        </div>
        <div className="card cta-grid" style={{padding: '48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center'}}>
          <div>
            <span className="sticker" style={{marginBottom: 16}}>+180% рост продаж</span>
            <h3 className="display" style={{fontSize: 36, margin: '0 0 20px'}}>Захват рынка за 30 дней</h3>
            <p style={{fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 24px'}}>
              Локализация глобального релиза смартфона Redmi Note 14 в Узбекистане. Мы отобрали 22 профильных макро- и микро-инфлюенсеров, исключили ботов, скоординировали контент в едином стиле и интегрировали ORM-контроль.
            </p>
            <div style={{display: 'flex', gap: 24}}>
              <div>
                <div className="num-big" style={{fontSize: 40, color: 'var(--accent)'}}>12k+</div>
                <div className="mono" style={{fontSize: 10, color: 'var(--muted)'}}>продаж в неделю 1</div>
              </div>
              <div>
                <div className="num-big" style={{fontSize: 40, color: 'var(--accent)'}}>4.2M</div>
                <div className="mono" style={{fontSize: 10, color: 'var(--muted)'}}>целевой охват</div>
              </div>
            </div>
          </div>
          <div className="ph" style={{height: 300}}>
            [Визуализация кампании Xiaomi]
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. WHAT'S INCLUDED (OUTCOMES FRAME)
// ─────────────────────────────────────────────────────────────
function InfluenceIncluded() {
  const items = [
    { result: 'Интеграции на результат', explanation: 'Кампании прямого отклика, оптимизированные под установки приложений или продажи.' },
    { result: 'Амбассадоры бренда', explanation: 'Долгосрочные партнерства для устойчивого доверия к бренду и ORM.' },
    { result: 'Telegram и инфлюенсеры', explanation: 'Специализированные посевы в самом важном канале коммуникации Узбекистана.' }
  ];
  return (
    <section id="influence-included" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 56}}>
          <div className="pill solid" style={{marginBottom: 16}}><span className="dot" /> 07 — Результаты системы</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Доступные форматы</h2>
        </div>
        <div className="grid-2" style={{gap: 32}}>
          {items.map((it, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>РЕЗУЛЬТАТ:</span>
              <h3 className="display" style={{fontSize: 24, margin: 0, fontWeight: 700}}>{it.result}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{it.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. HOW THE SYSTEM WORKS (THE SYSTEM FRAME)
// ─────────────────────────────────────────────────────────────
function InfluenceWorkflow() {
  const steps = [
    { step: '01', title: 'Анализ', desc: 'Оценка вашей цифровой зрелости и целевой юнит-экономики.' },
    { step: '02', title: 'Планирование', desc: 'Выбор проверенных креаторов и структурирование финансовой открытой финансовой модели.' },
    { step: '03', title: 'Исполнение', desc: 'Запуск кампаний с непрерывным мониторингом ORM.' },
    { step: '04', title: 'Отчетность и масштабирование', desc: 'Отслеживание в реальном времени через Minora AI и оптимизация под долгосрочную ценность клиента.' }
  ];
  return (
    <section id="influence-workflow" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 08 — Регламент</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Системный подход к Инфлюенс-маркетингу</h2>
          </div>
        </div>
        <div className="grid-4" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24}}>
          {steps.map((s, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="num-big" style={{fontSize: 48, color: 'var(--accent)'}}>{s.step}</span>
              <h3 className="display" style={{fontSize: 20, margin: 0}}>{s.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. KEY BUSINESS ADVANTAGES
// ─────────────────────────────────────────────────────────────
function InfluenceAdvantages() {
  const advantages = [
    { title: 'Модель открытого ценообразования', desc: 'Полная финансовая прозрачность и доверие.' },
    { title: 'Постоплата 120 дней', desc: 'Улучшение денежного потока и снижение финансовых рисков.' },
    { title: 'Интеграция с Telegram-маркетингом', desc: 'Охват ключевой узбекской аудитории там, где она проводит время.' },
    { title: 'Усиление через Aquabox LED', desc: 'Создание непрерывной цепочки контактов из офлайна в онлайн.' },
    { title: 'Жесткий регламент ответа', desc: 'Надежность уровня крупных брендов и спокойствие 24/7.' }
  ];
  return (
    <section style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 09 — Преимущества</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Преимущества для доминирования на рынке</h2>
          </div>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {advantages.map((adv, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{fontWeight: 700, fontSize: 18, color: 'var(--accent)'}}>✓ ПРЕИМУЩЕСТВО 0{idx+1}</div>
              <h3 className="display" style={{fontSize: 22, margin: 0}}>{adv.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6}}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. PRICING LOGIC (NO ACTUAL PRICES)
// ─────────────────────────────────────────────────────────────
function InfluencePricing() {
  return (
    <section id="influence-pricing" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="grid-2" style={{gap: 56, alignItems: 'center'}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 10 — Бюджетирование</span>
            </div>
            <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 28px', lineHeight: 1.05}}>
              Логика распределения бюджетов
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 20px'}}>
              Мы не продаем стандартные пакеты услуг. Каждый проект формируется индивидуально на основе ваших целевых показателей стоимости привлечения, планов масштабирования и текущих репутационных рисков.
            </p>
            <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', margin: 0}}>
              Все бюджеты распределяются прозрачно по формуле: 60% — чистая закупка инвентаря у авторов по себестоимости, 25% — аудит репутации и сопровождение, 15% — комиссия Muna Media за сквозную аналитику и управление.
            </p>
          </div>
          <div className="card" style={{padding: 40, display: 'flex', flexDirection: 'column', gap: 24}}>
            <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>БЮДЖЕТ ПРОЕКТА</span>
            <div className="num-big" style={{fontSize: 32, margin: '8px 0'}} className="display">Индивидуально</div>
            <div style={{fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Расчет под показатели и цели бизнеса</div>
            <hr style={{border: 0, borderTop: '1.5px solid var(--ink)', margin: '8px 0'}} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15}}>
              <div>✦ Закупка рекламы по прямой себестоимости</div>
              <div>✦ Персональный аккаунт-директор и команда аналитиков</div>
              <div>✦ Еженедельная отчетность по стоимости привлечения и ценности клиента</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 11. FAQ (OBJECTION CRUSHER)
// ─────────────────────────────────────────────────────────────
function InfluenceFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: 'Как вы измеряете успех?', a: 'Мы фокусируемся на стоимости привлечения, ценности клиента и росте продаж, а не только на лайках или охватах.' },
    { q: 'Что такое открытое ценообразование?', a: 'Вы оплачиваете точную стоимость инфлюенсера плюс нашу прозрачную комиссию за сопровождение и бонус за достижение результата.' },
    { q: 'Работаете ли вы с небольшими бюджетами?', a: 'Мы сотрудничаем с крупными клиентами. Бюджеты рассчитываются индивидуально под конкретные показатели кампании.' },
    { q: 'Как вы обеспечиваете безопасность бренда?', a: 'Мы проводим строгий аудит репутации всех потенциальных партнеров-инфлюенсеров.' },
    { q: 'Можете ли вы взять на себя финансовую логистику?', a: 'Да, мы управляем всеми локальными платежами и предлагаем постоплату до 120 дней.' }
  ];
  return (
    <section id="influence-faq" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container" style={{maxWidth: 1000}}>
        <div style={{textAlign: 'center', marginBottom: 48}}>
          <div className="pill solid" style={{marginBottom: 20}}><span className="dot" /> Вопросы</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Вопросы руководителей</h2>
        </div>
        <div>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                style={{borderTop: '1.5px solid var(--ink)', padding: '28px 0', cursor: 'pointer'}}
              >
                <div className="faq-q" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px'}}>
                  <div className="faq-title" style={{fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 600}}>{faq.q}</div>
                  <div className="faq-toggle" style={{
                    width: 44, height: 44, borderRadius: 999, border: '1.5px solid var(--ink)',
                    display: 'grid', placeItems: 'center', transition: 'background 0.2s, transform 0.2s',
                    background: isOpen ? 'var(--accent)' : 'transparent',
                    color: isOpen ? 'white' : 'var(--ink)'
                  }}>{isOpen ? '−' : '+'}</div>
                </div>
                <div className="faq-a" style={{maxHeight: isOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease'}}>
                  <p style={{margin: '16px 0 0', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.6}}>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 12. FINAL CTA & BOOKING WIDGET
// ─────────────────────────────────────────────────────────────
function InfluenceCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', budget: '' });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <section id="influence-cta" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card" style={{background: 'var(--ink)', color: 'var(--bg)', padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: -100, right: -100, width: 360, height: 360, borderRadius: 999, background: 'var(--accent)', opacity: .3, border: '1.5px solid var(--bg)'}} />
          <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56}} className="cta-grid">
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              <div className="sec-eyebrow">
                <span className="pill solid" style={{borderColor: 'var(--bg)', color: 'var(--bg)'}}><span className="dot" /> 12 — Решение</span>
              </div>
              <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0, color: 'var(--bg)', lineHeight: 1.05}}>Готовы оцифровать инфлюенс?</h2>
              <p style={{margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.78)', maxWidth: 480}}>
                «Если ваш инфлюенс-маркетинг невозможно измерить — вы просто теряете деньги прямо сейчас.»
              </p>
              <p style={{margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.6)'}}>
                Забронируйте встречу с нашими экспертами для разбора вашего медиаплана и подготовки сильного сценария выхода на рынок.
              </p>
            </div>
            <div style={{background: 'var(--bg)', color: 'var(--ink)', borderRadius: 24, padding: 32}}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Имя</label>
                    <input className="input" placeholder="Алишер Каримов" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Компания</label>
                    <input className="input" placeholder="E-com Group" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
                  </div>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Бюджет</label>
                    <select className="input" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} required style={{height: 58}}>
                      <option value="">Выберите масштаб проекта</option>
                      <option value="regional">Локальный запуск в Ташкенте</option>
                      <option value="national">Масштабная кампания по Узбекистану</option>
                      <option value="custom">Индивидуальный enterprise-формат</option>
                    </select>
                  </div>
                  <button type="submit" className="btn" style={{justifyContent: 'center', marginTop: 4, background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
                    Забронировать встречу
                    <span className="arrow">→</span>
                  </button>
                </form>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center', padding: '20px 0'}}>
                  <div style={{width: 72, height: 72, borderRadius: 999, background: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: 32, color: 'white'}}>✓</div>
                  <h3 className="display" style={{fontSize: 32, margin: 0}}>Заявка принята!</h3>
                  <p style={{margin: 0, color: 'var(--ink-soft)'}}>Управляющий партнер Muna Media свяжется с вами для подбора времени вводного звонка.</p>
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

Object.assign(window, {
  InfluenceHero,
  InfluenceProblem,
  InfluenceWhyAds,
  InfluenceSystem,
  InfluenceTrust,
  InfluenceCase,
  InfluenceIncluded,
  InfluenceWorkflow,
  InfluenceAdvantages,
  InfluencePricing,
  InfluenceFAQ,
  InfluenceCTA,
  Footer
});
