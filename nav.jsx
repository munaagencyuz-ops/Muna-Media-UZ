// Muna Media — Shared Navigation Component
const { useState: navUseState, useEffect: navUseEffect } = React;

function Nav() {
  const [isOpen, setIsOpen] = navUseState(false);

  navUseEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { label: 'Главная', href: 'index.html' },
    {
      label: 'Услуги',
      href: 'services-uzbekistan.html',
      match: [
        'services-uzbekistan.html',
        'influence.html',
        'led-screens.html',
        'gas-station-ads.html',
        'mall-ads.html',
        'bus-ads.html',
        'bus-stop-ads.html',
        'metro-ads.html',
        'airport-ads.html',
        'seo-optimization.html',
        'context-ads.html',
        'smm.html',
        'influencer-marketing.html',
        'telegram-marketing.html',
        'event-management.html'
      ],
      children: [
        { label: 'Все услуги', href: 'services-uzbekistan.html' },
        { type: 'group', label: 'Наружная реклама' },
        { label: 'LED-экраны', href: 'led-screens.html' },
        { label: 'Реклама на АЗС', href: 'gas-station-ads.html' },
        { label: 'Реклама в торговых центрах', href: 'mall-ads.html' },
        { label: 'Реклама на автобусах', href: 'bus-ads.html' },
        { label: 'Реклама на остановках', href: 'bus-stop-ads.html' },
        { label: 'Реклама в метро', href: 'metro-ads.html' },
        { label: 'Реклама в аэропорту', href: 'airport-ads.html' },
        { type: 'group', label: 'Онлайн и поиск' },
        { label: 'SEO-оптимизация', href: 'seo-optimization.html' },
        { label: 'Контекстная реклама', href: 'context-ads.html' },
        { type: 'group', label: 'Соцсети и инфлюенсеры' },
        { label: 'SMM', href: 'smm.html' },
        { label: 'Инфлюенс-маркетинг', href: 'influencer-marketing.html' },
        { label: 'Telegram-маркетинг', href: 'telegram-marketing.html' },
        { type: 'group', label: 'События' },
        { label: 'Ивент-менеджмент', href: 'event-management.html' }
      ]
    },
    {
      label: 'Кейсы',
      href: 'cases.html',
      match: ['cases.html', 'xiaomi.html', 'unionpay.html', 'koronapay.html'],
      children: [
        { label: 'Все кейсы', href: 'cases.html' },
        { label: 'Кейс Xiaomi', href: 'xiaomi.html' },
        { label: 'Кейс UnionPay', href: 'unionpay.html' },
        { label: 'Кейс KoronaPay', href: 'koronapay.html' }
      ]
    },
    { label: 'Блог', href: '/blog', match: ['blog'] },
    { label: 'О компании', href: 'about.html' }
  ];

  const getActiveLink = () => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    if (page === '' || page === '/') return 'index.html';
    return page;
  };

  const activePage = getActiveLink();
  const isActive = (link) => activePage === link.href || (link.match || []).includes(activePage);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Reset & Modern overrides for Nav */
        .nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg);
          border-bottom: 1.5px solid var(--ink);
          width: 100%;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        .nav-links {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .nav-item {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .nav-link {
          color: var(--ink);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1.5px solid transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link:hover {
          background: var(--bg-2);
          border-color: var(--ink);
          transform: translate(-2px, -2px);
          box-shadow: 2px 2px 0 0 var(--ink);
        }
        .nav-link.active {
          color: var(--bg);
          background: var(--ink);
          border-color: var(--ink);
        }
        .nav-link.active:hover {
          background: var(--ink);
          color: var(--bg);
          transform: none;
          box-shadow: none;
        }
        .nav-caret {
          font-size: 11px;
          line-height: 1;
          transform: translateY(1px);
        }
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 300px;
          max-height: min(72vh, 680px);
          overflow-y: auto;
          padding: 8px;
          border: 1.5px solid var(--ink);
          border-radius: 14px;
          background: var(--bg);
          box-shadow: 4px 4px 0 0 var(--ink);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition: opacity .18s ease, transform .18s ease, visibility .18s ease;
        }
        .nav-item:hover .nav-dropdown,
        .nav-item:focus-within .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .nav-dropdown-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          color: var(--ink);
          text-decoration: none;
          font-size: 14px;
          font-weight: 650;
          white-space: nowrap;
          transition: background .18s ease;
        }
        .nav-dropdown-link:hover,
        .nav-dropdown-link.active {
          background: var(--bg-2);
        }
        .nav-dropdown-group {
          padding: 12px 14px 6px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: .06em;
          text-transform: uppercase;
          font-weight: 700;
        }

        /* Animated burger button */
        .burger-btn {
          display: none;
          background: var(--bg);
          border: 1.5px solid var(--ink);
          border-radius: 999px;
          cursor: pointer;
          padding: 0;
          z-index: 1100;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .burger-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0 0 var(--ink);
        }
        .burger-line {
          width: 18px;
          height: 2px;
          background: var(--ink);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .burger-btn.open .burger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .burger-btn.open .burger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .burger-btn.open .burger-line:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Drawer Overlay - Hidden on Desktop */
        .mobile-drawer {
          display: none;
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none !important;
          }
          .burger-btn {
            display: flex;
          }
          .nav-inner {
            padding: 12px 24px;
          }
          .mobile-drawer {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg);
            z-index: 1050;
            display: flex;
            flex-direction: column;
            padding: 100px 24px 32px 24px;
            transform: translateY(-100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease;
            overflow-y: auto;
            box-sizing: border-box;
            visibility: hidden;
            pointer-events: none;
          }
          .mobile-drawer.open {
            transform: translateY(0);
            visibility: visible;
            pointer-events: auto;
          }
          .mobile-drawer-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: auto;
          }
          .mobile-drawer-link {
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: var(--ink);
            text-decoration: none;
            padding: 16px 20px;
            border: 1.5px solid var(--ink);
            border-radius: 16px;
            background: var(--bg);
            box-shadow: 4px 4px 0 0 var(--ink);
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s ease;
            box-sizing: border-box;
          }
          .mobile-drawer-link:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 0 var(--ink);
            background: var(--bg-2);
          }
          .mobile-drawer-link.active {
            background: var(--accent);
            color: var(--bg);
          }
          .mobile-drawer-link.child {
            margin-left: 18px;
            width: calc(100% - 18px);
            font-size: 18px;
            font-weight: 650;
            padding: 13px 16px;
            border-radius: 12px;
            box-shadow: 3px 3px 0 0 var(--ink);
            background: var(--bg-2);
          }
          .mobile-drawer-link.child.active {
            background: var(--accent);
            color: var(--bg);
          }
          .mobile-drawer-link .chevron {
            font-size: 18px;
            transition: transform 0.2s ease;
          }
          .mobile-drawer-link:hover .chevron {
            transform: translateX(4px);
          }
          .mobile-drawer-footer {
            margin-top: 32px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .mobile-drawer-cta {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
          }
        }
      ` }} />

      <nav className="nav">
        <div className="nav-inner">
          <a href="index.html" className="logo" onClick={() => setIsOpen(false)}>
            <img
              src="/assets/favicon/muna-icon-32x32.png"
              alt=""
              aria-hidden="true"
              style={{width: 28, height: 28, borderRadius: 8, objectFit: 'cover', display: 'inline-block', flexShrink: 0}}
            />
            MUNA MEDIA
          </a>

          {/* Desktop Links */}
          <div className="nav-links">
            {links.map((link, idx) => (
              <div className="nav-item" key={idx}>
                <a
                  href={link.href}
                  className={`nav-link ${isActive(link) ? 'active' : ''}`}
                >
                  {link.label}
                  {link.children && <span className="nav-caret">▾</span>}
                </a>
                {link.children && (
                  <div className="nav-dropdown">
                    {link.children.map((child, childIdx) => (
                      child.type === 'group' ? (
                        <div key={childIdx} className="nav-dropdown-group">{child.label}</div>
                      ) : (
                        <a
                          key={childIdx}
                          href={child.href}
                          className={`nav-dropdown-link ${activePage === child.href ? 'active' : ''}`}
                        >
                          {child.label}
                          <span>→</span>
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA (visible on desktop) */}
          <a
            href="index.html#contact"
            className="btn lime nav-links"
            style={{ padding: '10px 20px', fontSize: '14px', margin: 0 }}
          >
            Запустить проект
            <span className="arrow">→</span>
          </a>

          {/* Mobile Burger Menu Button */}
          <button
            className={`burger-btn ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-links">
            {links.map((link, idx) => (
              <React.Fragment key={idx}>
                <a
                  href={link.href}
                  className={`mobile-drawer-link ${isActive(link) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="chevron">→</span>
                </a>
                {link.children && link.children.map((child, childIdx) => (
                  child.type === 'group' ? (
                    <div key={`${idx}-${childIdx}`} className="mobile-drawer-link child" style={{boxShadow: 'none', borderStyle: 'dashed', color: 'var(--muted)', pointerEvents: 'none'}}>
                      <span>{child.label}</span>
                    </div>
                  ) : (
                    <a
                      key={`${idx}-${childIdx}`}
                      href={child.href}
                      className={`mobile-drawer-link child ${activePage === child.href ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{child.label}</span>
                      <span className="chevron">→</span>
                    </a>
                  )
                ))}
              </React.Fragment>
            ))}
          </div>
          
          <div className="mobile-drawer-footer">
            <a
              href="index.html#contact"
              className="btn lime mobile-drawer-cta"
              style={{ padding: '18px 24px', fontSize: '16px' }}
              onClick={() => setIsOpen(false)}
            >
              Запустить проект
              <span className="arrow" style={{ marginLeft: '8px' }}>→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

