// Muna Media — service detail page sections

function ServiceHero() {
  const s = getServicePage();
  React.useEffect(() => {
    document.title = `${s.title} | Muna Media`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', s.intro);
  }, [s.title, s.intro]);

  return (
    <section id="hero" style={{paddingTop: 96, paddingBottom: 56, overflow: 'hidden'}}>
      <div className="blob-shape" style={{
        width: 420, height: 420, background: 'var(--accent)',
        top: -120, right: -120, opacity: .12, filter: 'blur(80px)'
      }} />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap'}}>
          <span className="pill solid"><span className="dot" /> {s.group}</span>
          <span className="mono" style={{color: 'var(--muted)'}}>Muna Media / Uzbekistan</span>
        </div>
        <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1120, lineHeight: 1.03}}>
          {s.hero}
        </h1>
        <div style={{display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap'}}>
          <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 820, margin: 0, color: 'var(--ink-soft)'}}>
            {s.intro}
          </p>
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
            <a href="#contact" className="btn lime" style={{background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
              Запустить проект
              <span className="arrow">→</span>
            </a>
            <a href="services-uzbekistan.html" className="btn ghost">
              Все услуги
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceMarquee() {
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
  const items = [...partners, ...partners, ...partners];
  return (
    <div className="marquee partner-marquee">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` }} />
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content'
        }}
      >
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
  );
}

function ServiceDescription() {
  const s = getServicePage();
  const problemText = Array.isArray(s.problem) ? s.problem : [s.problem].filter(Boolean);
  const scenarios = s.needs || [];
  return (
    <section id="description" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="grid-2" style={{gap: 48, alignItems: 'start'}}>
          <div>
            <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 01 — Зачем нужна</span></div>
            <h2 className="display sec-title" style={{margin: '0 0 22px'}}>{s.problemTitle || 'Когда эта услуга решает задачу'}</h2>
            <div style={{display: 'grid', gap: 14, fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 720}}>
              {(problemText.length ? problemText : [`${s.title} нужна, когда бренду важно не просто появиться в канале, а встроить его в понятную маркетинговую систему: с аудиторией, сообщением, сроками, отчетностью и связью с продажами.`]).map(text => (
                <p key={text} style={{margin: 0}}>{text}</p>
              ))}
            </div>
          </div>
          <div className="card" style={{padding: 34}}>
            <div className="mono" style={{color: 'var(--accent)', fontWeight: 700, marginBottom: 18}}>Сценарии использования</div>
            <div style={{display: 'grid', gap: 14}}>
              {scenarios.map((item, i) => (
                <div key={item} style={{display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i ? 14 : 0, borderTop: i ? '1px dashed var(--ink)' : 'none'}}>
                  <span className="glyph" style={{width: 34, height: 34, flexShrink: 0}}>{i + 1}</span>
                  <p style={{margin: 0, fontSize: 17, lineHeight: 1.5}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceWhyUs() {
  const s = getServicePage();
  const approachText = Array.isArray(s.approach) ? s.approach : [s.approach].filter(Boolean);
  const cards = s.deliverables || (s.why || []).map((item, i) => ({ title: `Причина 0${i + 1}`, desc: item }));
  return (
    <section id="why-us" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 02 — Почему мы</span></div>
            <h2 className="display sec-title" style={{margin: 0}}>{s.approachTitle || 'Почему Muna Media'}</h2>
          </div>
          <div style={{maxWidth: 520, color: 'var(--ink-soft)', margin: 0, display: 'grid', gap: 10}}>
            {(approachText.length ? approachText : ['Мы соединяем локальный рынок, креатив, подрядчиков и аналитику в одну управляемую систему.']).map(text => (
              <p key={text} style={{margin: 0}}>{text}</p>
            ))}
          </div>
        </div>
        <div className="sec-eyebrow" style={{marginTop: 10}}><span className="pill"><span className="dot" /> Что входит в услугу</span></div>
        <div className="grid-2" style={{gap: 24}}>
          {cards.map((item, i) => (
            <article key={item.title || item.desc} className="card" style={{padding: 30, minHeight: 210}}>
              <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>БЛОК 0{i + 1}</span>
              <h3 className="display" style={{fontSize: 26, margin: '20px 0 12px', lineHeight: 1.1}}>{item.title}</h3>
              <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCase() {
  const s = getServicePage();
  const cases = s.cases || [{ brand: s.caseName, task: s.caseText, result: 'Канал использовали как часть комплексной кампании Muna Media.' }];
  return (
    <section id="case" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="card" style={{padding: 'clamp(34px, 5vw, 58px)'}}>
          <div>
            <div className="pill solid" style={{marginBottom: 18}}><span className="dot" /> 03 — Где использовали</div>
            <h2 className="display" style={{fontSize: 'clamp(34px, 5vw, 60px)', margin: '0 0 18px'}}>
              Кейсы и результаты
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '0 0 26px', maxWidth: 820}}>
              Ниже примеры задач, где этот канал работал не отдельно, а как часть понятной маркетинговой системы.
            </p>
          </div>
          <div className="grid-2" style={{gap: 22}}>
            {cases.map((item, i) => (
              <article key={`${item.brand}-${i}`} style={{border: '1.5px solid var(--ink)', borderRadius: 24, padding: 28, background: 'white'}}>
                <div className="mono" style={{color: 'var(--accent)', fontWeight: 700, marginBottom: 14}}>КЕЙС 0{i + 1}</div>
                <h3 className="display" style={{fontSize: 30, margin: '0 0 12px'}}>{item.brand}</h3>
                <p style={{margin: '0 0 12px', color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{item.task}</p>
                {item.work && <p style={{margin: '0 0 12px', color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{item.work}</p>}
                <div style={{borderTop: '1px dashed var(--ink)', paddingTop: 14, fontWeight: 800, fontSize: 18}}>{item.result}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceTestimonial() {
  const s = getServicePage();
  const standards = s.standards || [];
  if (standards.length) {
    return (
      <section id="standards" style={{borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="sec-head">
            <div>
              <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 04 — SLA</span></div>
              <h2 className="display sec-title" style={{margin: 0}}>Наши стандарты</h2>
            </div>
            <p style={{maxWidth: 480, color: 'var(--ink-soft)', margin: 0}}>Работаем прозрачно: с отчетами, сроками, контролем размещений и быстрым ответом команды.</p>
          </div>
          <div className="grid-2" style={{gap: 22}}>
            {standards.map((item, i) => (
              <article key={item} className="card" style={{padding: 28, display: 'flex', gap: 16, alignItems: 'flex-start'}}>
                <span className="glyph" style={{width: 38, height: 38, flexShrink: 0}}>{i + 1}</span>
                <p style={{margin: 0, fontSize: 17, lineHeight: 1.55}}>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="testimonial" style={{borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="card" style={{background: 'var(--ink)', color: 'var(--bg)', padding: 'clamp(36px, 6vw, 72px)'}}>
          <div className="mono" style={{color: 'rgba(255,255,255,.62)', marginBottom: 20}}>04 — Отзыв</div>
          <blockquote className="display" style={{fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05, margin: '0 0 26px', color: 'var(--bg)'}}>
            “{s.testimonial}”
          </blockquote>
          <p style={{margin: 0, color: 'rgba(255,255,255,.72)', fontSize: 18}}>{s.author}</p>
        </div>
      </div>
    </section>
  );
}

function ServiceFAQ() {
  const s = getServicePage();
  const [open, setOpen] = React.useState(0);
  return (
    <section id="qa" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 05 — Q&A</span></div>
            <h2 className="display sec-title" style={{margin: 0}}>Вопросы и ответы</h2>
          </div>
        </div>
        <div style={{display: 'grid', gap: 14}}>
          {s.qa.map(([q, a], i) => (
            <div key={q} className="card" style={{boxShadow: 'none', overflow: 'hidden'}}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%', background: 'transparent', border: 0, padding: '22px 26px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  gap: 18, cursor: 'pointer', textAlign: 'left', color: 'var(--ink)'
                }}
              >
                <span className="display" style={{fontSize: 24, lineHeight: 1.1}}>{q}</span>
                <span className="glyph" style={{flexShrink: 0}}>{open === i ? '-' : '+'}</span>
              </button>
              {open === i && (
                <p style={{margin: 0, padding: '0 26px 24px', maxWidth: 880, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.6}}>
                  {a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCTA() {
  const s = getServicePage();
  return (
    <section id="contact" style={{paddingBottom: 60}}>
      <div className="container">
        <div className="card" style={{padding: 'clamp(38px, 6vw, 72px)', textAlign: 'center', background: 'var(--accent)', color: 'white'}}>
          <h2 className="display" style={{fontSize: 'clamp(36px, 6vw, 72px)', margin: '0 0 18px', color: 'white'}}>
            {s.ctaTitle || `Запустить услугу «${s.title}»?`}
          </h2>
          <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 28px', color: 'rgba(255,255,255,.86)'}}>
            {s.ctaText || 'Подготовим медиаплан, механику и понятный план запуска под вашу задачу, сроки и рынок Узбекистана.'}
          </p>
          <a href="index.html#contact" className="btn" style={{background: 'white', color: 'var(--ink)', justifyContent: 'center'}}>
            Оставить заявку
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceFooter() {
  return <MunaFooter />;
}

function InfluenceMarketingPage() {
  React.useEffect(() => {
    document.title = 'Инфлюенс-маркетинг | Muna Media';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Инфлюенс-маркетинг в Узбекистане: аудит блогеров, стратегия, легальные договоры, метрики, CAC и финансовая ответственность за результат.');
    }
  }, []);

  const painPoints = [
    'Блогер взял деньги - контент вышел через месяц и не в том формате',
    'Реальный охват аудитории оказался в 3 раза меньше заявленного',
    'Нет понимания, какой блогер реально привел клиентов',
    'Подрядчики работают по серым схемам - налоговые риски на стороне бренда'
  ];

  const serviceBlocks = [
    {
      title: 'Стратегия и подбор',
      desc: 'Анализируем вашу аудиторию и подбираем лидеров мнений по реальным поведенческим данным. Без угадайки - только те, кто влияет на решение о покупке именно вашего продукта в Узбекистане.'
    },
    {
      title: 'Аудит и легализация блогеров',
      desc: 'Проверяем каждого блогера: реальность аудитории, налоговый статус, репутационные риски. Берем на себя все договоры и финансовые расчеты - вы не несете налоговых рисков по серым выплатам.'
    },
    {
      title: 'Управление контентом',
      desc: 'Разрабатываем ТЗ и контролируем выход материала. Никаких “блогер сам знает лучше”. Интеграция работает на ваши бизнес-задачи - конверсию, регистрацию, продажу.'
    },
    {
      title: 'Аналитика и отчетность',
      desc: 'После каждой кампании вы получаете не PDF с охватами, а разбор юнит-экономики: сколько стоил один пришедший клиент, какой блогер дал лучший CAC, что масштабировать в следующем флайте.'
    }
  ];

  const standards = [
    ['Аудит каждого блогера', 'проверяем аудиторию на накрутку, репутацию и налоговый статус до старта кампании'],
    ['Договор с каждым инфлюенсером', 'официальные контракты, все выплаты легальны, риски не перекладываются на клиента'],
    ['Ответ команды за 15 минут', '24/7, 365 дней в году. Если что-то пошло не так с выходом контента - мы решаем, не ждем'],
    ['Прозрачная отчетность', 'вы видите реальные данные по каждому размещению: охват, переходы, конверсию, CAC']
  ];
  const faq = [
    ['Как вы понимаете, какой блогер реально подходит бренду?', 'Мы смотрим не только на охваты. Проверяем аудиторию, вовлеченность, репутацию, прошлые интеграции, нишу, географию и поведение подписчиков. После этого собираем подборку под конкретную бизнес-задачу.'],
    ['Можно ли измерить продажи или регистрации с блогеров?', 'Да. Для кампаний можно использовать UTM-метки, промокоды, Telegram-боты, лендинги и отдельные механики атрибуции. Наша цель - показать не просто просмотры, а вклад каждого блогера в результат.'],
    ['Вы работаете только с крупными блогерами?', 'Нет. Часто микро- и нишевые инфлюенсеры дают более качественный контакт и лучший CAC. Мы подбираем микс: крупные лидеры мнений для охвата, нишевые - для доверия и конверсии.'],
    ['Кто отвечает, если блогер сорвал сроки или выпустил не тот контент?', 'Мы. В кампании есть ТЗ, согласования, договор и контроль выхода. Если что-то идет не по плану, команда решает вопрос с блогером и защищает интерес клиента.'],
    ['Можно ли запустить кампанию официально, без серых выплат?', 'Да. Мы берем на себя договоры, закрывающие документы и легальные расчеты с инфлюенсерами, чтобы налоговые и финансовые риски не оставались на стороне бренда.']
  ];
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <>
      <Nav />
      <section id="hero" style={{paddingTop: 96, paddingBottom: 64, overflow: 'hidden'}}>
        <div className="container">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap'}}>
            <span className="pill solid"><span className="dot" /> Соцсети и инфлюенсеры</span>
            <span className="mono" style={{color: 'var(--muted)'}}>Influence / Uzbekistan</span>
          </div>
          <h1 className="display" style={{fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1160, lineHeight: 1.03}}>
            Инфлюенс-маркетинг для брендов, которым важен результат
          </h1>
          <p style={{fontSize: 22, lineHeight: 1.5, maxWidth: 900, margin: '0 0 34px', color: 'var(--ink-soft)'}}>
            Мы не размещаем рекламу у блогеров. Мы строим управляемый канал влияния на покупателя в Узбекистане - с аудитом, метриками и финансовой ответственностью за результат.
          </p>
          <a href="#contact" className="btn lime" style={{background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
            Получить подборку
            <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <ServiceMarquee />

      <section id="problem" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)', borderTop: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="grid-2" style={{gap: 48, alignItems: 'start'}}>
            <div>
              <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 01 - Боль</span></div>
              <h2 className="display sec-title" style={{margin: '0 0 22px'}}>Почему 80% инфлюенс-кампаний в Узбекистане сливают бюджет</h2>
              <div style={{display: 'grid', gap: 16, color: 'var(--ink-soft)', fontSize: 18, lineHeight: 1.65}}>
                <p style={{margin: 0}}>Узбекский рынок блогеров - это хаос без правил. Агентства продают охваты, которые не конвертируются. Блогеры накручивают аудиторию. Никто не считает, сколько реальных покупателей пришло с интеграции.</p>
                <p style={{margin: 0}}>В итоге бренд получает красивый отчет с миллионом просмотров - и ноль понимания, окупилась ли кампания.</p>
              </div>
            </div>
            <div className="card" style={{padding: 34}}>
              <div className="mono" style={{color: 'var(--accent)', fontWeight: 700, marginBottom: 18}}>Типичные проблемы</div>
              <div style={{display: 'grid', gap: 14}}>
                {painPoints.map((point, i) => (
                  <div key={point} style={{display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i ? 14 : 0, borderTop: i ? '1px dashed var(--ink)' : 'none'}}>
                    <span style={{width: 28, height: 28, borderRadius: 999, background: 'var(--ink)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 800}}>!</span>
                    <p style={{margin: 0, fontSize: 16, lineHeight: 1.55}}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" style={{borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 02 - Подход</span></div>
          <h2 className="display sec-title" style={{margin: '0 0 24px', maxWidth: 1040}}>
            Инфлюенс-маркетинг как бизнес-инструмент, а не лотерея
          </h2>
          <div className="card" style={{padding: 'clamp(30px, 5vw, 56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, alignItems: 'start'}}>
            <p style={{fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0}}>
              Мы переводим работу с лидерами мнений в логику бизнеса: каждый блогер - это канал с измеримой стоимостью привлечения клиента (CAC). Мы знаем, кто из них реально влияет на решение о покупке в Узбекистане, а кто продает воздух.
            </p>
            <p style={{fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0}}>
              Наша база - это верифицированные лидеры мнений по нишам: e-commerce, финтех, FMCG, авто, недвижимость, beauty. Прежде чем блогер попадает в кампанию клиента, он проходит финансовый и репутационный аудит.
            </p>
          </div>
        </div>
      </section>

      <section id="included" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="sec-head">
            <div>
              <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 03 - Услуга</span></div>
              <h2 className="display sec-title" style={{margin: 0}}>Что мы делаем</h2>
            </div>
          </div>
          <div className="grid-2" style={{gap: 28}}>
            {serviceBlocks.map((block, i) => (
              <article key={block.title} className="card" style={{padding: 34, display: 'flex', flexDirection: 'column', gap: 16}}>
                <span className="mono" style={{color: 'var(--accent)', fontWeight: 700}}>БЛОК 0{i + 1}</span>
                <h3 className="display" style={{fontSize: 30, margin: 0}}>{block.title}</h3>
                <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.65}}>{block.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="case" style={{borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="card" style={{padding: 'clamp(34px, 5vw, 58px)', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 42, alignItems: 'center'}}>
            <div>
              <div className="pill solid" style={{marginBottom: 18}}><span className="dot" /> 04 - Кейс</div>
              <h2 className="display" style={{fontSize: 'clamp(34px, 5vw, 60px)', margin: '0 0 18px'}}>
                UnionPay: инфлюенсеры как часть промо-воронки
              </h2>
              <p style={{fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0}}>
                В кампании UnionPay блогеры не просто давали охват. Они объясняли механику акции, приводили пользователей к участию и работали вместе с Telegram, ритейлом и сайтом кампании.
              </p>
            </div>
            <div style={{display: 'grid', gap: 16}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14}}>
                <div className="card" style={{padding: 20, boxShadow: 'none'}}>
                  <div className="num-big" style={{fontSize: 34, color: 'var(--accent)'}}>91 940</div>
                  <div className="mono" style={{color: 'var(--muted)', marginTop: 6}}>охват публикаций</div>
                </div>
                <div className="card" style={{padding: 20, boxShadow: 'none'}}>
                  <div className="num-big" style={{fontSize: 34, color: 'var(--accent)'}}>13,91%</div>
                  <div className="mono" style={{color: 'var(--muted)', marginTop: 6}}>вовлеченность</div>
                </div>
              </div>
              <a href="unionpay.html" className="btn lime" style={{justifyContent: 'center', background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'}}>
                Смотреть кейс
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="standards" style={{background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="sec-head">
            <div>
              <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 05 - SLA</span></div>
              <h2 className="display sec-title" style={{margin: 0}}>Наши стандарты - не маркетинговые обещания</h2>
            </div>
          </div>
          <div className="grid-2" style={{gap: 24}}>
            {standards.map(([title, desc], i) => (
              <article key={title} className="card" style={{padding: 30, display: 'flex', gap: 18, alignItems: 'flex-start'}}>
                <span style={{width: 42, height: 42, borderRadius: 999, background: 'var(--accent)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 800}}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="display" style={{fontSize: 24, margin: '0 0 8px'}}>{title}</h3>
                  <p style={{margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6}}>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={{borderBottom: '1.5px solid var(--ink)'}}>
        <div className="container">
          <div className="sec-head">
            <div>
              <div className="sec-eyebrow"><span className="pill"><span className="dot" /> 06 - FAQ</span></div>
              <h2 className="display sec-title" style={{margin: 0}}>Частые вопросы</h2>
            </div>
            <p style={{maxWidth: 460, color: 'var(--ink-soft)', margin: 0}}>
              Коротко о том, как мы выбираем блогеров, считаем результат и защищаем бренд от хаоса рынка.
            </p>
          </div>
          <div style={{display: 'grid', gap: 14}}>
            {faq.map(([question, answer], i) => (
              <div key={question} className="card" style={{boxShadow: 'none', overflow: 'hidden'}}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    padding: '22px 26px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 18,
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--ink)'
                  }}
                >
                  <span className="display" style={{fontSize: 24, lineHeight: 1.1}}>{question}</span>
                  <span style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: '1.5px solid var(--ink)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    fontWeight: 800,
                    background: openFaq === i ? 'var(--accent)' : 'var(--bg)',
                    color: openFaq === i ? 'white' : 'var(--ink)'
                  }}>
                    {openFaq === i ? '-' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p style={{margin: 0, padding: '0 26px 24px', maxWidth: 900, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.65}}>
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{paddingBottom: 60}}>
        <div className="container">
          <div className="card" style={{padding: 'clamp(38px, 6vw, 72px)', textAlign: 'center', background: 'var(--accent)', color: 'white'}}>
            <h2 className="display" style={{fontSize: 'clamp(36px, 6vw, 72px)', margin: '0 0 18px', color: 'white'}}>
              Готовы выстроить инфлюенс-канал?
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: 820, margin: '0 auto 28px', color: 'rgba(255,255,255,.86)'}}>
              Расскажите о вашем продукте - мы покажем, какие лидеры мнений реально работают в вашей нише в Узбекистане и сколько будет стоить один привлеченный клиент.
            </p>
            <a href="index.html#contact" className="btn" style={{background: 'white', color: 'var(--ink)', justifyContent: 'center'}}>
              Запустить кампанию
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <ServiceFooter />
    </>
  );
}

Object.assign(window, {
  ServiceHero,
  ServiceMarquee,
  ServiceDescription,
  ServiceWhyUs,
  ServiceCase,
  ServiceTestimonial,
  ServiceFAQ,
  ServiceCTA,
  ServiceFooter,
  InfluenceMarketingPage
});
