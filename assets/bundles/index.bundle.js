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
      { label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", href: "/" },
      {
        label: "\u0423\u0441\u043B\u0443\u0433\u0438",
        href: "/services-uzbekistan",
        match: [
          "/services-uzbekistan",
          "/influence",
          "/led-screens",
          "/gas-station-ads",
          "/mall-ads",
          "/bus-ads",
          "/bus-stop-ads",
          "/metro-ads",
          "/airport-ads",
          "/seo-optimization",
          "/context-ads",
          "/smm",
          "/influencer-marketing",
          "/telegram-marketing",
          "/event-management"
        ],
        children: [
          { label: "\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438", href: "/services-uzbekistan" },
          { type: "group", label: "\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430" },
          { label: "LED-\u044D\u043A\u0440\u0430\u043D\u044B", href: "/led-screens" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421", href: "/gas-station-ads" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445", href: "/mall-ads" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445", href: "/bus-ads" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445", href: "/bus-stop-ads" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E", href: "/metro-ads" },
          { label: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443", href: "/airport-ads" },
          { type: "group", label: "\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A" },
          { label: "SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", href: "/seo-optimization" },
          { label: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430", href: "/context-ads" },
          { type: "group", label: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B" },
          { label: "SMM", href: "/smm" },
          { label: "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", href: "/influencer-marketing" },
          { label: "Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", href: "/telegram-marketing" },
          { type: "group", label: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F" },
          { label: "\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", href: "/event-management" }
        ]
      },
      {
        label: "\u041A\u0435\u0439\u0441\u044B",
        href: "/cases",
        match: ["/cases", "/xiaomi", "/unionpay", "/koronapay"],
        children: [
          { label: "\u0412\u0441\u0435 \u043A\u0435\u0439\u0441\u044B", href: "/cases" },
          { label: "\u041A\u0435\u0439\u0441 Xiaomi", href: "/xiaomi" },
          { label: "\u041A\u0435\u0439\u0441 UnionPay", href: "/unionpay" },
          { label: "\u041A\u0435\u0439\u0441 KoronaPay", href: "/koronapay" }
        ]
      },
      { label: "\u0411\u043B\u043E\u0433", href: "/blog", match: ["blog"] },
      { label: "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", href: "/about" }
    ];
    const getActiveLink = () => {
      const path = window.location.pathname;
      const page = path.split("/").pop() || "/";
      if (page === "" || page === "/") return "/";
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
      ` } }), /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "logo", onClick: () => setIsOpen(false), "aria-label": "MUNA MEDIA" }, /* @__PURE__ */ React.createElement(
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
        href: "/#contact",
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
        href: "/#contact",
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
          ["LED-\u044D\u043A\u0440\u0430\u043D\u044B", "/led-screens"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421", "/gas-station-ads"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0422\u0426", "/mall-ads"],
          ["\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445", "/bus-ads"],
          ["\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438", "/bus-stop-ads"],
          ["\u041C\u0435\u0442\u0440\u043E", "/metro-ads"],
          ["\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442", "/airport-ads"]
        ]
      },
      {
        title: "Digital",
        links: [
          ["SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", "/seo-optimization"],
          ["\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430", "/context-ads"],
          ["SMM", "/smm"],
          ["\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", "/influencer-marketing"],
          ["Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", "/telegram-marketing"],
          ["\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", "/event-management"]
        ]
      }
    ];
    const footerLinks = {
      pages: [
        ["\u0413\u043B\u0430\u0432\u043D\u0430\u044F", "/"],
        ["\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438", "/services-uzbekistan"],
        ["\u041A\u0435\u0439\u0441\u044B", "/cases"],
        ["\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", "/about"],
        ["\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B", "/#contact"]
      ],
      cases: [
        ["Xiaomi", "/xiaomi"],
        ["UnionPay", "/unionpay"],
        ["KoronaPay", "/koronapay"]
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
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: "/", className: "logo", style: { fontSize: 42, color: "white", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("span", { className: "blob", style: { width: 34, height: 34, background: "var(--accent)" } }), "MUNA MEDIA"), /* @__PURE__ */ React.createElement("p", { style: { margin: "18px 0 0", maxWidth: 470, color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.65 } }, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, digital, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u0438\u0432\u0435\u043D\u0442\u044B \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 } }, /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn", style: { background: "var(--accent)", borderColor: "white", color: "white" } }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cases", className: "btn", style: { background: "transparent", borderColor: "white", color: "white" } }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement("div", { style: {
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
  function useTweaks(defaults) {
    const [values, setValues] = React.useState(defaults);
    const setTweak = React.useCallback((keyOrEdits, val) => {
      const edits = typeof keyOrEdits === "object" && keyOrEdits !== null ? keyOrEdits : { [keyOrEdits]: val };
      setValues((prev) => ({ ...prev, ...edits }));
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
      window.dispatchEvent(new CustomEvent("tweakchange", { detail: edits }));
    }, []);
    return [values, setTweak];
  }
  function TweaksPanel({ title = "Tweaks", children }) {
    const [open, setOpen] = React.useState(false);
    const dragRef = React.useRef(null);
    const offsetRef = React.useRef({ x: 16, y: 16 });
    const PAD = 16;
    const clampToViewport = React.useCallback(() => {
      const panel = dragRef.current;
      if (!panel) return;
      const w = panel.offsetWidth, h = panel.offsetHeight;
      const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
      const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
      offsetRef.current = {
        x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
        y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
      };
      panel.style.right = offsetRef.current.x + "px";
      panel.style.bottom = offsetRef.current.y + "px";
    }, []);
    React.useEffect(() => {
      if (!open) return;
      clampToViewport();
      if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", clampToViewport);
        return () => window.removeEventListener("resize", clampToViewport);
      }
      const ro = new ResizeObserver(clampToViewport);
      ro.observe(document.documentElement);
      return () => ro.disconnect();
    }, [open, clampToViewport]);
    React.useEffect(() => {
      const onMsg = (e) => {
        var _a;
        const t = (_a = e == null ? void 0 : e.data) == null ? void 0 : _a.type;
        if (t === "__activate_edit_mode") setOpen(true);
        else if (t === "__deactivate_edit_mode") setOpen(false);
      };
      window.addEventListener("message", onMsg);
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
      return () => window.removeEventListener("message", onMsg);
    }, []);
    const dismiss = () => {
      setOpen(false);
      window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
    };
    const onDragStart = (e) => {
      const panel = dragRef.current;
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      const sx = e.clientX, sy = e.clientY;
      const startRight = window.innerWidth - r.right;
      const startBottom = window.innerHeight - r.bottom;
      const move = (ev) => {
        offsetRef.current = {
          x: startRight - (ev.clientX - sx),
          y: startBottom - (ev.clientY - sy)
        };
        clampToViewport();
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };
    if (!open) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, __TWEAKS_STYLE), /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: dragRef,
        className: "twk-panel",
        "data-omelette-chrome": "",
        style: { right: offsetRef.current.x, bottom: offsetRef.current.y }
      },
      /* @__PURE__ */ React.createElement("div", { className: "twk-hd", onMouseDown: onDragStart }, /* @__PURE__ */ React.createElement("b", null, title), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "twk-x",
          "aria-label": "Close tweaks",
          onMouseDown: (e) => e.stopPropagation(),
          onClick: dismiss
        },
        "\u2715"
      )),
      /* @__PURE__ */ React.createElement("div", { className: "twk-body" }, children)
    ));
  }
  function TweakSection({ label, children }) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "twk-sect" }, label), children);
  }
  function TweakRow({ label, value, children, inline = false }) {
    return /* @__PURE__ */ React.createElement("div", { className: inline ? "twk-row twk-row-h" : "twk-row" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label), value != null && /* @__PURE__ */ React.createElement("span", { className: "twk-val" }, value)), children);
  }
  function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = "", onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label, value: `${value}${unit}` }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "range",
        className: "twk-slider",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value))
      }
    ));
  }
  function TweakToggle({ label, value, onChange }) {
    return /* @__PURE__ */ React.createElement("div", { className: "twk-row twk-row-h" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label)), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "twk-toggle",
        "data-on": value ? "1" : "0",
        role: "switch",
        "aria-checked": !!value,
        onClick: () => onChange(!value)
      },
      /* @__PURE__ */ React.createElement("i", null)
    ));
  }
  function TweakRadio({ label, value, options, onChange }) {
    var _a;
    const trackRef = React.useRef(null);
    const [dragging, setDragging] = React.useState(false);
    const valueRef = React.useRef(value);
    valueRef.current = value;
    const labelLen = (o) => String(typeof o === "object" ? o.label : o).length;
    const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
    const fitsAsSegments = maxLen <= ((_a = { 2: 16, 3: 10 }[options.length]) != null ? _a : 0);
    if (!fitsAsSegments) {
      const resolve = (s) => {
        const m = options.find((o) => String(typeof o === "object" ? o.value : o) === s);
        return m === void 0 ? s : typeof m === "object" ? m.value : m;
      };
      return /* @__PURE__ */ React.createElement(
        TweakSelect,
        {
          label,
          value,
          options,
          onChange: (s) => onChange(resolve(s))
        }
      );
    }
    const opts = options.map((o) => typeof o === "object" ? o : { value: o, label: o });
    const idx = Math.max(0, opts.findIndex((o) => o.value === value));
    const n = opts.length;
    const segAt = (clientX) => {
      const r = trackRef.current.getBoundingClientRect();
      const inner = r.width - 4;
      const i = Math.floor((clientX - r.left - 2) / inner * n);
      return opts[Math.max(0, Math.min(n - 1, i))].value;
    };
    const onPointerDown = (e) => {
      setDragging(true);
      const v0 = segAt(e.clientX);
      if (v0 !== valueRef.current) onChange(v0);
      const move = (ev) => {
        if (!trackRef.current) return;
        const v = segAt(ev.clientX);
        if (v !== valueRef.current) onChange(v);
      };
      const up = () => {
        setDragging(false);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: trackRef,
        role: "radiogroup",
        onPointerDown,
        className: dragging ? "twk-seg dragging" : "twk-seg"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "twk-seg-thumb",
          style: {
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`
          }
        }
      ),
      opts.map((o) => /* @__PURE__ */ React.createElement("button", { key: o.value, type: "button", role: "radio", "aria-checked": o.value === value }, o.label))
    ));
  }
  function TweakSelect({ label, value, options, onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement("select", { className: "twk-field", value, onChange: (e) => onChange(e.target.value) }, options.map((o) => {
      const v = typeof o === "object" ? o.value : o;
      const l = typeof o === "object" ? o.label : o;
      return /* @__PURE__ */ React.createElement("option", { key: v, value: v }, l);
    })));
  }
  function TweakText({ label, value, placeholder, onChange }) {
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "twk-field",
        type: "text",
        value,
        placeholder,
        onChange: (e) => onChange(e.target.value)
      }
    ));
  }
  function TweakNumber({ label, value, min, max, step = 1, unit = "", onChange }) {
    const clamp = (n) => {
      if (min != null && n < min) return min;
      if (max != null && n > max) return max;
      return n;
    };
    const startRef = React.useRef({ x: 0, val: 0 });
    const onScrubStart = (e) => {
      e.preventDefault();
      startRef.current = { x: e.clientX, val: value };
      const decimals = (String(step).split(".")[1] || "").length;
      const move = (ev) => {
        const dx = ev.clientX - startRef.current.x;
        const raw = startRef.current.val + dx * step;
        const snapped = Math.round(raw / step) * step;
        onChange(clamp(Number(snapped.toFixed(decimals))));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "twk-num" }, /* @__PURE__ */ React.createElement("span", { className: "twk-num-lbl", onPointerDown: onScrubStart }, label), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value,
        min,
        max,
        step,
        onChange: (e) => onChange(clamp(Number(e.target.value)))
      }
    ), unit && /* @__PURE__ */ React.createElement("span", { className: "twk-num-unit" }, unit));
  }
  function __twkIsLight(hex) {
    const h = String(hex).replace("#", "");
    const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, "0");
    const n = parseInt(x.slice(0, 6), 16);
    if (Number.isNaN(n)) return true;
    const r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
    return r * 299 + g * 587 + b * 114 > 148e3;
  }
  const __TwkCheck = ({ light }) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 14 14", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M3 7.2 5.8 10 11 4.2",
      fill: "none",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      stroke: light ? "rgba(0,0,0,.78)" : "#fff"
    }
  ));
  function TweakColor({ label, value, options, onChange }) {
    if (!options || !options.length) {
      return /* @__PURE__ */ React.createElement("div", { className: "twk-row twk-row-h" }, /* @__PURE__ */ React.createElement("div", { className: "twk-lbl" }, /* @__PURE__ */ React.createElement("span", null, label)), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "color",
          className: "twk-swatch",
          value,
          onChange: (e) => onChange(e.target.value)
        }
      ));
    }
    const key = (o) => String(JSON.stringify(o)).toLowerCase();
    const cur = key(value);
    return /* @__PURE__ */ React.createElement(TweakRow, { label }, /* @__PURE__ */ React.createElement("div", { className: "twk-chips", role: "radiogroup" }, options.map((o, i) => {
      const colors = Array.isArray(o) ? o : [o];
      const [hero, ...rest] = colors;
      const sup = rest.slice(0, 4);
      const on = key(o) === cur;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          type: "button",
          className: "twk-chip",
          role: "radio",
          "aria-checked": on,
          "data-on": on ? "1" : "0",
          "aria-label": colors.join(", "),
          title: colors.join(" \xB7 "),
          style: { background: hero },
          onClick: () => onChange(o)
        },
        sup.length > 0 && /* @__PURE__ */ React.createElement("span", null, sup.map((c, j) => /* @__PURE__ */ React.createElement("i", { key: j, style: { background: c } }))),
        on && /* @__PURE__ */ React.createElement(__TwkCheck, { light: __twkIsLight(hero) })
      );
    })));
  }
  function TweakButton({ label, onClick, secondary = false }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: secondary ? "twk-btn secondary" : "twk-btn",
        onClick
      },
      label
    );
  }
  Object.assign(window, {
    useTweaks,
    TweaksPanel,
    TweakSection,
    TweakRow,
    TweakSlider,
    TweakToggle,
    TweakRadio,
    TweakSelect,
    TweakText,
    TweakNumber,
    TweakColor,
    TweakButton
  });
  const { useState, useEffect, useRef } = React;
  function Hero({ variant }) {
    return /* @__PURE__ */ React.createElement("section", { id: "hero", style: { paddingTop: 80, paddingBottom: 60, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 380,
      height: 380,
      background: "var(--accent)",
      top: -80,
      right: -120,
      opacity: 0.15,
      filter: "blur(80px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 280,
      height: 280,
      background: "var(--accent-2)",
      bottom: -60,
      left: -80,
      opacity: 0.1,
      filter: "blur(90px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u0412\u044B\u0445\u043E\u0434 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430")), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7vw, 96px)", margin: "0 0 28px", maxWidth: 1200, lineHeight: 1.05 } }, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435 \u0434\u043B\u044F ", /* @__PURE__ */ React.createElement("span", { className: "serif", style: { fontStyle: "italic", fontFamily: "Instrument Serif" } }, "\u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u0431\u0440\u0435\u043D\u0434\u043E\u0432.")), /* @__PURE__ */ React.createElement("div", { className: "hero-main-row", style: { display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 44 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 20, lineHeight: 1.5, maxWidth: 720, margin: 0, color: "var(--ink-soft)" } }, "Muna Media \u2014 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u0434\u043B\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0433\u043E \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0432\u044B\u0445\u043E\u0434\u0430 \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430. \u0421\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438, \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044F \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u043E\u0439, \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C\u044E \u0431\u044E\u0434\u0436\u0435\u0442\u0430 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439."), /* @__PURE__ */ React.createElement("div", { className: "hero-actions", style: { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 6 } }, /* @__PURE__ */ React.createElement("a", { href: "#cases", className: "btn ghost" }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn lime" }, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 0,
      border: "1.5px solid var(--ink)",
      borderRadius: 24,
      overflow: "hidden",
      background: "var(--cream-card)"
    }, className: "hero-strip" }, [
      ["180+", "\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043E \u0441 2019"],
      ["70+", "\u0442\u043E\u043F-\u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0432 \u0441\u0435\u0442\u0438"],
      ["\u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D", "\u0444\u043E\u043A\u0443\u0441\u043D\u044B\u0439 \u0440\u044B\u043D\u043E\u043A \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F"],
      ["24/7", "\u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043E\u043C\u0430\u043D\u0434"]
    ].map(([n, t], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      padding: "24px 28px",
      borderRight: "1.5px solid var(--ink)",
      borderBottom: "1.5px solid var(--ink)",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, className: "hero-strip-item" }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: 48 } }, n), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)" } }, t))))), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: 100,
      right: 56,
      width: 140,
      height: 140,
      zIndex: 2,
      display: variant === "minimal" ? "none" : "block"
    }, className: "hero-badge" }, /* @__PURE__ */ React.createElement("div", { className: "spin", style: { width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 140 140", width: "140", height: "140" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("path", { id: "circ", d: "M 70, 70 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" })), /* @__PURE__ */ React.createElement("text", { fontFamily: "JetBrains Mono", fontSize: "11", letterSpacing: "3", fill: "var(--ink)", fontWeight: "600" }, /* @__PURE__ */ React.createElement("textPath", { href: "#circ" }, "\u041C\u0423\u041D\u0410 \u041C\u0415\u0414\u0418\u0410 \xB7 \u041F\u0420\u041E\u0417\u0420\u0410\u0427\u041D\u041E\u0421\u0422\u042C \u0418 \u0420\u041E\u0421\u0422 \xB7 ")))), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 56,
      height: 56,
      borderRadius: 999,
      background: "var(--accent)",
      border: "1.5px solid var(--ink)",
      display: "grid",
      placeItems: "center",
      fontSize: 22
    } }, "\u2605")));
  }
  function TopCases() {
    const cases = [
      {
        brand: "Xiaomi",
        glyph: "Mi",
        logoSrc: "assets/cases/xiaomi-logo.png",
        logoWidth: 174,
        tag: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430",
        title: "\u041F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 Xiaomi \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435",
        desc: "\u041F\u043E\u043B\u043D\u0430\u044F \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430: \u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u0438 \u0438 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F Xiaomi 13T \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435.",
        metrics: [
          ["\u0421\u043E\u0446\u0441\u0435\u0442\u0438", "Instagram, Telegram, Facebook"],
          ["13T", "\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u043D\u043E\u0432\u043E\u0439 \u043B\u0438\u043D\u0435\u0439\u043A\u0438"],
          ["PUBG", "\u0431\u0440\u0435\u043D\u0434\u043E\u0432\u0430\u044F \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u044F"]
        ],
        bg: "var(--accent)",
        tags: ["\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B", "\u041D\u0430\u0440\u0443\u0436\u043A\u0430 \u0438 \u0440\u0438\u0442\u0435\u0439\u043B", "\u041C\u0435\u0434\u0438\u0430\u0437\u0430\u043A\u0443\u043F\u043A\u0430"],
        href: "/xiaomi"
      },
      {
        brand: "UnionPay",
        glyph: "UP",
        logoSrc: "assets/cases/unionpay-logo.png",
        logoWidth: 210,
        tag: "\u041F\u0440\u043E\u043C\u043E / \u0420\u0438\u0442\u0435\u0439\u043B",
        title: "UnionPay \u2014 \u0440\u043E\u0441\u0442 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 \u0438 \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u0438",
        desc: "6-\u043C\u0435\u0441\u044F\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0446\u0438\u044F \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 HUMO: \u0441\u0430\u0439\u0442, Telegram-\u0431\u043E\u0442, \u0440\u043E\u0437\u043D\u0438\u0447\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438, \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B \u0438 Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433.",
        metrics: [
          ["6 \u043C\u0435\u0441", "\u043F\u0440\u043E\u043C\u043E-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F"],
          ["38", "Telegram-\u043A\u0430\u043D\u0430\u043B\u043E\u0432"],
          ["1.15M", "\u043E\u0445\u0432\u0430\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439"]
        ],
        bg: "var(--accent-2)",
        tags: ["\u041F\u0440\u043E\u043C\u043E-\u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F", "\u0420\u0438\u0442\u0435\u0439\u043B", "\u0423\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C"],
        href: "/unionpay"
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "cases", style: { paddingTop: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 01 \u2014 \u041A\u0435\u0439\u0441\u044B"), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B, \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u043D\u044B\u0435 \u0432 \u0446\u0438\u0444\u0440\u0430\u0445")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0422\u043E\u043F-2 ", /* @__PURE__ */ React.createElement("span", { className: "serif" }, "\u043A\u0435\u0439\u0441\u0430"), "."))), /* @__PURE__ */ React.createElement("div", { className: "grid-2 cases-grid" }, cases.map((c, i) => /* @__PURE__ */ React.createElement("article", { key: i, className: "card", style: {
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    } }, /* @__PURE__ */ React.createElement("div", { className: "case-card-head", style: {
      background: c.bg,
      borderBottom: "1.5px solid var(--ink)",
      padding: "32px 32px 26px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      color: c.bg === "var(--cream-card)" ? "var(--ink)" : "var(--bg)"
    } }, /* @__PURE__ */ React.createElement("div", { className: "case-card-logo", style: { "--case-logo-w": `${c.logoWidth}px` } }, /* @__PURE__ */ React.createElement("img", { src: c.logoSrc, alt: c.brand })), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: c.bg === "var(--cream-card)" ? "var(--ink)" : "var(--bg)" } }, c.tag)), /* @__PURE__ */ React.createElement("div", { className: "case-card-body", style: { padding: "32px", display: "flex", flexDirection: "column", gap: 22, flex: 1 } }, /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: "clamp(24px, 3vw, 36px)", margin: 0, fontWeight: 700 } }, c.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.55 } }, c.desc), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, c.tags.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "tag" }, t))), /* @__PURE__ */ React.createElement("div", { className: "case-metrics", style: {
      marginTop: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 0,
      borderTop: "1.5px solid var(--ink)",
      paddingTop: 22
    } }, c.metrics.map(([n, t], j) => /* @__PURE__ */ React.createElement("div", { key: j, style: { paddingRight: 16, borderRight: j < 2 ? "1px dashed var(--ink)" : "none", paddingLeft: j > 0 ? 16 : 0 } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: 38, lineHeight: 1 } }, n), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginTop: 8, fontSize: 11 } }, t)))), /* @__PURE__ */ React.createElement("a", { href: c.href, className: "btn ghost", style: { justifyContent: "center" } }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0435\u0439\u0441", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))))))));
  }
  function Partners() {
    const partners = [
      { name: "Xiaomi", src: "assets/partners/marquee/group.png", width: 184 },
      { name: "UnionPay", src: "assets/partners/marquee/unionpay.png", width: 126 },
      { name: "Yadea", src: "assets/partners/marquee/clip-path-group.png", width: 140 },
      { name: "Honor", src: "assets/partners/marquee/honor.png", width: 148 },
      { name: "flydubai", src: "assets/partners/marquee/flydubai.png", width: 150 },
      { name: "Huawei", src: "assets/partners/marquee/huawei.png", width: 82 },
      { name: "UZBAT", src: "assets/partners/marquee/uzbat.png", width: 126 },
      { name: "UNICEF", src: "assets/partners/marquee/unicef.png", width: 146 }
    ];
    const items = [...partners, ...partners];
    return /* @__PURE__ */ React.createElement("section", { style: { padding: 0 } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { paddingTop: 24, paddingBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 24, justifyContent: "space-between", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)" } }, "02 \u2014 \u041D\u0430\u043C \u0434\u043E\u0432\u0435\u0440\u044F\u044E\u0442"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, color: "var(--ink-soft)" } }, "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0430\u0435\u043C \u0441 \u043A\u0440\u0443\u043F\u043D\u044B\u043C\u0438 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u043C\u0438 \u0431\u0440\u0435\u043D\u0434\u0430\u043C\u0438"))), /* @__PURE__ */ React.createElement("div", { className: "marquee partner-marquee" }, /* @__PURE__ */ React.createElement("div", { className: "marquee-track" }, items.map((partner, i) => /* @__PURE__ */ React.createElement("div", { key: `${partner.name}-${i}`, className: "logo-chip brand-logo-chip" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: partner.src,
        alt: partner.name,
        style: { "--logo-w": `${partner.width}px` }
      }
    ))))));
  }
  function WhyMuna() {
    const points = [
      {
        n: "01",
        title: "\u0420\u0430\u0434\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C",
        proof: "\u041C\u043E\u0434\u0435\u043B\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0433\u043E \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F. \u0412\u0441\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B \u0432\u0438\u0434\u044F\u0442 \u0447\u0438\u0441\u0442\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0433\u043E \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044F \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0447\u0435\u0440\u0435\u0437 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 Minora AI. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043D\u0430\u0446\u0435\u043D\u043E\u043A.",
        cta: "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 Minora AI",
        accent: "var(--accent)"
      },
      {
        n: "02",
        title: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
        proof: "\u0416\u0435\u0441\u0442\u043A\u0438\u0439 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 \u0441 \u043E\u0442\u0432\u0435\u0442\u043E\u043C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 15 \u043C\u0438\u043D\u0443\u0442 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 24/7. \u041F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u043E 120 \u0434\u043D\u0435\u0439 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u0439.",
        cta: "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B",
        accent: "var(--accent-2)"
      },
      {
        n: "03",
        title: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0438",
        proof: "\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 ORM/SERM-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u0434\u043B\u044F \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433\u0430 \u0438 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0443\u0433\u0440\u043E\u0437 \u0432 \u0438\u043D\u0444\u043E\u043F\u043E\u043B\u0435 \u0434\u043E \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043E\u043D\u0438 \u043F\u043E\u0432\u043B\u0438\u044F\u044E\u0442 \u043D\u0430 \u0432\u0430\u0448\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u043A \u0431\u0440\u0435\u043D\u0434\u0443.",
        cta: "\u0417\u0430\u0449\u0438\u0442\u0438\u0442\u044C \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E",
        accent: "var(--cream-card)"
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "why" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 03 \u2014 \u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B \u0440\u0430\u0431\u043E\u0442\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, maxWidth: 900 } }, "\u0422\u0440\u0438 \u0432\u0435\u0449\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u044E\u0442 \u0432\u0430\u0448\u0443 ", /* @__PURE__ */ React.createElement("span", { className: "hl" }, "\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C"), "."))), /* @__PURE__ */ React.createElement("div", { className: "grid-3" }, points.map((p, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 18, minHeight: 360 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, p.n), /* @__PURE__ */ React.createElement("div", { style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      background: p.accent,
      border: "1.5px solid var(--ink)"
    } })), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 26, margin: "8px 0 0", fontWeight: 700, lineHeight: 1.1 } }, p.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.55 } }, p.proof), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "mono", style: { marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontWeight: 600 } }, p.cta, " ", /* @__PURE__ */ React.createElement("span", null, "\u2197")))))));
  }
  function Services() {
    const packs = [
      {
        headline: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0432\u0445\u043E\u0434 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A",
        icon: "\u{1F6E1}\uFE0F",
        who: "\u0414\u043B\u044F \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u0431\u0440\u0435\u043D\u0434\u043E\u0432, \u0437\u0430\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0432 \u0440\u0435\u0433\u0438\u043E\u043D",
        includes: [
          "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u044B\u0445\u043E\u0434\u0430 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0438 \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
          "\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u043E\u0432",
          "\u0417\u0430\u043F\u0443\u0441\u043A \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439 \u0438 \u0441\u0435\u0442\u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 (10\u201330 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432)",
          "PR \u0438 GR \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0432 \u043C\u0435\u0441\u0442\u043D\u044B\u0445 \u0421\u041C\u0418 \u0438 Telegram-\u043A\u0430\u043D\u0430\u043B\u0430\u0445"
        ],
        timeline: "6\u20138 \u043D\u0435\u0434\u0435\u043B\u044C",
        from: "\u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E",
        bg: "var(--accent)"
      },
      {
        headline: "\u0423\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0437\u0430 30 \u0434\u043D\u0435\u0439",
        icon: "\u26A1",
        who: "\u0414\u043B\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0441 \u0433\u043E\u0442\u043E\u0432\u043E\u0439 \u0434\u0438\u0441\u0442\u0440\u0438\u0431\u0443\u0446\u0438\u0435\u0439",
        includes: [
          "\u041C\u0430\u0441\u0441\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A: 40+ \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E",
          "\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D (8-12 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0445 \u0432\u0438\u0440\u0443\u0441\u043D\u044B\u0445 \u0432\u0438\u0434\u0435\u043E)",
          "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B: Meta, Yandex, Telegram",
          "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C\u0438 LED-\u044D\u043A\u0440\u0430\u043D\u0430\u043C\u0438 \u0438 \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0439 \u0440\u0435\u043A\u043B\u0430\u043C\u043E\u0439"
        ],
        timeline: "30 \u0434\u043D\u0435\u0439",
        from: "\u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E",
        bg: "var(--accent-2)"
      },
      {
        headline: "\u0414\u043E\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u043D\u0438\u0448\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439, \u0444\u0438\u043D\u0442\u0435\u0445\u0430 \u0438 \u0440\u0438\u0442\u0435\u0439\u043B\u0430",
        icon: "\u{1F4C8}",
        who: "\u041E\u043C\u043D\u0438\u043A\u0430\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u043E\u0441\u0442 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F",
        includes: [
          "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0441 \u043E\u043F\u043B\u0430\u0442\u043E\u0439 \u0437\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 / \u0446\u0435\u043B\u0435\u0432\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",
          "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439 \u0438 \u043A\u0440\u0438\u0437\u0438\u0441\u043D\u044B\u0435 \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438",
          "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0438 \u0438 \u0430\u0443\u0434\u0438\u0442 \u0441\u043A\u0432\u043E\u0437\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438",
          "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0438 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 24/7"
        ],
        timeline: "\u043E\u0442 3 \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
        from: "\u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E",
        bg: "var(--ink)",
        dark: true
      }
    ];
    const serviceCategories = [
      {
        group: "\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430",
        items: [
          { id: "service-led", href: "/led-screens", title: "LED-\u044D\u043A\u0440\u0430\u043D\u044B", desc: "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 LED-\u044D\u043A\u0440\u0430\u043D\u0430\u0445 \u0441 \u043F\u043E\u0434\u0431\u043E\u0440\u043E\u043C \u043B\u043E\u043A\u0430\u0446\u0438\u0439 \u043F\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0443 \u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438." },
          { id: "service-gas", href: "/gas-station-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421", desc: "\u0412\u0438\u0434\u0438\u043C\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u043D\u0430 \u0437\u0430\u043F\u0440\u0430\u0432\u043A\u0430\u0445 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432 \u0438 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0445 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u043E\u0432." },
          { id: "service-malls", href: "/mall-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445", desc: "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F, \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438 \u0438 \u043F\u0440\u043E\u043C\u043E-\u0442\u043E\u0447\u043A\u0438 \u0432 \u043C\u0435\u0441\u0442\u0430\u0445 \u043F\u043E\u043A\u0443\u043F\u043A\u0438." },
          { id: "service-buses", href: "/bus-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445", desc: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430 \u0434\u043B\u044F \u0448\u0438\u0440\u043E\u043A\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430." },
          { id: "service-bus-stops", href: "/bus-stop-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u044B\u0445 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445", desc: "\u0421\u0438\u0442\u0438-\u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0438 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u0447\u043D\u044B\u0435 \u043F\u0430\u0432\u0438\u043B\u044C\u043E\u043D\u044B \u0432 \u0442\u043E\u0447\u043A\u0430\u0445 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F." },
          { id: "service-metro", href: "/metro-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E", desc: "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445 \u0438 \u0432 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430\u0445 \u0441 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0447\u0430\u0441\u0442\u043E\u0442\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430." },
          { id: "service-airport", href: "/airport-ads", title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443", desc: "\u041F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0434\u043B\u044F \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u0438 \u0442\u0443\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438." }
        ]
      },
      {
        group: "\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A",
        items: [
          { id: "service-seo", href: "/seo-optimization", title: "SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F", desc: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F, \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043D\u0430\u044F \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u043E\u0433\u043E \u0441\u043F\u0440\u043E\u0441\u0430." },
          { id: "service-context", href: "/context-ads", title: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430", desc: "\u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0438 \u043C\u0435\u0434\u0438\u0439\u043D\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0441 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0437\u0430\u044F\u0432\u043E\u043A." }
        ]
      },
      {
        group: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B",
        items: [
          { id: "service-smm", href: "/smm", title: "SMM", desc: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u0435\u0439, \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0430\u044F \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044F." },
          { id: "service-influence", href: "/influencer-marketing", title: "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", desc: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432, \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C." },
          { id: "service-telegram", href: "/telegram-marketing", title: "Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433", desc: "\u041F\u043E\u0441\u0435\u0432\u044B, \u0437\u0430\u043A\u0443\u043F\u043A\u0430 \u0432 \u043A\u0430\u043D\u0430\u043B\u0430\u0445, \u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0438 \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430\u043C\u0438." }
        ]
      },
      {
        group: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F",
        items: [
          { id: "service-events", href: "/event-management", title: "\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", desc: "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F, \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438." }
        ]
      }
    ];
    const [activeServiceGroup, setActiveServiceGroup] = useState(0);
    const activeCategory = serviceCategories[activeServiceGroup];
    const serviceCount = activeCategory.items.length;
    const goServiceGroup = (direction) => {
      setActiveServiceGroup((activeServiceGroup + direction + serviceCategories.length) % serviceCategories.length);
    };
    return /* @__PURE__ */ React.createElement("section", { id: "services", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 04 \u2014 \u0420\u0435\u0448\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "\u041F\u0430\u043A\u0435\u0442\u044B \u043F\u043E\u0434 \u0432\u0430\u0448\u0438 \u0437\u0430\u0434\u0430\u0447\u0438")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, maxWidth: 1e3 } }, "\u041D\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B. ", /* @__PURE__ */ React.createElement("span", { className: "serif" }, "\u0420\u0435\u0448\u0435\u043D\u0438\u044F"), " \u043F\u043E\u0434 \u0432\u0430\u0448 \u0431\u0440\u0438\u0444.")), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 380, fontSize: 16, color: "var(--ink-soft)", margin: 0 } }, "\u0421\u0444\u043E\u043A\u0443\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u043A\u0435\u0442\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0441 \u0447\u0435\u0442\u043A\u0438\u043C\u0438 \u0441\u0440\u043E\u043A\u0430\u043C\u0438 \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u043E\u0439 \u0431\u044E\u0434\u0436\u0435\u0442\u0430.")), /* @__PURE__ */ React.createElement("div", { className: "services-grid", style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 24
    } }, packs.map((p, i) => /* @__PURE__ */ React.createElement("article", { key: i, className: "card service-card", style: {
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      background: p.dark ? "var(--ink)" : "var(--cream-card)",
      color: p.dark ? "var(--bg)" : "var(--ink)",
      minHeight: 480
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: p.bg,
      border: "1.5px solid " + (p.dark ? "var(--bg)" : "var(--ink)"),
      display: "grid",
      placeItems: "center",
      fontSize: 26
    } }, p.icon), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, p.from !== "\u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E" && /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.7 } }, "\u043E\u0442"), /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: p.from === "\u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E" ? 24 : 36 } }, p.from))), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: "28px", margin: "8px 0 0", fontWeight: 700, lineHeight: 1.15 } }, p.headline), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.75, fontSize: 11 } }, p.who), /* @__PURE__ */ React.createElement("ul", { style: { margin: "12px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 } }, p.includes.map((it, j) => /* @__PURE__ */ React.createElement("li", { key: j, style: { display: "flex", gap: 10, fontSize: 15, lineHeight: 1.45 } }, /* @__PURE__ */ React.createElement("span", { style: {
      flexShrink: 0,
      width: 18,
      height: 18,
      marginTop: 3,
      borderRadius: 6,
      background: p.dark ? "var(--accent)" : "var(--ink)",
      color: p.dark ? "var(--ink)" : "var(--bg)",
      display: "grid",
      placeItems: "center",
      fontSize: 12,
      fontWeight: 700
    } }, "\u2713"), it))), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      borderTop: "1px dashed " + (p.dark ? "var(--bg)" : "var(--ink)"),
      paddingTop: 20
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.7 } }, "\u0421\u0440\u043E\u043A"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 18 } }, p.timeline)), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn", style: {
      background: p.dark ? "var(--accent)" : "var(--ink)",
      color: p.dark ? "var(--ink)" : "var(--bg)",
      borderColor: p.dark ? "var(--accent)" : "var(--ink)",
      padding: "14px 22px"
    } }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))))), /* @__PURE__ */ React.createElement("div", { className: "service-catalog", style: { marginTop: 64 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "clamp(24px, 4vw, 38px)", overflow: "hidden", background: "var(--bg)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 26 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " \u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0443\u0441\u043B\u0443\u0433"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: "clamp(30px, 4vw, 54px)", margin: 0 } }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
        onClick: () => goServiceGroup(-1),
        style: { width: 48, height: 48, borderRadius: 999, border: "1.5px solid var(--ink)", background: "var(--bg)", fontSize: 22, fontWeight: 800, cursor: "pointer" }
      },
      "\u2190"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
        onClick: () => goServiceGroup(1),
        style: { width: 48, height: 48, borderRadius: 999, border: "1.5px solid var(--ink)", background: "var(--accent)", color: "white", fontSize: 22, fontWeight: 800, cursor: "pointer" }
      },
      "\u2192"
    ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 } }, serviceCategories.map((category, idx) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: category.group,
        onClick: () => setActiveServiceGroup(idx),
        className: "pill",
        style: {
          cursor: "pointer",
          borderColor: "var(--ink)",
          background: idx === activeServiceGroup ? "var(--ink)" : "var(--bg)",
          color: idx === activeServiceGroup ? "var(--bg)" : "var(--ink)",
          transform: idx === activeServiceGroup ? "translateY(-2px)" : "none",
          boxShadow: idx === activeServiceGroup ? "3px 3px 0 0 var(--ink)" : "none",
          transition: "transform .22s ease, box-shadow .22s ease, background .22s ease, color .22s ease"
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "dot" }),
      " ",
      category.group
    ))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        key: activeCategory.group,
        style: {
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(280px, 360px)",
          gap: 18,
          overflowX: "auto",
          padding: "4px 4px 18px",
          scrollSnapType: "x mandatory",
          animation: "serviceSlideIn .42s ease both"
        }
      },
      activeCategory.items.map((service, idx) => /* @__PURE__ */ React.createElement(
        "article",
        {
          id: service.id,
          key: service.id,
          className: "card service-tile",
          style: {
            padding: 28,
            minHeight: 310,
            boxShadow: idx === 0 ? "var(--shadow)" : "none",
            borderRadius: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            scrollSnapAlign: "start",
            scrollMarginTop: 110,
            background: idx === 0 ? "var(--ink)" : "var(--cream-card)",
            color: idx === 0 ? "var(--bg)" : "var(--ink)",
            transform: `translateY(${idx % 2 ? 10 : 0}px)`,
            transition: "transform .24s ease, box-shadow .24s ease, background .24s ease"
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: idx === 0 ? "rgba(255,255,255,.68)" : "var(--muted)" } }, String(idx + 1).padStart(2, "0"), " / ", String(serviceCount).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { style: { width: 12, height: 12, borderRadius: 999, background: "var(--accent)", flexShrink: 0 } })),
        /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 30, lineHeight: 1.02, margin: "10px 0 0", color: idx === 0 ? "var(--bg)" : "var(--ink)" } }, service.title),
        /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: idx === 0 ? "rgba(255,255,255,.76)" : "var(--ink-soft)", fontSize: 16, lineHeight: 1.55 } }, service.desc),
        /* @__PURE__ */ React.createElement(
          "a",
          {
            href: service.href,
            className: idx === 0 ? "btn lime" : "btn ghost",
            style: {
              justifyContent: "center",
              padding: "14px 18px",
              fontSize: 15,
              marginTop: "auto",
              background: idx === 0 ? "var(--accent)" : "transparent",
              color: idx === 0 ? "white" : "var(--ink)",
              borderColor: idx === 0 ? "var(--accent)" : "var(--ink)"
            }
          },
          "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435",
          /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")
        )
      ))
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)" } }, activeCategory.group, " \xB7 ", serviceCount, " \u0443\u0441\u043B\u0443\u0433"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, serviceCategories.map((category, idx) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: category.group,
        "aria-label": category.group,
        onClick: () => setActiveServiceGroup(idx),
        style: {
          width: idx === activeServiceGroup ? 28 : 10,
          height: 10,
          border: "1.5px solid var(--ink)",
          borderRadius: 999,
          background: idx === activeServiceGroup ? "var(--accent)" : "var(--bg)",
          cursor: "pointer",
          transition: "width .24s ease, background .24s ease"
        }
      }
    )))))), /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
            @keyframes serviceSlideIn {
              from { opacity: 0; transform: translateX(28px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .service-catalog [style*="overflow-x: auto"]::-webkit-scrollbar { height: 8px; }
            .service-catalog [style*="overflow-x: auto"]::-webkit-scrollbar-thumb {
              background: var(--ink);
              border-radius: 999px;
            }
          ` } }))));
  }
  function Testimonials() {
    const items = [
      {
        quote: "Muna Media \u0432\u0437\u044F\u043B\u0430 \u043D\u0430 \u0441\u0435\u0431\u044F \u0432\u0441\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0440\u0438\u0441\u043A\u0438, \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u0443\u044E \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u0438 \u0432\u0430\u043B\u044E\u0442\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432 \u0440\u0435\u0433\u0438\u043E\u043D\u0435, \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432 \u043D\u0430\u043C \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u043C\u0435\u0434\u0438\u0430\u0431\u0430\u0438\u043D\u0433 \u0431\u0435\u0437 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0439.",
        name: "\u0410\u043B\u0438\u043D\u0430 \u041A\u0430\u0440\u0438\u043C\u043E\u0432\u0430",
        role: "CMO CIS",
        brand: "NL International",
        glyph: "NL",
        bg: "var(--accent)"
      },
      {
        quote: "\u041D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A, \u0430 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u043F\u043E \u0440\u043E\u0441\u0442\u0443. \u0418\u043D\u0442\u0435\u0433\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u0434\u0430\u0448\u0431\u043E\u0440\u0434 Minora AI, \u0441\u043F\u043E\u0440\u0438\u043B\u0438 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439 \u0438 \u043F\u043E\u043C\u043E\u0433\u043B\u0438 \u0441\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043D\u0430 35%.",
        name: "\u0411\u0435\u043A\u0437\u043E\u0434 \u042E\u0441\u0443\u043F\u043E\u0432",
        role: "Brand Director",
        brand: "UnionPay UZ",
        glyph: "UP",
        bg: "var(--cream-card)"
      }
    ];
    return /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 05 \u2014 \u041E\u0442\u0437\u044B\u0432\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, maxWidth: 920 } }, "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B, \u043A\u043E\u0433\u0434\u0430 \u043C\u044B \u043D\u0435 \u0432 \u043A\u043E\u043C\u043D\u0430\u0442\u0435."))), /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, items.map((t, i) => /* @__PURE__ */ React.createElement("article", { key: i, className: "card", style: {
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 24,
      background: t.dark ? "var(--ink)" : "var(--cream-card)",
      color: t.dark ? "var(--bg)" : "var(--ink)",
      minHeight: 320
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: "Instrument Serif",
      fontStyle: "italic",
      fontSize: 92,
      lineHeight: 0.6,
      height: 38,
      color: t.bg === "var(--cream-card)" || t.bg === "var(--ink)" ? "var(--accent)" : t.bg
    } }, "\u201C"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing: "-0.01em", fontWeight: 500 } }, t.quote), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 17 } }, t.name), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.7, marginTop: 4 } }, t.role)), /* @__PURE__ */ React.createElement("div", { className: "logo-chip", style: {
      fontSize: 18,
      color: t.dark ? "var(--bg)" : "var(--ink)",
      opacity: 1
    } }, /* @__PURE__ */ React.createElement("span", { className: "glyph", style: {
      background: t.bg,
      color: t.bg === "var(--ink)" ? "var(--bg)" : "var(--ink)",
      borderColor: t.dark ? "var(--bg)" : "var(--ink)"
    } }, t.glyph), t.brand)))))));
  }
  function FAQ() {
    const [open, setOpen] = useState(0);
    const items = [
      {
        q: "\u041A\u0430\u043A \u0432\u044B \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442\u0435 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0433\u043E \u0431\u044E\u0434\u0436\u0435\u0442\u0430?",
        a: "\u0427\u0435\u0440\u0435\u0437 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 Minora AI \u0441 \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u043A \u0440\u0430\u0441\u0445\u043E\u0434\u0430\u043C \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438."
      },
      {
        q: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u043B\u0438 \u0432\u044B \u043F\u043E \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044F\u043C?",
        a: "\u0414\u0430, \u043C\u044B \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044B \u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044F\u043C : \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430."
      },
      {
        q: "\u0412 \u0447\u0435\u043C \u0432\u0430\u0448\u0430 \u0433\u043B\u0430\u0432\u043D\u0430\u044F \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 \u043D\u0430 \u0440\u044B\u043D\u043A\u0435 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430?",
        a: "\u0421\u0438\u043D\u0442\u0435\u0437 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0445 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0439 \u0441 \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u043C \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435\u043C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043A\u043E\u0434\u043E\u0432."
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "faq" }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { maxWidth: 1100 } }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 06 \u2014 \u0412\u043E\u043F\u0440\u043E\u0441\u044B")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B.")), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 360, color: "var(--ink-soft)", fontSize: 16, margin: 0 } }, "\u041E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0432\u043E\u0437\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F.")), /* @__PURE__ */ React.createElement("div", null, items.map((it, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: "faq-item " + (open === i ? "open" : ""),
        onClick: () => setOpen(open === i ? -1 : i)
      },
      /* @__PURE__ */ React.createElement("div", { className: "faq-q" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)", width: 32 } }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", { className: "faq-title", style: { margin: 0 } }, it.q)), /* @__PURE__ */ React.createElement("div", { className: "faq-toggle" }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M7 1V13M1 7H13", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })))),
      /* @__PURE__ */ React.createElement("div", { className: "faq-a", style: { paddingLeft: 52, paddingRight: 60 } }, it.a)
    )))));
  }
  function FinalCTA() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", task: "" });
    async function handleSubmit(e) {
      e.preventDefault();
      setSubmitting(true);
      setError("");
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, page: window.location.pathname })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.ok === false) {
          throw new Error(result.error || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        }
        setSubmitted(true);
        setForm({ name: "", company: "", phone: "", email: "", task: "" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
      } finally {
        setSubmitting(false);
      }
    }
    return /* @__PURE__ */ React.createElement("section", { id: "contact", style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card final-cta-card", style: {
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
    } }), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      bottom: -80,
      left: -80,
      width: 220,
      height: 220,
      borderRadius: 999,
      background: "var(--accent-2)",
      opacity: 0.2,
      border: "1.5px solid var(--bg)"
    } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }, className: "cta-grid" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 07 \u2014 \u041C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 72px)", margin: 0, color: "var(--bg)", lineHeight: 1.05 } }, "\u0413\u043E\u0442\u043E\u0432\u044B \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435?"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 18, color: "rgba(255,255,255,0.78)", maxWidth: 480 } }, "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043C\u044B \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0440\u0430\u0441\u0447\u0435\u0442 \u0441\u043D\u0438\u0436\u0435\u043D\u0438\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435."), /* @__PURE__ */ React.createElement("a", { href: "#", className: "btn lime final-cta-link", style: { alignSelf: "flex-start", marginTop: 8 } }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C 30 \u043C\u0438\u043D\u0443\u0442 \u0432 Calendly", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 24,
      paddingTop: 24,
      borderTop: "1px solid rgba(255,255,255,0.18)",
      display: "flex",
      gap: 32,
      flexWrap: "wrap"
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.6 } }, "Email"), /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "info@munamedia.me")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.6 } }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /* @__PURE__ */ React.createElement("a", { href: "tel:+998331301313", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "+998 33 130 13 13")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.6 } }, "Telegram"), /* @__PURE__ */ React.createElement("a", { href: "#", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "@munamedia")))), /* @__PURE__ */ React.createElement("div", { className: "contact-form-card", style: {
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
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, className: "form-contact-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        type: "tel",
        placeholder: "+998 90 123 45 67",
        value: form.phone,
        onChange: (e) => setForm({ ...form, phone: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "Email *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "input",
        type: "email",
        placeholder: "name@company.com",
        value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "\u0417\u0430\u0434\u0430\u0447\u0430 & \u0411\u044E\u0434\u0436\u0435\u0442"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "input",
        placeholder: "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430 \u043A \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044E. \u0411\u044E\u0434\u0436\u0435\u0442 \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E.",
        value: form.task,
        onChange: (e) => setForm({ ...form, task: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn", style: { justifyContent: "center", marginTop: 4 }, disabled: submitting }, submitting ? "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C..." : "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0440\u0430\u0441\u0447\u0435\u0442", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), error && /* @__PURE__ */ React.createElement("div", { style: { color: "#b00020", fontSize: 13, textAlign: "center", fontWeight: 600 } }, error), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", textAlign: "center", marginTop: 4, fontSize: 10 } }, "\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0435\u0442 \u0432\u044B\u0441\u044B\u043B\u0430\u0435\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 48 \u0447\u0430\u0441\u043E\u0432")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", padding: "20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 72,
      height: 72,
      borderRadius: 999,
      background: "var(--accent)",
      border: "1.5px solid var(--ink)",
      display: "grid",
      placeItems: "center",
      fontSize: 32
    } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438!"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)" } }, "\u0411\u0440\u0438\u0444 \u043F\u0440\u0438\u043D\u044F\u0442. \u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u044F\u0442 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u043D\u0438\u0448\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 48 \u0447\u0430\u0441\u043E\u0432.")))))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement(MunaFooter, null);
  }
  Object.assign(window, { Hero, TopCases, Partners, WhyMuna, Services, Testimonials, FAQ, FinalCTA, Footer });
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(Hero, { variant: t.heroLayout }), /* @__PURE__ */ React.createElement(TopCases, null), /* @__PURE__ */ React.createElement(Partners, null), /* @__PURE__ */ React.createElement(WhyMuna, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(Testimonials, null), /* @__PURE__ */ React.createElement(FAQ, null), /* @__PURE__ */ React.createElement(FinalCTA, null), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "\u041F\u0430\u043B\u0438\u0442\u0440\u0430" }), /* @__PURE__ */ React.createElement(
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

