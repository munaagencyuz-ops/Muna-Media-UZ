// @ts-nocheck
(() => {
  const { useState: navUseState, useEffect: navUseEffect } = React;
  function Nav() {
    const [isOpen, setIsOpen] = navUseState(false);
    navUseEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);
    const links = [
      { label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", href: "index.html" },
      {
        label: "\u0423\u0441\u043B\u0443\u0433\u0438",
        href: "services-uzbekistan.html",
        match: [
          "services-uzbekistan.html",
          "influence.html",
          "led-screens.html",
          "gas-station-ads.html",
          "mall-ads.html",
          "bus-ads.html",
          "bus-stop-ads.html",
          "metro-ads.html",
          "airport-ads.html",
          "seo-optimization.html",
          "context-ads.html",
          "smm.html",
          "influencer-marketing.html",
          "telegram-marketing.html",
          "event-management.html"
        ],
        children: [
          { label: "\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438", href: "services-uzbekistan.html" },
          { type: "group", label: "\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430" },
          { label: "LED-\u044D\u043A\u0440\u0430\u043D\u044B", href: "led-screens.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421", href: "gas-station-ads.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445", href: "mall-ads.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445", href: "bus-ads.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445", href: "bus-stop-ads.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E", href: "metro-ads.html" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443", href: "airport-ads.html" },
          { type: "group", label: "\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A" },
          { label: "SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", href: "seo-optimization.html" },
          { label: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430", href: "context-ads.html" },
          { type: "group", label: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B" },
          { label: "SMM", href: "smm.html" },
          { label: "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", href: "influencer-marketing.html" },
          { label: "Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", href: "telegram-marketing.html" },
          { type: "group", label: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F" },
          { label: "\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", href: "event-management.html" }
        ]
      },
      {
        label: "\u041A\u0435\u0439\u0441\u044B",
        href: "cases.html",
        match: ["cases.html", "xiaomi.html", "unionpay.html", "koronapay.html"],
        children: [
          { label: "\u0412\u0441\u0435 \u043A\u0435\u0439\u0441\u044B", href: "cases.html" },
          { label: "\u041A\u0435\u0439\u0441 Xiaomi", href: "xiaomi.html" },
          { label: "\u041A\u0435\u0439\u0441 UnionPay", href: "unionpay.html" },
          { label: "\u041A\u0435\u0439\u0441 KoronaPay", href: "koronapay.html" }
        ]
      },
      { label: "\u0411\u043B\u043E\u0433", href: "/blog", match: ["blog"] },
      { label: "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", href: "about.html" }
    ];
    const getActiveLink = () => {
      const path = window.location.pathname;
      const page = path.split("/").pop() || "index.html";
      if (page === "" || page === "/") return "index.html";
      return page;
    };
    const activePage = getActiveLink();
    const isActive = (link) => activePage === link.href || (link.match || []).includes(activePage);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
      ` } }), /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "logo", onClick: () => setIsOpen(false), "aria-label": "MUNA MEDIA" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/assets/logo/muna-media-navbar-logo.jpg",
        alt: "MUNA MEDIA",
        style: { width: 156, maxWidth: "42vw", height: "auto", display: "block", flexShrink: 0 }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "nav-links" }, links.map((link, idx) => /* @__PURE__ */ React.createElement("div", { className: "nav-item", key: idx }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: link.href,
        className: `nav-link ${isActive(link) ? "active" : ""}`
      },
      link.label,
      link.children && /* @__PURE__ */ React.createElement("span", { className: "nav-caret" }, "\u25BE")
    ), link.children && /* @__PURE__ */ React.createElement("div", { className: "nav-dropdown" }, link.children.map((child, childIdx) => child.type === "group" ? /* @__PURE__ */ React.createElement("div", { key: childIdx, className: "nav-dropdown-group" }, child.label) : /* @__PURE__ */ React.createElement(
      "a",
      {
        key: childIdx,
        href: child.href,
        className: `nav-dropdown-link ${activePage === child.href ? "active" : ""}`
      },
      child.label,
      /* @__PURE__ */ React.createElement("span", null, "\u2192")
    )))))), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "index.html#contact",
        className: "btn lime nav-links",
        style: { padding: "10px 20px", fontSize: "14px", margin: 0 }
      },
      "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
      /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: `burger-btn ${isOpen ? "open" : ""}`,
        onClick: () => setIsOpen(!isOpen),
        "aria-label": "Toggle navigation menu"
      },
      /* @__PURE__ */ React.createElement("span", { className: "burger-line" }),
      /* @__PURE__ */ React.createElement("span", { className: "burger-line" }),
      /* @__PURE__ */ React.createElement("span", { className: "burger-line" })
    )), /* @__PURE__ */ React.createElement("div", { className: `mobile-drawer ${isOpen ? "open" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "mobile-drawer-links" }, links.map((link, idx) => /* @__PURE__ */ React.createElement(React.Fragment, { key: idx }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: link.href,
        className: `mobile-drawer-link ${isActive(link) ? "active" : ""}`,
        onClick: () => setIsOpen(false)
      },
      /* @__PURE__ */ React.createElement("span", null, link.label),
      /* @__PURE__ */ React.createElement("span", { className: "chevron" }, "\u2192")
    ), link.children && link.children.map((child, childIdx) => child.type === "group" ? /* @__PURE__ */ React.createElement("div", { key: `${idx}-${childIdx}`, className: "mobile-drawer-link child", style: { boxShadow: "none", borderStyle: "dashed", color: "var(--muted)", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("span", null, child.label)) : /* @__PURE__ */ React.createElement(
      "a",
      {
        key: `${idx}-${childIdx}`,
        href: child.href,
        className: `mobile-drawer-link child ${activePage === child.href ? "active" : ""}`,
        onClick: () => setIsOpen(false)
      },
      /* @__PURE__ */ React.createElement("span", null, child.label),
      /* @__PURE__ */ React.createElement("span", { className: "chevron" }, "\u2192")
    ))))), /* @__PURE__ */ React.createElement("div", { className: "mobile-drawer-footer" }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "index.html#contact",
        className: "btn lime mobile-drawer-cta",
        style: { padding: "18px 24px", fontSize: "16px" },
        onClick: () => setIsOpen(false)
      },
      "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
      /* @__PURE__ */ React.createElement("span", { className: "arrow", style: { marginLeft: "8px" } }, "\u2192")
    )))));
  }
  Object.assign(window, { Nav });
  function MunaFooter() {
    const serviceGroups = [
      {
        title: "\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430",
        links: [
          ["LED-\u044D\u043A\u0440\u0430\u043D\u044B", "led-screens.html"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421", "gas-station-ads.html"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0422\u0426", "mall-ads.html"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445", "bus-ads.html"],
          ["\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438", "bus-stop-ads.html"],
          ["\u041C\u0435\u0442\u0440\u043E", "metro-ads.html"],
          ["\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442", "airport-ads.html"]
        ]
      },
      {
        title: "Digital",
        links: [
          ["SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", "seo-optimization.html"],
          ["\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430", "context-ads.html"],
          ["SMM", "smm.html"],
          ["\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", "influencer-marketing.html"],
          ["Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", "telegram-marketing.html"],
          ["\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", "event-management.html"]
        ]
      }
    ];
    const footerLinks = {
      pages: [
        ["\u0413\u043B\u0430\u0432\u043D\u0430\u044F", "index.html"],
        ["\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438", "services-uzbekistan.html"],
        ["\u041A\u0435\u0439\u0441\u044B", "cases.html"],
        ["\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", "about.html"],
        ["\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B", "index.html#contact"]
      ],
      cases: [
        ["Xiaomi", "xiaomi.html"],
        ["UnionPay", "unionpay.html"],
        ["KoronaPay", "koronapay.html"]
      ]
    };
    const linkStyle = {
      color: "rgba(255,255,255,.82)",
      textDecoration: "none",
      fontSize: 14,
      lineHeight: 1.35,
      transition: "color .18s ease, transform .18s ease"
    };
    const Column = ({ title, links }) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, minWidth: 150 } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "rgba(255,255,255,.46)", marginBottom: 4 } }, title), links.map(([label, href]) => /* @__PURE__ */ React.createElement("a", { key: href + label, href, style: linkStyle }, label)));
    return /* @__PURE__ */ React.createElement("footer", { style: { background: "var(--ink)", color: "white", borderTop: "1.5px solid var(--ink)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { paddingTop: 56, paddingBottom: 34 } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "minmax(260px, 1.05fr) minmax(0, 1.65fr)",
      gap: 42,
      alignItems: "start"
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "logo", style: { fontSize: 42, color: "white", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("span", { className: "blob", style: { width: 34, height: 34, background: "var(--accent)" } }), "MUNA MEDIA"), /* @__PURE__ */ React.createElement("p", { style: { margin: "18px 0 0", maxWidth: 470, color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.65 } }, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, digital, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u0438\u0432\u0435\u043D\u0442\u044B \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 } }, /* @__PURE__ */ React.createElement("a", { href: "index.html#contact", className: "btn", style: { background: "var(--accent)", borderColor: "white", color: "white" } }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "cases.html", className: "btn", style: { background: "transparent", borderColor: "white", color: "white" } }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
      gap: 26
    } }, /* @__PURE__ */ React.createElement(Column, { title: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B", links: footerLinks.pages }), serviceGroups.map((group) => /* @__PURE__ */ React.createElement(Column, { key: group.title, title: group.title, links: group.links })), /* @__PURE__ */ React.createElement(Column, { title: "\u041A\u0435\u0439\u0441\u044B", links: footerLinks.cases }))), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 44,
      paddingTop: 26,
      borderTop: "1px solid rgba(255,255,255,.22)",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 22,
      alignItems: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { ...linkStyle, fontWeight: 700 } }, "info@munamedia.me"), /* @__PURE__ */ React.createElement("a", { href: "tel:+998331301313", style: linkStyle }, "+998 33 130 13 13"), /* @__PURE__ */ React.createElement("a", { href: "https://t.me/munamedia", style: linkStyle }, "Telegram"), /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/munamedia", style: linkStyle }, "Instagram")), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "rgba(255,255,255,.46)", textAlign: "right" } }, "\xA9 2019-2026 Muna Media \xB7 \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D"))), /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
      ` } }));
  }
  Object.assign(window, { MunaFooter });
  function createLeadFormState(defaults = {}) {
    return {
      name: "",
      company: "",
      phone: "",
      email: "",
      task: "",
      ...defaults
    };
  }
  async function submitLeadForm(form, page) {
    const payload = {
      name: form.name || "",
      company: form.company || "",
      phone: form.phone || "",
      email: form.email || "",
      task: form.task || form.budget || "",
      page: page || (typeof window !== "undefined" ? window.location.pathname : "")
    };
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      throw new Error(result.error || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
    }
    return result;
  }
  function leadErrorMessage(error) {
    return error instanceof Error ? error.message : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.";
  }
  const { useState, useEffect, useRef } = React;
  function AboutHero({ variant }) {
    return /* @__PURE__ */ React.createElement("section", { id: "about-hero", style: { paddingTop: 100, paddingBottom: 60, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 400,
      height: 400,
      background: "var(--accent)",
      top: -100,
      right: -100,
      opacity: 0.12,
      filter: "blur(80px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u0413\u0440\u0443\u043F\u043F\u0430 Muna Media"), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432")), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 100px)", margin: "0 0 28px", maxWidth: 1100, lineHeight: 1.05 } }, "Muna Media \u2014 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441-\u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: "var(--ink-soft)" } }, "\u041C\u044B \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E. \u041C\u044B \u2014 \u0432\u0430\u0448 \u043D\u0430\u0434\u0435\u0436\u043D\u044B\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435, \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u044E\u0449\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433, IT \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u044B \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0443\u0440\u043E\u0432\u043D\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u0431\u0440\u0435\u043D\u0434\u043E\u0432.")));
  }
  function Positioning() {
    return /* @__PURE__ */ React.createElement("section", { id: "positioning", style: { paddingTop: 40, borderTop: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 01 \u2014 \u041A\u0442\u043E \u043C\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, maxWidth: 900 } }, "\u041D\u0430\u0448\u0430 \u043C\u0438\u0441\u0441\u0438\u044F: \u0441\u043D\u0438\u0436\u0435\u043D\u0438\u0435 \u0440\u0438\u0441\u043A\u043E\u0432 \u043F\u0440\u0438 \u0432\u044B\u0445\u043E\u0434\u0435 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u0439 \u043D\u0430 \u043D\u0435\u0437\u043D\u0430\u043A\u043E\u043C\u044B\u0439 \u0440\u044B\u043D\u043E\u043A."))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, fontSize: 13 } }, "01. \u0414\u043B\u044F \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u0431\u0440\u0435\u043D\u0434\u043E\u0432"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0432\u0445\u043E\u0434 \u0438 \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 } }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0432\u0445\u043E\u0434, \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F, \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0434\u043B\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u0443\u0440\u043E\u0432\u043D\u044F UnionPay \u0438 Xiaomi.")), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, fontSize: 13 } }, "02. \u0414\u043B\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043B\u0438\u0434\u0435\u0440\u043E\u0432"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0441\u0442\u0430\u0442\u0443\u0441 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 } }, "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u0441\u0442\u0430\u0442\u0443\u0441 \u0434\u043B\u044F \u0444\u0438\u043D\u0442\u0435\u0445\u0430, \u0440\u0438\u0442\u0435\u0439\u043B\u0430 \u0438 e-commerce \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435.")))));
  }
  function Sacrifice() {
    return /* @__PURE__ */ React.createElement("section", { id: "sacrifice", style: { background: "var(--ink)", color: "var(--bg)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 350,
      height: 350,
      background: "var(--accent)",
      bottom: -50,
      right: -50,
      opacity: 0.2,
      filter: "blur(80px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 56, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 02 \u2014 \u0417\u0430\u043A\u043E\u043D \u0436\u0435\u0440\u0442\u0432\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, color: "var(--bg)" } }, "\u041E\u0442 \u0447\u0435\u0433\u043E \u043C\u044B \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C,", /* @__PURE__ */ React.createElement("br", null), " \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u043C\u0438.")), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 380, color: "rgba(255, 255, 255, 0.7)", margin: 0 } }, "\u041E\u0442 \u0447\u0435\u0433\u043E \u043C\u044B \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u043C\u0438.")), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, [
      ["\u041D\u0435\u0442 \u0440\u0430\u0437\u043E\u0432\u044B\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C", "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0434\u043E\u043B\u0433\u0443\u044E \u043F\u043E \u043C\u043E\u0434\u0435\u043B\u0438 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438 \u0438 \u0431\u043E\u043D\u0443\u0441\u0430 \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442."],
      ["\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0431\u044E\u0434\u0436\u0435\u0442\u044B", "\u0424\u043E\u043A\u0443\u0441 \u043D\u0430 \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0441 \u0440\u0430\u0441\u0447\u0435\u0442\u043E\u043C \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432 \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0438\u0437\u043D\u0435\u0441\u0430."],
      ["\u041D\u0435\u0442 \u0442\u0435\u043D\u0435\u0432\u043E\u043C\u0443 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044E", "\u0422\u043E\u043B\u044C\u043A\u043E \u043E\u0446\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0447\u0435\u0440\u0435\u0437 Minora AI."]
    ].map(([title, desc], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      padding: "32px 0",
      borderTop: "1px solid rgba(255, 255, 255, 0.18)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--accent)", fontSize: 13, fontWeight: 700 } }, "0", i + 1, " // ", title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: 16, lineHeight: 1.6 } }, desc))))));
  }
  function Leadership() {
    return /* @__PURE__ */ React.createElement("section", { id: "leadership" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 03 \u2014 \u042D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043E\u0432"))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { alignItems: "center", gap: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 24px" } }, "[\u0424\u043E\u0442\u043E \u0438 \u0432\u0438\u0434\u0435\u043E\u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439]"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: 0 } }, "\u041D\u0430\u0448 \u043F\u043E\u0434\u0445\u043E\u0434: \u0441\u0438\u043D\u0442\u0435\u0437 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0445 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0439 \u0441 \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u043C \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435\u043C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043A\u043E\u0434\u043E\u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430.")), /* @__PURE__ */ React.createElement("div", { className: "card cta-grid", style: { padding: 24, background: "var(--bg-2)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "ph", style: { height: 240, background: "var(--bg)" } }, "[\u0424\u043E\u0442\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439]"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 20 } }, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E Muna"), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", fontSize: 11 } }, "\u0422\u0430\u0448\u043A\u0435\u043D\u0442 \xB7 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.4 } }, "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u044B \u043B\u0438\u0447\u043D\u043E \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u044B \u0432\u043E \u0432\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0443\u0440\u043E\u0432\u043D\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u043D\u0435\u0441\u0443\u0442 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442."))))));
  }
  function Guarantees() {
    const items = [
      {
        title: "\u041F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u043E 120 \u0434\u043D\u0435\u0439",
        desc: "\u0414\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432 \u043C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0433\u0438\u0431\u043A\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u044B \u0438 \u0440\u0430\u0441\u0441\u0440\u043E\u0447\u043A\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439, \u0441\u043D\u0438\u0436\u0430\u044F \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0443 \u043D\u0430 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0434\u0435\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u044B \u043F\u0440\u0438 \u0432\u044B\u0445\u043E\u0434\u0435 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A."
      },
      {
        title: "\u0420\u0430\u0434\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435",
        desc: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043D\u0430\u0446\u0435\u043D\u043E\u043A. \u041A\u043B\u0438\u0435\u043D\u0442\u044B \u0432\u0438\u0434\u044F\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0447\u0435\u0442\u0430 \u043E\u0442 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438. \u0424\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0448\u0430 \u043E\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044F."
      },
      {
        title: "\u0422\u043E\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0441\u0443\u0431\u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432",
        desc: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0441\u0443\u0431\u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432 \u0438 \u043B\u0435\u0433\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0434\u043B\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0439 \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438."
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "guarantees", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 04 \u2014 \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432")), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 380, fontSize: 16, color: "var(--ink-soft)", margin: 0 } }, "\u041C\u044B \u0431\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0438\u0441\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0443\u044E \u043F\u0440\u0435\u0434\u0441\u043A\u0430\u0437\u0443\u0435\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430.")), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "var(--accent)",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 18
    } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 22, margin: 0, fontWeight: 700 } }, it.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 } }, it.desc))))));
  }
  function SLA() {
    return /* @__PURE__ */ React.createElement("section", { id: "sla" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 05 \u2014 \u0420\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0416\u0435\u0441\u0442\u043A\u0438\u0439 Service Level Agreement"))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: {
      padding: 48,
      background: "var(--ink)",
      color: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 20
    } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: "clamp(64px, 8vw, 100px)", color: "var(--accent)" } }, "99.99%"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 24, margin: 0 } }, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: 16, lineHeight: 1.6 } }, "\u041D\u0430\u0448\u0438 \u0441\u043A\u0432\u043E\u0437\u043D\u044B\u0435 \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u044B, \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0440\u0435\u043A\u0438\u043D\u0433\u0430 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0431\u0435\u0441\u043F\u0435\u0440\u0435\u0431\u043E\u0439\u043D\u043E \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 24/7.")), /* @__PURE__ */ React.createElement("div", { className: "card", style: {
      padding: 48,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 20
    } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: "clamp(64px, 8vw, 100px)", color: "var(--accent)" } }, "15 \u043C\u0438\u043D"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 24, margin: 0, color: "var(--ink)" } }, "\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, "\u041A\u0430\u0436\u0434\u043E\u043C\u0443 \u043A\u0440\u0443\u043F\u043D\u043E\u043C\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u0432\u044B\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0447\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442-\u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0432 \u0432 Telegram-\u0447\u0430\u0442\u0435 \u0441 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C\u044E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F.")))));
  }
  function Principles() {
    return /* @__PURE__ */ React.createElement("section", { id: "principles", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { maxWidth: 1e3 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u041F\u0440\u0438\u043D\u0446\u0438\u043F\u044B Muna"), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0 } }, "\u041C\u0430\u043D\u0438\u0444\u0435\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 32, fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)" } }, /* @__PURE__ */ React.createElement("blockquote", { style: {
      margin: 0,
      paddingLeft: 24,
      borderLeft: "4px solid var(--accent)",
      fontStyle: "italic",
      fontSize: 22,
      color: "var(--ink)",
      fontFamily: "Instrument Serif"
    } }, "\xAB\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0434\u0430\u043D\u043D\u044B\u0445, \u0430 \u043D\u0435 \u0438\u043D\u0442\u0443\u0438\u0446\u0438\u0438. \u041C\u044B \u043A\u0440\u0435\u0434\u0438\u0442\u0443\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u043D\u0435\u0441\u0435\u043C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443.\xBB"), /* @__PURE__ */ React.createElement("p", null, "1. ", /* @__PURE__ */ React.createElement("strong", null, "\u0414\u0430\u043D\u043D\u044B\u0435 \u0432\u043C\u0435\u0441\u0442\u043E \u0438\u043D\u0442\u0443\u0438\u0446\u0438\u0438."), " \u041A\u0430\u0436\u0434\u044B\u0439 \u0448\u0430\u0433 \u043E\u043F\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0446\u0438\u0444\u0440\u044B, \u0442\u0435\u0441\u0442\u044B \u0438 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u043D\u0443\u044E \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443."), /* @__PURE__ */ React.createElement("p", null, "2. ", /* @__PURE__ */ React.createElement("strong", null, "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443."), " \u041C\u044B \u043A\u0440\u0435\u0434\u0438\u0442\u0443\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0441 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0430."), /* @__PURE__ */ React.createElement("p", null, "3. ", /* @__PURE__ */ React.createElement("strong", null, "\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0438 \u0437\u0430\u0440\u0430\u043D\u0435\u0435."), " \u041C\u044B \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0432\u0430\u0448\u0443 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0434\u043E \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0443\u0433\u0440\u043E\u0437\u044B \u043E\u0431\u0440\u0443\u0448\u0430\u0442 \u0432\u043E\u0440\u043E\u043D\u043A\u0443 \u043F\u0440\u043E\u0434\u0430\u0436."))));
  }
  function AboutCTA() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState(createLeadFormState());
    async function handleSubmit(e) {
      e.preventDefault();
      setSubmitting(true);
      setError("");
      try {
        await submitLeadForm(form, window.location.pathname);
        setSubmitted(true);
        setForm(createLeadFormState());
      } catch (err) {
        setError(leadErrorMessage(err));
      } finally {
        setSubmitting(false);
      }
    }
    return /* @__PURE__ */ React.createElement("section", { id: "about-cta", style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: {
      background: "var(--ink)",
      color: "var(--bg)",
      padding: "clamp(40px, 6vw, 80px)",
      position: "relative",
      overflow: "hidden"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: -100,
      right: -100,
      width: 360,
      height: 360,
      borderRadius: 999,
      background: "var(--accent)",
      opacity: 0.3,
      border: "1.5px solid var(--bg)"
    } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }, className: "cta-grid" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 06 \u2014 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "var(--bg)", lineHeight: 1.05 } }, "\u0425\u043E\u0442\u0438\u0442\u0435 \u043E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044E \u0432\u044B\u0445\u043E\u0434\u0430 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430?"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 18, color: "rgba(255,255,255,0.78)", maxWidth: 480 } }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u0443, \u0438 \u043C\u044B \u043E\u0431\u0441\u0443\u0434\u0438\u043C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0432\u0445\u043E\u0434, \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E \u0438 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0443\u044E \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0443 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430."), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 24,
      paddingTop: 24,
      borderTop: "1px solid rgba(255,255,255,0.18)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" } }, /* @__PURE__ */ React.createElement("strong", null, "\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439 \u043E\u0444\u0438\u0441 \u0422\u0430\u0448\u043A\u0435\u043D\u0442:"), /* @__PURE__ */ React.createElement("br", null), "\u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D, \u0433. \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0443\u043B. \u0410\u043C\u0438\u0440\u0430 \u0422\u0435\u043C\u0443\u0440\u0430, 107\u0411", /* @__PURE__ */ React.createElement("br", null), "\u0411\u0438\u0437\u043D\u0435\u0441-\u0446\u0435\u043D\u0442\u0440 \xABInternational\xBB, 4 \u044D\u0442\u0430\u0436"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.6, fontSize: 11 } }, "\u041F\u0440\u044F\u043C\u0430\u044F \u043B\u0438\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "info@munamedia.me"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "tel:+998331301313", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "+998 33 130 13 13")))), /* @__PURE__ */ React.createElement("div", { style: {
      background: "var(--bg)",
      color: "var(--ink)",
      border: "1.5px solid var(--bg)",
      borderRadius: 24,
      padding: 32,
      position: "relative"
    } }, !submitted ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0418\u043C\u044F"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        placeholder: "\u041A\u0430\u043C\u0438\u043B\u0430 \u0423\u0441\u043C\u0430\u043D\u043E\u0432\u0430",
        value: form.name,
        onChange: (e) => setForm({ ...form, name: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        placeholder: "Brand Co.",
        value: form.company,
        onChange: (e) => setForm({ ...form, company: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, className: "form-contact-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        type: "tel",
        placeholder: "+998 90 123 45 67",
        value: form.phone,
        onChange: (e) => setForm({ ...form, phone: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "Email"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        type: "email",
        placeholder: "name@company.com",
        value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442"), /* @__PURE__ */ React.createElement(
      "select",
      {
        className: "input",
        value: form.task,
        onChange: (e) => setForm({ ...form, task: e.target.value }),
        required: true,
        style: { height: 58 }
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432"),
      /* @__PURE__ */ React.createElement("option", { value: "10k-20k" }, "\u043E\u0442 $10,000 \u0434\u043E $20,000 / \u043C\u0435\u0441"),
      /* @__PURE__ */ React.createElement("option", { value: "20k-50k" }, "\u043E\u0442 $20,000 \u0434\u043E $50,000 / \u043C\u0435\u0441"),
      /* @__PURE__ */ React.createElement("option", { value: "50k+" }, "\u0431\u043E\u043B\u0435\u0435 $50,000 / \u043C\u0435\u0441")
    )), error ? /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "#d32f2f", fontSize: 14 } }, error) : null, /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn", style: { justifyContent: "center", marginTop: 4 }, disabled: submitting }, submitting ? "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C..." : "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0442\u0440\u0435\u0447\u0443", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", padding: "20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 72,
      height: 72,
      borderRadius: 999,
      background: "var(--accent)",
      border: "1.5px solid var(--ink)",
      display: "grid",
      placeItems: "center",
      fontSize: 32
    } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, "\u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D!"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)" } }, "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u043C\u0443 email \u0434\u043B\u044F \u043F\u043E\u0434\u0431\u043E\u0440\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0432\u043E\u043D\u043A\u0430.")))))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement(MunaFooter, null);
  }
  Object.assign(window, { AboutHero, Positioning, Sacrifice, Leadership, Guarantees, SLA, Principles, AboutCTA, Footer });
  const TWEAK_DEFAULTS = (
    /*EDITMODE-BEGIN*/
    {
      "palette": "blue",
      "heroLayout": "default",
      "borderStyle": "hard"
    }
  );
  const PALETTES = {
    blue: { accent: "#295AE9", accent2: "#000000", label: "Blue + Black" },
    electric: { accent: "#295AE9", accent2: "#295AE9", label: "Electric Blue" },
    classic: { accent: "#000000", accent2: "#295AE9", label: "Black + Blue" }
  };
  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    React.useEffect(() => {
      const p = PALETTES[t.palette] || PALETTES.blue;
      document.documentElement.style.setProperty("--accent", p.accent);
      document.documentElement.style.setProperty("--accent-2", p.accent2);
      if (t.borderStyle === "soft") {
        document.documentElement.style.setProperty("--shadow", "0 14px 32px -10px rgba(14,14,12,0.22)");
      } else {
        document.documentElement.style.setProperty("--shadow", "6px 6px 0 0 var(--ink)");
      }
    }, [t.palette, t.borderStyle]);
    React.useEffect(() => {
      if (window.location.hash) {
        const handleScroll = () => {
          const id = window.location.hash.substring(1);
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        };
        const timer = setTimeout(handleScroll, 400);
        return () => clearTimeout(timer);
      }
    }, []);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(AboutHero, { variant: t.heroLayout }), /* @__PURE__ */ React.createElement(Positioning, null), /* @__PURE__ */ React.createElement(Sacrifice, null), /* @__PURE__ */ React.createElement(Leadership, null), /* @__PURE__ */ React.createElement(Guarantees, null), /* @__PURE__ */ React.createElement(SLA, null), /* @__PURE__ */ React.createElement(Principles, null), /* @__PURE__ */ React.createElement(AboutCTA, null), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "\u041F\u0430\u043B\u0438\u0442\u0440\u0430" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "\u0421\u0445\u0435\u043C\u0430",
        value: t.palette,
        options: [
          { value: "blue", label: "Blue" },
          { value: "electric", label: "Electric" },
          { value: "classic", label: "Black/Blue" }
        ],
        onChange: (v) => setTweak("palette", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Hero" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "\u0411\u0435\u0439\u0434\u0436",
        value: t.heroLayout,
        options: [
          { value: "default", label: "\u0421 \u0431\u0435\u0439\u0434\u0436\u0435\u043C" },
          { value: "minimal", label: "\u0411\u0435\u0437" }
        ],
        onChange: (v) => setTweak("heroLayout", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "\u0422\u0435\u043D\u0438",
        value: t.borderStyle,
        options: [
          { value: "hard", label: "\u0411\u0440\u0443\u0442\u0430\u043B\u044C\u043D\u044B\u0435" },
          { value: "soft", label: "\u041C\u044F\u0433\u043A\u0438\u0435" }
        ],
        onChange: (v) => setTweak("borderStyle", v)
      }
    )));
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();

