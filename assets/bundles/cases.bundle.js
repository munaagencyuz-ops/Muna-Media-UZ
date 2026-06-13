// @ts-nocheck
// Muna Media — Shared Navigation Component
const { useState: navUseState, useEffect: navUseEffect } = React;
function Nav() {
    const [isOpen, setIsOpen] = navUseState(false);
    navUseEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
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
        if (page === '' || page === '/')
            return 'index.html';
        return page;
    };
    const activePage = getActiveLink();
    const isActive = (link) => activePage === link.href || (link.match || []).includes(activePage);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
      ` } }),
        React.createElement("nav", { className: "nav" },
            React.createElement("div", { className: "nav-inner" },
                React.createElement("a", { href: "index.html", className: "logo", onClick: () => setIsOpen(false) },
                    React.createElement("span", { className: "blob" }),
                    "muna.media"),
                React.createElement("div", { className: "nav-links" }, links.map((link, idx) => (React.createElement("div", { className: "nav-item", key: idx },
                    React.createElement("a", { href: link.href, className: `nav-link ${isActive(link) ? 'active' : ''}` },
                        link.label,
                        link.children && React.createElement("span", { className: "nav-caret" }, "\u25BE")),
                    link.children && (React.createElement("div", { className: "nav-dropdown" }, link.children.map((child, childIdx) => (child.type === 'group' ? (React.createElement("div", { key: childIdx, className: "nav-dropdown-group" }, child.label)) : (React.createElement("a", { key: childIdx, href: child.href, className: `nav-dropdown-link ${activePage === child.href ? 'active' : ''}` },
                        child.label,
                        React.createElement("span", null, "\u2192"))))))))))),
                React.createElement("a", { href: "index.html#contact", className: "btn lime nav-links", style: { padding: '10px 20px', fontSize: '14px', margin: 0 } },
                    "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
                    React.createElement("span", { className: "arrow" }, "\u2192")),
                React.createElement("button", { className: `burger-btn ${isOpen ? 'open' : ''}`, onClick: () => setIsOpen(!isOpen), "aria-label": "Toggle navigation menu" },
                    React.createElement("span", { className: "burger-line" }),
                    React.createElement("span", { className: "burger-line" }),
                    React.createElement("span", { className: "burger-line" }))),
            React.createElement("div", { className: `mobile-drawer ${isOpen ? 'open' : ''}` },
                React.createElement("div", { className: "mobile-drawer-links" }, links.map((link, idx) => (React.createElement(React.Fragment, { key: idx },
                    React.createElement("a", { href: link.href, className: `mobile-drawer-link ${isActive(link) ? 'active' : ''}`, onClick: () => setIsOpen(false) },
                        React.createElement("span", null, link.label),
                        React.createElement("span", { className: "chevron" }, "\u2192")),
                    link.children && link.children.map((child, childIdx) => (child.type === 'group' ? (React.createElement("div", { key: `${idx}-${childIdx}`, className: "mobile-drawer-link child", style: { boxShadow: 'none', borderStyle: 'dashed', color: 'var(--muted)', pointerEvents: 'none' } },
                        React.createElement("span", null, child.label))) : (React.createElement("a", { key: `${idx}-${childIdx}`, href: child.href, className: `mobile-drawer-link child ${activePage === child.href ? 'active' : ''}`, onClick: () => setIsOpen(false) },
                        React.createElement("span", null, child.label),
                        React.createElement("span", { className: "chevron" }, "\u2192"))))))))),
                React.createElement("div", { className: "mobile-drawer-footer" },
                    React.createElement("a", { href: "index.html#contact", className: "btn lime mobile-drawer-cta", style: { padding: '18px 24px', fontSize: '16px' }, onClick: () => setIsOpen(false) },
                        "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
                        React.createElement("span", { className: "arrow", style: { marginLeft: '8px' } }, "\u2192")))))));
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
    const Column = ({ title, links }) => (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 10, minWidth: 150 } },
        React.createElement("div", { className: "mono", style: { color: 'rgba(255,255,255,.46)', marginBottom: 4 } }, title),
        links.map(([label, href]) => (React.createElement("a", { key: href + label, href: href, style: linkStyle }, label)))));
    return (React.createElement("footer", { style: { background: 'var(--ink)', color: 'white', borderTop: '1.5px solid var(--ink)', overflow: 'hidden' } },
        React.createElement("div", { className: "container", style: { paddingTop: 56, paddingBottom: 34 } },
            React.createElement("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'minmax(260px, 1.05fr) minmax(0, 1.65fr)',
                    gap: 42,
                    alignItems: 'start'
                } },
                React.createElement("div", null,
                    React.createElement("a", { href: "index.html", className: "logo", style: { fontSize: 42, color: 'white', textDecoration: 'none' } },
                        React.createElement("span", { className: "blob", style: { width: 34, height: 34, background: 'var(--accent)' } }),
                        "muna.media"),
                    React.createElement("p", { style: { margin: '18px 0 0', maxWidth: 470, color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.65 } }, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, digital, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u0438\u0432\u0435\u043D\u0442\u044B \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."),
                    React.createElement("div", { style: { display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 } },
                        React.createElement("a", { href: "index.html#contact", className: "btn", style: { background: 'var(--accent)', borderColor: 'white', color: 'white' } },
                            "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
                            React.createElement("span", { className: "arrow" }, "\u2192")),
                        React.createElement("a", { href: "cases.html", className: "btn", style: { background: 'transparent', borderColor: 'white', color: 'white' } },
                            "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B",
                            React.createElement("span", { className: "arrow" }, "\u2192")))),
                React.createElement("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))',
                        gap: 26
                    } },
                    React.createElement(Column, { title: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B", links: footerLinks.pages }),
                    serviceGroups.map(group => (React.createElement(Column, { key: group.title, title: group.title, links: group.links }))),
                    React.createElement(Column, { title: "\u041A\u0435\u0439\u0441\u044B", links: footerLinks.cases }))),
            React.createElement("div", { style: {
                    marginTop: 44,
                    paddingTop: 26,
                    borderTop: '1px solid rgba(255,255,255,.22)',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 22,
                    alignItems: 'center'
                } },
                React.createElement("div", { style: { display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' } },
                    React.createElement("a", { href: "mailto:hello@muna.media", style: Object.assign(Object.assign({}, linkStyle), { fontWeight: 700 }) }, "hello@muna.media"),
                    React.createElement("a", { href: "https://t.me/munamedia", style: linkStyle }, "Telegram"),
                    React.createElement("a", { href: "https://instagram.com/munamedia", style: linkStyle }, "Instagram")),
                React.createElement("div", { className: "mono", style: { color: 'rgba(255,255,255,.46)', textAlign: 'right' } }, "\u00A9 2019-2026 Muna Media \u00B7 \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D"))),
        React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
      ` } })));
}
Object.assign(window, { MunaFooter });
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────
const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;
// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
    const [values, setValues] = React.useState(defaults);
    // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
    // useState-style call doesn't write a "[object Object]" key into the persisted
    // JSON block.
    const setTweak = React.useCallback((keyOrEdits, val) => {
        const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
            ? keyOrEdits : { [keyOrEdits]: val };
        setValues((prev) => (Object.assign(Object.assign({}, prev), edits)));
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
        // Same-window signal so in-page listeners (deck-stage rail thumbnails)
        // can react — the parent message only reaches the host, not peers.
        window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
    }, []);
    return [values, setTweak];
}
// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
    const [open, setOpen] = React.useState(false);
    const dragRef = React.useRef(null);
    const offsetRef = React.useRef({ x: 16, y: 16 });
    const PAD = 16;
    const clampToViewport = React.useCallback(() => {
        const panel = dragRef.current;
        if (!panel)
            return;
        const w = panel.offsetWidth, h = panel.offsetHeight;
        const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
        const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
        offsetRef.current = {
            x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
            y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
        };
        panel.style.right = offsetRef.current.x + 'px';
        panel.style.bottom = offsetRef.current.y + 'px';
    }, []);
    React.useEffect(() => {
        if (!open)
            return;
        clampToViewport();
        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', clampToViewport);
            return () => window.removeEventListener('resize', clampToViewport);
        }
        const ro = new ResizeObserver(clampToViewport);
        ro.observe(document.documentElement);
        return () => ro.disconnect();
    }, [open, clampToViewport]);
    React.useEffect(() => {
        const onMsg = (e) => {
            var _a;
            const t = (_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type;
            if (t === '__activate_edit_mode')
                setOpen(true);
            else if (t === '__deactivate_edit_mode')
                setOpen(false);
        };
        window.addEventListener('message', onMsg);
        window.parent.postMessage({ type: '__edit_mode_available' }, '*');
        return () => window.removeEventListener('message', onMsg);
    }, []);
    const dismiss = () => {
        setOpen(false);
        window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    };
    const onDragStart = (e) => {
        const panel = dragRef.current;
        if (!panel)
            return;
        const r = panel.getBoundingClientRect();
        const sx = e.clientX, sy = e.clientY;
        const startRight = window.innerWidth - r.right;
        const startBottom = window.innerHeight - r.bottom;
        const move = (ev) => {
            offsetRef.current = {
                x: startRight - (ev.clientX - sx),
                y: startBottom - (ev.clientY - sy),
            };
            clampToViewport();
        };
        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
    };
    if (!open)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, __TWEAKS_STYLE),
        React.createElement("div", { ref: dragRef, className: "twk-panel", "data-omelette-chrome": "", style: { right: offsetRef.current.x, bottom: offsetRef.current.y } },
            React.createElement("div", { className: "twk-hd", onMouseDown: onDragStart },
                React.createElement("b", null, title),
                React.createElement("button", { className: "twk-x", "aria-label": "Close tweaks", onMouseDown: (e) => e.stopPropagation(), onClick: dismiss }, "\u2715")),
            React.createElement("div", { className: "twk-body" }, children))));
}
// ── Layout helpers ──────────────────────────────────────────────────────────
function TweakSection({ label, children }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "twk-sect" }, label),
        children));
}
function TweakRow({ label, value, children, inline = false }) {
    return (React.createElement("div", { className: inline ? 'twk-row twk-row-h' : 'twk-row' },
        React.createElement("div", { className: "twk-lbl" },
            React.createElement("span", null, label),
            value != null && React.createElement("span", { className: "twk-val" }, value)),
        children));
}
// ── Controls ────────────────────────────────────────────────────────────────
function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
    return (React.createElement(TweakRow, { label: label, value: `${value}${unit}` },
        React.createElement("input", { type: "range", className: "twk-slider", min: min, max: max, step: step, value: value, onChange: (e) => onChange(Number(e.target.value)) })));
}
function TweakToggle({ label, value, onChange }) {
    return (React.createElement("div", { className: "twk-row twk-row-h" },
        React.createElement("div", { className: "twk-lbl" },
            React.createElement("span", null, label)),
        React.createElement("button", { type: "button", className: "twk-toggle", "data-on": value ? '1' : '0', role: "switch", "aria-checked": !!value, onClick: () => onChange(!value) },
            React.createElement("i", null))));
}
function TweakRadio({ label, value, options, onChange }) {
    var _a;
    const trackRef = React.useRef(null);
    const [dragging, setDragging] = React.useState(false);
    // The active value is read by pointer-move handlers attached for the lifetime
    // of a drag — ref it so a stale closure doesn't fire onChange for every move.
    const valueRef = React.useRef(value);
    valueRef.current = value;
    // Segments wrap mid-word once per-segment width runs out. The track is
    // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
    // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
    // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
    // back to a dropdown rather than wrap.
    const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
    const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
    const fitsAsSegments = maxLen <= ((_a = { 2: 16, 3: 10 }[options.length]) !== null && _a !== void 0 ? _a : 0);
    if (!fitsAsSegments) {
        // <select> emits strings — map back to the original option value so the
        // fallback stays type-preserving (numbers, booleans) like the segment path.
        const resolve = (s) => {
            const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
            return m === undefined ? s : typeof m === 'object' ? m.value : m;
        };
        return React.createElement(TweakSelect, { label: label, value: value, options: options, onChange: (s) => onChange(resolve(s)) });
    }
    const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
    const idx = Math.max(0, opts.findIndex((o) => o.value === value));
    const n = opts.length;
    const segAt = (clientX) => {
        const r = trackRef.current.getBoundingClientRect();
        const inner = r.width - 4;
        const i = Math.floor(((clientX - r.left - 2) / inner) * n);
        return opts[Math.max(0, Math.min(n - 1, i))].value;
    };
    const onPointerDown = (e) => {
        setDragging(true);
        const v0 = segAt(e.clientX);
        if (v0 !== valueRef.current)
            onChange(v0);
        const move = (ev) => {
            if (!trackRef.current)
                return;
            const v = segAt(ev.clientX);
            if (v !== valueRef.current)
                onChange(v);
        };
        const up = () => {
            setDragging(false);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };
    return (React.createElement(TweakRow, { label: label },
        React.createElement("div", { ref: trackRef, role: "radiogroup", onPointerDown: onPointerDown, className: dragging ? 'twk-seg dragging' : 'twk-seg' },
            React.createElement("div", { className: "twk-seg-thumb", style: { left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                    width: `calc((100% - 4px) / ${n})` } }),
            opts.map((o) => (React.createElement("button", { key: o.value, type: "button", role: "radio", "aria-checked": o.value === value }, o.label))))));
}
function TweakSelect({ label, value, options, onChange }) {
    return (React.createElement(TweakRow, { label: label },
        React.createElement("select", { className: "twk-field", value: value, onChange: (e) => onChange(e.target.value) }, options.map((o) => {
            const v = typeof o === 'object' ? o.value : o;
            const l = typeof o === 'object' ? o.label : o;
            return React.createElement("option", { key: v, value: v }, l);
        }))));
}
function TweakText({ label, value, placeholder, onChange }) {
    return (React.createElement(TweakRow, { label: label },
        React.createElement("input", { className: "twk-field", type: "text", value: value, placeholder: placeholder, onChange: (e) => onChange(e.target.value) })));
}
function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
    const clamp = (n) => {
        if (min != null && n < min)
            return min;
        if (max != null && n > max)
            return max;
        return n;
    };
    const startRef = React.useRef({ x: 0, val: 0 });
    const onScrubStart = (e) => {
        e.preventDefault();
        startRef.current = { x: e.clientX, val: value };
        const decimals = (String(step).split('.')[1] || '').length;
        const move = (ev) => {
            const dx = ev.clientX - startRef.current.x;
            const raw = startRef.current.val + dx * step;
            const snapped = Math.round(raw / step) * step;
            onChange(clamp(Number(snapped.toFixed(decimals))));
        };
        const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };
    return (React.createElement("div", { className: "twk-num" },
        React.createElement("span", { className: "twk-num-lbl", onPointerDown: onScrubStart }, label),
        React.createElement("input", { type: "number", value: value, min: min, max: max, step: step, onChange: (e) => onChange(clamp(Number(e.target.value))) }),
        unit && React.createElement("span", { className: "twk-num-unit" }, unit)));
}
// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
    const h = String(hex).replace('#', '');
    const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
    const n = parseInt(x.slice(0, 6), 16);
    if (Number.isNaN(n))
        return true;
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({ light }) => (React.createElement("svg", { viewBox: "0 0 14 14", "aria-hidden": "true" },
    React.createElement("path", { d: "M3 7.2 5.8 10 11 4.2", fill: "none", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", stroke: light ? 'rgba(0,0,0,.78)' : '#fff' })));
// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
    if (!options || !options.length) {
        return (React.createElement("div", { className: "twk-row twk-row-h" },
            React.createElement("div", { className: "twk-lbl" },
                React.createElement("span", null, label)),
            React.createElement("input", { type: "color", className: "twk-swatch", value: value, onChange: (e) => onChange(e.target.value) })));
    }
    // Native <input type=color> emits lowercase hex per the HTML spec, so
    // compare case-insensitively. String() guards JSON.stringify(undefined),
    // which returns the primitive undefined (no .toLowerCase).
    const key = (o) => String(JSON.stringify(o)).toLowerCase();
    const cur = key(value);
    return (React.createElement(TweakRow, { label: label },
        React.createElement("div", { className: "twk-chips", role: "radiogroup" }, options.map((o, i) => {
            const colors = Array.isArray(o) ? o : [o];
            const [hero, ...rest] = colors;
            const sup = rest.slice(0, 4);
            const on = key(o) === cur;
            return (React.createElement("button", { key: i, type: "button", className: "twk-chip", role: "radio", "aria-checked": on, "data-on": on ? '1' : '0', "aria-label": colors.join(', '), title: colors.join(' · '), style: { background: hero }, onClick: () => onChange(o) },
                sup.length > 0 && (React.createElement("span", null, sup.map((c, j) => React.createElement("i", { key: j, style: { background: c } })))),
                on && React.createElement(__TwkCheck, { light: __twkIsLight(hero) })));
        }))));
}
function TweakButton({ label, onClick, secondary = false }) {
    return (React.createElement("button", { type: "button", className: secondary ? 'twk-btn secondary' : 'twk-btn', onClick: onClick }, label));
}
Object.assign(window, {
    useTweaks, TweaksPanel, TweakSection, TweakRow,
    TweakSlider, TweakToggle, TweakRadio, TweakSelect,
    TweakText, TweakNumber, TweakColor, TweakButton,
});
// Muna Media — Cases Hub Sections
function CasesHero() {
    return (React.createElement("section", { id: "cases-hero", style: { paddingTop: 100, paddingBottom: 60, overflow: 'hidden' } },
        React.createElement("div", { className: "blob-shape", style: {
                width: 400, height: 400, background: 'var(--accent)',
                top: -100, right: -100, opacity: .12, filter: 'blur(80px)'
            } }),
        React.createElement("div", { className: "container", style: { position: 'relative', zIndex: 1 } },
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' } },
                React.createElement("span", { className: "pill solid" },
                    React.createElement("span", { className: "dot" }),
                    " Case Hub"),
                React.createElement("span", { className: "mono", style: { color: 'var(--muted)' } }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442")),
            React.createElement("h1", { className: "display", style: { fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1150, lineHeight: 1.05 } },
                "\u041A\u0435\u0439\u0441\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0430\u0431\u043E\u0442 | ",
                React.createElement("span", { className: "serif", style: { fontFamily: 'Instrument Serif', fontStyle: 'italic' } }, "Muna Media")),
            React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: 'var(--ink-soft)' } }, "\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 Muna Media \u0434\u043B\u044F \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0431\u0440\u0435\u043D\u0434\u043E\u0432: \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432, \u043F\u0440\u043E\u043C\u043E, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0441 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u043E\u0439 \u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C."))));
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
    return (React.createElement("section", { id: "case-list", style: { background: 'var(--bg-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "sec-head" },
                React.createElement("div", null,
                    React.createElement("div", { className: "sec-eyebrow" },
                        React.createElement("span", { className: "pill" },
                            React.createElement("span", { className: "dot" }),
                            " 01 \u2014 \u041A\u0435\u0439\u0441\u044B")),
                    React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0425\u0430\u0431 \u043A\u0435\u0439\u0441\u043E\u0432")),
                React.createElement("p", { style: { maxWidth: 420, color: 'var(--ink-soft)', margin: 0 } }, "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0434\u043B\u044F Xiaomi, UnionPay \u0438 KoronaPay: \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0436\u0434\u044B\u0439 \u043A\u0435\u0439\u0441 \u0438 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438, \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B.")),
            React.createElement("div", { className: "grid-3", style: { gap: 28 } }, cases.map((item, idx) => (React.createElement("article", { key: idx, className: "card", style: { padding: 32, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 440 } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' } },
                    React.createElement("div", { className: "logo-chip", style: { fontSize: 24, opacity: 1 } },
                        React.createElement("span", { className: "glyph" }, item.glyph),
                        item.brand),
                    React.createElement("span", { className: "mono", style: { color: 'var(--muted)', textAlign: 'right' } }, item.tag)),
                React.createElement("h3", { className: "display", style: { fontSize: 30, margin: 0 } }, item.title),
                React.createElement("p", { style: { margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 } }, item.desc),
                React.createElement("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } }, item.tags.map(tag => React.createElement("span", { key: tag, className: "tag" }, tag))),
                React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1.5px solid var(--ink)', paddingTop: 18, marginTop: 'auto' } }, item.metrics.map(([n, label], i) => (React.createElement("div", { key: i, style: { paddingRight: 12, paddingLeft: i > 0 ? 12 : 0, borderRight: i < 2 ? '1px dashed var(--ink)' : 'none' } },
                    React.createElement("div", { className: "num-big", style: { fontSize: 30, color: 'var(--accent)' } }, n),
                    React.createElement("div", { className: "mono", style: { fontSize: 10, color: 'var(--muted)', marginTop: 8 } }, label))))),
                React.createElement("a", { href: item.href, className: item.disabled ? 'btn ghost' : 'btn lime', style: { justifyContent: 'center', pointerEvents: item.disabled ? 'none' : 'auto', opacity: item.disabled ? .55 : 1 } },
                    item.disabled ? 'Скоро' : 'Открыть кейс',
                    React.createElement("span", { className: "arrow" }, "\u2192")))))))));
}
function CasesCTA() {
    return (React.createElement("section", { id: "cases-cta", style: { paddingBottom: 60 } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "card", style: { padding: 'clamp(40px, 6vw, 72px)', background: 'var(--ink)', color: 'var(--bg)', textAlign: 'center' } },
                React.createElement("h2", { className: "display", style: { fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 20px', color: 'var(--bg)' } }, "\u0425\u043E\u0442\u0438\u0442\u0435 \u0442\u0430\u043A\u043E\u0439 \u0436\u0435 \u0440\u0430\u0437\u0431\u043E\u0440 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430?"),
                React.createElement("p", { style: { margin: '0 auto 28px', maxWidth: 720, color: 'rgba(255,255,255,.78)', fontSize: 18 } }, "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043C\u044B \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0432\u044B\u0445\u043E\u0434\u0430 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430 \u0441 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u043E\u043C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F, \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0440\u0438\u0441\u043A\u043E\u0432."),
                React.createElement("a", { href: "index.html#contact", className: "btn lime", style: { background: 'var(--accent)', color: 'var(--bg)' } },
                    "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
                    React.createElement("span", { className: "arrow" }, "\u2192"))))));
}
function Footer() {
    return React.createElement(MunaFooter, null);
}
Object.assign(window, { CasesHero, CasesGrid, CasesCTA, Footer });
// Muna Media — Cases Hub App
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
    "palette": "blue",
    "heroLayout": "default",
    "borderStyle": "hard"
} /*EDITMODE-END*/;
const PALETTES = {
    blue: { accent: '#295AE9', accent2: '#000000', label: 'Blue + Black' },
    electric: { accent: '#295AE9', accent2: '#295AE9', label: 'Electric Blue' },
    classic: { accent: '#000000', accent2: '#295AE9', label: 'Black + Blue' },
};
function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    React.useEffect(() => {
        const p = PALETTES[t.palette] || PALETTES.blue;
        document.documentElement.style.setProperty('--accent', p.accent);
        document.documentElement.style.setProperty('--accent-2', p.accent2);
        if (t.borderStyle === 'soft') {
            document.documentElement.style.setProperty('--shadow', '0 14px 32px -10px rgba(14,14,12,0.22)');
        }
        else {
            document.documentElement.style.setProperty('--shadow', '6px 6px 0 0 var(--ink)');
        }
    }, [t.palette, t.borderStyle]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Nav, null),
        React.createElement(CasesHero, null),
        React.createElement(CasesGrid, null),
        React.createElement(CasesCTA, null),
        React.createElement(Footer, null),
        React.createElement(TweaksPanel, { title: "Tweaks" },
            React.createElement(TweakSection, { label: "\u041F\u0430\u043B\u0438\u0442\u0440\u0430" }),
            React.createElement(TweakRadio, { label: "\u0421\u0445\u0435\u043C\u0430", value: t.palette, options: [
                    { value: 'blue', label: 'Blue' },
                    { value: 'electric', label: 'Electric' },
                    { value: 'classic', label: 'Black/Blue' },
                ], onChange: v => setTweak('palette', v) }),
            React.createElement(TweakSection, { label: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438" }),
            React.createElement(TweakRadio, { label: "\u0422\u0435\u043D\u0438", value: t.borderStyle, options: [
                    { value: 'hard', label: 'Брутальные' },
                    { value: 'soft', label: 'Мягкие' },
                ], onChange: v => setTweak('borderStyle', v) }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