// Export Nav globally
Object.assign(window, { Nav });

function MunaFooter() {
  const serviceGroups = [
    {
      title: 'Наружная реклама',
      links: [
        ['LED-экраны', 'led-screens.html'],
        ['Реклама на АЗС', 'gas-station-ads.html'],
        ['Реклама в ТЦ', 'mall-ads.html'],
        ['Реклама на автобусах', 'bus-ads.html'],
        ['Остановки', 'bus-stop-ads.html'],
        ['Метро', 'metro-ads.html'],
        ['Аэропорт', 'airport-ads.html']
      ]
    },
    {
      title: 'Digital',
      links: [
        ['SEO-оптимизация', 'seo-optimization.html'],
        ['Контекстная реклама', 'context-ads.html'],
        ['SMM', 'smm.html'],
        ['Инфлюенс-маркетинг', 'influencer-marketing.html'],
        ['Telegram-маркетинг', 'telegram-marketing.html'],
        ['Ивент-менеджмент', 'event-management.html']
      ]
    }
  ];
  const footerLinks = {
    pages: [
      ['Главная', 'index.html'],
      ['Все услуги', 'services-uzbekistan.html'],
      ['Кейсы', 'cases.html'],
      ['О компании', 'about.html'],
      ['Контакты', 'index.html#contact']
    ],
    cases: [
      ['Xiaomi', 'xiaomi.html'],
      ['UnionPay', 'unionpay.html'],
      ['KoronaPay', 'koronapay.html']
    ]
  };

  const linkStyle = {
    color: 'rgba(255,255,255,.82)',
    textDecoration: 'none',
    fontSize: 14,
    lineHeight: 1.35,
    transition: 'color .18s ease, transform .18s ease'
  };

  const Column = ({ title, links }) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, minWidth: 150}}>
      <div className="mono" style={{color: 'rgba(255,255,255,.46)', marginBottom: 4}}>{title}</div>
      {links.map(([label, href]) => (
        <a key={href + label} href={href} style={linkStyle}>{label}</a>
      ))}
    </div>
  );

  return (
    <footer style={{background: 'var(--ink)', color: 'white', borderTop: '1.5px solid var(--ink)', overflow: 'hidden'}}>
      <div className="container" style={{paddingTop: 56, paddingBottom: 34}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1.05fr) minmax(0, 1.65fr)',
          gap: 42,
          alignItems: 'start'
        }}>
          <div>
            <a href="index.html" className="logo" style={{fontSize: 42, color: 'white', textDecoration: 'none'}}>
              <span className="blob" style={{width: 34, height: 34, background: 'var(--accent)'}} />
              MUNA MEDIA
            </a>
            <p style={{margin: '18px 0 0', maxWidth: 470, color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.65}}>
              Рекламное агентство полного цикла в Узбекистане: стратегия, наружная реклама, digital, инфлюенсеры, ивенты и прозрачная отчетность.
            </p>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26}}>
              <a href="index.html#contact" className="btn" style={{background: 'var(--accent)', borderColor: 'white', color: 'white'}}>
                Обсудить проект
                <span className="arrow">→</span>
              </a>
              <a href="cases.html" className="btn" style={{background: 'transparent', borderColor: 'white', color: 'white'}}>
                Смотреть кейсы
                <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))',
            gap: 26
          }}>
            <Column title="Страницы" links={footerLinks.pages} />
            {serviceGroups.map(group => (
              <Column key={group.title} title={group.title} links={group.links} />
            ))}
            <Column title="Кейсы" links={footerLinks.cases} />
          </div>
        </div>

        <div style={{
          marginTop: 44,
          paddingTop: 26,
          borderTop: '1px solid rgba(255,255,255,.22)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 22,
          alignItems: 'center'
        }}>
          <div style={{display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center'}}>
            <a href="mailto:info@munamedia.me" style={{...linkStyle, fontWeight: 700}}>info@munamedia.me</a>
            <a href="tel:+998331301313" style={linkStyle}>+998 33 130 13 13</a>
            <a href="https://t.me/munamedia" style={linkStyle}>Telegram</a>
            <a href="https://instagram.com/munamedia" style={linkStyle}>Instagram</a>
          </div>
          <div className="mono" style={{color: 'rgba(255,255,255,.46)', textAlign: 'right'}}>
            © 2019-2026 Muna Media · Ташкент, Узбекистан
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        footer a:hover {
          color: white !important;
          transform: translateX(2px);
        }
        @media (max-width: 980px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer .container > div:first-child > div:nth-child(2) {
            grid-template-columns: repeat(2, minmax(150px, 1fr)) !important;
          }
          footer .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          footer .container > div:nth-child(2) .mono {
            text-align: left !important;
          }
        }
        @media (max-width: 560px) {
          footer .container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          footer .container > div:first-child > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          footer .btn {
            width: 100%;
            justify-content: center;
          }
        }
      ` }} />
    </footer>
  );
}

Object.assign(window, { MunaFooter });
