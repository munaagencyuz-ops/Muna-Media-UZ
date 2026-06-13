// Muna Media — Services Uzbekistan Page Sections
const { useState, useEffect, useRef } = React;


// ─────────────────────────────────────────────────────────────
// 1. HERO SECTION
// ─────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <section id="hero" style={{paddingTop: 100, paddingBottom: 60, overflow: 'hidden'}}>
      <div className="blob-shape" style={{
        width: 400, height: 400, background: 'var(--accent)',
        top: -100, right: -100, opacity: .12, filter: 'blur(80px)'
      }} />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28}}>
          <span className="pill solid"><span className="dot" /> Маркетинговые решения</span>
          <span className="mono" style={{color: 'var(--muted)'}}>Uzbekistan</span>
        </div>
        <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1100, lineHeight: 1.05}}>
          Рекламные услуги полного цикла в Узбекистане | Muna Media
        </h1>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap', marginBottom: 44}}>
          <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: 'var(--ink-soft)'}}>
            Muna Media реализует комплексные решения для выхода на рынок Узбекистана. Мы управляем юнит-экономикой, снижаем стоимость привлечения и защищаем репутацию бренда.
          </p>
          <div style={{display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6}}>
            <a href="#contact" className="btn lime" style={{background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
              Забронировать встречу
              <span className="arrow">→</span>
            </a>
            <a href="koronapay.html" className="btn ghost">
              Смотреть кейсы
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. WHY CHOOSE MUNA MEDIA
// ─────────────────────────────────────────────────────────────
function ServicesWhy() {
  const benefits = [
    { title: 'Постоплата до 120 дней', desc: 'Кредитуем ваш маркетинг, обеспечивая комфортный цикл планирования и берем на себя финансовые риски.' },
    { title: 'Радикальная прозрачность', desc: 'Никаких скрытых наценок. Модель открытого ценообразования через личный кабинет Minora AI.' },
    { title: 'Тотальный аудит', desc: 'Исключаем налоговые риски и серые схемы при работе с локальными подрядчиками.' }
  ];
  return (
    <section id="why-choose" style={{background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 02 — Почему мы</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Почему глобальные бренды выбирают Muna Media?</h2>
          </div>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {benefits.map((b, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>ПРЕИМУЩЕСТВО 0{idx+1} //</span>
              <h3 className="display" style={{fontSize: 22, margin: 0}}>{b.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6}}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. PROBLEM ➔ SOLUTION SECTION
// ─────────────────────────────────────────────────────────────
function ServicesProblemSolution() {
  const problems = [
    'Мелкие агентства не несут ответственности за бизнес-метрики.',
    'Непрозрачные наценки и скрытые комиссии съедают бюджет.',
    'Культурные ошибки в локализации рушат репутацию бренда.',
    'Отсутствие единой стратегии между технологиями, маркетингом и финансами.'
  ];
  const solutions = [
    'Мы не продаем стандартные услуги.',
    'Выступаем как ваш бизнес-интегратор в Узбекистане.',
    'Связываем затраты с реальной ценностью клиента и стоимостью привлечения.',
    'Наш регламент ответа гарантирует доступность 99.99% и ответ за 15 минут.'
  ];
  return (
    <section id="problem-solution" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head" style={{marginBottom: 56}}>
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 03 — Трансформация</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Устали от агентств, продающих только «клики» и «креатив»?</h2>
          </div>
          <p style={{maxWidth: 420, color: 'var(--ink-soft)', margin: 0}}>
            Мы решаем реальные проблемы бизнеса: от прозрачности бюджета до связки маркетинга с юнит-экономикой.
          </p>
        </div>
        <div className="grid-2" style={{gap: 48}}>
          <div className="card" style={{padding: 40, border: '1.5px solid var(--ink)', background: 'var(--bg-2)'}}>
            <h3 className="display" style={{fontSize: 28, margin: '0 0 24px', color: 'var(--ink)'}}>Проблемы рынка:</h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16}}>
              {problems.map((p, i) => (
                <li key={i} style={{display: 'flex', gap: 12, fontSize: 16, color: 'var(--ink-soft)'}}>
                  <span style={{color: 'red', fontWeight: 700}}>✕</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{padding: 40, background: 'var(--ink)', color: 'var(--bg)', display: 'flex', flexDirection: 'column'}}>
            <h3 className="display" style={{fontSize: 28, margin: '0 0 24px', color: 'var(--bg)'}}>Решения Muna Media:</h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16, flexGrow: 1}}>
              {solutions.map((s, i) => (
                <li key={i} style={{display: 'flex', gap: 12, fontSize: 16, color: 'rgba(255,255,255,0.85)'}}>
                  <span style={{color: 'var(--accent)', fontWeight: 700}}>✓</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. AVAILABLE SERVICE FORMATS
// ─────────────────────────────────────────────────────────────
function ServicesFormats() {
  const formats = [
    {
      id: 'service-led',
      href: 'led-screens.html',
      title: 'LED-экраны',
      desc: 'Городские LED-размещения для сильного визуального охвата.',
      deliverables: ['Подбор экранов', 'Медиаплан', 'Адаптация роликов'],
      outcomes: 'Высокая частота контакта в ключевых городских точках.'
    },
    {
      id: 'service-gas',
      href: 'gas-station-ads.html',
      title: 'Реклама на АЗС',
      desc: 'Носители на заправках для аудитории автомобилистов.',
      deliverables: ['Выбор сети', 'Макеты', 'Контроль размещений'],
      outcomes: 'Регулярный контакт с платежеспособной городской аудиторией.'
    },
    {
      id: 'service-malls',
      href: 'mall-ads.html',
      title: 'Реклама в торговых центрах',
      desc: 'Внутренние форматы, навигация и промо-точки рядом с покупкой.',
      deliverables: ['Подбор ТЦ', 'План размещений', 'Промо-механика'],
      outcomes: 'Рост узнаваемости в местах принятия решения.'
    },
    {
      id: 'service-buses',
      href: 'bus-ads.html',
      title: 'Реклама на автобусах',
      desc: 'Брендирование транспорта для массового городского охвата.',
      deliverables: ['Маршруты', 'Дизайн адаптация', 'Фотоотчет'],
      outcomes: 'Широкая видимость бренда на ежедневных маршрутах.'
    },
    {
      id: 'service-bus-stops',
      href: 'bus-stop-ads.html',
      title: 'Реклама на автобусных остановках',
      desc: 'Сити-форматы и остановочные павильоны в точках ожидания.',
      deliverables: ['Карта локаций', 'Макеты', 'Контроль выхода'],
      outcomes: 'Частый контакт с пешеходной и транспортной аудиторией.'
    },
    {
      id: 'service-metro',
      href: 'metro-ads.html',
      title: 'Реклама в метро',
      desc: 'Размещения на станциях и в переходах с высоким потоком.',
      deliverables: ['Станции', 'Форматы', 'Период размещения'],
      outcomes: 'Стабильная частота контакта в транспортной среде.'
    },
    {
      id: 'service-airport',
      href: 'airport-ads.html',
      title: 'Реклама в аэропорту',
      desc: 'Премиальные форматы для деловой и туристической аудитории.',
      deliverables: ['Зоны аэропорта', 'Форматы', 'Производство макетов'],
      outcomes: 'Имиджевое присутствие среди международной аудитории.'
    },
    {
      id: 'service-seo',
      href: 'seo-optimization.html',
      title: 'SEO-оптимизация',
      desc: 'Техническая, контентная и локальная оптимизация сайта.',
      deliverables: ['Аудит сайта', 'Семантика', 'Контент-план'],
      outcomes: 'Рост органического спроса и заявок из поиска.'
    },
    {
      id: 'service-context',
      href: 'context-ads.html',
      title: 'Контекстная реклама',
      desc: 'Поисковые и медийные кампании с прозрачной аналитикой.',
      deliverables: ['Настройка кампаний', 'Креативы', 'Оптимизация заявок'],
      outcomes: 'Управляемый поток обращений и понятная стоимость привлечения.'
    },
    {
      id: 'service-smm',
      href: 'smm.html',
      title: 'SMM',
      desc: 'Ведение соцсетей, контент-план и визуальная система бренда.',
      deliverables: ['Стратегия', 'Контент', 'Комьюнити-менеджмент'],
      outcomes: 'Регулярная коммуникация и рост доверия к бренду.'
    },
    {
      id: 'service-influence',
      href: 'influencer-marketing.html',
      title: 'Инфлюенс-маркетинг',
      desc: 'Подбор блогеров, закупка и аналитика.',
      deliverables: ['Аудит аудитории', 'Контрактование', 'Контроль публикаций'],
      outcomes: 'Максимальный охват чистой целевой аудитории.'
    },
    {
      id: 'service-telegram',
      href: 'telegram-marketing.html',
      title: 'Telegram-маркетинг',
      desc: 'Посевы и реклама в ключевом канале региона.',
      deliverables: ['Подбор каналов', 'Прямая закупка', 'Отчетность'],
      outcomes: 'Локальное доминирование бренда в Telegram-сообществах.'
    },
    {
      id: 'service-events',
      href: 'event-management.html',
      title: 'Ивент-менеджмент',
      desc: 'Презентации, промо-мероприятия и запуски продуктов.',
      deliverables: ['Сценарий', 'Подрядчики', 'Координация события'],
      outcomes: 'Сильный офлайн-контакт с аудиторией и партнерами.'
    }
  ];
  return (
    <section id="services-formats" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 56}}>
          <div className="pill solid" style={{marginBottom: 16}}><span className="dot" /> 04 — Экспертиза</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Наши ключевые экспертизы</h2>
        </div>
        <div className="grid-2" style={{gap: 32}}>
          {formats.map((f, idx) => (
            <div id={f.id} key={idx} className="card" style={{padding: 40, display: 'flex', flexDirection: 'column', gap: 20, scrollMarginTop: 110}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>ФОРМАТ 0{idx+1} //</span>
              <h3 className="display" style={{fontSize: 28, margin: 0}}>{f.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.5}}>{f.desc}</p>
              <div style={{borderTop: '1px solid var(--bg-2)', paddingTop: 16}}>
                <div className="mono" style={{color: 'var(--muted)', marginBottom: 8}}>Работы:</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                  {f.deliverables.map((d, i) => (
                    <span key={i} className="tag">{d}</span>
                  ))}
                </div>
              </div>
              <div style={{borderTop: '1px solid var(--bg-2)', paddingTop: 16}}>
                <div className="mono" style={{color: 'var(--muted)', marginBottom: 4}}>Итоговый результат:</div>
                <div style={{fontWeight: 600, color: 'var(--ink)'}}>{f.outcomes}</div>
              </div>
              <a href={f.href} className="btn ghost" style={{justifyContent: 'center', marginTop: 'auto'}}>
                Открыть услугу
                <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. WHAT'S INCLUDED
// ─────────────────────────────────────────────────────────────
function ServicesIncluded() {
  const inclusions = [
    { title: 'Выделенная команда', desc: 'Доступ к экспертам 24/7 через выделенную линию.' },
    { title: 'Доступ к Minora AI', desc: 'Дашборды в реальном времени для контроля каждого цента.' },
    { title: 'Легализация процессов', desc: 'Полный аудит субподрядчиков и налоговая безопасность.' },
    { title: 'Стратегическое планирование', desc: 'Регулярный пересмотр юнит-экономики.' }
  ];
  return (
    <section id="whats-included" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 56}}>
          <div className="pill solid" style={{marginBottom: 16}}><span className="dot" /> 05 — Комплекс</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Что входит в стоимость</h2>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {inclusions.map((inc, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 14}}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'var(--accent)', display: 'grid', placeItems: 'center',
                fontWeight: 700, color: 'white', fontSize: 16
              }}>✓</div>
              <h3 className="display" style={{fontSize: 20, margin: 0, fontWeight: 700}}>{inc.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5}}>{inc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. HOW WE WORK
// ─────────────────────────────────────────────────────────────
function ServicesHowWeWork() {
  const steps = [
    { step: '01', title: 'Аудит', desc: 'Оценка вашей цифровой зрелости и текущих показателей.' },
    { step: '02', title: 'Стратегия', desc: 'Разработка модели с фиксированным фиксированной комиссии и бонуса за результат.' },
    { step: '03', title: 'Интеграция', desc: 'Подключение к дашбордам Minora AI и запуск кампаний.' },
    { step: '04', title: 'Оптимизация', desc: 'Ежедневный контроль стоимости привлечения и ценности клиента и защита репутации.' }
  ];
  return (
    <section id="how-we-work" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 06 — Процесс</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Системный подход к масштабированию</h2>
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
// 7. ADVANTAGES
// ─────────────────────────────────────────────────────────────
function ServicesAdvantages() {
  const advantages = [
    { title: 'Открытое ценообразование', desc: 'Вы платите только за реальный инвентарь, что дает экономию бюджета.' },
    { title: 'Регламент надежности 99.99%', desc: 'Бесперебойная работа технологической инфраструктуры и надежная поддержка.' },
    { title: 'Интеграция Telegram и инфлюенсеров', desc: 'Синергия каналов для максимального охвата и роста узнаваемости.' },
    { title: 'AEO & SEO', desc: 'Доминирование в ответах ChatGPT и Google, а также подготовка к будущему поиска.' },
    { title: 'Локальная экспертиза', desc: 'Глубокое понимание культурных кодов и защита от репутационных рисков.' }
  ];
  return (
    <section id="advantages" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow">
              <span className="pill"><span className="dot" /> 07 — Преимущества</span>
            </div>
            <h2 className="display sec-title" style={{margin: 0}}>Преимущества работы с нами</h2>
          </div>
        </div>
        <div className="grid-3" style={{gap: 32}}>
          {advantages.map((adv, idx) => (
            <div key={idx} className="card" style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{fontWeight: 700, fontSize: 18, color: 'var(--accent)'}}>✓ 0{idx+1}</div>
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
// 8. FAQ SECTION
// ─────────────────────────────────────────────────────────────
function ServicesFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: 'Работаете ли вы с небольшими бюджетами?', a: 'Все бюджеты рассчитываются и обсуждаются индивидуально под конкретные показатели и задачи вашего бизнеса для обеспечения максимального качества и выделения персональной аналитической команды.' },
    { q: 'Как вы измеряете эффективность кампаний?', a: 'Результаты привязываются строго к бизнес-метрикам: стоимости привлечения, ценности клиента, потоку сделок и скорости продаж. Мы не отчитываемся лайками.' },
    { q: 'Предоставляете ли вы условия постоплаты?', a: 'Да, для проверенных партнеров и корпораций мы предлагаем постоплату рекламного инвентаря на срок до 120 дней.' },
    { q: 'В чем суть модели открытого ценообразования?', a: 'Вы видите реальные счета от авторов и операторов наружной рекламы. Muna Media получает только фиксированную комиссию за управление и процент за достижение целей.' },
    { q: 'Как быстро вы реагируете на запросы?', a: 'По нашему регламенту ответа время ответа аккаунт-менеджера в выделенном Telegram-чате не превышает 15 минут в режиме 24/7.' }
  ];
  return (
    <section id="faq" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container" style={{maxWidth: 1000}}>
        <div style={{textAlign: 'center', marginBottom: 48}}>
          <div className="pill solid" style={{marginBottom: 20}}><span className="dot" /> Вопросы</div>
          <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0}}>Вопросы для руководителей маркетинга</h2>
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
// 9. CONTACT SECTION
// ─────────────────────────────────────────────────────────────
function ServicesContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', budget: '' });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <section id="contact" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card" style={{background: 'var(--ink)', color: 'var(--bg)', padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: -100, right: -100, width: 360, height: 360, borderRadius: 999, background: 'var(--accent)', opacity: .3, border: '1.5px solid var(--bg)'}} />
          <div style={{position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56}} className="cta-grid">
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              <div className="sec-eyebrow">
                <span className="pill solid" style={{borderColor: 'var(--bg)', color: 'var(--bg)'}}><span className="dot" /> 09 — Контакты</span>
              </div>
              <h2 className="display" style={{fontSize: 'clamp(36px, 5vw, 64px)', margin: 0, color: 'var(--bg)', lineHeight: 1.05}}>Начать стратегический проект</h2>
              <p style={{margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.78)', maxWidth: 480}}>
                «Если ваш маркетинг в Узбекистане не оцифрован и не имеет регламента ответа — вы теряете долю рынка прямо сейчас.»
              </p>
              <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15, color: 'rgba(255,255,255,0.85)'}}>
                <div><strong>Email:</strong> hello@muna.media</div>
                <div><strong>Телефон:</strong> +998 71 200-24-24</div>
                <div><strong>Telegram:</strong> @muna_media_B2B</div>
              </div>
            </div>
            <div style={{background: 'var(--bg)', color: 'var(--ink)', borderRadius: 24, padding: 32}}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Имя</label>
                    <input className="input" placeholder="Камиль Шарипов" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Компания</label>
                    <input className="input" placeholder="Название компании" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
                  </div>
                  <div>
                    <label className="mono" style={{color: 'var(--muted)', display: 'block', marginBottom: 8}}>Планируемый бюджет</label>
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
                  <h3 className="display" style={{fontSize: 32, margin: 0}}>Заявка получена!</h3>
                  <p style={{margin: 0, color: 'var(--ink-soft)'}}>Управляющий партнер Muna Media свяжется с вами для подбора времени разбора проекта.</p>
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
  ServicesHero,
  ServicesWhy,
  ServicesProblemSolution,
  ServicesFormats,
  ServicesIncluded,
  ServicesHowWeWork,
  ServicesAdvantages,
  ServicesFAQ,
  ServicesContact,
  Footer
});
