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
  function ServicesHero() {
    return /* @__PURE__ */ React.createElement("section", { id: "hero", style: { paddingTop: 100, paddingBottom: 60, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 400,
      height: 400,
      background: "var(--accent)",
      top: -100,
      right: -100,
      opacity: 0.12,
      filter: "blur(80px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "Uzbekistan")), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 96px)", margin: "0 0 28px", maxWidth: 1100, lineHeight: 1.05 } }, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 | Muna Media"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 44 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: "var(--ink-soft)" } }, "Muna Media \u0440\u0435\u0430\u043B\u0438\u0437\u0443\u0435\u0442 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0432\u044B\u0445\u043E\u0434\u0430 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430. \u041C\u044B \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u043E\u0439, \u0441\u043D\u0438\u0436\u0430\u0435\u043C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0431\u0440\u0435\u043D\u0434\u0430."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 6 } }, /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn lime", style: { background: "var(--accent)", color: "white", borderColor: "var(--accent)" } }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0442\u0440\u0435\u0447\u0443", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "koronapay.html", className: "btn ghost" }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))))));
  }
  function ServicesWhy() {
    const benefits = [
      { title: "\u041F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u043E 120 \u0434\u043D\u0435\u0439", desc: "\u041A\u0440\u0435\u0434\u0438\u0442\u0443\u0435\u043C \u0432\u0430\u0448 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433, \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u044B\u0439 \u0446\u0438\u043A\u043B \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u0431\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0440\u0438\u0441\u043A\u0438." },
      { title: "\u0420\u0430\u0434\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C", desc: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043D\u0430\u0446\u0435\u043D\u043E\u043A. \u041C\u043E\u0434\u0435\u043B\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0433\u043E \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 Minora AI." },
      { title: "\u0422\u043E\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442", desc: "\u0418\u0441\u043A\u043B\u044E\u0447\u0430\u0435\u043C \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0435 \u0440\u0438\u0441\u043A\u0438 \u0438 \u0441\u0435\u0440\u044B\u0435 \u0441\u0445\u0435\u043C\u044B \u043F\u0440\u0438 \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438." }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "why-choose", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 02 \u2014 \u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u0431\u0440\u0435\u043D\u0434\u044B \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442 Muna Media?"))), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, benefits.map((b, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700 } }, "\u041F\u0420\u0415\u0418\u041C\u0423\u0429\u0415\u0421\u0422\u0412\u041E 0", idx + 1, " //"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 22, margin: 0 } }, b.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 } }, b.desc))))));
  }
  function ServicesProblemSolution() {
    const problems = [
      "\u041C\u0435\u043B\u043A\u0438\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u043D\u0435 \u043D\u0435\u0441\u0443\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0442\u0440\u0438\u043A\u0438.",
      "\u041D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0435 \u043D\u0430\u0446\u0435\u043D\u043A\u0438 \u0438 \u0441\u043A\u0440\u044B\u0442\u044B\u0435 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438 \u0441\u044A\u0435\u0434\u0430\u044E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442.",
      "\u041A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438 \u0432 \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0443\u0448\u0430\u0442 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0431\u0440\u0435\u043D\u0434\u0430.",
      "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0435\u0434\u0438\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043C\u0435\u0436\u0434\u0443 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u043C\u0438, \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u043C \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u0430\u043C\u0438."
    ];
    const solutions = [
      "\u041C\u044B \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0435\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438.",
      "\u0412\u044B\u0441\u0442\u0443\u043F\u0430\u0435\u043C \u043A\u0430\u043A \u0432\u0430\u0448 \u0431\u0438\u0437\u043D\u0435\u0441-\u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0442\u043E\u0440 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435.",
      "\u0421\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u0437\u0430\u0442\u0440\u0430\u0442\u044B \u0441 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0439 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F.",
      "\u041D\u0430\u0448 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C 99.99% \u0438 \u043E\u0442\u0432\u0435\u0442 \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "problem-solution", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 03 \u2014 \u0422\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0423\u0441\u0442\u0430\u043B\u0438 \u043E\u0442 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432, \u043F\u0440\u043E\u0434\u0430\u044E\u0449\u0438\u0445 \u0442\u043E\u043B\u044C\u043A\u043E \xAB\u043A\u043B\u0438\u043A\u0438\xBB \u0438 \xAB\u043A\u0440\u0435\u0430\u0442\u0438\u0432\xBB?")), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 420, color: "var(--ink-soft)", margin: 0 } }, "\u041C\u044B \u0440\u0435\u0448\u0430\u0435\u043C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0431\u0438\u0437\u043D\u0435\u0441\u0430: \u043E\u0442 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u0430 \u0434\u043E \u0441\u0432\u044F\u0437\u043A\u0438 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430 \u0441 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u043E\u0439.")), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 48 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, border: "1.5px solid var(--ink)", background: "var(--bg-2)" } }, /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 28, margin: "0 0 24px", color: "var(--ink)" } }, "\u041F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0440\u044B\u043D\u043A\u0430:"), /* @__PURE__ */ React.createElement("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 } }, problems.map((p, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { display: "flex", gap: 12, fontSize: 16, color: "var(--ink-soft)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "red", fontWeight: 700 } }, "\u2715"), " ", p)))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, background: "var(--ink)", color: "var(--bg)", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 28, margin: "0 0 24px", color: "var(--bg)" } }, "\u0420\u0435\u0448\u0435\u043D\u0438\u044F Muna Media:"), /* @__PURE__ */ React.createElement("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, flexGrow: 1 } }, solutions.map((s, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { display: "flex", gap: 12, fontSize: 16, color: "rgba(255,255,255,0.85)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--accent)", fontWeight: 700 } }, "\u2713"), " ", s)))))));
  }
  function ServicesFormats() {
    const formats = [
      {
        id: "service-led",
        href: "led-screens.html",
        title: "LED-\u044D\u043A\u0440\u0430\u043D\u044B",
        desc: "\u0413\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0435 LED-\u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0441\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430.",
        deliverables: ["\u041F\u043E\u0434\u0431\u043E\u0440 \u044D\u043A\u0440\u0430\u043D\u043E\u0432", "\u041C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D", "\u0410\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u0440\u043E\u043B\u0438\u043A\u043E\u0432"],
        outcomes: "\u0412\u044B\u0441\u043E\u043A\u0430\u044F \u0447\u0430\u0441\u0442\u043E\u0442\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 \u0442\u043E\u0447\u043A\u0430\u0445."
      },
      {
        id: "service-gas",
        href: "gas-station-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421",
        desc: "\u041D\u043E\u0441\u0438\u0442\u0435\u043B\u0438 \u043D\u0430 \u0437\u0430\u043F\u0440\u0430\u0432\u043A\u0430\u0445 \u0434\u043B\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432.",
        deliverables: ["\u0412\u044B\u0431\u043E\u0440 \u0441\u0435\u0442\u0438", "\u041C\u0430\u043A\u0435\u0442\u044B", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439"],
        outcomes: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0439 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439."
      },
      {
        id: "service-malls",
        href: "mall-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445",
        desc: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u0438 \u043F\u0440\u043E\u043C\u043E-\u0442\u043E\u0447\u043A\u0438 \u0440\u044F\u0434\u043E\u043C \u0441 \u043F\u043E\u043A\u0443\u043F\u043A\u043E\u0439.",
        deliverables: ["\u041F\u043E\u0434\u0431\u043E\u0440 \u0422\u0426", "\u041F\u043B\u0430\u043D \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439", "\u041F\u0440\u043E\u043C\u043E-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0430"],
        outcomes: "\u0420\u043E\u0441\u0442 \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0432 \u043C\u0435\u0441\u0442\u0430\u0445 \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F."
      },
      {
        id: "service-buses",
        href: "bus-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445",
        desc: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430 \u0434\u043B\u044F \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430.",
        deliverables: ["\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u044B", "\u0414\u0438\u0437\u0430\u0439\u043D \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", "\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442"],
        outcomes: "\u0428\u0438\u0440\u043E\u043A\u0430\u044F \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0440\u0435\u043D\u0434\u0430 \u043D\u0430 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0445 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u0445."
      },
      {
        id: "service-bus-stops",
        href: "bus-stop-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u044B\u0445 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445",
        desc: "\u0421\u0438\u0442\u0438-\u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0438 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u0447\u043D\u044B\u0435 \u043F\u0430\u0432\u0438\u043B\u044C\u043E\u043D\u044B \u0432 \u0442\u043E\u0447\u043A\u0430\u0445 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F.",
        deliverables: ["\u041A\u0430\u0440\u0442\u0430 \u043B\u043E\u043A\u0430\u0446\u0438\u0439", "\u041C\u0430\u043A\u0435\u0442\u044B", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432\u044B\u0445\u043E\u0434\u0430"],
        outcomes: "\u0427\u0430\u0441\u0442\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u043F\u0435\u0448\u0435\u0445\u043E\u0434\u043D\u043E\u0439 \u0438 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439."
      },
      {
        id: "service-metro",
        href: "metro-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E",
        desc: "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445 \u0438 \u0432 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430\u0445 \u0441 \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u043F\u043E\u0442\u043E\u043A\u043E\u043C.",
        deliverables: ["\u0421\u0442\u0430\u043D\u0446\u0438\u0438", "\u0424\u043E\u0440\u043C\u0430\u0442\u044B", "\u041F\u0435\u0440\u0438\u043E\u0434 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F"],
        outcomes: "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u043E\u0442\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0439 \u0441\u0440\u0435\u0434\u0435."
      },
      {
        id: "service-airport",
        href: "airport-ads.html",
        title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443",
        desc: "\u041F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0434\u043B\u044F \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u0438 \u0442\u0443\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.",
        deliverables: ["\u0417\u043E\u043D\u044B \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0430", "\u0424\u043E\u0440\u043C\u0430\u0442\u044B", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u0430\u043A\u0435\u0442\u043E\u0432"],
        outcomes: "\u0418\u043C\u0438\u0434\u0436\u0435\u0432\u043E\u0435 \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0441\u0440\u0435\u0434\u0438 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."
      },
      {
        id: "service-seo",
        href: "seo-optimization.html",
        title: "SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F",
        desc: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F, \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043D\u0430\u044F \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0430\u0439\u0442\u0430.",
        deliverables: ["\u0410\u0443\u0434\u0438\u0442 \u0441\u0430\u0439\u0442\u0430", "\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430", "\u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D"],
        outcomes: "\u0420\u043E\u0441\u0442 \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u043F\u0440\u043E\u0441\u0430 \u0438 \u0437\u0430\u044F\u0432\u043E\u043A \u0438\u0437 \u043F\u043E\u0438\u0441\u043A\u0430."
      },
      {
        id: "service-context",
        href: "context-ads.html",
        title: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430",
        desc: "\u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0438 \u043C\u0435\u0434\u0438\u0439\u043D\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0441 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439.",
        deliverables: ["\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439", "\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u044B", "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u044F\u0432\u043E\u043A"],
        outcomes: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043F\u043E\u0442\u043E\u043A \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F."
      },
      {
        id: "service-smm",
        href: "smm.html",
        title: "SMM",
        desc: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439, \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D \u0438 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u0440\u0435\u043D\u0434\u0430.",
        deliverables: ["\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F", "\u041A\u043E\u043D\u0442\u0435\u043D\u0442", "\u041A\u043E\u043C\u044C\u044E\u043D\u0438\u0442\u0438-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442"],
        outcomes: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0430\u044F \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044F \u0438 \u0440\u043E\u0441\u0442 \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u043A \u0431\u0440\u0435\u043D\u0434\u0443."
      },
      {
        id: "service-influence",
        href: "influencer-marketing.html",
        title: "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433",
        desc: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432, \u0437\u0430\u043A\u0443\u043F\u043A\u0430 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430.",
        deliverables: ["\u0410\u0443\u0434\u0438\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438", "\u041A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u043E\u0432\u0430\u043D\u0438\u0435", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439"],
        outcomes: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0445\u0432\u0430\u0442 \u0447\u0438\u0441\u0442\u043E\u0439 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."
      },
      {
        id: "service-telegram",
        href: "telegram-marketing.html",
        title: "Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433",
        desc: "\u041F\u043E\u0441\u0435\u0432\u044B \u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u043C \u043A\u0430\u043D\u0430\u043B\u0435 \u0440\u0435\u0433\u0438\u043E\u043D\u0430.",
        deliverables: ["\u041F\u043E\u0434\u0431\u043E\u0440 \u043A\u0430\u043D\u0430\u043B\u043E\u0432", "\u041F\u0440\u044F\u043C\u0430\u044F \u0437\u0430\u043A\u0443\u043F\u043A\u0430", "\u041E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C"],
        outcomes: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0434\u043E\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0440\u0435\u043D\u0434\u0430 \u0432 Telegram-\u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430\u0445."
      },
      {
        id: "service-events",
        href: "event-management.html",
        title: "\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442",
        desc: "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432.",
        deliverables: ["\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439", "\u041F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438", "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u044F"],
        outcomes: "\u0421\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0444\u043B\u0430\u0439\u043D-\u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439 \u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C\u0438."
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "services-formats", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 04 \u2014 \u042D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430"), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0 } }, "\u041D\u0430\u0448\u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u044B")), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 32 } }, formats.map((f, idx) => /* @__PURE__ */ React.createElement("div", { id: f.id, key: idx, className: "card", style: { padding: 40, display: "flex", flexDirection: "column", gap: 20, scrollMarginTop: 110 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700 } }, "\u0424\u041E\u0420\u041C\u0410\u0422 0", idx + 1, " //"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 28, margin: 0 } }, f.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.5 } }, f.desc), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--bg-2)", paddingTop: 16 } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginBottom: 8 } }, "\u0420\u0430\u0431\u043E\u0442\u044B:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 } }, f.deliverables.map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "tag" }, d)))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--bg-2)", paddingTop: 16 } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginBottom: 4 } }, "\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, color: "var(--ink)" } }, f.outcomes)), /* @__PURE__ */ React.createElement("a", { href: f.href, className: "btn ghost", style: { justifyContent: "center", marginTop: "auto" } }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))))));
  }
  function ServicesIncluded() {
    const inclusions = [
      { title: "\u0412\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430", desc: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0430\u043C 24/7 \u0447\u0435\u0440\u0435\u0437 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u0443\u044E \u043B\u0438\u043D\u0438\u044E." },
      { title: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A Minora AI", desc: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434\u044B \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0446\u0435\u043D\u0442\u0430." },
      { title: "\u041B\u0435\u0433\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432", desc: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0441\u0443\u0431\u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432 \u0438 \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u0430\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C." },
      { title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", desc: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u043F\u0435\u0440\u0435\u0441\u043C\u043E\u0442\u0440 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0438." }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "whats-included", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 05 \u2014 \u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441"), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0 } }, "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C")), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, inclusions.map((inc, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: "var(--accent)",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      color: "white",
      fontSize: 16
    } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 20, margin: 0, fontWeight: 700 } }, inc.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.5 } }, inc.desc))))));
  }
  function ServicesHowWeWork() {
    const steps = [
      { step: "01", title: "\u0410\u0443\u0434\u0438\u0442", desc: "\u041E\u0446\u0435\u043D\u043A\u0430 \u0432\u0430\u0448\u0435\u0439 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0439 \u0437\u0440\u0435\u043B\u043E\u0441\u0442\u0438 \u0438 \u0442\u0435\u043A\u0443\u0449\u0438\u0445 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439." },
      { step: "02", title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F", desc: "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043C\u043E\u0434\u0435\u043B\u0438 \u0441 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438 \u0438 \u0431\u043E\u043D\u0443\u0441\u0430 \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442." },
      { step: "03", title: "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F", desc: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u0430\u043C Minora AI \u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439." },
      { step: "04", title: "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", desc: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u0437\u0430\u0449\u0438\u0442\u0430 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0438." }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "how-we-work", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 06 \u2014 \u041F\u0440\u043E\u0446\u0435\u0441\u0441")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E"))), /* @__PURE__ */ React.createElement("div", { className: "grid-4", style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 } }, steps.map((s, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "num-big", style: { fontSize: 48, color: "var(--accent)" } }, s.step), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 20, margin: 0 } }, s.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.5 } }, s.desc))))));
  }
  function ServicesAdvantages() {
    const advantages = [
      { title: "\u041E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435", desc: "\u0412\u044B \u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C, \u0447\u0442\u043E \u0434\u0430\u0435\u0442 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044E \u0431\u044E\u0434\u0436\u0435\u0442\u0430." },
      { title: "\u0420\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442 \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0441\u0442\u0438 99.99%", desc: "\u0411\u0435\u0441\u043F\u0435\u0440\u0435\u0431\u043E\u0439\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B \u0438 \u043D\u0430\u0434\u0435\u0436\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430." },
      { title: "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F Telegram \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432", desc: "\u0421\u0438\u043D\u0435\u0440\u0433\u0438\u044F \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0434\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430 \u0438 \u0440\u043E\u0441\u0442\u0430 \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438." },
      { title: "AEO & SEO", desc: "\u0414\u043E\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u043E\u0442\u0432\u0435\u0442\u0430\u0445 ChatGPT \u0438 Google, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A \u0431\u0443\u0434\u0443\u0449\u0435\u043C\u0443 \u043F\u043E\u0438\u0441\u043A\u0430." },
      { title: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430", desc: "\u0413\u043B\u0443\u0431\u043E\u043A\u043E\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043A\u043E\u0434\u043E\u0432 \u0438 \u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0440\u0438\u0441\u043A\u043E\u0432." }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "advantages", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 07 \u2014 \u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043D\u0430\u043C\u0438"))), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, advantages.map((adv, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 18, color: "var(--accent)" } }, "\u2713 0", idx + 1), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 22, margin: 0 } }, adv.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 } }, adv.desc))))));
  }
  function ServicesFAQ() {
    const [openIdx, setOpenIdx] = useState(null);
    const faqs = [
      { q: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u043B\u0438 \u0432\u044B \u0441 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u043C\u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u0430\u043C\u0438?", a: "\u0412\u0441\u0435 \u0431\u044E\u0434\u0436\u0435\u0442\u044B \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0438 \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u044E\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0434\u043B\u044F \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B." },
      { q: "\u041A\u0430\u043A \u0432\u044B \u0438\u0437\u043C\u0435\u0440\u044F\u0435\u0442\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439?", a: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441\u0442\u0440\u043E\u0433\u043E \u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C: \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F, \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043F\u043E\u0442\u043E\u043A\u0443 \u0441\u0434\u0435\u043B\u043E\u043A \u0438 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0434\u0430\u0436. \u041C\u044B \u043D\u0435 \u043E\u0442\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u043C\u0441\u044F \u043B\u0430\u0439\u043A\u0430\u043C\u0438." },
      { q: "\u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0435 \u043B\u0438 \u0432\u044B \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u044B?", a: "\u0414\u0430, \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0445 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432 \u0438 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u0439 \u043C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u043F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u0443 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0433\u043E \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044F \u043D\u0430 \u0441\u0440\u043E\u043A \u0434\u043E 120 \u0434\u043D\u0435\u0439." },
      { q: "\u0412 \u0447\u0435\u043C \u0441\u0443\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0433\u043E \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F?", a: "\u0412\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0447\u0435\u0442\u0430 \u043E\u0442 \u0430\u0432\u0442\u043E\u0440\u043E\u0432 \u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0439 \u0440\u0435\u043A\u043B\u0430\u043C\u044B. Muna Media \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0443\u044E \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044E \u0437\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u0437\u0430 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435 \u0446\u0435\u043B\u0435\u0439." },
      { q: "\u041A\u0430\u043A \u0431\u044B\u0441\u0442\u0440\u043E \u0432\u044B \u0440\u0435\u0430\u0433\u0438\u0440\u0443\u0435\u0442\u0435 \u043D\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u044B?", a: "\u041F\u043E \u043D\u0430\u0448\u0435\u043C\u0443 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u0443 \u043E\u0442\u0432\u0435\u0442\u0430 \u0432\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u0430\u043A\u043A\u0430\u0443\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430 \u0432 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u043C Telegram-\u0447\u0430\u0442\u0435 \u043D\u0435 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 15 \u043C\u0438\u043D\u0443\u0442 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 24/7." }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "faq", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { maxWidth: 1e3 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u0412\u043E\u043F\u0440\u043E\u0441\u044B"), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0 } }, "\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0434\u043B\u044F \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430")), /* @__PURE__ */ React.createElement("div", null, faqs.map((faq, idx) => {
      const isOpen = openIdx === idx;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: idx,
          className: `faq-item ${isOpen ? "open" : ""}`,
          onClick: () => setOpenIdx(isOpen ? null : idx),
          style: { borderTop: "1.5px solid var(--ink)", padding: "28px 0", cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement("div", { className: "faq-q", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" } }, /* @__PURE__ */ React.createElement("div", { className: "faq-title", style: { fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600 } }, faq.q), /* @__PURE__ */ React.createElement("div", { className: "faq-toggle", style: {
          width: 44,
          height: 44,
          borderRadius: 999,
          border: "1.5px solid var(--ink)",
          display: "grid",
          placeItems: "center",
          transition: "background 0.2s, transform 0.2s",
          background: isOpen ? "var(--accent)" : "transparent",
          color: isOpen ? "white" : "var(--ink)"
        } }, isOpen ? "\u2212" : "+")),
        /* @__PURE__ */ React.createElement("div", { className: "faq-a", style: { maxHeight: isOpen ? "200px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" } }, /* @__PURE__ */ React.createElement("p", { style: { margin: "16px 0 0", fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6 } }, faq.a))
      );
    }))));
  }
  function ServicesContact() {
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
    return /* @__PURE__ */ React.createElement("section", { id: "contact", style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { background: "var(--ink)", color: "var(--bg)", padding: "clamp(40px, 6vw, 80px)", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -100, right: -100, width: 360, height: 360, borderRadius: 999, background: "var(--accent)", opacity: 0.3, border: "1.5px solid var(--bg)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }, className: "cta-grid" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 09 \u2014 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "var(--bg)", lineHeight: 1.05 } }, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 18, color: "rgba(255,255,255,0.78)", maxWidth: 480 } }, "\xAB\u0415\u0441\u043B\u0438 \u0432\u0430\u0448 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u043D\u0435 \u043E\u0446\u0438\u0444\u0440\u043E\u0432\u0430\u043D \u0438 \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u0430 \u043E\u0442\u0432\u0435\u0442\u0430 \u2014 \u0432\u044B \u0442\u0435\u0440\u044F\u0435\u0442\u0435 \u0434\u043E\u043B\u044E \u0440\u044B\u043D\u043A\u0430 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441.\xBB"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 24, display: "flex", flexDirection: "column", gap: 14, fontSize: 15, color: "rgba(255,255,255,0.85)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Email:"), " info@munamedia.me"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:"), " +998 33 130 13 13"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Telegram:"), " @muna_media_B2B"))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", color: "var(--ink)", borderRadius: 24, padding: 32 } }, !submitted ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0418\u043C\u044F"), /* @__PURE__ */ React.createElement("input", { className: "input", placeholder: "\u041A\u0430\u043C\u0438\u043B\u044C \u0428\u0430\u0440\u0438\u043F\u043E\u0432", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), required: true })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("input", { className: "input", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", value: form.company, onChange: (e) => setForm({ ...form, company: e.target.value }), required: true })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, className: "form-contact-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /* @__PURE__ */ React.createElement("input", { className: "input", type: "tel", placeholder: "+998 90 123 45 67", value: form.phone, onChange: (e) => setForm({ ...form, phone: e.target.value }), required: true })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "Email"), /* @__PURE__ */ React.createElement("input", { className: "input", type: "email", placeholder: "name@company.com", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), required: true }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442"), /* @__PURE__ */ React.createElement("select", { className: "input", value: form.task, onChange: (e) => setForm({ ...form, task: e.target.value }), required: true, style: { height: 58 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \u043F\u0440\u043E\u0435\u043A\u0442\u0430"), /* @__PURE__ */ React.createElement("option", { value: "regional" }, "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435"), /* @__PURE__ */ React.createElement("option", { value: "national" }, "\u041C\u0430\u0441\u0448\u0442\u0430\u0431\u043D\u0430\u044F \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F \u043F\u043E \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0443"), /* @__PURE__ */ React.createElement("option", { value: "custom" }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 enterprise-\u0444\u043E\u0440\u043C\u0430\u0442"))), error ? /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "#d32f2f", fontSize: 14 } }, error) : null, /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn", style: { justifyContent: "center", marginTop: 4, background: "var(--accent)", color: "white", borderColor: "var(--accent)" }, disabled: submitting }, submitting ? "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C..." : "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0442\u0440\u0435\u0447\u0443", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", padding: "20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: 999, background: "var(--accent)", display: "grid", placeItems: "center", fontSize: 32, color: "white" } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430!"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)" } }, "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 Muna Media \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u0434\u0431\u043E\u0440\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0430.")))))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement(MunaFooter, null);
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(ServicesHero, { variant: t.heroLayout }), /* @__PURE__ */ React.createElement(ServicesWhy, null), /* @__PURE__ */ React.createElement(ServicesProblemSolution, null), /* @__PURE__ */ React.createElement(ServicesFormats, null), /* @__PURE__ */ React.createElement(ServicesIncluded, null), /* @__PURE__ */ React.createElement(ServicesHowWeWork, null), /* @__PURE__ */ React.createElement(ServicesAdvantages, null), /* @__PURE__ */ React.createElement(ServicesFAQ, null), /* @__PURE__ */ React.createElement(ServicesContact, null), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "\u041F\u0430\u043B\u0438\u0442\u0440\u0430" }), /* @__PURE__ */ React.createElement(
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

