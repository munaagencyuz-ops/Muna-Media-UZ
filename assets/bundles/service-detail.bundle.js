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
// Muna Media — service detail page data
const SERVICE_PAGES = {
    led: {
        slug: 'led-screens.html',
        group: 'Наружная реклама',
        title: 'LED-экраны',
        hero: 'LED-экраны для заметного городского охвата',
        intro: 'Запускаем размещения на городских LED-экранах: подбираем локации, адаптируем ролики, контролируем выходы и связываем наружную рекламу с общей медиастратегией.',
        marquee: ['LED-экраны', 'Городской трафик', 'Медиаплан', 'Контроль выходов', 'Охват'],
        needs: [
            'Быстро повысить узнаваемость бренда в городе.',
            'Поддержать запуск продукта наружным визуальным контактом.',
            'Усилить digital-кампанию офлайн-присутствием.'
        ],
        why: ['Подбираем экраны по трафику и контексту района.', 'Адаптируем креатив под формат и длительность ролика.', 'Собираем фото- и видеоотчеты по размещениям.'],
        caseName: 'Xiaomi',
        caseUrl: 'xiaomi.html',
        caseText: 'В запусковых активностях Xiaomi наружные форматы помогали поддерживать узнаваемость продукта рядом с точками продаж и городским трафиком.',
        testimonial: 'Команда Muna Media умеет быстро собрать понятный медиаплан и держать качество размещения под контролем.',
        author: 'Маркетинг-менеджер технологического бренда',
        qa: [
            ['Как быстро можно запустить LED-размещение?', 'Обычно базовый медиаплан и доступные локации можно собрать за несколько рабочих дней. Срок запуска зависит от производства роликов и доступности экранов.'],
            ['Вы помогаете с креативом?', 'Да, адаптируем готовый ролик или готовим короткие версии под требования конкретных экранов.'],
            ['Можно ли совместить LED с онлайн-рекламой?', 'Да, часто мы используем LED как охватный слой, а онлайн-рекламу — для догрева и заявок.']
        ]
    },
    gas: {
        slug: 'gas-station-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама на АЗС',
        hero: 'Реклама на АЗС для аудитории автомобилистов',
        intro: 'Размещаем бренды в сетях АЗС: подбираем станции, форматы, географию и механику контакта с аудиторией, которая регулярно возвращается в одни и те же точки.',
        marquee: ['АЗС', 'Автомобилисты', 'Локации', 'Постеры', 'Экраны'],
        needs: ['Достучаться до платежеспособной городской аудитории.', 'Поддержать FMCG, финтех, авто- и телеком-предложения.', 'Закрепить бренд на ежедневных маршрутах.'],
        why: ['Знаем, какие форматы работают рядом с кассой, колонками и магазином.', 'Собираем адресную программу под район и поток.', 'Контролируем размещения и отчетность.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В промо UnionPay мы работали с точками высокого потока, включая розничные и городские маршруты, чтобы стимулировать реальные транзакции.',
        testimonial: 'Для нас было важно не просто поставить рекламу, а выбрать точки, где аудитория действительно принимает решение.',
        author: 'Проектный менеджер финтех-кампании',
        qa: [
            ['Какие форматы доступны на АЗС?', 'Постеры, экраны, навигация, промо-стойки и индивидуальные форматы зависят от сети и конкретной станции.'],
            ['Можно ли выбрать только нужные районы?', 'Да, медиаплан можно собрать по районам, маршрутам и предполагаемому профилю аудитории.'],
            ['Вы делаете промо-механику?', 'Да, можем добавить раздачу, QR-механику, купоны или связку с Telegram-ботом.']
        ]
    },
    malls: {
        slug: 'mall-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама в торговых центрах',
        hero: 'Реклама в ТЦ рядом с моментом покупки',
        intro: 'Запускаем внутренние рекламные форматы в торговых центрах: навигацию, промо-зоны, экраны и спецпроекты рядом с покупательским трафиком.',
        marquee: ['Торговые центры', 'Промо-зоны', 'Навигация', 'Покупатели', 'Ритейл'],
        needs: ['Повлиять на выбор рядом с покупкой.', 'Поддержать запуск в ритейле и партнерских точках.', 'Увеличить контакт с семейной и городской аудиторией.'],
        why: ['Подбираем ТЦ под аудиторию бренда и географию продаж.', 'Согласовываем форматы с площадками и администрацией.', 'Можем совместить размещение с промо-персоналом и событиями.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В кампании UnionPay ритейл-точки и офлайн-промо помогали объяснять механику акции и доводить пользователя до транзакции.',
        testimonial: 'Muna Media хорошо связывает ритейл, промо и digital, поэтому кампания не распадается на отдельные куски.',
        author: 'Руководитель BTL-направления',
        qa: [
            ['Можно ли поставить промо-стойку?', 'Да, если выбранный ТЦ и зона позволяют такой формат. Мы помогаем с согласованием и производством.'],
            ['Какие ТЦ можно подключить?', 'Список зависит от задачи, сроков и доступности площадей. Мы подбираем оптимальную сетку под кампанию.'],
            ['Нужен ли отдельный дизайн?', 'Чаще всего да: внутренние носители требуют адаптации макета под формат и дистанцию просмотра.']
        ]
    },
    buses: {
        slug: 'bus-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама на автобусах',
        hero: 'Реклама на автобусах для массового городского охвата',
        intro: 'Брендируем транспорт и подбираем маршруты так, чтобы бренд ежедневно появлялся в ключевых городских потоках и районах продаж.',
        marquee: ['Автобусы', 'Маршруты', 'Брендирование', 'Городской охват', 'Фотоотчет'],
        needs: ['Получить заметность в разных районах города.', 'Поддержать массовую кампанию или запуск продукта.', 'Сделать бренд частью ежедневного маршрута аудитории.'],
        why: ['Подбираем маршруты под географию аудитории.', 'Контролируем производство и монтаж.', 'Даем понятную отчетность по транспорту и срокам.'],
        caseName: 'KoronaPay',
        caseUrl: 'koronapay.html',
        caseText: 'Для финтех-кампаний транспортная среда помогает формировать доверие и регулярный контакт с широкой аудиторией.',
        testimonial: 'Транспортная реклама дала кампании ощущение масштаба и присутствия в городе.',
        author: 'Бренд-менеджер финансового сервиса',
        qa: [
            ['Можно выбрать маршруты?', 'Да, маршруты подбираются по районам, пассажиропотоку и близости к нужным точкам.'],
            ['Вы занимаетесь печатью и монтажом?', 'Да, можем закрыть производство, монтаж, контроль и демонтаж.'],
            ['Сколько длится размещение?', 'Чаще всего транспортные размещения планируются от нескольких недель до нескольких месяцев.']
        ]
    },
    busStops: {
        slug: 'bus-stop-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама на автобусных остановках',
        hero: 'Остановки как точка частого контакта с аудиторией',
        intro: 'Размещаем рекламу на остановочных павильонах и городских сити-форматах, где люди проводят время ожидания и хорошо считывают сообщение.',
        marquee: ['Остановки', 'Павильоны', 'Пешеходы', 'Сити-форматы', 'Частота'],
        needs: ['Усилить локальную узнаваемость в конкретных районах.', 'Донести простое предложение до широкой аудитории.', 'Поддержать кампанию рядом с метро, ТЦ или ритейлом.'],
        why: ['Выбираем остановки по потоку и окружению.', 'Адаптируем макеты под быстрый контакт.', 'Проверяем размещения на местах.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В промо-механиках UnionPay офлайн-точки с высоким потоком помогали объяснять акцию и вести аудиторию в цифровую механику.',
        testimonial: 'Остановки хорошо сработали как понятный и заметный слой кампании в городе.',
        author: 'Менеджер по офлайн-размещениям',
        qa: [
            ['Где лучше размещаться?', 'Зависит от аудитории: рядом с ТЦ, метро, офисными зонами, вузами или жилыми районами.'],
            ['Можно сделать адресную программу?', 'Да, мы собираем список точек и объясняем логику выбора каждой локации.'],
            ['Нужен короткий текст?', 'Да, для остановок лучше работают ясные сообщения, крупный визуал и один призыв к действию.']
        ]
    },
    metro: {
        slug: 'metro-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама в метро',
        hero: 'Реклама в метро для стабильного пассажирского потока',
        intro: 'Планируем размещения на станциях, переходах и транспортных маршрутах метро, где бренд получает регулярный контакт с городской аудиторией.',
        marquee: ['Метро', 'Станции', 'Пассажиропоток', 'Переходы', 'Охват'],
        needs: ['Получить частый контакт с ежедневной аудиторией.', 'Поддержать розничные точки рядом со станциями.', 'Сделать бренд видимым в транспортной среде.'],
        why: ['Подбираем станции по маршрутам и аудитории.', 'Адаптируем сообщение под короткий контакт.', 'Соединяем метро с промо, Telegram и digital-воронкой.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В кампании UnionPay промо у метро и городских потоков помогало привлекать участников в механику акции.',
        testimonial: 'Метро стало хорошим каналом для объяснения простого оффера массовой аудитории.',
        author: 'Координатор промо-кампании',
        qa: [
            ['Какие форматы есть в метро?', 'Доступность форматов зависит от станции: панели, навигационные носители, промо-зоны и другие варианты.'],
            ['Можно выбрать конкретные станции?', 'Да, станции подбираются по потоку, району и близости к нужным точкам.'],
            ['Метро подходит для премиум-брендов?', 'Да, если правильно выбрать станции, визуальный уровень и контекст размещения.']
        ]
    },
    airport: {
        slug: 'airport-ads.html',
        group: 'Наружная реклама',
        title: 'Реклама в аэропорту',
        hero: 'Реклама в аэропорту для премиального контакта',
        intro: 'Размещаем бренды в аэропортовой среде: от имиджевых носителей до навигационных и digital-форматов для деловой и туристической аудитории.',
        marquee: ['Аэропорт', 'Премиум-аудитория', 'Имидж', 'Путешественники', 'B2B'],
        needs: ['Укрепить статус бренда и доверие.', 'Достучаться до деловой и международной аудитории.', 'Поддержать выход бренда на рынок Узбекистана.'],
        why: ['Подбираем зоны по маршруту пассажира.', 'Помогаем с премиальной адаптацией креатива.', 'Собираем кампанию вокруг имиджа, доверия и запоминаемости.'],
        caseName: 'KoronaPay',
        caseUrl: 'koronapay.html',
        caseText: 'Для финансовых и международных сервисов аэропортовая среда особенно полезна: она усиливает доверие и ощущение масштаба.',
        testimonial: 'Аэропорт помог бренду выглядеть заметно и уверенно для аудитории, которая часто принимает решения быстро.',
        author: 'Директор по маркетингу международного сервиса',
        qa: [
            ['Какая аудитория видит рекламу в аэропорту?', 'Путешественники, деловая аудитория, туристы, экспаты и встречающие.'],
            ['Можно ли сделать имиджевую кампанию?', 'Да, аэропорт хорошо подходит для имиджевого присутствия и доверия к бренду.'],
            ['Какие сроки согласования?', 'Обычно нужно закладывать больше времени, чем для стандартных наружных форматов.']
        ]
    },
    seo: {
        slug: 'seo-optimization.html',
        group: 'Онлайн и поиск',
        title: 'SEO-оптимизация',
        hero: 'SEO-оптимизация для роста органического спроса',
        intro: 'Развиваем сайт как стабильный канал заявок: проводим технический аудит, собираем семантику, улучшаем структуру страниц и создаем контент под поисковый спрос.',
        marquee: ['SEO', 'Семантика', 'Технический аудит', 'Контент', 'Органический спрос'],
        needs: ['Получать заявки без постоянного роста рекламного бюджета.', 'Закрывать поисковый спрос на русском и локальном рынке.', 'Улучшить сайт перед масштабированием рекламы.'],
        why: ['Связываем SEO с бизнес-целями, а не только позициями.', 'Учитываем локальные запросы и поведение аудитории.', 'Работаем вместе с контентом, аналитикой и рекламой.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В digital-механиках UnionPay сайт был частью пути пользователя: объяснял правила, принимал участие и поддерживал промо.',
        testimonial: 'Muna Media смотрит на сайт как на часть воронки, а не как на отдельную техническую задачу.',
        author: 'Руководитель digital-направления',
        qa: [
            ['Когда SEO даст результат?', 'Первые технические улучшения видны быстро, но устойчивый рост обычно требует нескольких месяцев работы.'],
            ['Вы делаете тексты?', 'Да, готовим структуру, контент-план и тексты под поисковый спрос и брендовый тон.'],
            ['Можно ли начать с аудита?', 'Да, аудит помогает понять технические ошибки, структуру спроса и приоритеты работ.']
        ]
    },
    context: {
        slug: 'context-ads.html',
        group: 'Онлайн и поиск',
        title: 'Контекстная реклама',
        hero: 'Контекстная реклама с контролем заявок и бюджета',
        intro: 'Настраиваем поисковые и медийные кампании, строим структуру запросов, тестируем объявления и оптимизируем рекламу по стоимости обращения.',
        marquee: ['Контекст', 'Поиск', 'Заявки', 'Аналитика', 'Оптимизация'],
        needs: ['Быстро получить поток обращений.', 'Проверить спрос на продукт или услугу.', 'Управлять стоимостью привлечения клиента.'],
        why: ['Строим кампании вокруг целей бизнеса.', 'Настраиваем аналитику до запуска бюджета.', 'Регулярно чистим запросы и улучшаем объявления.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В кампании UnionPay платные каналы помогали вести аудиторию к сайту, Telegram-боту и механике участия.',
        testimonial: 'Команда не просто запускала объявления, а объясняла, что происходит с бюджетом и заявками.',
        author: 'Performance lead',
        qa: [
            ['С каким бюджетом можно стартовать?', 'Зависит от категории и конкуренции. Мы предлагаем тестовый медиаплан перед запуском.'],
            ['Вы настраиваете аналитику?', 'Да, без аналитики кампания не запускается: важно видеть заявки, клики и качество трафика.'],
            ['Можно ли быстро остановить неэффективные объявления?', 'Да, кампании регулярно оптимизируются по данным, а слабые связки отключаются.']
        ]
    },
    smm: {
        slug: 'smm.html',
        group: 'Соцсети и инфлюенсеры',
        title: 'SMM',
        hero: 'SMM для регулярной коммуникации бренда',
        intro: 'Ведем социальные сети бренда: стратегия, рубрикатор, визуальная система, тексты, публикации, модерация и связь с рекламными кампаниями.',
        marquee: ['SMM', 'Контент', 'Соцсети', 'Комьюнити', 'Визуальная система'],
        needs: ['Сделать бренд живым и понятным для аудитории.', 'Регулярно рассказывать о продуктах и акциях.', 'Поддерживать доверие через контент и ответы.'],
        why: ['Работаем с локальным контекстом и языком аудитории.', 'Соединяем контент, инфлюенсеров и рекламу.', 'Держим визуальный стандарт бренда.'],
        caseName: 'Xiaomi',
        caseUrl: 'xiaomi.html',
        caseText: 'Для Xiaomi команда Muna Media вела официальные соцсети, готовила визуальный контент и поддерживала продуктовые запуски.',
        testimonial: 'Соцсети стали регулярным каналом контакта с аудиторией, а не просто лентой публикаций.',
        author: 'Представитель consumer electronics бренда',
        qa: [
            ['Какие соцсети вы ведете?', 'Instagram, Telegram, Facebook и другие площадки в зависимости от аудитории бренда.'],
            ['Вы делаете съемки?', 'Да, можем организовать продуктовую и lifestyle-съемку, а также короткие видео.'],
            ['Можно ли вести только Telegram?', 'Да, если Telegram является ключевым каналом для вашей аудитории.']
        ]
    },
    influence: {
        slug: 'influencer-marketing.html',
        group: 'Соцсети и инфлюенсеры',
        title: 'Инфлюенс-маркетинг',
        hero: 'Инфлюенс-маркетинг с проверкой аудитории',
        intro: 'Подбираем блогеров под задачу бренда, проверяем аудиторию, согласовываем интеграции, контролируем публикации и собираем отчет по охвату и вовлечению.',
        marquee: ['Блогеры', 'Интеграции', 'Аудит аудитории', 'Охват', 'Доверие'],
        needs: ['Быстро получить доверительный контакт с аудиторией.', 'Поддержать запуск продукта через мнения лидеров.', 'Усилить промо-кампанию живыми рекомендациями.'],
        why: ['Проверяем блогеров перед закупкой.', 'Подбираем формат под продукт и тон бренда.', 'Контролируем публикации, отметки, охваты и переходы.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В кампании UnionPay блогеры давали охват, объясняли механику акции и помогали привести пользователей к участию.',
        testimonial: 'Подбор блогеров был точным: мы получили не только охват, но и понятное вовлечение.',
        author: 'Маркетинг-координатор промо-акции',
        qa: [
            ['Как вы выбираете блогеров?', 'Смотрим аудиторию, тематику, репутацию, вовлечение, прошлые интеграции и соответствие бренду.'],
            ['Можно работать с микроинфлюенсерами?', 'Да, часто микроинфлюенсеры дают более точный контакт и доверие в нишевых аудиториях.'],
            ['Вы контролируете публикации?', 'Да, согласовываем сценарии, сроки, отметки и собираем отчетность.']
        ]
    },
    telegram: {
        slug: 'telegram-marketing.html',
        group: 'Соцсети и инфлюенсеры',
        title: 'Telegram-маркетинг',
        hero: 'Telegram-маркетинг для локального охвата',
        intro: 'Запускаем посевы, закупки и спецпроекты в Telegram-каналах: подбираем площадки, готовим тексты, контролируем выходы и оцениваем охват.',
        marquee: ['Telegram', 'Каналы', 'Посевы', 'Спецпроекты', 'Охват'],
        needs: ['Быстро донести сообщение до локальной аудитории.', 'Поддержать промо или запуск продукта.', 'Получить охват в канале, которому аудитория уже доверяет.'],
        why: ['Подбираем каналы вручную, а не по голым цифрам.', 'Пишем нативные тексты под формат площадки.', 'Сверяем выходы и собираем отчетность.'],
        caseName: 'UnionPay',
        caseUrl: 'unionpay.html',
        caseText: 'В кампании UnionPay Telegram дал 38 размещений и более 1.15 млн охвата публикаций.',
        testimonial: 'Telegram стал одним из самых сильных каналов кампании по скорости и локальному охвату.',
        author: 'Онлайн-менеджер финтех-проекта',
        qa: [
            ['Как понять, какие каналы качественные?', 'Мы смотрим тематику, динамику просмотров, вовлечение, репутацию и соответствие аудитории.'],
            ['Вы готовите тексты для посевов?', 'Да, пишем и адаптируем тексты под формат каждого канала.'],
            ['Можно сделать Telegram-бота?', 'Да, можем связать размещения с ботом, регистрацией, промо-механикой или сбором заявок.']
        ]
    },
    events: {
        slug: 'event-management.html',
        group: 'События',
        title: 'Ивент-менеджмент',
        hero: 'Ивент-менеджмент для запусков и промо',
        intro: 'Организуем презентации, промо-мероприятия, брендовые события и запуски продуктов: концепция, площадка, подрядчики, сценарий, продакшн и координация.',
        marquee: ['Ивенты', 'Запуски', 'Презентации', 'Подрядчики', 'Координация'],
        needs: ['Провести запуск продукта с сильным первым впечатлением.', 'Собрать партнеров, медиа, блогеров и клиентов в одном событии.', 'Перевести бренд из рекламы в живой опыт.'],
        why: ['Держим событие как маркетинговый инструмент, а не просто организацию.', 'Берем на себя подрядчиков, тайминг и контроль площадки.', 'Связываем ивент с PR, соцсетями и инфлюенсерами.'],
        caseName: 'Xiaomi',
        caseUrl: 'xiaomi.html',
        caseText: 'Для Xiaomi команда Muna Media организовала презентацию линейки Xiaomi 13T и поддержала запуск визуальным контентом.',
        testimonial: 'Ивент прошел как часть общей кампании: гости, контент и инфоповоды работали в одну сторону.',
        author: 'Менеджер по запуску продукта',
        qa: [
            ['Вы организуете событие под ключ?', 'Да, можем закрыть концепцию, площадку, подрядчиков, сценарий, координацию и отчетность.'],
            ['Можно пригласить блогеров и СМИ?', 'Да, ивент можно связать с PR, инфлюенсерами и последующим контентом в соцсетях.'],
            ['Какие события вы делаете?', 'Презентации продуктов, промо-активации, партнерские мероприятия, пресс-события и брендовые встречи.']
        ]
    }
};
const SHARED_SERVICE_FAQ = [
    ['Вы работаете только с крупным бизнесом?', 'Мы специализируемся на корпоративных и международных брендах, но можем собрать решение под любую задачу, где важны прозрачность, отчетность и качество исполнения.'],
    ['Вы работаете только в Ташкенте?', 'Нет. Работаем по всему Узбекистану: Ташкент, Самарканд, Бухара, Наманган, Андижан и другие города. Для части задач можем подключать и рынки Центральной Азии.'],
    ['Как быстро можно стартовать?', 'Обычно запуск занимает 5-10 рабочих дней. Если нужно производство материалов или сложные согласования, срок может увеличиться до 14 рабочих дней.'],
    ['Какая отчетность будет?', 'Для наружной рекламы даем фото- и видеоотчеты, для digital - данные по трафику, заявкам, конверсиям и стоимости результата.']
];
const SERVICE_COPY = {
    seo: {
        intro: 'Muna Media выводит бренды в топ поисковой выдачи Google и Yandex на узбекском рынке: техническая база, мультиязычная семантика и контент, который приводит не просто трафик, а клиентов.',
        problemTitle: 'Почему сайты теряют органический спрос',
        problem: [
            'Компании теряют органический трафик не потому, что “SEO не работает”, а потому что сайт технически сломан, структура не отвечает локальному спросу, а семантика собрана без учета русского, узбекского и английского поведения аудитории.',
            'Реальное SEO в Узбекистане - это не закупка ссылок и тексты ради ключевых слов. Это системная работа с сайтом, репутацией домена, контентом и конверсией.'
        ],
        approachTitle: 'SEO как канал заявок, а не позиции ради позиций',
        approach: ['Мы строим SEO вокруг бизнес-метрик: органический трафик, стоимость лида, конверсия страниц и вклад канала в продажи.'],
        deliverables: [
            { title: 'Технический SEO-аудит', desc: 'Проверяем скорость, индексацию, структуру URL, schema-разметку, мобильную версию и ошибки, которые мешают росту.' },
            { title: 'Мультиязычная семантика', desc: 'Собираем запросы на русском, узбекском и английском языках с учетом Ташкента, регионов и локального спроса.' },
            { title: 'Контент-стратегия', desc: 'Готовим SEO-страницы и статьи, которые отвечают на реальные вопросы клиентов, а не просто набиты ключевыми словами.' },
            { title: 'Ссылочный профиль', desc: 'Работаем с локальными медиа, отраслевыми порталами и партнерскими размещениями без серых бирж и токсичных ссылок.' }
        ],
        cases: [
            { brand: 'E-commerce', task: 'Полный аудит, семантика на трех языках и контент-план на 6 месяцев.', result: 'Органический трафик вырос на 210% за 5 месяцев, доля платного трафика снизилась с 74% до 41%.' },
            { brand: 'Fintech', task: 'Задача - выйти в топ-3 по запросам онлайн-платежей.', work: 'Оптимизировали посадочные страницы, внутреннюю перелинковку и подготовили 40+ экспертных материалов.', result: 'Топ-3 по 18 высокочастотным запросам за 4 месяца, стоимость органического лида снизилась на 56%.' }
        ],
        standards: ['Ежемесячный отчет по позициям, трафику и конверсиям.', 'Аудит до старта без скрытых платежей.', 'Прозрачные технические задания для сайта и контента.', 'Ответ команды за 15 минут: 24/7, 365 дней в году.'],
        ctaTitle: 'Хотите понять, где сайт теряет трафик?',
        ctaText: 'Оставьте заявку - проведем бесплатный экспресс-аудит сайта и покажем точки роста органического спроса на рынке Узбекистана.'
    },
    led: {
        intro: 'Запускаем рекламу на LED-экранах в Ташкенте и регионах Узбекистана: подбираем локации по трафику, готовим контент, контролируем выходы и даем прозрачную отчетность.',
        problemTitle: 'Почему LED-размещения часто выглядят непрозрачно',
        problem: ['Классический медиабаинг LED-экранов часто превращается в “купили где-то ролики”. Клиент не понимает реальную стоимость инвентаря, видит ли аудитория ролик и были ли выходы в нужное время.', 'Мы убираем эту слепую зону: фиксируем площадки, подтверждаем выходы и показываем, как наружный контакт связан с общей кампанией.'],
        approachTitle: 'LED-экраны с контролем инвентаря и выходов',
        approach: ['Используем проверенные экраны в ключевых локациях Ташкента и регионов. Каждый выход подтверждаем фото- или видеоотчетом, а медиаплан собираем под задачу бренда.'],
        deliverables: [
            { title: 'Подбор локаций', desc: 'Выбираем экраны по трафику, району, аудитории и близости к точкам продаж.' },
            { title: 'Производство контента', desc: 'Адаптируем ролики под длительность, формат экрана и дистанцию просмотра.' },
            { title: 'Медиапланирование', desc: 'Собираем график выходов, частоту контакта и понятный бюджет без скрытой логики.' },
            { title: 'Подтверждение выходов', desc: 'Даем фото- и видеоотчеты по размещениям и контролируем фактический запуск.' }
        ],
        cases: [
            { brand: 'International FMCG', task: 'Запуск продукта на 14 LED-экранах в ключевых точках города с синхронизацией digital.', result: '1,2 млн уникальных контактов за 2 недели, узнаваемость выросла на 28%.' },
            { brand: 'Автодилер в Ташкенте', task: '8 экранов рядом с магистралями и бизнес-районами, QR-механика для записи на тест-драйв.', result: '340 QR-переходов, 87 записей на тест-драйв, CPL в 2,1 раза ниже digital.' }
        ],
        standards: ['Фото- и видеоотчет по каждому размещению.', 'Прозрачная стоимость инвентаря и производства.', 'Подготовка контента до 5 рабочих дней.', 'Ответ команды за 15 минут.'],
        ctaTitle: 'Подобрать LED-экраны под вашу задачу?',
        ctaText: 'Покажем доступные локации, рассчитаем охват и соберем медиаплан без хаоса.'
    },
    gas: {
        intro: 'Размещаем рекламу на АЗС по Узбекистану, где бренд получает контакт с платежеспособной аудиторией автомобилистов во время естественного ожидания.',
        problemTitle: 'Почему АЗС недооценивают как рекламный канал',
        problem: ['Водитель проводит на АЗС 3-7 минут с высокой концентрацией внимания. Это аудитория автомобилистов с регулярными маршрутами и высоким коммерческим потенциалом.', 'Но рынок размещений на АЗС часто неструктурирован: непонятно, какие станции выбрать, как контролировать выходы и как связать офлайн с продажами.'],
        approachTitle: 'АЗС как точка регулярного контакта с автомобилистами',
        approach: ['Мы подбираем станции по географии, трафику и аудитории, контролируем размещения и при необходимости связываем их с digital, QR, промокодами или Telegram-механикой.'],
        deliverables: [
            { title: 'Подбор сети АЗС', desc: 'Собираем адресную программу по районам, маршрутам и профилю аудитории.' },
            { title: 'Форматы размещения', desc: 'Экраны, постеры, кассовые зоны, промо-стойки и индивидуальные форматы.' },
            { title: 'Производство материалов', desc: 'Готовим макеты под формат, видимость и короткое время контакта.' },
            { title: 'Контроль и отчетность', desc: 'Проверяем размещения на точках и даем фотоотчеты.' }
        ],
        cases: [
            { brand: 'Страховая компания', task: '60 АЗС в Ташкенте и пяти городах для аудитории автомобилистов.', result: 'Заявки на автострахование выросли на 41%, стоимость контакта оказалась на 35% ниже digital.' },
            { brand: 'Food delivery', task: 'Промокод на экранах АЗС плюс push-коммуникация в радиусе 500 метров.', result: '2800 активаций промокода за 3 недели, средний чек вырос на 18%.' }
        ],
        standards: ['Фотоотчет по каждой точке.', 'Контроль сроков размещения.', 'Прозрачная цена по сети и формату.', 'Ответ команды за 15 минут.']
    },
    malls: {
        intro: 'Запускаем рекламу в торговых центрах Ташкента и Узбекистана: экраны, навигация, промо-зоны, брендинг и спецпроекты рядом с моментом покупки.',
        problemTitle: 'Почему реклама в ТЦ должна быть системной',
        problem: ['Торговые центры дают контакт с аудиторией, которая уже пришла тратить деньги. Но если выбрать случайные носители и зоны, бренд будет виден “где-то”, а не там, где принимается решение.', 'Мы работаем с трафиком внутри ТЦ: входные группы, фудкорты, эскалаторы, якорные магазины и точки продаж.'],
        approachTitle: 'ТЦ как среда влияния на покупку',
        approach: ['Выбираем торговые центры и зоны по покупательскому поведению, согласовываем форматы и связываем размещение с промо, консультантами, QR или digital-поддержкой.'],
        deliverables: [
            { title: 'Подбор ТЦ и локаций', desc: 'Выбираем площадки и зоны с учетом аудитории, трафика и близости к продажам.' },
            { title: 'Форматы размещения', desc: 'Экраны, навигация, брендирование, промо-зоны и внутренние носители.' },
            { title: 'Промо-активации', desc: 'Подключаем консультантов, sampling, розыгрыши и механики регистрации.' },
            { title: 'Отчетность', desc: 'Фиксируем размещения и собираем данные по промо-результатам.' }
        ],
        cases: [
            { brand: 'Косметический бренд', task: 'Экраны в 6 ТЦ Ташкента плюс промо-зона с консультантами и sampling.', result: '4100 сэмплов, конверсия в покупку 23%, продажи выше плана на 31%.' },
            { brand: 'Банк', task: 'Экраны рядом с банкоматами и кассами в 4 ТЦ плюс стойка консультанта.', result: '890 оформленных карт за месяц, конверсия контакта в карту 11%.' }
        ],
        standards: ['Фото- и видеоотчет по каждой зоне.', 'Производство материалов до 5 рабочих дней.', 'Согласование с администрацией ТЦ.', 'Ответ команды за 15 минут.']
    },
    buses: {
        intro: 'Брендируем городские автобусы и подбираем маршруты по Узбекистану, чтобы бренд ежедневно появлялся в ключевых районах и транспортных потоках.',
        problemTitle: 'Почему транспортная реклама требует контроля',
        problem: ['Автобусы дают массовый охват и низкую стоимость контакта, но без контроля легко получить слабые маршруты, плохой монтаж и отсутствие реальной отчетности.', 'Мы ведем полный цикл: маршруты, производство, нанесение, мониторинг и фотофиксация транспорта.'],
        approachTitle: 'Автобусы как мобильный охват по маршрутам аудитории',
        approach: ['Подбираем транспорт по районам, пассажиропотоку и близости к точкам продаж. Каждый автобус фиксируем и контролируем в течение кампании.'],
        deliverables: [
            { title: 'Подбор маршрутов', desc: 'Собираем сетку маршрутов под географию аудитории и города.' },
            { title: 'Производство и нанесение', desc: 'Готовим материалы, контролируем печать, монтаж и внешний вид.' },
            { title: 'Мониторинг кампании', desc: 'Проверяем транспорт в период размещения и решаем вопросы с подрядчиками.' },
            { title: 'Фотоотчетность', desc: 'Даем подтверждения по каждому транспортному средству.' }
        ],
        cases: [
            { brand: 'Telecom', task: '120 автобусов на ключевых маршрутах Ташкента на 6 недель.', result: 'Более 2 млн контактов, стоимость контакта $0.003 - в 8 раз ниже digital.' },
            { brand: 'Retail opening', task: '30 автобусов по району за 2 недели до открытия магазина.', result: '1200 посетителей в день открытия, трафик в 2,3 раза выше плана.' }
        ],
        standards: ['Фотоотчет по каждому автобусу.', 'Мониторинг кампании во время размещения.', 'Производство и монтаж до 7 дней.', 'Ответ команды за 15 минут.']
    },
    busStops: {
        intro: 'Размещаем рекламу на остановках и сити-форматах Ташкента и регионов, где аудитория ждет транспорт и спокойно считывает сообщение.',
        problemTitle: 'Почему остановки работают на локальную узнаваемость',
        problem: ['Остановки дают повторяемый контакт в конкретных районах: люди видят сообщение каждый день по пути на работу, учебу или домой.', 'Проблема рынка - мало прозрачности по потоку, состоянию носителей и фактическому размещению. Мы закрываем это адресной программой и отчетностью.'],
        approachTitle: 'Остановки как точка частого городского контакта',
        approach: ['Подбираем остановки по пассажиропотоку, окружению и близости к ТЦ, офисам, вузам, метро или розничным точкам бренда.'],
        deliverables: [
            { title: 'Аудит и подбор остановок', desc: 'Собираем адресную программу и объясняем роль каждой точки.' },
            { title: 'Производство материалов', desc: 'Адаптируем макет под дистанцию, свет, формат и быстрый контакт.' },
            { title: 'Размещение и контроль', desc: 'Следим за сроками, состоянием носителей и корректностью установки.' },
            { title: 'Отчетность', desc: 'Даем фото до и после размещения по каждой точке.' }
        ],
        cases: [
            { brand: 'Аптечная сеть', task: '45 остановок в радиусе 800 метров от новых аптек.', result: 'Трафик в первый месяц выше плана на 47%, 62% новых покупателей видели рекламу на остановках.' },
            { brand: 'EdTech', task: 'Остановки рядом с вузами и колледжами с QR-регистрацией.', result: '1900 QR-переходов за 4 недели, стоимость регистрации на 29% ниже таргета.' }
        ],
        standards: ['Фото до и после по каждой точке.', 'Мониторинг состояния носителей.', 'Производство до 5 рабочих дней.', 'Ответ команды за 15 минут.']
    },
    metro: {
        intro: 'Запускаем рекламу в метро Ташкента: станции, вагоны, лайтбоксы, постеры, аудио и брендирование для ежедневного городского пассажиропотока.',
        problemTitle: 'Почему метро дает внимание, которое нельзя пролистать',
        problem: ['В метро пассажир не может “скипнуть” носитель: он ждет поезд, находится в вагоне и повторно видит сообщение на маршруте.', 'При этом рынок форматов закрытый и требует грамотных согласований, производства и подтверждения фактических размещений.'],
        approachTitle: 'Метро как гарантированный контакт в транспортной среде',
        approach: ['Подбираем станции и форматы по пассажиропотоку, маршрутам аудитории и бизнес-задаче: охват, узнаваемость, заявки или установки.'],
        deliverables: [
            { title: 'Лайтбоксы и постеры', desc: 'Размещения на станциях, платформах и переходах.' },
            { title: 'Реклама в вагонах', desc: 'Форматы внутри поездов для повторного контакта в пути.' },
            { title: 'Брендирование вагона', desc: 'Имиджевый формат для сильного визуального присутствия.' },
            { title: 'Аудиореклама', desc: 'Дополнительный канал контакта с пассажирами на маршруте.' }
        ],
        cases: [
            { brand: 'Банковское приложение', task: 'QR-постеры на 12 станциях и внутри 40 вагонов на 4 недели.', result: '18 400 QR-переходов, 9700 установок, CPL на 44% ниже таргетированной рекламы.' },
            { brand: 'Университет', task: 'Брендирование 2 вагонов и лайтбоксы на 6 центральных станциях.', result: 'Запросы на поступление выросли на 38%.' }
        ],
        standards: ['Фото- и видеоотчеты по форматам.', 'Согласование с метро и подрядчиками.', 'Производство до 7 дней.', 'Ответ команды за 15 минут.']
    },
    airport: {
        intro: 'Размещаем рекламу в международном аэропорту Ташкента для деловой, туристической и премиальной аудитории: от digital-экранов до брендирования зон.',
        problemTitle: 'Почему аэропорт важен для премиальных и B2B-брендов',
        problem: ['Пассажир проводит в аэропорту от 1 до 3 часов, находится в среде доверия и часто имеет высокий платежеспособный профиль.', 'Это точка входа в Узбекистан для бизнеса и туристов, поэтому формат особенно силен для международных, финансовых, hotel, travel и B2B-брендов.'],
        approachTitle: 'Аэропорт как имиджевый канал с точным контекстом',
        approach: ['Подбираем зоны по маршруту пассажира: регистрация, вылет, прилет, международный терминал, бизнес-зал и багажная зона.'],
        deliverables: [
            { title: 'Цифровые экраны и лайтбоксы', desc: 'Видимые носители в ключевых пассажирских потоках.' },
            { title: 'Брендирование зон', desc: 'Имиджевые решения для заметного присутствия бренда.' },
            { title: 'Тележки для багажа', desc: 'Формат с длительным контактом в зоне прилета и выдачи багажа.' },
            { title: 'Бизнес-зал', desc: 'Премиальный контакт с деловой аудиторией.' }
        ],
        cases: [
            { brand: 'Hotel chain', task: 'Зона прилета, бизнес-зал и багажные тележки.', result: 'Прямые бронирования на сайте выросли на 34% за 6 недель, 28% гостей отметили рекламу в аэропорту.' },
            { brand: 'Financial B2B', task: '3 месяца в бизнес-зале: экран, стойка материалов и брендированная coffee-зона.', result: '41 входящая заявка от корпоративных клиентов.' }
        ],
        standards: ['Фотоотчет по каждому формату и зоне.', 'Согласование с администрацией аэропорта.', 'Производство до 7 дней.', 'Ответ команды за 15 минут.']
    },
    smm: {
        intro: 'Ведем социальные сети брендов в Узбекистане: Instagram, Telegram, YouTube и другие каналы с контент-стратегией, визуальной системой, модерацией и понятными метриками.',
        problemTitle: 'Почему SMM в Узбекистане нельзя копировать с других рынков',
        problem: ['Здесь Telegram часто важнее Facebook, локальные культурные коды влияют на доверие, а механическое копирование глобальной стратегии не работает.', 'Многие агентства отчитываются лайками и охватами, но не связывают контент с заявками, продажами и репутацией бренда.'],
        approachTitle: 'Соцсети как управляемый канал коммуникации',
        approach: ['Мы строим SMM вокруг бизнес-задачи: продажи, доверие, запуск продукта, поддержка клиентов или рост сообщества. Контент-план связан с воронкой, а не существует отдельно.'],
        deliverables: [
            { title: 'Стратегия и контент-план', desc: 'Определяем роли каналов, рубрики, язык, визуальный стиль и KPI.' },
            { title: 'Производство контента', desc: 'Готовим тексты, визуалы, видео, сторис и адаптации под площадки.' },
            { title: 'Комьюнити-менеджмент', desc: 'Работаем с комментариями, сообщениями, вопросами и репутацией бренда.' },
            { title: 'Аналитика и отчетность', desc: 'Показываем рост аудитории, вовлечение, переходы и вклад соцсетей в кампании.' }
        ],
        cases: [
            { brand: 'International clothing brand', task: 'Instagram и Telegram с нуля, контент-стратегия и поддержка инфлюенсеров.', result: '28 тыс. подписчиков в Instagram и 14 тыс. в Telegram за 3 месяца, конверсия social-to-purchase 4,2%.' },
            { brand: 'Банк', task: 'Пересборка контент-стратегии для мобильного банкинга с локальным educational и interactive контентом.', result: 'ER вырос с 1,1% до 4,7%, установки из соцсетей выросли на 63%.' }
        ],
        standards: ['Ежемесячный контент-план.', 'Ответ на комментарии и сообщения до 2 часов.', 'Отчет по каждой платформе.', 'Ответ команды за 15 минут.']
    },
    context: {
        intro: 'Настраиваем и ведем контекстную рекламу Google Ads для бизнеса в Узбекистане: поисковые кампании, медийные форматы, аналитика и оптимизация по стоимости заявки.',
        problemTitle: 'Почему контекстная реклама дорожает без локальной стратегии',
        problem: ['Локальная семантика отличается от российского и западного рынка: люди ищут по-русски, по-узбекски и смешанными формулировками. Если просто скопировать структуру кампаний, бюджет уходит в дорогой низкокачественный трафик.', 'Процент от бюджета тоже часто ломает мотивацию подрядчика: чем больше тратит клиент, тем выгоднее агентству. Мы оптимизируем не клики, а стоимость результата.'],
        approachTitle: 'Performance с фокусом на лиды, продажи и ROAS',
        approach: ['Строим кампании вокруг экономики: CPL, CAC, ROAS, качество заявок и вклад канала в продажи. До запуска настраиваем аналитику и структуру целей.'],
        deliverables: [
            { title: 'Аудит и стратегия', desc: 'Проверяем текущие кампании, сайт, аналитику и конкурентную среду.' },
            { title: 'Настройка и запуск', desc: 'Собираем семантику, группы объявлений, минус-слова, цели и структуру кампаний.' },
            { title: 'Оптимизация и ведение', desc: 'Регулярно чистим запросы, тестируем объявления и перераспределяем бюджет.' },
            { title: 'Аналитика и отчетность', desc: 'Показываем заявки, стоимость, качество трафика и рекомендации по росту.' }
        ],
        cases: [
            { brand: 'B2B SaaS', task: 'Снизить стоимость лида и увеличить долю квалифицированных заявок.', work: 'Провели аудит, пересобрали структуру, добавили узбекскую семантику и оптимизировали посадочные.', result: 'CPL снизился с $18 до $7,4 за 2 месяца, квалифицированные лиды выросли на 87%.' },
            { brand: 'E-commerce', task: 'Увеличить ROAS и сократить долю рекламных расходов в выручке.', result: 'ROAS вырос со 180% до 420%, доля рекламных расходов снизилась с 14% до 6%.' }
        ],
        standards: ['Прозрачный доступ к рекламному кабинету.', 'Еженедельные короткие и ежемесячные подробные отчеты.', 'Оптимизация не реже 2 раз в неделю.', 'Ответ команды за 15 минут.']
    },
    telegram: {
        intro: 'Строим Telegram-маркетинг в Узбекистане: каналы бренда, посевы, Telegram Ads, боты, промо-механики и отчетность по каждому размещению.',
        problemTitle: 'Почему Telegram в Узбекистане нельзя вести как Instagram',
        problem: ['Telegram в Узбекистане - один из главных каналов ежедневной коммуникации. Если бренд отсутствует там, он теряет прямой контакт с аудиторией.', 'Но Telegram требует отдельной стратегии: другой формат текста, доверие к каналам, посевы, боты и механики, которые нельзя просто перенести из Instagram.'],
        approachTitle: 'Telegram как канал охвата, доверия и прямой продажи',
        approach: ['Мы запускаем и ведем бренд-каналы, закупаем размещения в тематических каналах, используем Telegram Ads и связываем коммуникацию с ботами, промокодами и заявками.'],
        deliverables: [
            { title: 'Стратегия и запуск канала', desc: 'Определяем роль Telegram, рубрики, tone of voice и механику роста.' },
            { title: 'Ведение канала и контент', desc: 'Пишем посты, готовим визуалы и адаптируем сообщения под аудиторию.' },
            { title: 'Telegram Ads', desc: 'Настраиваем рекламные кампании и отслеживаем эффективность.' },
            { title: 'Посевы в тематических каналах', desc: 'Подбираем каналы, проверяем качество аудитории и контролируем выходы.' }
        ],
        cases: [
            { brand: 'Retail chain', task: 'Запуск канала, 15 тематических каналов и Telegram Ads.', result: '22 тыс. подписчиков за 8 недель, средний охват 8400, Telegram direct sales - 12% выручки.' },
            { brand: 'EdTech', task: 'Посевы в образовательных каналах и Telegram-бот для регистрации.', result: '3600 регистраций за 2 недели, конверсия перехода в регистрацию 31%, стоимость регистрации $1,2.' }
        ],
        standards: ['Аудит каналов перед посевами.', 'Отчет по каждому размещению.', 'Ежемесячный контент-план.', 'Ответ команды за 15 минут.']
    },
    events: {
        intro: 'Организуем корпоративные и брендовые события в Узбекистане: презентации продуктов, B2B-мероприятия, промо-активации и запуски от концепции до отчета.',
        problemTitle: 'Почему ивент на новом рынке легко превращается в риск',
        problem: ['Событие в незнакомой стране - это подрядчики, площадки, техника, гости, локальный контекст и репутационные риски. Ошибка в одном звене влияет на весь запуск.', 'Мы делаем ивент не как шоу ради шоу, а как маркетинговый инструмент с понятной задачей, аудиторией и пост-ивент аналитикой.'],
        approachTitle: 'Ивент как часть маркетинговой стратегии',
        approach: ['Берем на себя концепцию, площадку, подрядчиков, логистику, коммуникации, СМИ, блогеров и отчетность. Событие должно работать на продукт, лиды, PR или продажи.'],
        deliverables: [
            { title: 'Стратегия и концепция', desc: 'Формулируем задачу события, сценарий, аудиторию и ключевое впечатление.' },
            { title: 'Организация и логистика', desc: 'Площадка, техника, подрядчики, гости, тайминг и контроль дня мероприятия.' },
            { title: 'Коммуникационная поддержка', desc: 'PR, блогеры, соцсети, приглашения и контент вокруг события.' },
            { title: 'Post-event аналитика', desc: 'Отчет по гостям, лидам, охватам, публикациям и следующим шагам.' }
        ],
        cases: [
            { brand: 'International IT company', task: 'Презентация продукта для 200 B2B-гостей.', work: 'Площадка, техника, аудитория через бизнес-медиа и Telegram, модерация и программа.', result: '180 целевых участников, 34 квалифицированных лида, 12 публикаций в бизнес-медиа.' },
            { brand: 'FMCG launch', task: 'Запуск продукта с интерактивом, блогерами, журналистами и B2B-партнерами.', result: '28 медиа и Telegram-публикаций, охват 1,4 млн, продажи первой недели выше плана на 55%.' }
        ],
        standards: ['Подробный бриф и смета до старта.', 'Единый проектный менеджер.', 'Ответ команды за 15 минут.', 'Post-event отчет в течение 5 дней.']
    }
};
Object.keys(SERVICE_COPY).forEach(key => {
    if (!SERVICE_PAGES[key])
        return;
    SERVICE_PAGES[key] = Object.assign(Object.assign(Object.assign({}, SERVICE_PAGES[key]), SERVICE_COPY[key]), { qa: [...(SERVICE_PAGES[key].qa || []), ...SHARED_SERVICE_FAQ] });
});
function getServicePage() {
    return SERVICE_PAGES[window.SERVICE_KEY] || SERVICE_PAGES.led;
}
Object.assign(window, { SERVICE_PAGES, getServicePage });
// Muna Media — service detail page sections
function ServiceHero() {
    const s = getServicePage();
    React.useEffect(() => {
        document.title = `${s.title} | Muna Media`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta)
            meta.setAttribute('content', s.intro);
    }, [s.title, s.intro]);
    return (React.createElement("section", { id: "hero", style: { paddingTop: 96, paddingBottom: 56, overflow: 'hidden' } },
        React.createElement("div", { className: "blob-shape", style: {
                width: 420, height: 420, background: 'var(--accent)',
                top: -120, right: -120, opacity: .12, filter: 'blur(80px)'
            } }),
        React.createElement("div", { className: "container", style: { position: 'relative', zIndex: 1 } },
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' } },
                React.createElement("span", { className: "pill solid" },
                    React.createElement("span", { className: "dot" }),
                    " ",
                    s.group),
                React.createElement("span", { className: "mono", style: { color: 'var(--muted)' } }, "Muna Media / Uzbekistan")),
            React.createElement("h1", { className: "display", style: { fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1120, lineHeight: 1.03 } }, s.hero),
            React.createElement("div", { style: { display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' } },
                React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 820, margin: 0, color: 'var(--ink-soft)' } }, s.intro),
                React.createElement("div", { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } },
                    React.createElement("a", { href: "#contact", className: "btn lime", style: { background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' } },
                        "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
                        React.createElement("span", { className: "arrow" }, "\u2192")),
                    React.createElement("a", { href: "services-uzbekistan.html", className: "btn ghost" },
                        "\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438",
                        React.createElement("span", { className: "arrow" }, "\u2192")))))));
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
    return (React.createElement("div", { className: "marquee partner-marquee" },
        React.createElement("style", { dangerouslySetInnerHTML: { __html: `
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` } }),
        React.createElement("div", { className: "marquee-track", style: {
                display: 'flex',
                alignItems: 'center',
                width: 'max-content'
            } }, items.map((partner, i) => (React.createElement("div", { key: `${partner.name}-${i}`, className: "logo-chip brand-logo-chip" },
            React.createElement("img", { src: partner.src, alt: partner.name, style: { '--logo-w': `${partner.width}px` } })))))));
}
function ServiceDescription() {
    const s = getServicePage();
    const problemText = Array.isArray(s.problem) ? s.problem : [s.problem].filter(Boolean);
    const scenarios = s.needs || [];
    return (React.createElement("section", { id: "description", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "grid-2", style: { gap: 48, alignItems: 'start' } },
                React.createElement("div", null,
                    React.createElement("div", { className: "sec-eyebrow" },
                        React.createElement("span", { className: "pill" },
                            React.createElement("span", { className: "dot" }),
                            " 01 \u2014 \u0417\u0430\u0447\u0435\u043C \u043D\u0443\u0436\u043D\u0430")),
                    React.createElement("h2", { className: "display sec-title", style: { margin: '0 0 22px' } }, s.problemTitle || 'Когда эта услуга решает задачу'),
                    React.createElement("div", { style: { display: 'grid', gap: 14, fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 720 } }, (problemText.length ? problemText : [`${s.title} нужна, когда бренду важно не просто появиться в канале, а встроить его в понятную маркетинговую систему: с аудиторией, сообщением, сроками, отчетностью и связью с продажами.`]).map(text => (React.createElement("p", { key: text, style: { margin: 0 } }, text))))),
                React.createElement("div", { className: "card", style: { padding: 34 } },
                    React.createElement("div", { className: "mono", style: { color: 'var(--accent)', fontWeight: 700, marginBottom: 18 } }, "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F"),
                    React.createElement("div", { style: { display: 'grid', gap: 14 } }, scenarios.map((item, i) => (React.createElement("div", { key: item, style: { display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i ? 14 : 0, borderTop: i ? '1px dashed var(--ink)' : 'none' } },
                        React.createElement("span", { className: "glyph", style: { width: 34, height: 34, flexShrink: 0 } }, i + 1),
                        React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.5 } }, item))))))))));
}
function ServiceWhyUs() {
    const s = getServicePage();
    const approachText = Array.isArray(s.approach) ? s.approach : [s.approach].filter(Boolean);
    const cards = s.deliverables || (s.why || []).map((item, i) => ({ title: `Причина 0${i + 1}`, desc: item }));
    return (React.createElement("section", { id: "why-us", style: { borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "sec-head" },
                React.createElement("div", null,
                    React.createElement("div", { className: "sec-eyebrow" },
                        React.createElement("span", { className: "pill" },
                            React.createElement("span", { className: "dot" }),
                            " 02 \u2014 \u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B")),
                    React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, s.approachTitle || 'Почему Muna Media')),
                React.createElement("div", { style: { maxWidth: 520, color: 'var(--ink-soft)', margin: 0, display: 'grid', gap: 10 } }, (approachText.length ? approachText : ['Мы соединяем локальный рынок, креатив, подрядчиков и аналитику в одну управляемую систему.']).map(text => (React.createElement("p", { key: text, style: { margin: 0 } }, text))))),
            React.createElement("div", { className: "sec-eyebrow", style: { marginTop: 10 } },
                React.createElement("span", { className: "pill" },
                    React.createElement("span", { className: "dot" }),
                    " \u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 \u0443\u0441\u043B\u0443\u0433\u0443")),
            React.createElement("div", { className: "grid-2", style: { gap: 24 } }, cards.map((item, i) => (React.createElement("article", { key: item.title || item.desc, className: "card", style: { padding: 30, minHeight: 210 } },
                React.createElement("span", { className: "mono", style: { color: 'var(--accent)', fontWeight: 700 } },
                    "\u0411\u041B\u041E\u041A 0",
                    i + 1),
                React.createElement("h3", { className: "display", style: { fontSize: 26, margin: '20px 0 12px', lineHeight: 1.1 } }, item.title),
                React.createElement("p", { style: { margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 } }, item.desc))))))));
}
function ServiceCase() {
    const s = getServicePage();
    const cases = s.cases || [{ brand: s.caseName, task: s.caseText, result: 'Канал использовали как часть комплексной кампании Muna Media.' }];
    return (React.createElement("section", { id: "case", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "card", style: { padding: 'clamp(34px, 5vw, 58px)' } },
                React.createElement("div", null,
                    React.createElement("div", { className: "pill solid", style: { marginBottom: 18 } },
                        React.createElement("span", { className: "dot" }),
                        " 03 \u2014 \u0413\u0434\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438"),
                    React.createElement("h2", { className: "display", style: { fontSize: 'clamp(34px, 5vw, 60px)', margin: '0 0 18px' } }, "\u041A\u0435\u0439\u0441\u044B \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B"),
                    React.createElement("p", { style: { fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '0 0 26px', maxWidth: 820 } }, "\u041D\u0438\u0436\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0437\u0430\u0434\u0430\u0447, \u0433\u0434\u0435 \u044D\u0442\u043E\u0442 \u043A\u0430\u043D\u0430\u043B \u0440\u0430\u0431\u043E\u0442\u0430\u043B \u043D\u0435 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E, \u0430 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B.")),
                React.createElement("div", { className: "grid-2", style: { gap: 22 } }, cases.map((item, i) => (React.createElement("article", { key: `${item.brand}-${i}`, style: { border: '1.5px solid var(--ink)', borderRadius: 24, padding: 28, background: 'white' } },
                    React.createElement("div", { className: "mono", style: { color: 'var(--accent)', fontWeight: 700, marginBottom: 14 } },
                        "\u041A\u0415\u0419\u0421 0",
                        i + 1),
                    React.createElement("h3", { className: "display", style: { fontSize: 30, margin: '0 0 12px' } }, item.brand),
                    React.createElement("p", { style: { margin: '0 0 12px', color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 } }, item.task),
                    item.work && React.createElement("p", { style: { margin: '0 0 12px', color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 } }, item.work),
                    React.createElement("div", { style: { borderTop: '1px dashed var(--ink)', paddingTop: 14, fontWeight: 800, fontSize: 18 } }, item.result)))))))));
}
function ServiceTestimonial() {
    const s = getServicePage();
    const standards = s.standards || [];
    if (standards.length) {
        return (React.createElement("section", { id: "standards", style: { borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "sec-head" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "sec-eyebrow" },
                            React.createElement("span", { className: "pill" },
                                React.createElement("span", { className: "dot" }),
                                " 04 \u2014 SLA")),
                        React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u041D\u0430\u0448\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B")),
                    React.createElement("p", { style: { maxWidth: 480, color: 'var(--ink-soft)', margin: 0 } }, "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E: \u0441 \u043E\u0442\u0447\u0435\u0442\u0430\u043C\u0438, \u0441\u0440\u043E\u043A\u0430\u043C\u0438, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439 \u0438 \u0431\u044B\u0441\u0442\u0440\u044B\u043C \u043E\u0442\u0432\u0435\u0442\u043E\u043C \u043A\u043E\u043C\u0430\u043D\u0434\u044B.")),
                React.createElement("div", { className: "grid-2", style: { gap: 22 } }, standards.map((item, i) => (React.createElement("article", { key: item, className: "card", style: { padding: 28, display: 'flex', gap: 16, alignItems: 'flex-start' } },
                    React.createElement("span", { className: "glyph", style: { width: 38, height: 38, flexShrink: 0 } }, i + 1),
                    React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.55 } }, item))))))));
    }
    return (React.createElement("section", { id: "testimonial", style: { borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "card", style: { background: 'var(--ink)', color: 'var(--bg)', padding: 'clamp(36px, 6vw, 72px)' } },
                React.createElement("div", { className: "mono", style: { color: 'rgba(255,255,255,.62)', marginBottom: 20 } }, "04 \u2014 \u041E\u0442\u0437\u044B\u0432"),
                React.createElement("blockquote", { className: "display", style: { fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05, margin: '0 0 26px', color: 'var(--bg)' } },
                    "\u201C",
                    s.testimonial,
                    "\u201D"),
                React.createElement("p", { style: { margin: 0, color: 'rgba(255,255,255,.72)', fontSize: 18 } }, s.author)))));
}
function ServiceFAQ() {
    const s = getServicePage();
    const [open, setOpen] = React.useState(0);
    return (React.createElement("section", { id: "qa", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)' } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "sec-head" },
                React.createElement("div", null,
                    React.createElement("div", { className: "sec-eyebrow" },
                        React.createElement("span", { className: "pill" },
                            React.createElement("span", { className: "dot" }),
                            " 05 \u2014 Q&A")),
                    React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043E\u0442\u0432\u0435\u0442\u044B"))),
            React.createElement("div", { style: { display: 'grid', gap: 14 } }, s.qa.map(([q, a], i) => (React.createElement("div", { key: q, className: "card", style: { boxShadow: 'none', overflow: 'hidden' } },
                React.createElement("button", { onClick: () => setOpen(open === i ? -1 : i), style: {
                        width: '100%', background: 'transparent', border: 0, padding: '22px 26px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        gap: 18, cursor: 'pointer', textAlign: 'left', color: 'var(--ink)'
                    } },
                    React.createElement("span", { className: "display", style: { fontSize: 24, lineHeight: 1.1 } }, q),
                    React.createElement("span", { className: "glyph", style: { flexShrink: 0 } }, open === i ? '-' : '+')),
                open === i && (React.createElement("p", { style: { margin: 0, padding: '0 26px 24px', maxWidth: 880, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.6 } }, a)))))))));
}
function ServiceCTA() {
    const s = getServicePage();
    return (React.createElement("section", { id: "contact", style: { paddingBottom: 60 } },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "card", style: { padding: 'clamp(38px, 6vw, 72px)', textAlign: 'center', background: 'var(--accent)', color: 'white' } },
                React.createElement("h2", { className: "display", style: { fontSize: 'clamp(36px, 6vw, 72px)', margin: '0 0 18px', color: 'white' } }, s.ctaTitle || `Запустить услугу «${s.title}»?`),
                React.createElement("p", { style: { fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 28px', color: 'rgba(255,255,255,.86)' } }, s.ctaText || 'Подготовим медиаплан, механику и понятный план запуска под вашу задачу, сроки и рынок Узбекистана.'),
                React.createElement("a", { href: "index.html#contact", className: "btn", style: { background: 'white', color: 'var(--ink)', justifyContent: 'center' } },
                    "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443",
                    React.createElement("span", { className: "arrow" }, "\u2192"))))));
}
function ServiceFooter() {
    return React.createElement(MunaFooter, null);
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
    return (React.createElement(React.Fragment, null,
        React.createElement(Nav, null),
        React.createElement("section", { id: "hero", style: { paddingTop: 96, paddingBottom: 64, overflow: 'hidden' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' } },
                    React.createElement("span", { className: "pill solid" },
                        React.createElement("span", { className: "dot" }),
                        " \u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B"),
                    React.createElement("span", { className: "mono", style: { color: 'var(--muted)' } }, "Influence / Uzbekistan")),
                React.createElement("h1", { className: "display", style: { fontSize: 'clamp(44px, 7.5vw, 96px)', margin: '0 0 28px', maxWidth: 1160, lineHeight: 1.03 } }, "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0434\u043B\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u0430\u0436\u0435\u043D \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442"),
                React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 900, margin: '0 0 34px', color: 'var(--ink-soft)' } }, "\u041C\u044B \u043D\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0443 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432. \u041C\u044B \u0441\u0442\u0440\u043E\u0438\u043C \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u0432\u043B\u0438\u044F\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 - \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u043C, \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438 \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442."),
                React.createElement("a", { href: "#contact", className: "btn lime", style: { background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' } },
                    "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443",
                    React.createElement("span", { className: "arrow" }, "\u2192")))),
        React.createElement(ServiceMarquee, null),
        React.createElement("section", { id: "problem", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)', borderTop: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "grid-2", style: { gap: 48, alignItems: 'start' } },
                    React.createElement("div", null,
                        React.createElement("div", { className: "sec-eyebrow" },
                            React.createElement("span", { className: "pill" },
                                React.createElement("span", { className: "dot" }),
                                " 01 - \u0411\u043E\u043B\u044C")),
                        React.createElement("h2", { className: "display sec-title", style: { margin: '0 0 22px' } }, "\u041F\u043E\u0447\u0435\u043C\u0443 80% \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u0441\u043B\u0438\u0432\u0430\u044E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442"),
                        React.createElement("div", { style: { display: 'grid', gap: 16, color: 'var(--ink-soft)', fontSize: 18, lineHeight: 1.65 } },
                            React.createElement("p", { style: { margin: 0 } }, "\u0423\u0437\u0431\u0435\u043A\u0441\u043A\u0438\u0439 \u0440\u044B\u043D\u043E\u043A \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 - \u044D\u0442\u043E \u0445\u0430\u043E\u0441 \u0431\u0435\u0437 \u043F\u0440\u0430\u0432\u0438\u043B. \u0410\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0434\u0430\u044E\u0442 \u043E\u0445\u0432\u0430\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435 \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u0443\u044E\u0442\u0441\u044F. \u0411\u043B\u043E\u0433\u0435\u0440\u044B \u043D\u0430\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u044E\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E. \u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u0442, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439 \u043F\u0440\u0438\u0448\u043B\u043E \u0441 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438."),
                            React.createElement("p", { style: { margin: 0 } }, "\u0412 \u0438\u0442\u043E\u0433\u0435 \u0431\u0440\u0435\u043D\u0434 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u0441 \u043C\u0438\u043B\u043B\u0438\u043E\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432 - \u0438 \u043D\u043E\u043B\u044C \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F, \u043E\u043A\u0443\u043F\u0438\u043B\u0430\u0441\u044C \u043B\u0438 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F."))),
                    React.createElement("div", { className: "card", style: { padding: 34 } },
                        React.createElement("div", { className: "mono", style: { color: 'var(--accent)', fontWeight: 700, marginBottom: 18 } }, "\u0422\u0438\u043F\u0438\u0447\u043D\u044B\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B"),
                        React.createElement("div", { style: { display: 'grid', gap: 14 } }, painPoints.map((point, i) => (React.createElement("div", { key: point, style: { display: 'flex', gap: 12, alignItems: 'flex-start', paddingTop: i ? 14 : 0, borderTop: i ? '1px dashed var(--ink)' : 'none' } },
                            React.createElement("span", { style: { width: 28, height: 28, borderRadius: 999, background: 'var(--ink)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 800 } }, "!"),
                            React.createElement("p", { style: { margin: 0, fontSize: 16, lineHeight: 1.55 } }, point))))))))),
        React.createElement("section", { id: "approach", style: { borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "sec-eyebrow" },
                    React.createElement("span", { className: "pill" },
                        React.createElement("span", { className: "dot" }),
                        " 02 - \u041F\u043E\u0434\u0445\u043E\u0434")),
                React.createElement("h2", { className: "display sec-title", style: { margin: '0 0 24px', maxWidth: 1040 } }, "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u043A\u0430\u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442, \u0430 \u043D\u0435 \u043B\u043E\u0442\u0435\u0440\u0435\u044F"),
                React.createElement("div", { className: "card", style: { padding: 'clamp(30px, 5vw, 56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, alignItems: 'start' } },
                    React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 } }, "\u041C\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u043B\u0438\u0434\u0435\u0440\u0430\u043C\u0438 \u043C\u043D\u0435\u043D\u0438\u0439 \u0432 \u043B\u043E\u0433\u0438\u043A\u0443 \u0431\u0438\u0437\u043D\u0435\u0441\u0430: \u043A\u0430\u0436\u0434\u044B\u0439 \u0431\u043B\u043E\u0433\u0435\u0440 - \u044D\u0442\u043E \u043A\u0430\u043D\u0430\u043B \u0441 \u0438\u0437\u043C\u0435\u0440\u0438\u043C\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430 (CAC). \u041C\u044B \u0437\u043D\u0430\u0435\u043C, \u043A\u0442\u043E \u0438\u0437 \u043D\u0438\u0445 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435, \u0430 \u043A\u0442\u043E \u043F\u0440\u043E\u0434\u0430\u0435\u0442 \u0432\u043E\u0437\u0434\u0443\u0445."),
                    React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 } }, "\u041D\u0430\u0448\u0430 \u0431\u0430\u0437\u0430 - \u044D\u0442\u043E \u0432\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043B\u0438\u0434\u0435\u0440\u044B \u043C\u043D\u0435\u043D\u0438\u0439 \u043F\u043E \u043D\u0438\u0448\u0430\u043C: e-commerce, \u0444\u0438\u043D\u0442\u0435\u0445, FMCG, \u0430\u0432\u0442\u043E, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, beauty. \u041F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043E\u043D \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0439 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442.")))),
        React.createElement("section", { id: "included", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "sec-head" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "sec-eyebrow" },
                            React.createElement("span", { className: "pill" },
                                React.createElement("span", { className: "dot" }),
                                " 03 - \u0423\u0441\u043B\u0443\u0433\u0430")),
                        React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C"))),
                React.createElement("div", { className: "grid-2", style: { gap: 28 } }, serviceBlocks.map((block, i) => (React.createElement("article", { key: block.title, className: "card", style: { padding: 34, display: 'flex', flexDirection: 'column', gap: 16 } },
                    React.createElement("span", { className: "mono", style: { color: 'var(--accent)', fontWeight: 700 } },
                        "\u0411\u041B\u041E\u041A 0",
                        i + 1),
                    React.createElement("h3", { className: "display", style: { fontSize: 30, margin: 0 } }, block.title),
                    React.createElement("p", { style: { margin: 0, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.65 } }, block.desc))))))),
        React.createElement("section", { id: "case", style: { borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "card", style: { padding: 'clamp(34px, 5vw, 58px)', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 42, alignItems: 'center' } },
                    React.createElement("div", null,
                        React.createElement("div", { className: "pill solid", style: { marginBottom: 18 } },
                            React.createElement("span", { className: "dot" }),
                            " 04 - \u041A\u0435\u0439\u0441"),
                        React.createElement("h2", { className: "display", style: { fontSize: 'clamp(34px, 5vw, 60px)', margin: '0 0 18px' } }, "UnionPay: \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043F\u0440\u043E\u043C\u043E-\u0432\u043E\u0440\u043E\u043D\u043A\u0438"),
                        React.createElement("p", { style: { fontSize: 18, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 } }, "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u0431\u043B\u043E\u0433\u0435\u0440\u044B \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u0430\u0432\u0430\u043B\u0438 \u043E\u0445\u0432\u0430\u0442. \u041E\u043D\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B\u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0430\u043A\u0446\u0438\u0438, \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043A \u0443\u0447\u0430\u0441\u0442\u0438\u044E \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 Telegram, \u0440\u0438\u0442\u0435\u0439\u043B\u043E\u043C \u0438 \u0441\u0430\u0439\u0442\u043E\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438.")),
                    React.createElement("div", { style: { display: 'grid', gap: 16 } },
                        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 } },
                            React.createElement("div", { className: "card", style: { padding: 20, boxShadow: 'none' } },
                                React.createElement("div", { className: "num-big", style: { fontSize: 34, color: 'var(--accent)' } }, "91 940"),
                                React.createElement("div", { className: "mono", style: { color: 'var(--muted)', marginTop: 6 } }, "\u043E\u0445\u0432\u0430\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439")),
                            React.createElement("div", { className: "card", style: { padding: 20, boxShadow: 'none' } },
                                React.createElement("div", { className: "num-big", style: { fontSize: 34, color: 'var(--accent)' } }, "13,91%"),
                                React.createElement("div", { className: "mono", style: { color: 'var(--muted)', marginTop: 6 } }, "\u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u044C"))),
                        React.createElement("a", { href: "unionpay.html", className: "btn lime", style: { justifyContent: 'center', background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' } },
                            "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441",
                            React.createElement("span", { className: "arrow" }, "\u2192")))))),
        React.createElement("section", { id: "standards", style: { background: 'var(--bg-2)', borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "sec-head" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "sec-eyebrow" },
                            React.createElement("span", { className: "pill" },
                                React.createElement("span", { className: "dot" }),
                                " 05 - SLA")),
                        React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u041D\u0430\u0448\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B - \u043D\u0435 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u044F"))),
                React.createElement("div", { className: "grid-2", style: { gap: 24 } }, standards.map(([title, desc], i) => (React.createElement("article", { key: title, className: "card", style: { padding: 30, display: 'flex', gap: 18, alignItems: 'flex-start' } },
                    React.createElement("span", { style: { width: 42, height: 42, borderRadius: 999, background: 'var(--accent)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 800 } }, i + 1),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "display", style: { fontSize: 24, margin: '0 0 8px' } }, title),
                        React.createElement("p", { style: { margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 } }, desc)))))))),
        React.createElement("section", { id: "faq", style: { borderBottom: '1.5px solid var(--ink)' } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "sec-head" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "sec-eyebrow" },
                            React.createElement("span", { className: "pill" },
                                React.createElement("span", { className: "dot" }),
                                " 06 - FAQ")),
                        React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B")),
                    React.createElement("p", { style: { maxWidth: 460, color: 'var(--ink-soft)', margin: 0 } }, "\u041A\u043E\u0440\u043E\u0442\u043A\u043E \u043E \u0442\u043E\u043C, \u043A\u0430\u043A \u043C\u044B \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432, \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0431\u0440\u0435\u043D\u0434 \u043E\u0442 \u0445\u0430\u043E\u0441\u0430 \u0440\u044B\u043D\u043A\u0430.")),
                React.createElement("div", { style: { display: 'grid', gap: 14 } }, faq.map(([question, answer], i) => (React.createElement("div", { key: question, className: "card", style: { boxShadow: 'none', overflow: 'hidden' } },
                    React.createElement("button", { onClick: () => setOpenFaq(openFaq === i ? -1 : i), style: {
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
                        } },
                        React.createElement("span", { className: "display", style: { fontSize: 24, lineHeight: 1.1 } }, question),
                        React.createElement("span", { style: {
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
                            } }, openFaq === i ? '-' : '+')),
                    openFaq === i && (React.createElement("p", { style: { margin: 0, padding: '0 26px 24px', maxWidth: 900, color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.65 } }, answer)))))))),
        React.createElement("section", { id: "contact", style: { paddingBottom: 60 } },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "card", style: { padding: 'clamp(38px, 6vw, 72px)', textAlign: 'center', background: 'var(--accent)', color: 'white' } },
                    React.createElement("h2", { className: "display", style: { fontSize: 'clamp(36px, 6vw, 72px)', margin: '0 0 18px', color: 'white' } }, "\u0413\u043E\u0442\u043E\u0432\u044B \u0432\u044B\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043A\u0430\u043D\u0430\u043B?"),
                    React.createElement("p", { style: { fontSize: 18, lineHeight: 1.6, maxWidth: 820, margin: '0 auto 28px', color: 'rgba(255,255,255,.86)' } }, "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0435 - \u043C\u044B \u043F\u043E\u043A\u0430\u0436\u0435\u043C, \u043A\u0430\u043A\u0438\u0435 \u043B\u0438\u0434\u0435\u0440\u044B \u043C\u043D\u0435\u043D\u0438\u0439 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0432 \u0432\u0430\u0448\u0435\u0439 \u043D\u0438\u0448\u0435 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u0442\u043E\u0438\u0442\u044C \u043E\u0434\u0438\u043D \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442."),
                    React.createElement("a", { href: "index.html#contact", className: "btn", style: { background: 'white', color: 'var(--ink)', justifyContent: 'center' } },
                        "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E",
                        React.createElement("span", { className: "arrow" }, "\u2192"))))),
        React.createElement(ServiceFooter, null)));
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
// Muna Media — service detail app
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
    "palette": "blue",
    "borderStyle": "hard"
} /*EDITMODE-END*/;
const PALETTES = {
    blue: { accent: '#295AE9', accent2: '#000000', label: 'Blue + Black' },
    electric: { accent: '#295AE9', accent2: '#295AE9', label: 'Electric Blue' },
    classic: { accent: '#000000', accent2: '#295AE9', label: 'Black + Blue' },
};
function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const isInfluencePage = window.SERVICE_KEY === 'influence';
    React.useEffect(() => {
        const p = PALETTES[t.palette] || PALETTES.blue;
        document.documentElement.style.setProperty('--accent', p.accent);
        document.documentElement.style.setProperty('--accent-2', p.accent2);
        document.documentElement.style.setProperty('--shadow', t.borderStyle === 'soft' ? '0 14px 32px -10px rgba(14,14,12,0.22)' : '6px 6px 0 0 var(--ink)');
    }, [t.palette, t.borderStyle]);
    if (isInfluencePage) {
        return React.createElement(InfluenceMarketingPage, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Nav, null),
        React.createElement(ServiceHero, null),
        React.createElement(ServiceMarquee, null),
        React.createElement(ServiceDescription, null),
        React.createElement(ServiceWhyUs, null),
        React.createElement(ServiceCase, null),
        React.createElement(ServiceTestimonial, null),
        React.createElement(ServiceCTA, null),
        React.createElement(ServiceFAQ, null),
        React.createElement(ServiceFooter, null),
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
