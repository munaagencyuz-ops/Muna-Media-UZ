// @ts-nocheck
(() => {
  const MUNA_UZ = document.documentElement.lang === "uz";
  function munaText(ru, uz) {
    return MUNA_UZ ? uz : ru;
  }
  function munaLocaleHref(href) {
    if (typeof href !== "string") return href;
    if (href.startsWith("assets/")) return "/" + href;
    if (!MUNA_UZ && href.startsWith("/") && !href.startsWith("//") && !/^\/(assets|api|cms|ru)(\/|$)/.test(href)) {
      return "/ru" + (href === "/" ? "/" : href);
    }
    return href;
  }
  const munaCreateElement = React.createElement;
  React.createElement = function(type, props, ...children) {
    if (props && typeof type === "string") {
      props = { ...props };
      if (props.href && !props["data-locale-switch"]) props.href = munaLocaleHref(props.href);
      if (typeof props.src === "string" && props.src.startsWith("assets/")) props.src = "/" + props.src;
    }
    return munaCreateElement.call(React, type, props, ...children);
  };
  function MunaLanguageLink() {
    const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    const target = MUNA_UZ ? "/ru" + (path === "/" ? "/" : path) : path.replace(/^\/ru(?=\/|$)/, "") || "/";
    return /* @__PURE__ */ React.createElement("a", { className: "nav-link", href: target, hrefLang: MUNA_UZ ? "ru" : "uz", lang: MUNA_UZ ? "ru" : "uz", "data-locale-switch": "true" }, MUNA_UZ ? "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" : "O'zbekcha");
  }
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
      { label: munaText("\u0413\u043B\u0430\u0432\u043D\u0430\u044F","Bosh sahifa"), href: "/" },
      {
        label: munaText("\u0423\u0441\u043B\u0443\u0433\u0438","Xizmatlar"),
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
          { label: munaText("\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Barcha xizmatlar"), href: "/services-uzbekistan" },
          { type: "group", label: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama") },
          { label: munaText("LED-\u044D\u043A\u0440\u0430\u043D\u044B","LED ekranlar"), href: "/led-screens" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421","AYoQShdagi reklama"), href: "/gas-station-ads" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445","Savdo markazlaridagi reklama"), href: "/mall-ads" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445","Avtobuslardagi reklama"), href: "/bus-ads" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445","Bekatlardagi reklama"), href: "/bus-stop-ads" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E","Metrodagi reklama"), href: "/metro-ads" },
          { label: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443","Aeroportdagi reklama"), href: "/airport-ads" },
          { type: "group", label: munaText("\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A","Internet va qidiruv") },
          { label: munaText("SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F","SEO"), href: "/seo-optimization" },
          { label: munaText("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Kontekst reklama"), href: "/context-ads" },
          { type: "group", label: munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B","Ijtimoiy tarmoqlar va blogerlar") },
          { label: "SMM", href: "/smm" },
          { label: munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Blogerlar bilan reklama"), href: "/influencer-marketing" },
          { label: munaText("Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Telegram marketing"), href: "/telegram-marketing" },
          { type: "group", label: munaText("\u0421\u043E\u0431\u044B\u0442\u0438\u044F","Tadbirlar") },
          { label: munaText("\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442","Tadbirlarni boshqarish"), href: "/event-management" }
        ]
      },
      {
        label: munaText("\u041A\u0435\u0439\u0441\u044B","Loyihalar"),
        href: "/cases",
        match: ["/cases", "/xiaomi", "/unionpay", "/koronapay"],
        children: [
          { label: munaText("\u0412\u0441\u0435 \u043A\u0435\u0439\u0441\u044B","Barcha loyihalar"), href: "/cases" },
          { label: munaText("\u041A\u0435\u0439\u0441 Xiaomi","Xiaomi loyihasi"), href: "/xiaomi" },
          { label: munaText("\u041A\u0435\u0439\u0441 UnionPay","UnionPay loyihasi"), href: "/unionpay" },
          { label: munaText("\u041A\u0435\u0439\u0441 KoronaPay","KoronaPay loyihasi"), href: "/koronapay" }
        ]
      },
      { label: munaText("\u0411\u043B\u043E\u0433","Blog"), href: "/blog", match: ["blog"] },
      { label: munaText("\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438","Biz haqimizda"), href: "/about" },
      { label: munaText("\u0413\u043E\u0440\u043E\u0434\u0430", "Shaharlar"), href: "/shaharlar" }
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
    )))))), /* @__PURE__ */ React.createElement(MunaLanguageLink, null), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/#contact",
        className: "btn lime nav-links",
        style: { padding: "10px 20px", fontSize: "14px", margin: 0 }
      },
      munaText("\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442","Loyihani boshlash"),
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
    ))))), /* @__PURE__ */ React.createElement("div", { className: "mobile-drawer-footer" }, /* @__PURE__ */ React.createElement(MunaLanguageLink, null), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/#contact",
        className: "btn lime mobile-drawer-cta",
        style: { padding: "18px 24px", fontSize: "16px" },
        onClick: () => setIsOpen(false)
      },
      munaText("\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442","Loyihani boshlash"),
      /* @__PURE__ */ React.createElement("span", { className: "arrow", style: { marginLeft: "8px" } }, "\u2192")
    )))), MUNA_UZ && /^\/(cases|xiaomi|unionpay|koronapay)(?:\/|$)/.test(window.location.pathname) && /* @__PURE__ */ React.createElement("aside", { className: "container", lang: "uz", style: { paddingTop: 18, paddingBottom: 18 } }, "Arxiv loyihalari. Asl matn va tarixiy raqamlar rus tilida saqlangan. Ular yangi kampaniya natijasiga kafolat emas."));
  }
  Object.assign(window, { Nav });
  function MunaFooter() {
    const serviceGroups = [
      {
        title: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
        links: [
          [munaText("LED-\u044D\u043A\u0440\u0430\u043D\u044B","LED ekranlar"), "/led-screens"],
          [munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421","AYoQShdagi reklama"), "/gas-station-ads"],
          [munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0422\u0426","Savdo markazidagi reklama"), "/mall-ads"],
          [munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445","Avtobuslardagi reklama"), "/bus-ads"],
          [munaText("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438","Bekatlar"), "/bus-stop-ads"],
          [munaText("\u041C\u0435\u0442\u0440\u043E","Metro"), "/metro-ads"],
          [munaText("\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442","Aeroport"), "/airport-ads"]
        ]
      },
      {
        title: "Digital",
        links: [
          [munaText("SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F","SEO"), "/seo-optimization"],
          [munaText("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Kontekst reklama"), "/context-ads"],
          ["SMM", "/smm"],
          [munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Blogerlar bilan reklama"), "/influencer-marketing"],
          [munaText("Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Telegram marketing"), "/telegram-marketing"],
          [munaText("\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442","Tadbirlarni boshqarish"), "/event-management"]
        ]
      }
    ];
    const footerLinks = {
      pages: [
        [munaText("\u0413\u043B\u0430\u0432\u043D\u0430\u044F","Bosh sahifa"), "/"],
        [munaText("\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Barcha xizmatlar"), "/services-uzbekistan"],
        [munaText("\u041A\u0435\u0439\u0441\u044B","Loyihalar"), "/cases"],
        [munaText("\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438","Biz haqimizda"), "/about"],
        [munaText("\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B","Bog'lanish"), "/#contact"]
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
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: "/", className: "logo", style: { fontSize: 42, color: "white", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("span", { className: "blob", style: { width: 34, height: 34, background: "var(--accent)" } }), "MUNA MEDIA"), /* @__PURE__ */ React.createElement("p", { style: { margin: "18px 0 0", maxWidth: 470, color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.65 } }, munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, digital, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u0438\u0432\u0435\u043D\u0442\u044B \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C.","O'zbekistonda reklama xizmatlari: strategiya, tashqi reklama, internet reklamasi, blogerlar, tadbirlar va xarajatlar hisoboti.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 } }, /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn", style: { background: "var(--accent)", borderColor: "white", color: "white" } }, munaText("\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442","Loyihani muhokama qilish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cases", className: "btn", style: { background: "transparent", borderColor: "white", color: "white" } }, munaText("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B","Loyihalarni ko'rish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
      gap: 26
    } }, /* @__PURE__ */ React.createElement(Column, { title: munaText("\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B","Sahifalar"), links: footerLinks.pages }), serviceGroups.map((group) => /* @__PURE__ */ React.createElement(Column, { key: group.title, title: group.title, links: group.links })), /* @__PURE__ */ React.createElement(Column, { title: munaText("\u041A\u0435\u0439\u0441\u044B","Loyihalar"), links: footerLinks.cases }))), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 44,
      paddingTop: 26,
      borderTop: "1px solid rgba(255,255,255,.22)",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 22,
      alignItems: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { ...linkStyle, fontWeight: 700 } }, "info@munamedia.me"), /* @__PURE__ */ React.createElement("a", { href: "tel:+998331301313", style: linkStyle }, "+998 33 130 13 13"), /* @__PURE__ */ React.createElement("a", { href: "https://t.me/munamedia", style: linkStyle }, "Telegram"), /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/munamedia", style: linkStyle }, "Instagram")), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "rgba(255,255,255,.46)", textAlign: "right" } }, munaText("\xA9 2019-2026 Muna Media \xB7 \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D","© 2019-2026 Muna Media · Toshkent, O'zbekiston")))), /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
  const CASE_STUDIES = {
    xiaomi: {
      label: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 / \u0421\u043E\u0446\u0441\u0435\u0442\u0438",
      brand: "Xiaomi",
      glyph: "Mi",
      accent: "var(--accent)",
      eyebrow: "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E Xiaomi \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435",
      title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Xiaomi: \u043F\u043E\u043B\u043D\u0430\u044F \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A ", /* @__PURE__ */ React.createElement("span", { className: "serif" }, "Xiaomi 13T"), "."),
      intro: "Muna Media \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u043B\u0430 \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 Xiaomi \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u043B\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0438, \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u044B\u0432\u0430\u043B\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0444\u043E\u0442\u043E\u0441\u0435\u0441\u0441\u0438\u0438, \u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0435 \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u0438 \u0438 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E \u043D\u043E\u0432\u043E\u0439 \u043B\u0438\u043D\u0435\u0439\u043A\u0438 \u0441\u043C\u0430\u0440\u0442\u0444\u043E\u043D\u043E\u0432 Xiaomi 13T.",
      metrics: [
        [munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438","Ijtimoiy tarmoqlar"), "Instagram, Telegram, Facebook"],
        ["13T", munaText("\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u043D\u043E\u0432\u043E\u0439 \u043B\u0438\u043D\u0435\u0439\u043A\u0438","yangi mahsulot taqdimoti")],
        ["PUBG", munaText("\u0431\u0440\u0435\u043D\u0434\u043E\u0432\u0430\u044F \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u044F","brend bilan hamkorlik")],
        ["\u0424\u043E\u0442\u043E", "\u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D"]
      ],
      challengeTitle: "\u0423\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u0438 Xiaomi \u0438 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u0431\u043B\u0438\u0436\u0435 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.",
      challenge: [
        "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0431\u0440\u0435\u043D\u0434\u0430 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u043B\u0438\u043D\u0435\u0439\u043A\u0430\u043C \u0441\u043C\u0430\u0440\u0442\u0444\u043E\u043D\u043E\u0432 \u0438 \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C.",
        "\u041F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u044C \u043D\u043E\u0432\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0447\u0435\u0440\u0435\u0437 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442.",
        "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0443\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439 \u0432 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u044F\u0445."
      ],
      audience: [
        ["\u0424\u043E\u043A\u0443\u0441", "\u043C\u043E\u043B\u043E\u0434\u0430\u044F \u0438 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u043D\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F"],
        ["\u041A\u0430\u043D\u0430\u043B\u044B", "Instagram, Telegram, Facebook"],
        [munaText("\u041A\u043E\u043D\u0442\u0435\u043D\u0442","Kontent"), "\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0441\u044A\u0435\u043C\u043A\u0438, lifestyle, \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u0432\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"]
      ],
      steps: [
        {
          title: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446",
          desc: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 Muna Media \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u043B\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B Xiaomi \u0432 Instagram, Telegram \u0438 Facebook, \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0443\u044E \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044E \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C \u0431\u0440\u0435\u043D\u0434\u0430."
        },
        {
          title: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0444\u043E\u0442\u043E\u0441\u0435\u0441\u0441\u0438\u0439",
          desc: "\u041C\u044B \u043F\u0440\u043E\u0432\u0435\u043B\u0438 \u0441\u0435\u0440\u0438\u044E \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u044A\u0435\u043C\u043E\u043A \u0441 \u043C\u043E\u0434\u0435\u043B\u044F\u043C\u0438 \u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C\u0438 Xiaomi, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u0447\u0435\u0440\u043A\u043D\u0443\u0442\u044C \u0441\u0442\u0438\u043B\u044C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0432\u044B\u0441\u043E\u043A\u0438\u0439 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442."
        },
        {
          title: "\u041A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u0438 \u0441 \u0431\u0440\u0435\u043D\u0434\u0430\u043C\u0438",
          desc: "Muna Media \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B\u0430 \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u0438 Xiaomi, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044E \u0441 PUBG, \u0447\u0442\u043E\u0431\u044B \u0443\u0441\u0438\u043B\u0438\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043C\u043E\u043B\u043E\u0434\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043A \u0438\u0433\u0440\u043E\u0432\u044B\u043C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044F\u043C \u0441\u043C\u0430\u0440\u0442\u0444\u043E\u043D\u043E\u0432."
        },
        {
          title: "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F Xiaomi 13T",
          desc: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B\u0430 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E \u043D\u043E\u0432\u043E\u0439 \u043B\u0438\u043D\u0435\u0439\u043A\u0438 Xiaomi 13T \u0441 \u0430\u043A\u0446\u0435\u043D\u0442\u043E\u043C \u043D\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043A\u0430\u043C\u0435\u0440\u044B, \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u0438 \u0438 \u0448\u0438\u0440\u043E\u0442\u0443 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u043E\u0439 \u044D\u043A\u043E\u0441\u0438\u0441\u0442\u0435\u043C\u044B."
        }
      ],
      resultTitle: "\u0427\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F",
      results: [
        "\u0415\u0434\u0438\u043D\u044B\u0439 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u043E\u043B\u043E\u0441 \u0431\u0440\u0435\u043D\u0434\u0430 \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u0430\u0445.",
        "\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0431\u0430\u0437\u0430 \u0434\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 Xiaomi.",
        "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043A \u0438\u0433\u0440\u043E\u0432\u044B\u043C \u0438 \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044F\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0447\u0435\u0440\u0435\u0437 \u043A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0446\u0438\u0438.",
        "\u0421\u043E\u0431\u044B\u0442\u0438\u0439\u043D\u0430\u044F \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F, \u0443\u0441\u0438\u043B\u0438\u0432\u0448\u0430\u044F \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043A \u043D\u043E\u0432\u043E\u0439 \u043B\u0438\u043D\u0435\u0439\u043A\u0435 Xiaomi 13T."
      ],
      source: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: munamedia.me/cases/xiaomi"
    },
    unionpay: {
      label: "\u041F\u0440\u043E\u043C\u043E / \u0420\u0438\u0442\u0435\u0439\u043B / \u0424\u0438\u043D\u0442\u0435\u0445",
      brand: "UnionPay International",
      glyph: "UP",
      accent: "var(--accent-2)",
      eyebrow: "6-\u043C\u0435\u0441\u044F\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0446\u0438\u044F \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435",
      title: /* @__PURE__ */ React.createElement(React.Fragment, null, "UnionPay: \u0440\u043E\u0441\u0442 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u043C\u043E, \u0440\u0438\u0442\u0435\u0439\u043B \u0438 ", /* @__PURE__ */ React.createElement("span", { className: "serif" }, "\u0446\u0438\u0444\u0440\u043E\u0432\u0443\u044E \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443"), "."),
      intro: "Muna Media \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0430 \u0438 \u043F\u0440\u043E\u0432\u0435\u043B\u0430 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0443\u044E \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E UnionPay International \u0434\u043B\u044F \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u044F \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 \u043F\u043E \u043A\u0430\u0440\u0442\u0430\u043C \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 HUMO, \u043F\u0440\u0438\u0432\u043B\u0435\u043A\u0430\u044F Korzinka.uz, Makro, Havas \u0438 Uzbekneftegaz.",
      metrics: [
        [munaText("6 \u043C\u0435\u0441","6 oy"), "\u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0446\u0438\u0438"],
        ["130 260", "\u043E\u0445\u0432\u0430\u0442 \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043D\u044B\u0445 stories"],
        ["1 151 439", "\u043E\u0445\u0432\u0430\u0442 Telegram-\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439"],
        ["38", munaText("Telegram-\u043A\u0430\u043D\u0430\u043B\u043E\u0432","Telegram kanali")]
      ],
      challengeTitle: "\u0421\u0442\u0438\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0440\u0442 UnionPay \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 HUMO.",
      challenge: [
        "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0443\u044E \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044E \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u0443\u044E \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 6-\u043C\u0435\u0441\u044F\u0447\u043D\u043E\u0439 \u0430\u043A\u0446\u0438\u0438.",
        "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043A\u0430\u043D\u0430\u043B\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0434\u0430\u0434\u0443\u0442 \u043E\u0445\u0432\u0430\u0442, \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u0438 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u0443 merchant-\u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432.",
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u043F\u0440\u043E\u0441\u0442\u044B\u043C: \u043E\u0442 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u043A\u0430\u0440\u0442\u044B \u0434\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0447\u0435\u043A\u043E\u0432 \u0438 \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0430\u0445."
      ],
      audience: [
        ["\u041B\u043E\u043A\u0430\u0446\u0438\u044F", "\u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D \u0438 \u041A\u0438\u0442\u0430\u0439"],
        ["\u041A\u0430\u043D\u0430\u043B\u044B", "Telegram, YouTube, Instagram, Facebook, \u0421\u041C\u0418, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B"],
        ["\u0421\u0440\u0435\u0434\u0430", "\u043E\u0444\u0438\u0441, \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442, \u0434\u043E\u043C, \u0422\u0412, WeChat"]
      ],
      steps: [
        {
          title: "\u041C\u0435\u0445\u0430\u043D\u0438\u043A\u0430 \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0446\u0438\u0438",
          desc: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u043A\u0430\u0440\u0442\u0443, \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u043B\u0438 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u043D\u0430 \u0441\u0443\u043C\u043C\u0443 \u0431\u043E\u043B\u0435\u0435 5 \u0434\u043E\u043B\u043B\u0430\u0440\u043E\u0432 \u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u043B\u0438 \u0447\u0435\u043A\u0438 \u0434\u043B\u044F \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0435 \u043F\u0440\u0438\u0437\u043E\u0432."
        },
        {
          title: "\u0421\u0430\u0439\u0442 \u0438 Telegram-\u0431\u043E\u0442",
          desc: "\u0414\u043B\u044F \u0430\u043A\u0446\u0438\u0438 \u0431\u044B\u043B\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u044B \u0441\u0430\u0439\u0442 \u0438 \u0447\u0430\u0442-\u0431\u043E\u0442: \u043E\u043D\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u0430, \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u043B\u0438 \u0447\u0435\u043A\u0438, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u043B\u0438 \u0441\u0442\u0430\u0442\u0443\u0441 \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C."
        },
        {
          title: "\u0420\u0438\u0442\u0435\u0439\u043B \u0438 \u0440\u0430\u0437\u0434\u0430\u0447\u0430 \u043B\u0438\u0444\u043B\u0435\u0442\u043E\u0432",
          desc: "\u0412 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B\u0430 \u0440\u0430\u0437\u0434\u0430\u0447\u0443 \u043B\u0438\u0444\u043B\u0435\u0442\u043E\u0432 \u0443 Makro, Korzinka.uz, KFC \u0438 \u0432\u044B\u0445\u043E\u0434\u043E\u0432 \u0438\u0437 \u043C\u0435\u0442\u0440\u043E, \u0432\u044B\u0431\u0438\u0440\u0430\u044F \u0442\u043E\u0447\u043A\u0438 \u0441 \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u043F\u043E\u0442\u043E\u043A\u043E\u043C \u043B\u044E\u0434\u0435\u0439."
        },
        {
          title: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438, \u0442\u0430\u0440\u0433\u0435\u0442 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B",
          desc: "\u041A\u0430\u043C\u043F\u0430\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0430\u043B\u0430 \u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439, \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0443\u044E \u0440\u0435\u043A\u043B\u0430\u043C\u0443, Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0438 \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u0431\u043B\u043E\u0433\u0435\u0440\u0430\u043C\u0438 \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u043E\u0445\u0432\u0430\u0442\u0430 \u0438 \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u0438."
        }
      ],
      resultTitle: "\u041E\u0446\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B",
      results: [
        "130 260 \u043E\u0431\u0449\u0435\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430 \u043E\u0442\u043C\u0435\u0447\u0435\u043D\u043D\u044B\u0445 \u0438\u0441\u0442\u043E\u0440\u0438\u0439 \u0443 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432.",
        "91 940 \u043E\u0431\u0449\u0435\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u0438 2 573 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043E\u0442 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432.",
        "13,91% \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044F \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043F\u043E\u0441\u0442\u043E\u0432.",
        "2 966 000 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 Telegram-\u043A\u0430\u043D\u0430\u043B\u043E\u0432, 1 151 439 \u043E\u0445\u0432\u0430\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u0438 38 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439."
      ],
      source: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: munamedia.me/cases/union-pay"
    }
  };
  function getCaseStudy() {
    return CASE_STUDIES[window.CASE_STUDY] || CASE_STUDIES.xiaomi;
  }
  function CaseHero() {
    const c = getCaseStudy();
    return /* @__PURE__ */ React.createElement("section", { id: "case-hero", style: { paddingTop: 96, paddingBottom: 56, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 28 } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " ", c.label), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, c.eyebrow)), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 96px)", lineHeight: 1.02, margin: "0 0 28px", maxWidth: 1200 } }, c.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, color: "var(--ink-soft)", maxWidth: 880, margin: "0 0 42px" } }, c.intro), /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      border: "1.5px solid var(--ink)",
      borderRadius: 24,
      overflow: "hidden",
      background: "var(--cream-card)"
    } }, c.metrics.map(([n, t], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "24px 26px", borderRight: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: 44, color: "var(--accent)" } }, n), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { fontSize: 11, color: "var(--muted)", marginTop: 8 } }, t))))));
  }
  function CaseChallenge() {
    const c = getCaseStudy();
    return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 52, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 01 - \u0417\u0430\u0434\u0430\u0447\u0430")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: "0 0 24px", lineHeight: 1.05 } }, c.challengeTitle), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, c.challenge.map((item, i) => /* @__PURE__ */ React.createElement("p", { key: i, style: { margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)" } }, item)))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 34 } }, /* @__PURE__ */ React.createElement("div", { className: "logo-chip", style: { fontSize: 26, opacity: 1, marginBottom: 26 } }, /* @__PURE__ */ React.createElement("span", { className: "glyph" }, c.glyph), c.brand), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, c.audience.map(([label, value]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { paddingTop: 14, borderTop: "1px dashed var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, lineHeight: 1.45 } }, value))))))));
  }
  function CaseExecution() {
    const c = getCaseStudy();
    return /* @__PURE__ */ React.createElement("section", { style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 02 - \u0420\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, "\u0427\u0442\u043E \u0441\u0434\u0435\u043B\u0430\u043B\u0438"))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 28 } }, c.steps.map((step, i) => /* @__PURE__ */ React.createElement("article", { key: step.title, className: "card", style: { padding: 34, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700 } }, "\u0428\u0410\u0413 0", i + 1), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 28, margin: 0 } }, step.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 } }, step.desc))))));
  }
  function CaseResults() {
    const c = getCaseStudy();
    return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "clamp(34px, 5vw, 56px)", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 42, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 03 - \u0418\u0442\u043E\u0433\u0438"), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(34px, 5vw, 60px)", margin: "0 0 18px" } }, c.resultTitle), /* @__PURE__ */ React.createElement("p", { className: "mono", style: { color: "var(--muted)", margin: 0 } }, c.source)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, c.results.map((result, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "42px 1fr", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { className: "glyph", style: { width: 42, height: 42, borderRadius: 10, background: "var(--accent)", color: "var(--bg)", borderColor: "var(--ink)" } }, i + 1), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" } }, result)))))));
  }
  function CaseCTA() {
    return /* @__PURE__ */ React.createElement("section", { style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "/cases", className: "btn ghost" }, "\u0412\u0441\u0435 \u043A\u0435\u0439\u0441\u044B ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn lime" }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442 ", /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))));
  }
  function CaseFooter() {
    return /* @__PURE__ */ React.createElement(MunaFooter, null);
  }
  Object.assign(window, { CaseHero, CaseChallenge, CaseExecution, CaseResults, CaseCTA, CaseFooter });
  const TWEAK_DEFAULTS = (
    /*EDITMODE-BEGIN*/
    {
      "palette": "blue",
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
      document.documentElement.style.setProperty(
        "--shadow",
        t.borderStyle === "soft" ? "0 14px 32px -10px rgba(14,14,12,0.22)" : "6px 6px 0 0 var(--ink)"
      );
    }, [t.palette, t.borderStyle]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(CaseHero, null), /* @__PURE__ */ React.createElement(CaseChallenge, null), /* @__PURE__ */ React.createElement(CaseExecution, null), /* @__PURE__ */ React.createElement(CaseResults, null), /* @__PURE__ */ React.createElement(CaseCTA, null), /* @__PURE__ */ React.createElement(CaseFooter, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: munaText("\u041F\u0430\u043B\u0438\u0442\u0440\u0430","Ranglar") }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: munaText("\u0421\u0445\u0435\u043C\u0430","Rang sxemasi"),
        value: t.palette,
        options: [
          { value: "blue", label: "Blue" },
          { value: "electric", label: "Electric" },
          { value: "classic", label: "Black/Blue" }
        ],
        onChange: (v) => setTweak("palette", v)
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: munaText("\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438","Kartochkalar") }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: munaText("\u0422\u0435\u043D\u0438","Soyalar"),
        value: t.borderStyle,
        options: [
          { value: "hard", label: munaText("\u0411\u0440\u0443\u0442\u0430\u043B\u044C\u043D\u044B\u0435","Aniq") },
          { value: "soft", label: munaText("\u041C\u044F\u0433\u043A\u0438\u0435","Yumshoq") }
        ],
        onChange: (v) => setTweak("borderStyle", v)
      }
    )));
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
