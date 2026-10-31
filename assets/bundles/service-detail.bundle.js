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
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", { href: "/", className: "logo", "aria-label": "Muna Media", style: { display: "inline-flex", color: "white", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/logo/muna-media-navbar-logo.png", alt: "Muna Media", width: "208", height: "80", style: { display: "block", width: 208, maxWidth: "100%", height: "auto", borderRadius: "10% / 26%" } })), /* @__PURE__ */ React.createElement("p", { style: { margin: "18px 0 0", maxWidth: 470, color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.65 } }, munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430, digital, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B, \u0438\u0432\u0435\u043D\u0442\u044B \u0438 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C.","O'zbekistonda reklama xizmatlari: strategiya, tashqi reklama, internet reklamasi, blogerlar, tadbirlar va xarajatlar hisoboti.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 } }, /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn", style: { background: "var(--accent)", borderColor: "white", color: "white" } }, munaText("\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442","Loyihani muhokama qilish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/cases", className: "btn", style: { background: "transparent", borderColor: "white", color: "white" } }, munaText("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B","Loyihalarni ko'rish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement("div", { style: {
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
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { ...linkStyle, fontWeight: 700 } }, "info@munamedia.me"), /* @__PURE__ */ React.createElement("a", { href: "tel:+998901381313", style: linkStyle }, "+998 90 138 13 13"), /* @__PURE__ */ React.createElement("a", { href: "https://t.me/munamedia", style: linkStyle }, "Telegram"), /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/munamedia", style: linkStyle }, "Instagram")), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "rgba(255,255,255,.46)", textAlign: "right" } }, munaText("\xA9 2019-2026 Muna Media \xB7 \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D","© 2019-2026 Muna Media · Toshkent, O'zbekiston")))), /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
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
  const SERVICE_PAGES = {
    led: {
      slug: "/led-screens",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("LED-\u044D\u043A\u0440\u0430\u043D\u044B","LED ekranlar"),
      hero: "LED-\u044D\u043A\u0440\u0430\u043D\u044B \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u0442\u043D\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430",
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 LED-\u044D\u043A\u0440\u0430\u043D\u0430\u0445: \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043B\u043E\u043A\u0430\u0446\u0438\u0438, \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0440\u043E\u043B\u0438\u043A\u0438, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u043D\u0430\u0440\u0443\u0436\u043D\u0443\u044E \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0441 \u043E\u0431\u0449\u0435\u0439 \u043C\u0435\u0434\u0438\u0430\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0435\u0439.",
      marquee: [munaText("LED-\u044D\u043A\u0440\u0430\u043D\u044B","LED ekranlar"), "\u0413\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u0442\u0440\u0430\u0444\u0438\u043A", munaText("\u041C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D","Media reja"), "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432\u044B\u0445\u043E\u0434\u043E\u0432", "\u041E\u0445\u0432\u0430\u0442"],
      needs: [
        "\u0411\u044B\u0441\u0442\u0440\u043E \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0431\u0440\u0435\u043D\u0434\u0430 \u0432 \u0433\u043E\u0440\u043E\u0434\u0435.",
        "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u043C \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C.",
        "\u0423\u0441\u0438\u043B\u0438\u0442\u044C digital-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u043E\u0444\u043B\u0430\u0439\u043D-\u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435\u043C."
      ],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u043A\u0440\u0430\u043D\u044B \u043F\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0443 \u0438 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0443 \u0440\u0430\u0439\u043E\u043D\u0430.", "\u0410\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u043A\u0440\u0435\u0430\u0442\u0438\u0432 \u043F\u043E\u0434 \u0444\u043E\u0440\u043C\u0430\u0442 \u0438 \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0440\u043E\u043B\u0438\u043A\u0430.", "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0444\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442\u044B \u043F\u043E \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F\u043C."],
      caseName: "Xiaomi",
      caseUrl: "/xiaomi",
      caseText: "\u0412 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u0432\u044B\u0445 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044F\u0445 Xiaomi \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0440\u044F\u0434\u043E\u043C \u0441 \u0442\u043E\u0447\u043A\u0430\u043C\u0438 \u043F\u0440\u043E\u0434\u0430\u0436 \u0438 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u043C \u0442\u0440\u0430\u0444\u0438\u043A\u043E\u043C.",
      testimonial: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 Muna Media \u0443\u043C\u0435\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u043E \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u0438 \u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u0434 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C.",
      author: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430",
      qa: [
        ["\u041A\u0430\u043A \u0431\u044B\u0441\u0442\u0440\u043E \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C LED-\u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435?", "\u041E\u0431\u044B\u0447\u043D\u043E \u0431\u0430\u0437\u043E\u0432\u044B\u0439 \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0437\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439. \u0421\u0440\u043E\u043A \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u0440\u043E\u043B\u0438\u043A\u043E\u0432 \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0438 \u044D\u043A\u0440\u0430\u043D\u043E\u0432."],
        ["\u0412\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442\u0435 \u0441 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043E\u043C?", "\u0414\u0430, \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0440\u043E\u043B\u0438\u043A \u0438\u043B\u0438 \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0435 \u0432\u0435\u0440\u0441\u0438\u0438 \u043F\u043E\u0434 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445 \u044D\u043A\u0440\u0430\u043D\u043E\u0432."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u0442\u044C LED \u0441 \u043E\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u043A\u043B\u0430\u043C\u043E\u0439?", "\u0414\u0430, \u0447\u0430\u0441\u0442\u043E \u043C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C LED \u043A\u0430\u043A \u043E\u0445\u0432\u0430\u0442\u043D\u044B\u0439 \u0441\u043B\u043E\u0439, \u0430 \u043E\u043D\u043B\u0430\u0439\u043D-\u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u2014 \u0434\u043B\u044F \u0434\u043E\u0433\u0440\u0435\u0432\u0430 \u0438 \u0437\u0430\u044F\u0432\u043E\u043A."]
      ]
    },
    gas: {
      slug: "/gas-station-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421","AYoQShdagi reklama"),
      hero: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0410\u0417\u0421 \u0434\u043B\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432",
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0431\u0440\u0435\u043D\u0434\u044B \u0432 \u0441\u0435\u0442\u044F\u0445 \u0410\u0417\u0421: \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0442\u0430\u043D\u0446\u0438\u0438, \u0444\u043E\u0440\u043C\u0430\u0442\u044B, \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u043E\u0434\u043D\u0438 \u0438 \u0442\u0435 \u0436\u0435 \u0442\u043E\u0447\u043A\u0438.",
      marquee: ["\u0410\u0417\u0421", "\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u044B", "\u041B\u043E\u043A\u0430\u0446\u0438\u0438", "\u041F\u043E\u0441\u0442\u0435\u0440\u044B", "\u042D\u043A\u0440\u0430\u043D\u044B"],
      needs: ["\u0414\u043E\u0441\u0442\u0443\u0447\u0430\u0442\u044C\u0441\u044F \u0434\u043E \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0439 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C FMCG, \u0444\u0438\u043D\u0442\u0435\u0445, \u0430\u0432\u0442\u043E- \u0438 \u0442\u0435\u043B\u0435\u043A\u043E\u043C-\u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.", "\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u043D\u0430 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0445 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u0445."],
      why: ["\u0417\u043D\u0430\u0435\u043C, \u043A\u0430\u043A\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0440\u044F\u0434\u043E\u043C \u0441 \u043A\u0430\u0441\u0441\u043E\u0439, \u043A\u043E\u043B\u043E\u043D\u043A\u0430\u043C\u0438 \u0438 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u043C.", "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u043D\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 \u043F\u043E\u0434 \u0440\u0430\u0439\u043E\u043D \u0438 \u043F\u043E\u0442\u043E\u043A.", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043F\u0440\u043E\u043C\u043E UnionPay \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0441 \u0442\u043E\u0447\u043A\u0430\u043C\u0438 \u0432\u044B\u0441\u043E\u043A\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0440\u043E\u0437\u043D\u0438\u0447\u043D\u044B\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0438\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438.",
      testimonial: "\u0414\u043B\u044F \u043D\u0430\u0441 \u0431\u044B\u043B\u043E \u0432\u0430\u0436\u043D\u043E \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u0443, \u0430 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u0447\u043A\u0438, \u0433\u0434\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0440\u0435\u0448\u0435\u043D\u0438\u0435.",
      author: "\u041F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0444\u0438\u043D\u0442\u0435\u0445-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438",
      qa: [
        ["\u041A\u0430\u043A\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u043D\u0430 \u0410\u0417\u0421?", "\u041F\u043E\u0441\u0442\u0435\u0440\u044B, \u044D\u043A\u0440\u0430\u043D\u044B, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F, \u043F\u0440\u043E\u043C\u043E-\u0441\u0442\u043E\u0439\u043A\u0438 \u0438 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0437\u0430\u0432\u0438\u0441\u044F\u0442 \u043E\u0442 \u0441\u0435\u0442\u0438 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0439 \u0441\u0442\u0430\u043D\u0446\u0438\u0438."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0443\u0436\u043D\u044B\u0435 \u0440\u0430\u0439\u043E\u043D\u044B?", "\u0414\u0430, \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C, \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u0430\u0433\u0430\u0435\u043C\u043E\u043C\u0443 \u043F\u0440\u043E\u0444\u0438\u043B\u044E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."],
        ["\u0412\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443?", "\u0414\u0430, \u043C\u043E\u0436\u0435\u043C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0430\u0447\u0443, QR-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443, \u043A\u0443\u043F\u043E\u043D\u044B \u0438\u043B\u0438 \u0441\u0432\u044F\u0437\u043A\u0443 \u0441 Telegram-\u0431\u043E\u0442\u043E\u043C."]
      ]
    },
    malls: {
      slug: "/mall-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445","Savdo markazlaridagi reklama"),
      hero: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0422\u0426 \u0440\u044F\u0434\u043E\u043C \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u043E\u043C \u043F\u043E\u043A\u0443\u043F\u043A\u0438",
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445: \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044E, \u043F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u044B, \u044D\u043A\u0440\u0430\u043D\u044B \u0438 \u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0440\u044F\u0434\u043E\u043C \u0441 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u043C \u0442\u0440\u0430\u0444\u0438\u043A\u043E\u043C.",
      marquee: ["\u0422\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u0442\u0440\u044B", "\u041F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u044B", "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F", "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0438", munaText("\u0420\u0438\u0442\u0435\u0439\u043B","Chakana savdo")],
      needs: ["\u041F\u043E\u0432\u043B\u0438\u044F\u0442\u044C \u043D\u0430 \u0432\u044B\u0431\u043E\u0440 \u0440\u044F\u0434\u043E\u043C \u0441 \u043F\u043E\u043A\u0443\u043F\u043A\u043E\u0439.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0437\u0430\u043F\u0443\u0441\u043A \u0432 \u0440\u0438\u0442\u0435\u0439\u043B\u0435 \u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0445 \u0442\u043E\u0447\u043A\u0430\u0445.", "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0441\u0435\u043C\u0435\u0439\u043D\u043E\u0439 \u0438 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439."],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0422\u0426 \u043F\u043E\u0434 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u0431\u0440\u0435\u043D\u0434\u0430 \u0438 \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u043F\u0440\u043E\u0434\u0430\u0436.", "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0441 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430\u043C\u0438 \u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439.", "\u041C\u043E\u0436\u0435\u043C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0441 \u043F\u0440\u043E\u043C\u043E-\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u043E\u043C \u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u044F\u043C\u0438."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u0440\u0438\u0442\u0435\u0439\u043B-\u0442\u043E\u0447\u043A\u0438 \u0438 \u043E\u0444\u043B\u0430\u0439\u043D-\u043F\u0440\u043E\u043C\u043E \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0442\u044C \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0430\u043A\u0446\u0438\u0438 \u0438 \u0434\u043E\u0432\u043E\u0434\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438.",
      testimonial: "Muna Media \u0445\u043E\u0440\u043E\u0448\u043E \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u0442 \u0440\u0438\u0442\u0435\u0439\u043B, \u043F\u0440\u043E\u043C\u043E \u0438 digital, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F \u043D\u0435 \u0440\u0430\u0441\u043F\u0430\u0434\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u0441\u043A\u0438.",
      author: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C BTL-\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
      qa: [
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u043C\u043E-\u0441\u0442\u043E\u0439\u043A\u0443?", "\u0414\u0430, \u0435\u0441\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0422\u0426 \u0438 \u0437\u043E\u043D\u0430 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u044E\u0442 \u0442\u0430\u043A\u043E\u0439 \u0444\u043E\u0440\u043C\u0430\u0442. \u041C\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C."],
        ["\u041A\u0430\u043A\u0438\u0435 \u0422\u0426 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C?", "\u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0437\u0430\u0434\u0430\u0447\u0438, \u0441\u0440\u043E\u043A\u043E\u0432 \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0438 \u043F\u043B\u043E\u0449\u0430\u0434\u0435\u0439. \u041C\u044B \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0435\u0442\u043A\u0443 \u043F\u043E\u0434 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E."],
        ["\u041D\u0443\u0436\u0435\u043D \u043B\u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u0438\u0437\u0430\u0439\u043D?", "\u0427\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u0434\u0430: \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438 \u0442\u0440\u0435\u0431\u0443\u044E\u0442 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u043C\u0430\u043A\u0435\u0442\u0430 \u043F\u043E\u0434 \u0444\u043E\u0440\u043C\u0430\u0442 \u0438 \u0434\u0438\u0441\u0442\u0430\u043D\u0446\u0438\u044E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430."]
      ]
    },
    buses: {
      slug: "/bus-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445","Avtobuslardagi reklama"),
      hero: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0430\u0445 \u0434\u043B\u044F \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430",
      intro: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u0443\u0435\u043C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0438 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0431\u0440\u0435\u043D\u0434 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u043F\u043E\u044F\u0432\u043B\u044F\u043B\u0441\u044F \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 \u043F\u043E\u0442\u043E\u043A\u0430\u0445 \u0438 \u0440\u0430\u0439\u043E\u043D\u0430\u0445 \u043F\u0440\u043E\u0434\u0430\u0436.",
      marquee: ["\u0410\u0432\u0442\u043E\u0431\u0443\u0441\u044B", munaText("\u041C\u0430\u0440\u0448\u0440\u0443\u0442\u044B","Yo'nalishlar"), "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u0413\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u043E\u0445\u0432\u0430\u0442", munaText("\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442","Foto hisobot")],
      needs: ["\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u0432 \u0440\u0430\u0437\u043D\u044B\u0445 \u0440\u0430\u0439\u043E\u043D\u0430\u0445 \u0433\u043E\u0440\u043E\u0434\u0430.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0430\u0441\u0441\u043E\u0432\u0443\u044E \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u0438\u043B\u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430.", "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u0447\u0430\u0441\u0442\u044C\u044E \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0433\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043F\u043E\u0434 \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0438 \u043C\u043E\u043D\u0442\u0430\u0436.", "\u0414\u0430\u0435\u043C \u043F\u043E\u043D\u044F\u0442\u043D\u0443\u044E \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0443 \u0438 \u0441\u0440\u043E\u043A\u0430\u043C."],
      caseName: "KoronaPay",
      caseUrl: "/koronapay",
      caseText: "\u0414\u043B\u044F \u0444\u0438\u043D\u0442\u0435\u0445-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0430\u044F \u0441\u0440\u0435\u0434\u0430 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0448\u0438\u0440\u043E\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439.",
      testimonial: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0434\u0430\u043B\u0430 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0435 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430 \u0438 \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435.",
      author: "\u0411\u0440\u0435\u043D\u0434-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
      qa: [
        ["\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B?", "\u0414\u0430, \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C, \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A\u0443 \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u043D\u0443\u0436\u043D\u044B\u043C \u0442\u043E\u0447\u043A\u0430\u043C."],
        ["\u0412\u044B \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0435\u0441\u044C \u043F\u0435\u0447\u0430\u0442\u044C\u044E \u0438 \u043C\u043E\u043D\u0442\u0430\u0436\u043E\u043C?", "\u0414\u0430, \u043C\u043E\u0436\u0435\u043C \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E, \u043C\u043E\u043D\u0442\u0430\u0436, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0438 \u0434\u0435\u043C\u043E\u043D\u0442\u0430\u0436."],
        ["\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u0438\u0442\u0441\u044F \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435?", "\u0427\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u043E\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u043D\u0435\u0434\u0435\u043B\u044C \u0434\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u043C\u0435\u0441\u044F\u0446\u0435\u0432."]
      ]
    },
    busStops: {
      slug: "/bus-stop-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u043D\u0430 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043D\u044B\u0445 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445","Avtobus bekatlaridagi reklama"),
      hero: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043A\u0430\u043A \u0442\u043E\u0447\u043A\u0430 \u0447\u0430\u0441\u0442\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439",
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u0447\u043D\u044B\u0445 \u043F\u0430\u0432\u0438\u043B\u044C\u043E\u043D\u0430\u0445 \u0438 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 \u0441\u0438\u0442\u0438-\u0444\u043E\u0440\u043C\u0430\u0442\u0430\u0445, \u0433\u0434\u0435 \u043B\u044E\u0434\u0438 \u043F\u0440\u043E\u0432\u043E\u0434\u044F\u0442 \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u0438 \u0445\u043E\u0440\u043E\u0448\u043E \u0441\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435.",
      marquee: [munaText("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438","Bekatlar"), "\u041F\u0430\u0432\u0438\u043B\u044C\u043E\u043D\u044B", "\u041F\u0435\u0448\u0435\u0445\u043E\u0434\u044B", "\u0421\u0438\u0442\u0438-\u0444\u043E\u0440\u043C\u0430\u0442\u044B", "\u0427\u0430\u0441\u0442\u043E\u0442\u0430"],
      needs: ["\u0423\u0441\u0438\u043B\u0438\u0442\u044C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0432 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445 \u0440\u0430\u0439\u043E\u043D\u0430\u0445.", "\u0414\u043E\u043D\u0435\u0441\u0442\u0438 \u043F\u0440\u043E\u0441\u0442\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043E \u0448\u0438\u0440\u043E\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u0440\u044F\u0434\u043E\u043C \u0441 \u043C\u0435\u0442\u0440\u043E, \u0422\u0426 \u0438\u043B\u0438 \u0440\u0438\u0442\u0435\u0439\u043B\u043E\u043C."],
      why: ["\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u043E \u043F\u043E\u0442\u043E\u043A\u0443 \u0438 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044E.", "\u0410\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u043C\u0430\u043A\u0435\u0442\u044B \u043F\u043E\u0434 \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442.", "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u043C\u0435\u0441\u0442\u0430\u0445."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0430\u0445 UnionPay \u043E\u0444\u043B\u0430\u0439\u043D-\u0442\u043E\u0447\u043A\u0438 \u0441 \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u043F\u043E\u0442\u043E\u043A\u043E\u043C \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0442\u044C \u0430\u043A\u0446\u0438\u044E \u0438 \u0432\u0435\u0441\u0442\u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u0432 \u0446\u0438\u0444\u0440\u043E\u0432\u0443\u044E \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443.",
      testimonial: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0445\u043E\u0440\u043E\u0448\u043E \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u043A\u0430\u043A \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u0438 \u0437\u0430\u043C\u0435\u0442\u043D\u044B\u0439 \u0441\u043B\u043E\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0432 \u0433\u043E\u0440\u043E\u0434\u0435.",
      author: "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u043E\u0444\u043B\u0430\u0439\u043D-\u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F\u043C",
      qa: [
        ["\u0413\u0434\u0435 \u043B\u0443\u0447\u0448\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0442\u044C\u0441\u044F?", "\u0417\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438: \u0440\u044F\u0434\u043E\u043C \u0441 \u0422\u0426, \u043C\u0435\u0442\u0440\u043E, \u043E\u0444\u0438\u0441\u043D\u044B\u043C\u0438 \u0437\u043E\u043D\u0430\u043C\u0438, \u0432\u0443\u0437\u0430\u043C\u0438 \u0438\u043B\u0438 \u0436\u0438\u043B\u044B\u043C\u0438 \u0440\u0430\u0439\u043E\u043D\u0430\u043C\u0438."],
        ["\u041C\u043E\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441\u043D\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443?", "\u0414\u0430, \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0447\u0435\u043A \u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u043C \u043B\u043E\u0433\u0438\u043A\u0443 \u0432\u044B\u0431\u043E\u0440\u0430 \u043A\u0430\u0436\u0434\u043E\u0439 \u043B\u043E\u043A\u0430\u0446\u0438\u0438."],
        ["\u041D\u0443\u0436\u0435\u043D \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u0442\u0435\u043A\u0441\u0442?", "\u0414\u0430, \u0434\u043B\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A \u043B\u0443\u0447\u0448\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u044F\u0441\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u043A\u0440\u0443\u043F\u043D\u044B\u0439 \u0432\u0438\u0437\u0443\u0430\u043B \u0438 \u043E\u0434\u0438\u043D \u043F\u0440\u0438\u0437\u044B\u0432 \u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044E."]
      ]
    },
    metro: {
      slug: "/metro-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E","Metrodagi reklama"),
      hero: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u043C\u0435\u0442\u0440\u043E \u0434\u043B\u044F \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430",
      intro: "\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445, \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430\u0445 \u0438 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0445 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u0445 \u043C\u0435\u0442\u0440\u043E, \u0433\u0434\u0435 \u0431\u0440\u0435\u043D\u0434 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439.",
      marquee: [munaText("\u041C\u0435\u0442\u0440\u043E","Metro"), munaText("\u0421\u0442\u0430\u043D\u0446\u0438\u0438","Bekatlar"), "\u041F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A", "\u041F\u0435\u0440\u0435\u0445\u043E\u0434\u044B", "\u041E\u0445\u0432\u0430\u0442"],
      needs: ["\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0447\u0430\u0441\u0442\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0440\u043E\u0437\u043D\u0438\u0447\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438 \u0440\u044F\u0434\u043E\u043C \u0441\u043E \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u043C\u0438.", "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u0432\u0438\u0434\u0438\u043C\u044B\u043C \u0432 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0439 \u0441\u0440\u0435\u0434\u0435."],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0442\u0430\u043D\u0446\u0438\u0438 \u043F\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u0410\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E\u0434 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442.", "\u0421\u043E\u0435\u0434\u0438\u043D\u044F\u0435\u043C \u043C\u0435\u0442\u0440\u043E \u0441 \u043F\u0440\u043E\u043C\u043E, Telegram \u0438 digital-\u0432\u043E\u0440\u043E\u043D\u043A\u043E\u0439."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u043F\u0440\u043E\u043C\u043E \u0443 \u043C\u0435\u0442\u0440\u043E \u0438 \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0445 \u043F\u043E\u0442\u043E\u043A\u043E\u0432 \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u043E \u043F\u0440\u0438\u0432\u043B\u0435\u043A\u0430\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0432 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0430\u043A\u0446\u0438\u0438.",
      testimonial: "\u041C\u0435\u0442\u0440\u043E \u0441\u0442\u0430\u043B\u043E \u0445\u043E\u0440\u043E\u0448\u0438\u043C \u043A\u0430\u043D\u0430\u043B\u043E\u043C \u0434\u043B\u044F \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E \u043E\u0444\u0444\u0435\u0440\u0430 \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.",
      author: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u043E\u0440 \u043F\u0440\u043E\u043C\u043E-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438",
      qa: [
        ["\u041A\u0430\u043A\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0435\u0441\u0442\u044C \u0432 \u043C\u0435\u0442\u0440\u043E?", "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0441\u0442\u0430\u043D\u0446\u0438\u0438: \u043F\u0430\u043D\u0435\u043B\u0438, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438, \u043F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u044B \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B."],
        ["\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0441\u0442\u0430\u043D\u0446\u0438\u0438?", "\u0414\u0430, \u0441\u0442\u0430\u043D\u0446\u0438\u0438 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043F\u043E\u0442\u043E\u043A\u0443, \u0440\u0430\u0439\u043E\u043D\u0443 \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u043D\u0443\u0436\u043D\u044B\u043C \u0442\u043E\u0447\u043A\u0430\u043C."],
        ["\u041C\u0435\u0442\u0440\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u043F\u0440\u0435\u043C\u0438\u0443\u043C-\u0431\u0440\u0435\u043D\u0434\u043E\u0432?", "\u0414\u0430, \u0435\u0441\u043B\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0430\u043D\u0446\u0438\u0438, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0438 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F."]
      ]
    },
    airport: {
      slug: "/airport-ads",
      group: munaText("\u041D\u0430\u0440\u0443\u0436\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Tashqi reklama"),
      title: munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443","Aeroportdagi reklama"),
      hero: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443 \u0434\u043B\u044F \u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0431\u0440\u0435\u043D\u0434\u044B \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u043E\u0432\u043E\u0439 \u0441\u0440\u0435\u0434\u0435: \u043E\u0442 \u0438\u043C\u0438\u0434\u0436\u0435\u0432\u044B\u0445 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043E \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0438 digital-\u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 \u0434\u043B\u044F \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u0438 \u0442\u0443\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.",
      marquee: [munaText("\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442","Aeroport"), "\u041F\u0440\u0435\u043C\u0438\u0443\u043C-\u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F", "\u0418\u043C\u0438\u0434\u0436", "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0438", "B2B"],
      needs: ["\u0423\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0443\u0441 \u0431\u0440\u0435\u043D\u0434\u0430 \u0438 \u0434\u043E\u0432\u0435\u0440\u0438\u0435.", "\u0414\u043E\u0441\u0442\u0443\u0447\u0430\u0442\u044C\u0441\u044F \u0434\u043E \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u0438 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435."],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0437\u043E\u043D\u044B \u043F\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0443 \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430.", "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0435\u0439 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u0430.", "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u0432\u043E\u043A\u0440\u0443\u0433 \u0438\u043C\u0438\u0434\u0436\u0430, \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u0437\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u043C\u043E\u0441\u0442\u0438."],
      caseName: "KoronaPay",
      caseUrl: "/koronapay",
      caseText: "\u0414\u043B\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445 \u0438 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u043E\u0432\u0430\u044F \u0441\u0440\u0435\u0434\u0430 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E \u043F\u043E\u043B\u0435\u0437\u043D\u0430: \u043E\u043D\u0430 \u0443\u0441\u0438\u043B\u0438\u0432\u0430\u0435\u0442 \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0438 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0435 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430.",
      testimonial: "\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u043F\u043E\u043C\u043E\u0433 \u0431\u0440\u0435\u043D\u0434\u0443 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043D\u043E \u0438 \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u043E \u0434\u043B\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0447\u0430\u0441\u0442\u043E \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0431\u044B\u0441\u0442\u0440\u043E.",
      author: "\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440 \u043F\u043E \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0443 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
      qa: [
        ["\u041A\u0430\u043A\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0432\u0438\u0434\u0438\u0442 \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443?", "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0438, \u0434\u0435\u043B\u043E\u0432\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F, \u0442\u0443\u0440\u0438\u0441\u0442\u044B, \u044D\u043A\u0441\u043F\u0430\u0442\u044B \u0438 \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u044E\u0449\u0438\u0435."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043C\u0438\u0434\u0436\u0435\u0432\u0443\u044E \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E?", "\u0414\u0430, \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u0445\u043E\u0440\u043E\u0448\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0438\u043C\u0438\u0434\u0436\u0435\u0432\u043E\u0433\u043E \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F \u0438 \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u043A \u0431\u0440\u0435\u043D\u0434\u0443."],
        ["\u041A\u0430\u043A\u0438\u0435 \u0441\u0440\u043E\u043A\u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F?", "\u041E\u0431\u044B\u0447\u043D\u043E \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438, \u0447\u0435\u043C \u0434\u043B\u044F \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u0445 \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432."]
      ]
    },
    seo: {
      slug: "/seo-optimization",
      group: munaText("\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A","Internet va qidiruv"),
      title: munaText("SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F","SEO"),
      hero: "SEO-\u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u043F\u0440\u043E\u0441\u0430",
      intro: "\u0420\u0430\u0437\u0432\u0438\u0432\u0430\u0435\u043C \u0441\u0430\u0439\u0442 \u043A\u0430\u043A \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u0437\u0430\u044F\u0432\u043E\u043A: \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u043C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0443\u0434\u0438\u0442, \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0443, \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u043C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0438 \u0441\u043E\u0437\u0434\u0430\u0435\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043F\u043E\u0434 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0441\u043F\u0440\u043E\u0441.",
      marquee: ["SEO", munaText("\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430","Qidiruv so'zlari"), "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0443\u0434\u0438\u0442", munaText("\u041A\u043E\u043D\u0442\u0435\u043D\u0442","Kontent"), "\u041E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u043F\u0440\u043E\u0441"],
      needs: ["\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438 \u0431\u0435\u0437 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0433\u043E \u0440\u043E\u0441\u0442\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0433\u043E \u0431\u044E\u0434\u0436\u0435\u0442\u0430.", "\u0417\u0430\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0441\u043F\u0440\u043E\u0441 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C \u0440\u044B\u043D\u043A\u0435.", "\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0441\u0430\u0439\u0442 \u043F\u0435\u0440\u0435\u0434 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u044B."],
      why: ["\u0421\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C SEO \u0441 \u0431\u0438\u0437\u043D\u0435\u0441-\u0446\u0435\u043B\u044F\u043C\u0438, \u0430 \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0437\u0438\u0446\u0438\u044F\u043C\u0438.", "\u0423\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u043C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u043E\u0439."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 digital-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0430\u0445 UnionPay \u0441\u0430\u0439\u0442 \u0431\u044B\u043B \u0447\u0430\u0441\u0442\u044C\u044E \u043F\u0443\u0442\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B \u043F\u0440\u0430\u0432\u0438\u043B\u0430, \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u043B \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043B \u043F\u0440\u043E\u043C\u043E.",
      testimonial: "Muna Media \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442 \u043A\u0430\u043A \u043D\u0430 \u0447\u0430\u0441\u0442\u044C \u0432\u043E\u0440\u043E\u043D\u043A\u0438, \u0430 \u043D\u0435 \u043A\u0430\u043A \u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0443\u044E \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0437\u0430\u0434\u0430\u0447\u0443.",
      author: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C digital-\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
      qa: [
        ["\u041A\u043E\u0433\u0434\u0430 SEO \u0434\u0430\u0441\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442?", "\u041F\u0435\u0440\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0432\u0438\u0434\u043D\u044B \u0431\u044B\u0441\u0442\u0440\u043E, \u043D\u043E \u0443\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u044B\u0439 \u0440\u043E\u0441\u0442 \u043E\u0431\u044B\u0447\u043D\u043E \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0440\u0430\u0431\u043E\u0442\u044B."],
        ["\u0412\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u044B?", "\u0414\u0430, \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443, \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D \u0438 \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0434 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0441\u043F\u0440\u043E\u0441 \u0438 \u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0439 \u0442\u043E\u043D."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u043D\u0430\u0447\u0430\u0442\u044C \u0441 \u0430\u0443\u0434\u0438\u0442\u0430?", "\u0414\u0430, \u0430\u0443\u0434\u0438\u0442 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u043F\u043E\u043D\u044F\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043E\u0448\u0438\u0431\u043A\u0438, \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0441\u043F\u0440\u043E\u0441\u0430 \u0438 \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u044B \u0440\u0430\u0431\u043E\u0442."]
      ]
    },
    context: {
      slug: "/context-ads",
      group: munaText("\u041E\u043D\u043B\u0430\u0439\u043D \u0438 \u043F\u043E\u0438\u0441\u043A","Internet va qidiruv"),
      title: munaText("\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430","Kontekst reklama"),
      hero: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0441 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0437\u0430\u044F\u0432\u043E\u043A \u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u0430",
      intro: "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043C \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0438 \u043C\u0435\u0434\u0438\u0439\u043D\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438, \u0441\u0442\u0440\u043E\u0438\u043C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432, \u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u043C \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043F\u043E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F.",
      marquee: ["\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442", "\u041F\u043E\u0438\u0441\u043A", "\u0417\u0430\u044F\u0432\u043A\u0438", "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430", munaText("\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F","Yaxshilash")],
      needs: ["\u0411\u044B\u0441\u0442\u0440\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0442\u043E\u043A \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439.", "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0441\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u0438\u043B\u0438 \u0443\u0441\u043B\u0443\u0433\u0443.", "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430."],
      why: ["\u0421\u0442\u0440\u043E\u0438\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0432\u043E\u043A\u0440\u0443\u0433 \u0446\u0435\u043B\u0435\u0439 \u0431\u0438\u0437\u043D\u0435\u0441\u0430.", "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043C \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u0434\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0431\u044E\u0434\u0436\u0435\u0442\u0430.", "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u0447\u0438\u0441\u0442\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0438 \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u043C \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u0432\u0435\u0441\u0442\u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u043A \u0441\u0430\u0439\u0442\u0443, Telegram-\u0431\u043E\u0442\u0443 \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0435 \u0443\u0447\u0430\u0441\u0442\u0438\u044F.",
      testimonial: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F, \u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B\u0430, \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0441 \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u043C \u0438 \u0437\u0430\u044F\u0432\u043A\u0430\u043C\u0438.",
      author: "Performance lead",
      qa: [
        ["\u0421 \u043A\u0430\u043A\u0438\u043C \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u043C \u043C\u043E\u0436\u043D\u043E \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u0430\u0442\u044C?", "\u0417\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0438 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0446\u0438\u0438. \u041C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0439 \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u043C."],
        ["\u0412\u044B \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0435 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443?", "\u0414\u0430, \u0431\u0435\u0437 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F: \u0432\u0430\u0436\u043D\u043E \u0432\u0438\u0434\u0435\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438, \u043A\u043B\u0438\u043A\u0438 \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0430."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0431\u044B\u0441\u0442\u0440\u043E \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043D\u0435\u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F?", "\u0414\u0430, \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u043F\u043E \u0434\u0430\u043D\u043D\u044B\u043C, \u0430 \u0441\u043B\u0430\u0431\u044B\u0435 \u0441\u0432\u044F\u0437\u043A\u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0430\u044E\u0442\u0441\u044F."]
      ]
    },
    smm: {
      slug: "/smm",
      group: munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B","Ijtimoiy tarmoqlar va blogerlar"),
      title: "SMM",
      hero: "SMM \u0434\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0439 \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438 \u0431\u0440\u0435\u043D\u0434\u0430",
      intro: "\u0412\u0435\u0434\u0435\u043C \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438 \u0431\u0440\u0435\u043D\u0434\u0430: \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0440\u0443\u0431\u0440\u0438\u043A\u0430\u0442\u043E\u0440, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430, \u0442\u0435\u043A\u0441\u0442\u044B, \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438, \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F \u0438 \u0441\u0432\u044F\u0437\u044C \u0441 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u043C\u0438 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F\u043C\u0438.",
      marquee: ["SMM", munaText("\u041A\u043E\u043D\u0442\u0435\u043D\u0442","Kontent"), munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438","Ijtimoiy tarmoqlar"), "\u041A\u043E\u043C\u044C\u044E\u043D\u0438\u0442\u0438", "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430"],
      needs: ["\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u0436\u0438\u0432\u044B\u043C \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u043C \u0434\u043B\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u0445 \u0438 \u0430\u043A\u0446\u0438\u044F\u0445.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u043E\u0442\u0432\u0435\u0442\u044B."],
      why: ["\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043E\u043C \u0438 \u044F\u0437\u044B\u043A\u043E\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u0421\u043E\u0435\u0434\u0438\u043D\u044F\u0435\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u0443.", "\u0414\u0435\u0440\u0436\u0438\u043C \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442 \u0431\u0440\u0435\u043D\u0434\u0430."],
      caseName: "Xiaomi",
      caseUrl: "/xiaomi",
      caseText: "\u0414\u043B\u044F Xiaomi \u043A\u043E\u043C\u0430\u043D\u0434\u0430 Muna Media \u0432\u0435\u043B\u0430 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0438, \u0433\u043E\u0442\u043E\u0432\u0438\u043B\u0430 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u043B\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0438.",
      testimonial: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0441\u0442\u0430\u043B\u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u043C \u043A\u0430\u043D\u0430\u043B\u043E\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043B\u0435\u043D\u0442\u043E\u0439 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439.",
      author: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C consumer electronics \u0431\u0440\u0435\u043D\u0434\u0430",
      qa: [
        ["\u041A\u0430\u043A\u0438\u0435 \u0441\u043E\u0446\u0441\u0435\u0442\u0438 \u0432\u044B \u0432\u0435\u0434\u0435\u0442\u0435?", "Instagram, Telegram, Facebook \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438 \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0431\u0440\u0435\u043D\u0434\u0430."],
        ["\u0412\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0441\u044A\u0435\u043C\u043A\u0438?", "\u0414\u0430, \u043C\u043E\u0436\u0435\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u0443\u044E \u0438 lifestyle-\u0441\u044A\u0435\u043C\u043A\u0443, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0435 \u0432\u0438\u0434\u0435\u043E."],
        ["\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0432\u0435\u0441\u0442\u0438 \u0442\u043E\u043B\u044C\u043A\u043E Telegram?", "\u0414\u0430, \u0435\u0441\u043B\u0438 Telegram \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u043C \u043A\u0430\u043D\u0430\u043B\u043E\u043C \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."]
      ]
    },
    influence: {
      slug: "/influencer-marketing",
      group: munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B","Ijtimoiy tarmoqlar va blogerlar"),
      title: munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Blogerlar bilan reklama"),
      hero: "\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0441 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438",
      intro: "\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443 \u0431\u0440\u0435\u043D\u0434\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E, \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u043C \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043E\u0445\u0432\u0430\u0442\u0443 \u0438 \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044E.",
      marquee: ["\u0411\u043B\u043E\u0433\u0435\u0440\u044B", "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438", munaText("\u0410\u0443\u0434\u0438\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438","Auditoriyani tekshirish"), "\u041E\u0445\u0432\u0430\u0442", "\u0414\u043E\u0432\u0435\u0440\u0438\u0435"],
      needs: ["\u0411\u044B\u0441\u0442\u0440\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0432\u0435\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0447\u0435\u0440\u0435\u0437 \u043C\u043D\u0435\u043D\u0438\u044F \u043B\u0438\u0434\u0435\u0440\u043E\u0432.", "\u0423\u0441\u0438\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u043C\u043E-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u0436\u0438\u0432\u044B\u043C\u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F\u043C\u0438."],
      why: ["\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043A\u0443\u043F\u043A\u043E\u0439.", "\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0444\u043E\u0440\u043C\u0430\u0442 \u043F\u043E\u0434 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u0438 \u0442\u043E\u043D \u0431\u0440\u0435\u043D\u0434\u0430.", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438, \u043E\u0442\u043C\u0435\u0442\u043A\u0438, \u043E\u0445\u0432\u0430\u0442\u044B \u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u044B."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u0431\u043B\u043E\u0433\u0435\u0440\u044B \u0434\u0430\u0432\u0430\u043B\u0438 \u043E\u0445\u0432\u0430\u0442, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B\u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0430\u043A\u0446\u0438\u0438 \u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0438 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043A \u0443\u0447\u0430\u0441\u0442\u0438\u044E.",
      testimonial: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u0431\u044B\u043B \u0442\u043E\u0447\u043D\u044B\u043C: \u043C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0445\u0432\u0430\u0442, \u043D\u043E \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0435 \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435.",
      author: "\u041C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433-\u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u043E\u0440 \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0446\u0438\u0438",
      qa: [
        ["\u041A\u0430\u043A \u0432\u044B \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432?", "\u0421\u043C\u043E\u0442\u0440\u0438\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E, \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0443, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E, \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435, \u043F\u0440\u043E\u0448\u043B\u044B\u0435 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0438 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0431\u0440\u0435\u043D\u0434\u0443."],
        ["\u041C\u043E\u0436\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0441 \u043C\u0438\u043A\u0440\u043E\u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u0430\u043C\u0438?", "\u0414\u0430, \u0447\u0430\u0441\u0442\u043E \u043C\u0438\u043A\u0440\u043E\u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B \u0434\u0430\u044E\u0442 \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0438 \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0432 \u043D\u0438\u0448\u0435\u0432\u044B\u0445 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F\u0445."],
        ["\u0412\u044B \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u0442\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438?", "\u0414\u0430, \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u043C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438, \u0441\u0440\u043E\u043A\u0438, \u043E\u0442\u043C\u0435\u0442\u043A\u0438 \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."]
      ]
    },
    telegram: {
      slug: "/telegram-marketing",
      group: munaText("\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B","Ijtimoiy tarmoqlar va blogerlar"),
      title: munaText("Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433","Telegram marketing"),
      hero: "Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0434\u043B\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0445\u0432\u0430\u0442\u0430",
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u043F\u043E\u0441\u0435\u0432\u044B, \u0437\u0430\u043A\u0443\u043F\u043A\u0438 \u0438 \u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0432 Telegram-\u043A\u0430\u043D\u0430\u043B\u0430\u0445: \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u044B, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u043C \u043E\u0445\u0432\u0430\u0442.",
      marquee: ["Telegram", "\u041A\u0430\u043D\u0430\u043B\u044B", "\u041F\u043E\u0441\u0435\u0432\u044B", "\u0421\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u044B", "\u041E\u0445\u0432\u0430\u0442"],
      needs: ["\u0411\u044B\u0441\u0442\u0440\u043E \u0434\u043E\u043D\u0435\u0441\u0442\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0434\u043E \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u0440\u043E\u043C\u043E \u0438\u043B\u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430.", "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043E\u0445\u0432\u0430\u0442 \u0432 \u043A\u0430\u043D\u0430\u043B\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0443\u0436\u0435 \u0434\u043E\u0432\u0435\u0440\u044F\u0435\u0442."],
      why: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043A\u0430\u043D\u0430\u043B\u044B \u0432\u0440\u0443\u0447\u043D\u0443\u044E, \u0430 \u043D\u0435 \u043F\u043E \u0433\u043E\u043B\u044B\u043C \u0446\u0438\u0444\u0440\u0430\u043C.", "\u041F\u0438\u0448\u0435\u043C \u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0434 \u0444\u043E\u0440\u043C\u0430\u0442 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438.", "\u0421\u0432\u0435\u0440\u044F\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."],
      caseName: "UnionPay",
      caseUrl: "/unionpay",
      caseText: "\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay Telegram \u0434\u0430\u043B 38 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439 \u0438 \u0431\u043E\u043B\u0435\u0435 1.15 \u043C\u043B\u043D \u043E\u0445\u0432\u0430\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439.",
      testimonial: "Telegram \u0441\u0442\u0430\u043B \u043E\u0434\u043D\u0438\u043C \u0438\u0437 \u0441\u0430\u043C\u044B\u0445 \u0441\u0438\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u043F\u043E \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u043E\u0445\u0432\u0430\u0442\u0443.",
      author: "\u041E\u043D\u043B\u0430\u0439\u043D-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0444\u0438\u043D\u0442\u0435\u0445-\u043F\u0440\u043E\u0435\u043A\u0442\u0430",
      qa: [
        ["\u041A\u0430\u043A \u043F\u043E\u043D\u044F\u0442\u044C, \u043A\u0430\u043A\u0438\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435?", "\u041C\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u043C \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0443, \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u0443 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432, \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0438 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438."],
        ["\u0412\u044B \u0433\u043E\u0442\u043E\u0432\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u044B \u0434\u043B\u044F \u043F\u043E\u0441\u0435\u0432\u043E\u0432?", "\u0414\u0430, \u043F\u0438\u0448\u0435\u043C \u0438 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0434 \u0444\u043E\u0440\u043C\u0430\u0442 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043A\u0430\u043D\u0430\u043B\u0430."],
        ["\u041C\u043E\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C Telegram-\u0431\u043E\u0442\u0430?", "\u0414\u0430, \u043C\u043E\u0436\u0435\u043C \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0441 \u0431\u043E\u0442\u043E\u043C, \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439, \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u043E\u0439 \u0438\u043B\u0438 \u0441\u0431\u043E\u0440\u043E\u043C \u0437\u0430\u044F\u0432\u043E\u043A."]
      ]
    },
    events: {
      slug: "/event-management",
      group: munaText("\u0421\u043E\u0431\u044B\u0442\u0438\u044F","Tadbirlar"),
      title: munaText("\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442","Tadbirlarni boshqarish"),
      hero: "\u0418\u0432\u0435\u043D\u0442-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u043E\u0432 \u0438 \u043F\u0440\u043E\u043C\u043E",
      intro: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u043C \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F, \u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432: \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438, \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439, \u043F\u0440\u043E\u0434\u0430\u043A\u0448\u043D \u0438 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F.",
      marquee: ["\u0418\u0432\u0435\u043D\u0442\u044B", "\u0417\u0430\u043F\u0443\u0441\u043A\u0438", "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438", munaText("\u041F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438","Pudratchilar"), "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F"],
      needs: ["\u041F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0441 \u0441\u0438\u043B\u044C\u043D\u044B\u043C \u043F\u0435\u0440\u0432\u044B\u043C \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u0435\u043C.", "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432, \u043C\u0435\u0434\u0438\u0430, \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0432 \u043E\u0434\u043D\u043E\u043C \u0441\u043E\u0431\u044B\u0442\u0438\u0438.", "\u041F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0431\u0440\u0435\u043D\u0434 \u0438\u0437 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0432 \u0436\u0438\u0432\u043E\u0439 \u043E\u043F\u044B\u0442."],
      why: ["\u0414\u0435\u0440\u0436\u0438\u043C \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u043A\u0430\u043A \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E.", "\u0411\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432, \u0442\u0430\u0439\u043C\u0438\u043D\u0433 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438.", "\u0421\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u0438\u0432\u0435\u043D\u0442 \u0441 PR, \u0441\u043E\u0446\u0441\u0435\u0442\u044F\u043C\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u0430\u043C\u0438."],
      caseName: "Xiaomi",
      caseUrl: "/xiaomi",
      caseText: "\u0414\u043B\u044F Xiaomi \u043A\u043E\u043C\u0430\u043D\u0434\u0430 Muna Media \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043B\u0430 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E \u043B\u0438\u043D\u0435\u0439\u043A\u0438 Xiaomi 13T \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u0437\u0430\u043F\u0443\u0441\u043A \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C.",
      testimonial: "\u0418\u0432\u0435\u043D\u0442 \u043F\u0440\u043E\u0448\u0435\u043B \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438: \u0433\u043E\u0441\u0442\u0438, \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u0438\u043D\u0444\u043E\u043F\u043E\u0432\u043E\u0434\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0432 \u043E\u0434\u043D\u0443 \u0441\u0442\u043E\u0440\u043E\u043D\u0443.",
      author: "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0443 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430",
      qa: [
        ["\u0412\u044B \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u0442\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447?", "\u0414\u0430, \u043C\u043E\u0436\u0435\u043C \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044E, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0443, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432, \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439, \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044E \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C."],
        ["\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u0438 \u0421\u041C\u0418?", "\u0414\u0430, \u0438\u0432\u0435\u043D\u0442 \u043C\u043E\u0436\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u0441 PR, \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u0430\u043C\u0438 \u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0432 \u0441\u043E\u0446\u0441\u0435\u0442\u044F\u0445."],
        ["\u041A\u0430\u043A\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435?", "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432, \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438, \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0435 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F, \u043F\u0440\u0435\u0441\u0441-\u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0438 \u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u0438."]
      ]
    }
  };
  const SHARED_SERVICE_FAQ = [
    ["\u0412\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u043A\u0440\u0443\u043F\u043D\u044B\u043C \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C?", "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u0431\u0440\u0435\u043D\u0434\u0430\u043C\u0438 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430. \u0421\u043E\u0441\u0442\u0430\u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0437\u0430\u0434\u0430\u0447\u0438, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0438 \u0431\u044E\u0434\u0436\u0435\u0442\u0430."],
    ["\u0412\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435?", "\u041D\u0435\u0442. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043F\u043E \u0432\u0441\u0435\u043C\u0443 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0443: \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0421\u0430\u043C\u0430\u0440\u043A\u0430\u043D\u0434, \u0411\u0443\u0445\u0430\u0440\u0430, \u041D\u0430\u043C\u0430\u043D\u0433\u0430\u043D, \u0410\u043D\u0434\u0438\u0436\u0430\u043D \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0433\u043E\u0440\u043E\u0434\u0430."],
    ["\u041A\u0430\u043A \u0431\u044B\u0441\u0442\u0440\u043E \u043C\u043E\u0436\u043D\u043E \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u0430\u0442\u044C?", "\u041E\u0431\u044B\u0447\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u043A \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 5-10 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439. \u0415\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438\u043B\u0438 \u0441\u043B\u043E\u0436\u043D\u044B\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F, \u0441\u0440\u043E\u043A \u043C\u043E\u0436\u0435\u0442 \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C\u0441\u044F \u0434\u043E 14 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439."],
    ["\u041A\u0430\u043A\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u0431\u0443\u0434\u0435\u0442?", "\u0414\u043B\u044F \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0439 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0434\u0430\u0435\u043C \u0444\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442\u044B, \u0434\u043B\u044F digital - \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0443, \u0437\u0430\u044F\u0432\u043A\u0430\u043C, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F\u043C \u0438 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430."]
  ];
  const SERVICE_COPY = {
    seo: {
      intro: "Muna Media \u0432\u044B\u0432\u043E\u0434\u0438\u0442 \u0431\u0440\u0435\u043D\u0434\u044B \u0432 \u0442\u043E\u043F \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u043E\u0439 \u0432\u044B\u0434\u0430\u0447\u0438 Google \u0438 Yandex \u043D\u0430 \u0443\u0437\u0431\u0435\u043A\u0441\u043A\u043E\u043C \u0440\u044B\u043D\u043A\u0435: \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0431\u0430\u0437\u0430, \u043C\u0443\u043B\u044C\u0442\u0438\u044F\u0437\u044B\u0447\u043D\u0430\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0442\u0440\u0430\u0444\u0438\u043A, \u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0441\u0430\u0439\u0442\u044B \u0442\u0435\u0440\u044F\u044E\u0442 \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u043F\u0440\u043E\u0441",
      problem: [
        "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0442\u0435\u0440\u044F\u044E\u0442 \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0442\u0440\u0430\u0444\u0438\u043A \u043D\u0435 \u043F\u043E\u0442\u043E\u043C\u0443, \u0447\u0442\u043E \u201CSEO \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u201D, \u0430 \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u0441\u0430\u0439\u0442 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043B\u043E\u043C\u0430\u043D, \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0441\u043F\u0440\u043E\u0441\u0443, \u0430 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u0441\u043E\u0431\u0440\u0430\u043D\u0430 \u0431\u0435\u0437 \u0443\u0447\u0435\u0442\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E, \u0443\u0437\u0431\u0435\u043A\u0441\u043A\u043E\u0433\u043E \u0438 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438.",
        "\u0420\u0435\u0430\u043B\u044C\u043D\u043E\u0435 SEO \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 - \u044D\u0442\u043E \u043D\u0435 \u0437\u0430\u043A\u0443\u043F\u043A\u0430 \u0441\u0441\u044B\u043B\u043E\u043A \u0438 \u0442\u0435\u043A\u0441\u0442\u044B \u0440\u0430\u0434\u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0441\u043B\u043E\u0432. \u042D\u0442\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u0441\u0430\u0439\u0442\u043E\u043C, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439 \u0434\u043E\u043C\u0435\u043D\u0430, \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0438 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0435\u0439."
      ],
      approachTitle: "SEO \u043A\u0430\u043A \u043A\u0430\u043D\u0430\u043B \u0437\u0430\u044F\u0432\u043E\u043A, \u0430 \u043D\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0440\u0430\u0434\u0438 \u043F\u043E\u0437\u0438\u0446\u0438\u0439",
      approach: ["\u041C\u044B \u0441\u0442\u0440\u043E\u0438\u043C SEO \u0432\u043E\u043A\u0440\u0443\u0433 \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0442\u0440\u0438\u043A: \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0442\u0440\u0430\u0444\u0438\u043A, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043B\u0438\u0434\u0430, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0438 \u0432\u043A\u043B\u0430\u0434 \u043A\u0430\u043D\u0430\u043B\u0430 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0438."],
      deliverables: [
        { title: "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 SEO-\u0430\u0443\u0434\u0438\u0442", desc: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C, \u0438\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044E, \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 URL, schema-\u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0443, \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0438 \u043E\u0448\u0438\u0431\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u0435\u0448\u0430\u044E\u0442 \u0440\u043E\u0441\u0442\u0443." },
        { title: "\u041C\u0443\u043B\u044C\u0442\u0438\u044F\u0437\u044B\u0447\u043D\u0430\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C, \u0443\u0437\u0431\u0435\u043A\u0441\u043A\u043E\u043C \u0438 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0430\u0445 \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430, \u0440\u0435\u0433\u0438\u043E\u043D\u043E\u0432 \u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u043F\u0440\u043E\u0441\u0430." },
        { title: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F", desc: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C SEO-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0438 \u0441\u0442\u0430\u0442\u044C\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u044E\u0442 \u043D\u0430 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0430\u0431\u0438\u0442\u044B \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u043C\u0438 \u0441\u043B\u043E\u0432\u0430\u043C\u0438." },
        { title: "\u0421\u0441\u044B\u043B\u043E\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", desc: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043C\u0435\u0434\u0438\u0430, \u043E\u0442\u0440\u0430\u0441\u043B\u0435\u0432\u044B\u043C\u0438 \u043F\u043E\u0440\u0442\u0430\u043B\u0430\u043C\u0438 \u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u043C\u0438 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F\u043C\u0438 \u0431\u0435\u0437 \u0441\u0435\u0440\u044B\u0445 \u0431\u0438\u0440\u0436 \u0438 \u0442\u043E\u043A\u0441\u0438\u0447\u043D\u044B\u0445 \u0441\u0441\u044B\u043B\u043E\u043A." }
      ],
      cases: [
        { brand: "E-commerce", task: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442, \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u043D\u0430 \u0442\u0440\u0435\u0445 \u044F\u0437\u044B\u043A\u0430\u0445 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D \u043D\u0430 6 \u043C\u0435\u0441\u044F\u0446\u0435\u0432.", result: "\u041E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0442\u0440\u0430\u0444\u0438\u043A \u0432\u044B\u0440\u043E\u0441 \u043D\u0430 210% \u0437\u0430 5 \u043C\u0435\u0441\u044F\u0446\u0435\u0432, \u0434\u043E\u043B\u044F \u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0430 \u0441\u043D\u0438\u0437\u0438\u043B\u0430\u0441\u044C \u0441 74% \u0434\u043E 41%." },
        { brand: "Fintech", task: "\u0417\u0430\u0434\u0430\u0447\u0430 - \u0432\u044B\u0439\u0442\u0438 \u0432 \u0442\u043E\u043F-3 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C \u043E\u043D\u043B\u0430\u0439\u043D-\u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439.", work: "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u043F\u043E\u0441\u0430\u0434\u043E\u0447\u043D\u044B\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044E\u044E \u043F\u0435\u0440\u0435\u043B\u0438\u043D\u043A\u043E\u0432\u043A\u0443 \u0438 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043B\u0438 40+ \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432.", result: "\u0422\u043E\u043F-3 \u043F\u043E 18 \u0432\u044B\u0441\u043E\u043A\u043E\u0447\u0430\u0441\u0442\u043E\u0442\u043D\u044B\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C \u0437\u0430 4 \u043C\u0435\u0441\u044F\u0446\u0430, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043B\u0438\u0434\u0430 \u0441\u043D\u0438\u0437\u0438\u043B\u0430\u0441\u044C \u043D\u0430 56%." }
      ],
      standards: ["\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043F\u043E\u0437\u0438\u0446\u0438\u044F\u043C, \u0442\u0440\u0430\u0444\u0438\u043A\u0443 \u0438 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F\u043C.", "\u0410\u0443\u0434\u0438\u0442 \u0434\u043E \u0441\u0442\u0430\u0440\u0442\u0430 \u0431\u0435\u0437 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439.", "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442: 24/7, 365 \u0434\u043D\u0435\u0439 \u0432 \u0433\u043E\u0434\u0443."],
      ctaTitle: "\u0425\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043D\u044F\u0442\u044C, \u0433\u0434\u0435 \u0441\u0430\u0439\u0442 \u0442\u0435\u0440\u044F\u0435\u0442 \u0442\u0440\u0430\u0444\u0438\u043A?",
      ctaText: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 - \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u044D\u043A\u0441\u043F\u0440\u0435\u0441\u0441-\u0430\u0443\u0434\u0438\u0442 \u0441\u0430\u0439\u0442\u0430 \u0438 \u043F\u043E\u043A\u0430\u0436\u0435\u043C \u0442\u043E\u0447\u043A\u0438 \u0440\u043E\u0441\u0442\u0430 \u043E\u0440\u0433\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u043F\u0440\u043E\u0441\u0430 \u043D\u0430 \u0440\u044B\u043D\u043A\u0435 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430."
    },
    led: {
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043D\u0430 LED-\u044D\u043A\u0440\u0430\u043D\u0430\u0445 \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435 \u0438 \u0440\u0435\u0433\u0438\u043E\u043D\u0430\u0445 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430: \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043B\u043E\u043A\u0430\u0446\u0438\u0438 \u043F\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0443, \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u0434\u0430\u0435\u043C \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0443\u044E \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 LED-\u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0447\u0430\u0441\u0442\u043E \u0432\u044B\u0433\u043B\u044F\u0434\u044F\u0442 \u043D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E",
      problem: ["\u041A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0435\u0434\u0438\u0430\u0431\u0430\u0438\u043D\u0433 LED-\u044D\u043A\u0440\u0430\u043D\u043E\u0432 \u0447\u0430\u0441\u0442\u043E \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u201C\u043A\u0443\u043F\u0438\u043B\u0438 \u0433\u0434\u0435-\u0442\u043E \u0440\u043E\u043B\u0438\u043A\u0438\u201D. \u041A\u043B\u0438\u0435\u043D\u0442 \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044F, \u0432\u0438\u0434\u0438\u0442 \u043B\u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0440\u043E\u043B\u0438\u043A \u0438 \u0431\u044B\u043B\u0438 \u043B\u0438 \u0432\u044B\u0445\u043E\u0434\u044B \u0432 \u043D\u0443\u0436\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.", "\u041C\u044B \u0443\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u0442\u0443 \u0441\u043B\u0435\u043F\u0443\u044E \u0437\u043E\u043D\u0443: \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u043C \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C, \u043A\u0430\u043A \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441\u0432\u044F\u0437\u0430\u043D \u0441 \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0435\u0439."],
      approachTitle: "LED-\u044D\u043A\u0440\u0430\u043D\u044B \u0441 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044F \u0438 \u0432\u044B\u0445\u043E\u0434\u043E\u0432",
      approach: ["\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435 \u044D\u043A\u0440\u0430\u043D\u044B \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u043B\u043E\u043A\u0430\u0446\u0438\u044F\u0445 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u0438 \u0440\u0435\u0433\u0438\u043E\u043D\u043E\u0432. \u041A\u0430\u0436\u0434\u044B\u0439 \u0432\u044B\u0445\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u043C \u0444\u043E\u0442\u043E- \u0438\u043B\u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442\u043E\u043C, \u0430 \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443 \u0431\u0440\u0435\u043D\u0434\u0430."],
      deliverables: [
        { title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u043B\u043E\u043A\u0430\u0446\u0438\u0439", desc: "\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u043A\u0440\u0430\u043D\u044B \u043F\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0443, \u0440\u0430\u0439\u043E\u043D\u0443, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u0442\u043E\u0447\u043A\u0430\u043C \u043F\u0440\u043E\u0434\u0430\u0436." },
        { title: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430", desc: "\u0410\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0440\u043E\u043B\u0438\u043A\u0438 \u043F\u043E\u0434 \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u0444\u043E\u0440\u043C\u0430\u0442 \u044D\u043A\u0440\u0430\u043D\u0430 \u0438 \u0434\u0438\u0441\u0442\u0430\u043D\u0446\u0438\u044E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430." },
        { title: "\u041C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0433\u0440\u0430\u0444\u0438\u043A \u0432\u044B\u0445\u043E\u0434\u043E\u0432, \u0447\u0430\u0441\u0442\u043E\u0442\u0443 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u0431\u0435\u0437 \u0441\u043A\u0440\u044B\u0442\u043E\u0439 \u043B\u043E\u0433\u0438\u043A\u0438." },
        { title: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0432\u044B\u0445\u043E\u0434\u043E\u0432", desc: "\u0414\u0430\u0435\u043C \u0444\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442\u044B \u043F\u043E \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F\u043C \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0437\u0430\u043F\u0443\u0441\u043A." }
      ],
      cases: [
        { brand: "International FMCG", task: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u043D\u0430 14 LED-\u044D\u043A\u0440\u0430\u043D\u0430\u0445 \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0442\u043E\u0447\u043A\u0430\u0445 \u0433\u043E\u0440\u043E\u0434\u0430 \u0441 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0435\u0439 digital.", result: "1,2 \u043C\u043B\u043D \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u0437\u0430 2 \u043D\u0435\u0434\u0435\u043B\u0438, \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0432\u044B\u0440\u043E\u0441\u043B\u0430 \u043D\u0430 28%." },
        { brand: "\u0410\u0432\u0442\u043E\u0434\u0438\u043B\u0435\u0440 \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435", task: "8 \u044D\u043A\u0440\u0430\u043D\u043E\u0432 \u0440\u044F\u0434\u043E\u043C \u0441 \u043C\u0430\u0433\u0438\u0441\u0442\u0440\u0430\u043B\u044F\u043C\u0438 \u0438 \u0431\u0438\u0437\u043D\u0435\u0441-\u0440\u0430\u0439\u043E\u043D\u0430\u043C\u0438, QR-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0430 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 \u0442\u0435\u0441\u0442-\u0434\u0440\u0430\u0439\u0432.", result: "340 QR-\u043F\u0435\u0440\u0435\u0445\u043E\u0434\u043E\u0432, 87 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043D\u0430 \u0442\u0435\u0441\u0442-\u0434\u0440\u0430\u0439\u0432, CPL \u0432 2,1 \u0440\u0430\u0437\u0430 \u043D\u0438\u0436\u0435 digital." }
      ],
      standards: ["\u0424\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044E.", "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044F \u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430.", "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u0434\u043E 5 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."],
      ctaTitle: "\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C LED-\u044D\u043A\u0440\u0430\u043D\u044B \u043F\u043E\u0434 \u0432\u0430\u0448\u0443 \u0437\u0430\u0434\u0430\u0447\u0443?",
      ctaText: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438, \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043E\u0445\u0432\u0430\u0442 \u0438 \u0441\u043E\u0431\u0435\u0440\u0435\u043C \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D \u0431\u0435\u0437 \u0445\u0430\u043E\u0441\u0430."
    },
    gas: {
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043D\u0430 \u0410\u0417\u0421 \u043F\u043E \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0443, \u0433\u0434\u0435 \u0431\u0440\u0435\u043D\u0434 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0410\u0417\u0421 \u043D\u0435\u0434\u043E\u043E\u0446\u0435\u043D\u0438\u0432\u0430\u044E\u0442 \u043A\u0430\u043A \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B",
      problem: ["\u0412\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442 \u043D\u0430 \u0410\u0417\u0421 3-7 \u043C\u0438\u043D\u0443\u0442 \u0441 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u043A\u043E\u043D\u0446\u0435\u043D\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u044F. \u042D\u0442\u043E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432 \u0441 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u043C\u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C\u0438 \u0438 \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B\u043E\u043C.", "\u041D\u043E \u0440\u044B\u043D\u043E\u043A \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439 \u043D\u0430 \u0410\u0417\u0421 \u0447\u0430\u0441\u0442\u043E \u043D\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D: \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043A\u0430\u043A\u0438\u0435 \u0441\u0442\u0430\u043D\u0446\u0438\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C, \u043A\u0430\u043A \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0445\u043E\u0434\u044B \u0438 \u043A\u0430\u043A \u0441\u0432\u044F\u0437\u0430\u0442\u044C \u043E\u0444\u043B\u0430\u0439\u043D \u0441 \u043F\u0440\u043E\u0434\u0430\u0436\u0430\u043C\u0438."],
      approachTitle: "\u0410\u0417\u0421 \u043A\u0430\u043A \u0442\u043E\u0447\u043A\u0430 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0441 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u0430\u043C\u0438",
      approach: ["\u041C\u044B \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0442\u0430\u043D\u0446\u0438\u0438 \u043F\u043E \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0442\u0440\u0430\u0444\u0438\u043A\u0443 \u0438 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u0438\u0445 \u0441 digital, QR, \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430\u043C\u0438 \u0438\u043B\u0438 Telegram-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u043E\u0439."],
      deliverables: [
        { title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0441\u0435\u0442\u0438 \u0410\u0417\u0421", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u043D\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C, \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438." },
        { title: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F", desc: "\u042D\u043A\u0440\u0430\u043D\u044B, \u043F\u043E\u0441\u0442\u0435\u0440\u044B, \u043A\u0430\u0441\u0441\u043E\u0432\u044B\u0435 \u0437\u043E\u043D\u044B, \u043F\u0440\u043E\u043C\u043E-\u0441\u0442\u043E\u0439\u043A\u0438 \u0438 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B." },
        { title: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432", desc: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u043C\u0430\u043A\u0435\u0442\u044B \u043F\u043E\u0434 \u0444\u043E\u0440\u043C\u0430\u0442, \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0438 \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430." },
        { title: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C", desc: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0442\u043E\u0447\u043A\u0430\u0445 \u0438 \u0434\u0430\u0435\u043C \u0444\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442\u044B." }
      ],
      cases: [
        { brand: "\u0421\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F", task: "60 \u0410\u0417\u0421 \u0432 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0435 \u0438 \u043F\u044F\u0442\u0438 \u0433\u043E\u0440\u043E\u0434\u0430\u0445 \u0434\u043B\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0438\u0441\u0442\u043E\u0432.", result: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u0430\u0432\u0442\u043E\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 41%, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u043E\u043A\u0430\u0437\u0430\u043B\u0430\u0441\u044C \u043D\u0430 35% \u043D\u0438\u0436\u0435 digital." },
        { brand: "Food delivery", task: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0430\u0445 \u0410\u0417\u0421 \u043F\u043B\u044E\u0441 push-\u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044F \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 500 \u043C\u0435\u0442\u0440\u043E\u0432.", result: "2800 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0439 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430 \u0437\u0430 3 \u043D\u0435\u0434\u0435\u043B\u0438, \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u0447\u0435\u043A \u0432\u044B\u0440\u043E\u0441 \u043D\u0430 18%." }
      ],
      standards: ["\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u0439 \u0442\u043E\u0447\u043A\u0435.", "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0441\u0440\u043E\u043A\u043E\u0432 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F.", "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u0446\u0435\u043D\u0430 \u043F\u043E \u0441\u0435\u0442\u0438 \u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u0443.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    malls: {
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043D\u0442\u0440\u0430\u0445 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u0438 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430: \u044D\u043A\u0440\u0430\u043D\u044B, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F, \u043F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u044B, \u0431\u0440\u0435\u043D\u0434\u0438\u043D\u0433 \u0438 \u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0440\u044F\u0434\u043E\u043C \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u043E\u043C \u043F\u043E\u043A\u0443\u043F\u043A\u0438.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0422\u0426 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0439",
      problem: ["\u0422\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u0442\u0440\u044B \u0434\u0430\u044E\u0442 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0443\u0436\u0435 \u043F\u0440\u0438\u0448\u043B\u0430 \u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u0435\u043D\u044C\u0433\u0438. \u041D\u043E \u0435\u0441\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438 \u0438 \u0437\u043E\u043D\u044B, \u0431\u0440\u0435\u043D\u0434 \u0431\u0443\u0434\u0435\u0442 \u0432\u0438\u0434\u0435\u043D \u201C\u0433\u0434\u0435-\u0442\u043E\u201D, \u0430 \u043D\u0435 \u0442\u0430\u043C, \u0433\u0434\u0435 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u0435.", "\u041C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u0442\u0440\u0430\u0444\u0438\u043A\u043E\u043C \u0432\u043D\u0443\u0442\u0440\u0438 \u0422\u0426: \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0433\u0440\u0443\u043F\u043F\u044B, \u0444\u0443\u0434\u043A\u043E\u0440\u0442\u044B, \u044D\u0441\u043A\u0430\u043B\u0430\u0442\u043E\u0440\u044B, \u044F\u043A\u043E\u0440\u043D\u044B\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B \u0438 \u0442\u043E\u0447\u043A\u0438 \u043F\u0440\u043E\u0434\u0430\u0436."],
      approachTitle: "\u0422\u0426 \u043A\u0430\u043A \u0441\u0440\u0435\u0434\u0430 \u0432\u043B\u0438\u044F\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0443",
      approach: ["\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u0442\u0440\u044B \u0438 \u0437\u043E\u043D\u044B \u043F\u043E \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u043C\u0443 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044E, \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0441 \u043F\u0440\u043E\u043C\u043E, \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0430\u043C\u0438, QR \u0438\u043B\u0438 digital-\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439."],
      deliverables: [
        { title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0422\u0426 \u0438 \u043B\u043E\u043A\u0430\u0446\u0438\u0439", desc: "\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438 \u0438 \u0437\u043E\u043D\u044B \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u0442\u0440\u0430\u0444\u0438\u043A\u0430 \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u043F\u0440\u043E\u0434\u0430\u0436\u0430\u043C." },
        { title: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F", desc: "\u042D\u043A\u0440\u0430\u043D\u044B, \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F, \u0431\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u043F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u044B \u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438." },
        { title: "\u041F\u0440\u043E\u043C\u043E-\u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438", desc: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u043C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u043E\u0432, sampling, \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0438 \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438." },
        { title: munaText("\u041E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Hisobot"), desc: "\u0424\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043F\u0440\u043E\u043C\u043E-\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u043C." }
      ],
      cases: [
        { brand: "\u041A\u043E\u0441\u043C\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0431\u0440\u0435\u043D\u0434", task: "\u042D\u043A\u0440\u0430\u043D\u044B \u0432 6 \u0422\u0426 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u043F\u043B\u044E\u0441 \u043F\u0440\u043E\u043C\u043E-\u0437\u043E\u043D\u0430 \u0441 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0430\u043C\u0438 \u0438 sampling.", result: "4100 \u0441\u044D\u043C\u043F\u043B\u043E\u0432, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u0432 \u043F\u043E\u043A\u0443\u043F\u043A\u0443 23%, \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0432\u044B\u0448\u0435 \u043F\u043B\u0430\u043D\u0430 \u043D\u0430 31%." },
        { brand: "\u0411\u0430\u043D\u043A", task: "\u042D\u043A\u0440\u0430\u043D\u044B \u0440\u044F\u0434\u043E\u043C \u0441 \u0431\u0430\u043D\u043A\u043E\u043C\u0430\u0442\u0430\u043C\u0438 \u0438 \u043A\u0430\u0441\u0441\u0430\u043C\u0438 \u0432 4 \u0422\u0426 \u043F\u043B\u044E\u0441 \u0441\u0442\u043E\u0439\u043A\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0430.", result: "890 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u043D\u044B\u0445 \u043A\u0430\u0440\u0442 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u043A\u0430\u0440\u0442\u0443 11%." }
      ],
      standards: ["\u0424\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u0439 \u0437\u043E\u043D\u0435.", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0434\u043E 5 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439.", "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0441 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0422\u0426.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    buses: {
      intro: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u0443\u0435\u043C \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u0438\u0435 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u044B \u0438 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043F\u043E \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0443, \u0447\u0442\u043E\u0431\u044B \u0431\u0440\u0435\u043D\u0434 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u043F\u043E\u044F\u0432\u043B\u044F\u043B\u0441\u044F \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0440\u0430\u0439\u043E\u043D\u0430\u0445 \u0438 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0445 \u043F\u043E\u0442\u043E\u043A\u0430\u0445.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F",
      problem: ["\u0410\u0432\u0442\u043E\u0431\u0443\u0441\u044B \u0434\u0430\u044E\u0442 \u043C\u0430\u0441\u0441\u043E\u0432\u044B\u0439 \u043E\u0445\u0432\u0430\u0442 \u0438 \u043D\u0438\u0437\u043A\u0443\u044E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430, \u043D\u043E \u0431\u0435\u0437 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u043B\u0435\u0433\u043A\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043B\u0430\u0431\u044B\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B, \u043F\u043B\u043E\u0445\u043E\u0439 \u043C\u043E\u043D\u0442\u0430\u0436 \u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u0438.", "\u041C\u044B \u0432\u0435\u0434\u0435\u043C \u043F\u043E\u043B\u043D\u044B\u0439 \u0446\u0438\u043A\u043B: \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B, \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E, \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435, \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u0438 \u0444\u043E\u0442\u043E\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430."],
      approachTitle: "\u0410\u0432\u0442\u043E\u0431\u0443\u0441\u044B \u043A\u0430\u043A \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0445\u0432\u0430\u0442 \u043F\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438",
      approach: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C, \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A\u0443 \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u0442\u043E\u0447\u043A\u0430\u043C \u043F\u0440\u043E\u0434\u0430\u0436. \u041A\u0430\u0436\u0434\u044B\u0439 \u0430\u0432\u0442\u043E\u0431\u0443\u0441 \u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u043C \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438."],
      deliverables: [
        { title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u043E\u0432", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0435\u0442\u043A\u0443 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u043E\u0432 \u043F\u043E\u0434 \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0438 \u0433\u043E\u0440\u043E\u0434\u0430." },
        { title: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0438 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435", desc: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u043F\u0435\u0447\u0430\u0442\u044C, \u043C\u043E\u043D\u0442\u0430\u0436 \u0438 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434." },
        { title: "\u041C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438", desc: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0432 \u043F\u0435\u0440\u0438\u043E\u0434 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u0440\u0435\u0448\u0430\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0441 \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438." },
        { title: "\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C", desc: "\u0414\u0430\u0435\u043C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u043C\u0443 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0443." }
      ],
      cases: [
        { brand: "Telecom", task: "120 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043E\u0432 \u043D\u0430 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u0445 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u043D\u0430 6 \u043D\u0435\u0434\u0435\u043B\u044C.", result: "\u0411\u043E\u043B\u0435\u0435 2 \u043C\u043B\u043D \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 $0.003 - \u0432 8 \u0440\u0430\u0437 \u043D\u0438\u0436\u0435 digital." },
        { brand: "Retail opening", task: "30 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u043E\u0432 \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0443 \u0437\u0430 2 \u043D\u0435\u0434\u0435\u043B\u0438 \u0434\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430.", result: "1200 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u0432 \u0434\u0435\u043D\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F, \u0442\u0440\u0430\u0444\u0438\u043A \u0432 2,3 \u0440\u0430\u0437\u0430 \u0432\u044B\u0448\u0435 \u043F\u043B\u0430\u043D\u0430." }
      ],
      standards: ["\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0430\u0432\u0442\u043E\u0431\u0443\u0441\u0443.", "\u041C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F.", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0438 \u043C\u043E\u043D\u0442\u0430\u0436 \u0434\u043E 7 \u0434\u043D\u0435\u0439.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    busStops: {
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445 \u0438 \u0441\u0438\u0442\u0438-\u0444\u043E\u0440\u043C\u0430\u0442\u0430\u0445 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u0438 \u0440\u0435\u0433\u0438\u043E\u043D\u043E\u0432, \u0433\u0434\u0435 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0436\u0434\u0435\u0442 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0438 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E \u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043D\u0430 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0443\u044E \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C",
      problem: ["\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0434\u0430\u044E\u0442 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u043C\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0432 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445 \u0440\u0430\u0439\u043E\u043D\u0430\u0445: \u043B\u044E\u0434\u0438 \u0432\u0438\u0434\u044F\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C \u043F\u043E \u043F\u0443\u0442\u0438 \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443, \u0443\u0447\u0435\u0431\u0443 \u0438\u043B\u0438 \u0434\u043E\u043C\u043E\u0439.", "\u041F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0440\u044B\u043D\u043A\u0430 - \u043C\u0430\u043B\u043E \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u043F\u043E\u0442\u043E\u043A\u0443, \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0435\u0439 \u0438 \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044E. \u041C\u044B \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u043C \u044D\u0442\u043E \u0430\u0434\u0440\u0435\u0441\u043D\u043E\u0439 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043E\u0439 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C\u044E."],
      approachTitle: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043A\u0430\u043A \u0442\u043E\u0447\u043A\u0430 \u0447\u0430\u0441\u0442\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
      approach: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u043E \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A\u0443, \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044E \u0438 \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u0438 \u043A \u0422\u0426, \u043E\u0444\u0438\u0441\u0430\u043C, \u0432\u0443\u0437\u0430\u043C, \u043C\u0435\u0442\u0440\u043E \u0438\u043B\u0438 \u0440\u043E\u0437\u043D\u0438\u0447\u043D\u044B\u043C \u0442\u043E\u0447\u043A\u0430\u043C \u0431\u0440\u0435\u043D\u0434\u0430."],
      deliverables: [
        { title: "\u0410\u0443\u0434\u0438\u0442 \u0438 \u043F\u043E\u0434\u0431\u043E\u0440 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u043D\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443 \u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u043C \u0440\u043E\u043B\u044C \u043A\u0430\u0436\u0434\u043E\u0439 \u0442\u043E\u0447\u043A\u0438." },
        { title: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432", desc: "\u0410\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u043C\u0430\u043A\u0435\u0442 \u043F\u043E\u0434 \u0434\u0438\u0441\u0442\u0430\u043D\u0446\u0438\u044E, \u0441\u0432\u0435\u0442, \u0444\u043E\u0440\u043C\u0430\u0442 \u0438 \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442." },
        { title: "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C", desc: "\u0421\u043B\u0435\u0434\u0438\u043C \u0437\u0430 \u0441\u0440\u043E\u043A\u0430\u043C\u0438, \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0435\u0439 \u0438 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438." },
        { title: munaText("\u041E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Hisobot"), desc: "\u0414\u0430\u0435\u043C \u0444\u043E\u0442\u043E \u0434\u043E \u0438 \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u0439 \u0442\u043E\u0447\u043A\u0435." }
      ],
      cases: [
        { brand: "\u0410\u043F\u0442\u0435\u0447\u043D\u0430\u044F \u0441\u0435\u0442\u044C", task: "45 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 800 \u043C\u0435\u0442\u0440\u043E\u0432 \u043E\u0442 \u043D\u043E\u0432\u044B\u0445 \u0430\u043F\u0442\u0435\u043A.", result: "\u0422\u0440\u0430\u0444\u0438\u043A \u0432 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0432\u044B\u0448\u0435 \u043F\u043B\u0430\u043D\u0430 \u043D\u0430 47%, 62% \u043D\u043E\u0432\u044B\u0445 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439 \u0432\u0438\u0434\u0435\u043B\u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u043D\u0430 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430\u0445." },
        { brand: "EdTech", task: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0440\u044F\u0434\u043E\u043C \u0441 \u0432\u0443\u0437\u0430\u043C\u0438 \u0438 \u043A\u043E\u043B\u043B\u0435\u0434\u0436\u0430\u043C\u0438 \u0441 QR-\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439.", result: "1900 QR-\u043F\u0435\u0440\u0435\u0445\u043E\u0434\u043E\u0432 \u0437\u0430 4 \u043D\u0435\u0434\u0435\u043B\u0438, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0430 29% \u043D\u0438\u0436\u0435 \u0442\u0430\u0440\u0433\u0435\u0442\u0430." }
      ],
      standards: ["\u0424\u043E\u0442\u043E \u0434\u043E \u0438 \u043F\u043E\u0441\u043B\u0435 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u0439 \u0442\u043E\u0447\u043A\u0435.", "\u041C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0435\u0439.", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0434\u043E 5 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    metro: {
      intro: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432 \u043C\u0435\u0442\u0440\u043E \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430: \u0441\u0442\u0430\u043D\u0446\u0438\u0438, \u0432\u0430\u0433\u043E\u043D\u044B, \u043B\u0430\u0439\u0442\u0431\u043E\u043A\u0441\u044B, \u043F\u043E\u0441\u0442\u0435\u0440\u044B, \u0430\u0443\u0434\u0438\u043E \u0438 \u0431\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0433\u043E \u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0433\u043E \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A\u0430.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u0435\u0442\u0440\u043E \u0434\u0430\u0435\u0442 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u043E\u043B\u0438\u0441\u0442\u0430\u0442\u044C",
      problem: ["\u0412 \u043C\u0435\u0442\u0440\u043E \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u201C\u0441\u043A\u0438\u043F\u043D\u0443\u0442\u044C\u201D \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C: \u043E\u043D \u0436\u0434\u0435\u0442 \u043F\u043E\u0435\u0437\u0434, \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0432\u0430\u0433\u043E\u043D\u0435 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u0432\u0438\u0434\u0438\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0435.", "\u041F\u0440\u0438 \u044D\u0442\u043E\u043C \u0440\u044B\u043D\u043E\u043A \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439 \u0438 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0433\u0440\u0430\u043C\u043E\u0442\u043D\u044B\u0445 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0439, \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439."],
      approachTitle: "\u041C\u0435\u0442\u0440\u043E \u043A\u0430\u043A \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0432 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0439 \u0441\u0440\u0435\u0434\u0435",
      approach: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0442\u0430\u043D\u0446\u0438\u0438 \u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u044B \u043F\u043E \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043E\u043F\u043E\u0442\u043E\u043A\u0443, \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0438 \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0435: \u043E\u0445\u0432\u0430\u0442, \u0443\u0437\u043D\u0430\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C, \u0437\u0430\u044F\u0432\u043A\u0438 \u0438\u043B\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438."],
      deliverables: [
        { title: "\u041B\u0430\u0439\u0442\u0431\u043E\u043A\u0441\u044B \u0438 \u043F\u043E\u0441\u0442\u0435\u0440\u044B", desc: "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445, \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430\u0445 \u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430\u0445." },
        { title: "\u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u0432\u0430\u0433\u043E\u043D\u0430\u0445", desc: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u043E\u0435\u0437\u0434\u043E\u0432 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u043F\u0443\u0442\u0438." },
        { title: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0433\u043E\u043D\u0430", desc: "\u0418\u043C\u0438\u0434\u0436\u0435\u0432\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0434\u043B\u044F \u0441\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F." },
        { title: "\u0410\u0443\u0434\u0438\u043E\u0440\u0435\u043A\u043B\u0430\u043C\u0430", desc: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0441 \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430\u043C\u0438 \u043D\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0435." }
      ],
      cases: [
        { brand: "\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435", task: "QR-\u043F\u043E\u0441\u0442\u0435\u0440\u044B \u043D\u0430 12 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445 \u0438 \u0432\u043D\u0443\u0442\u0440\u0438 40 \u0432\u0430\u0433\u043E\u043D\u043E\u0432 \u043D\u0430 4 \u043D\u0435\u0434\u0435\u043B\u0438.", result: "18 400 QR-\u043F\u0435\u0440\u0435\u0445\u043E\u0434\u043E\u0432, 9700 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A, CPL \u043D\u0430 44% \u043D\u0438\u0436\u0435 \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0440\u0435\u043A\u043B\u0430\u043C\u044B." },
        { brand: "\u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442", task: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 2 \u0432\u0430\u0433\u043E\u043D\u043E\u0432 \u0438 \u043B\u0430\u0439\u0442\u0431\u043E\u043A\u0441\u044B \u043D\u0430 6 \u0446\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0442\u0430\u043D\u0446\u0438\u044F\u0445.", result: "\u0417\u0430\u043F\u0440\u043E\u0441\u044B \u043D\u0430 \u043F\u043E\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 38%." }
      ],
      standards: ["\u0424\u043E\u0442\u043E- \u0438 \u0432\u0438\u0434\u0435\u043E\u043E\u0442\u0447\u0435\u0442\u044B \u043F\u043E \u0444\u043E\u0440\u043C\u0430\u0442\u0430\u043C.", "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0441 \u043C\u0435\u0442\u0440\u043E \u0438 \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430\u043C\u0438.", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0434\u043E 7 \u0434\u043D\u0435\u0439.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    airport: {
      intro: "\u0420\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432 \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u043E\u043C \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443 \u0422\u0430\u0448\u043A\u0435\u043D\u0442\u0430 \u0434\u043B\u044F \u0434\u0435\u043B\u043E\u0432\u043E\u0439, \u0442\u0443\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438 \u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438: \u043E\u0442 digital-\u044D\u043A\u0440\u0430\u043D\u043E\u0432 \u0434\u043E \u0431\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u043E\u043D.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u0432\u0430\u0436\u0435\u043D \u0434\u043B\u044F \u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 B2B-\u0431\u0440\u0435\u043D\u0434\u043E\u0432",
      problem: ["\u041F\u0430\u0441\u0441\u0430\u0436\u0438\u0440 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443 \u043E\u0442 1 \u0434\u043E 3 \u0447\u0430\u0441\u043E\u0432, \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0441\u0440\u0435\u0434\u0435 \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u0447\u0430\u0441\u0442\u043E \u0438\u043C\u0435\u0435\u0442 \u0432\u044B\u0441\u043E\u043A\u0438\u0439 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u044B\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C.", "\u042D\u0442\u043E \u0442\u043E\u0447\u043A\u0430 \u0432\u0445\u043E\u0434\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0438 \u0442\u0443\u0440\u0438\u0441\u0442\u043E\u0432, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0444\u043E\u0440\u043C\u0430\u0442 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E \u0441\u0438\u043B\u0435\u043D \u0434\u043B\u044F \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0445, \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445, hotel, travel \u0438 B2B-\u0431\u0440\u0435\u043D\u0434\u043E\u0432."],
      approachTitle: "\u0410\u044D\u0440\u043E\u043F\u043E\u0440\u0442 \u043A\u0430\u043A \u0438\u043C\u0438\u0434\u0436\u0435\u0432\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u0441 \u0442\u043E\u0447\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043E\u043C",
      approach: ["\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0437\u043E\u043D\u044B \u043F\u043E \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0443 \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430: \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F, \u0432\u044B\u043B\u0435\u0442, \u043F\u0440\u0438\u043B\u0435\u0442, \u043C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043B, \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u043B \u0438 \u0431\u0430\u0433\u0430\u0436\u043D\u0430\u044F \u0437\u043E\u043D\u0430."],
      deliverables: [
        { title: "\u0426\u0438\u0444\u0440\u043E\u0432\u044B\u0435 \u044D\u043A\u0440\u0430\u043D\u044B \u0438 \u043B\u0430\u0439\u0442\u0431\u043E\u043A\u0441\u044B", desc: "\u0412\u0438\u0434\u0438\u043C\u044B\u0435 \u043D\u043E\u0441\u0438\u0442\u0435\u043B\u0438 \u0432 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043A\u0438\u0445 \u043F\u043E\u0442\u043E\u043A\u0430\u0445." },
        { title: "\u0411\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u043E\u043D", desc: "\u0418\u043C\u0438\u0434\u0436\u0435\u0432\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u0442\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u044F \u0431\u0440\u0435\u043D\u0434\u0430." },
        { title: "\u0422\u0435\u043B\u0435\u0436\u043A\u0438 \u0434\u043B\u044F \u0431\u0430\u0433\u0430\u0436\u0430", desc: "\u0424\u043E\u0440\u043C\u0430\u0442 \u0441 \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C \u0432 \u0437\u043E\u043D\u0435 \u043F\u0440\u0438\u043B\u0435\u0442\u0430 \u0438 \u0432\u044B\u0434\u0430\u0447\u0438 \u0431\u0430\u0433\u0430\u0436\u0430." },
        { title: "\u0411\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u043B", desc: "\u041F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439." }
      ],
      cases: [
        { brand: "Hotel chain", task: "\u0417\u043E\u043D\u0430 \u043F\u0440\u0438\u043B\u0435\u0442\u0430, \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u043B \u0438 \u0431\u0430\u0433\u0430\u0436\u043D\u044B\u0435 \u0442\u0435\u043B\u0435\u0436\u043A\u0438.", result: "\u041F\u0440\u044F\u043C\u044B\u0435 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 34% \u0437\u0430 6 \u043D\u0435\u0434\u0435\u043B\u044C, 28% \u0433\u043E\u0441\u0442\u0435\u0439 \u043E\u0442\u043C\u0435\u0442\u0438\u043B\u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443." },
        { brand: "Financial B2B", task: "3 \u043C\u0435\u0441\u044F\u0446\u0430 \u0432 \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u043B\u0435: \u044D\u043A\u0440\u0430\u043D, \u0441\u0442\u043E\u0439\u043A\u0430 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u0431\u0440\u0435\u043D\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F coffee-\u0437\u043E\u043D\u0430.", result: "41 \u0432\u0445\u043E\u0434\u044F\u0449\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u043E\u0442 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432." }
      ],
      standards: ["\u0424\u043E\u0442\u043E\u043E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0444\u043E\u0440\u043C\u0430\u0442\u0443 \u0438 \u0437\u043E\u043D\u0435.", "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0441 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0435\u0439 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0430.", "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0434\u043E 7 \u0434\u043D\u0435\u0439.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    smm: {
      intro: "\u0412\u0435\u0434\u0435\u043C \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438 \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: Instagram, Telegram, YouTube \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u0441 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0435\u0439, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439, \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0435\u0439 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u043C\u0438 \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 SMM \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 \u0434\u0440\u0443\u0433\u0438\u0445 \u0440\u044B\u043D\u043A\u043E\u0432",
      problem: ["\u0417\u0434\u0435\u0441\u044C Telegram \u0447\u0430\u0441\u0442\u043E \u0432\u0430\u0436\u043D\u0435\u0435 Facebook, \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0435 \u043A\u043E\u0434\u044B \u0432\u043B\u0438\u044F\u044E\u0442 \u043D\u0430 \u0434\u043E\u0432\u0435\u0440\u0438\u0435, \u0430 \u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442.", "\u041C\u043D\u043E\u0433\u0438\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u043E\u0442\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043B\u0430\u0439\u043A\u0430\u043C\u0438 \u0438 \u043E\u0445\u0432\u0430\u0442\u0430\u043C\u0438, \u043D\u043E \u043D\u0435 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u044E\u0442 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0441 \u0437\u0430\u044F\u0432\u043A\u0430\u043C\u0438, \u043F\u0440\u043E\u0434\u0430\u0436\u0430\u043C\u0438 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439 \u0431\u0440\u0435\u043D\u0434\u0430."],
      approachTitle: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u043A\u0430\u043A \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438",
      approach: ["\u041C\u044B \u0441\u0442\u0440\u043E\u0438\u043C SMM \u0432\u043E\u043A\u0440\u0443\u0433 \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0438: \u043F\u0440\u043E\u0434\u0430\u0436\u0438, \u0434\u043E\u0432\u0435\u0440\u0438\u0435, \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430, \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438\u043B\u0438 \u0440\u043E\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430. \u041A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D \u0441\u0432\u044F\u0437\u0430\u043D \u0441 \u0432\u043E\u0440\u043E\u043D\u043A\u043E\u0439, \u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E."],
      deliverables: [
        { title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D", desc: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0440\u043E\u043B\u0438 \u043A\u0430\u043D\u0430\u043B\u043E\u0432, \u0440\u0443\u0431\u0440\u0438\u043A\u0438, \u044F\u0437\u044B\u043A, \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0438 KPI." },
        { title: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430", desc: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u044B, \u0432\u0438\u0437\u0443\u0430\u043B\u044B, \u0432\u0438\u0434\u0435\u043E, \u0441\u0442\u043E\u0440\u0438\u0441 \u0438 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u043F\u043E\u0434 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438." },
        { title: munaText("\u041A\u043E\u043C\u044C\u044E\u043D\u0438\u0442\u0438-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442","Hamjamiyat bilan ishlash"), desc: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F\u043C\u0438, \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u043C\u0438, \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C\u0438 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439 \u0431\u0440\u0435\u043D\u0434\u0430." },
        { title: munaText("\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Tahlil va hisobot"), desc: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0440\u043E\u0441\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435, \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u044B \u0438 \u0432\u043A\u043B\u0430\u0434 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439 \u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438." }
      ],
      cases: [
        { brand: "International clothing brand", task: "Instagram \u0438 Telegram \u0441 \u043D\u0443\u043B\u044F, \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432.", result: "28 \u0442\u044B\u0441. \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432 \u0432 Instagram \u0438 14 \u0442\u044B\u0441. \u0432 Telegram \u0437\u0430 3 \u043C\u0435\u0441\u044F\u0446\u0430, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F social-to-purchase 4,2%." },
        { brand: "\u0411\u0430\u043D\u043A", task: "\u041F\u0435\u0440\u0435\u0441\u0431\u043E\u0440\u043A\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u0434\u043B\u044F \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0431\u0430\u043D\u043A\u0438\u043D\u0433\u0430 \u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u043C educational \u0438 interactive \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C.", result: "ER \u0432\u044B\u0440\u043E\u0441 \u0441 1,1% \u0434\u043E 4,7%, \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438\u0437 \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 63%." }
      ],
      standards: ["\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D.", "\u041E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0434\u043E 2 \u0447\u0430\u0441\u043E\u0432.", "\u041E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    context: {
      intro: "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043C \u0438 \u0432\u0435\u0434\u0435\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0443\u044E \u0440\u0435\u043A\u043B\u0430\u043C\u0443 Google Ads \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438, \u043C\u0435\u0434\u0438\u0439\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0438.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0434\u043E\u0440\u043E\u0436\u0430\u0435\u0442 \u0431\u0435\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438",
      problem: ["\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0430 \u043E\u0442\u043B\u0438\u0447\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u0440\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0433\u043E \u0438 \u0437\u0430\u043F\u0430\u0434\u043D\u043E\u0433\u043E \u0440\u044B\u043D\u043A\u0430: \u043B\u044E\u0434\u0438 \u0438\u0449\u0443\u0442 \u043F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438, \u043F\u043E-\u0443\u0437\u0431\u0435\u043A\u0441\u043A\u0438 \u0438 \u0441\u043C\u0435\u0448\u0430\u043D\u043D\u044B\u043C\u0438 \u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u0430\u043C\u0438. \u0415\u0441\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439, \u0431\u044E\u0434\u0436\u0435\u0442 \u0443\u0445\u043E\u0434\u0438\u0442 \u0432 \u0434\u043E\u0440\u043E\u0433\u043E\u0439 \u043D\u0438\u0437\u043A\u043E\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0442\u0440\u0430\u0444\u0438\u043A.", "\u041F\u0440\u043E\u0446\u0435\u043D\u0442 \u043E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442\u0430 \u0442\u043E\u0436\u0435 \u0447\u0430\u0441\u0442\u043E \u043B\u043E\u043C\u0430\u0435\u0442 \u043C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u044E \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0430: \u0447\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0442\u0440\u0430\u0442\u0438\u0442 \u043A\u043B\u0438\u0435\u043D\u0442, \u0442\u0435\u043C \u0432\u044B\u0433\u043E\u0434\u043D\u0435\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0443. \u041C\u044B \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u0435\u043C \u043D\u0435 \u043A\u043B\u0438\u043A\u0438, \u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430."],
      approachTitle: "Performance \u0441 \u0444\u043E\u043A\u0443\u0441\u043E\u043C \u043D\u0430 \u043B\u0438\u0434\u044B, \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 ROAS",
      approach: ["\u0421\u0442\u0440\u043E\u0438\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0432\u043E\u043A\u0440\u0443\u0433 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0438: CPL, CAC, ROAS, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u044F\u0432\u043E\u043A \u0438 \u0432\u043A\u043B\u0430\u0434 \u043A\u0430\u043D\u0430\u043B\u0430 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0438. \u0414\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043C \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0446\u0435\u043B\u0435\u0439."],
      deliverables: [
        { title: "\u0410\u0443\u0434\u0438\u0442 \u0438 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F", desc: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438, \u0441\u0430\u0439\u0442, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u0438 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043D\u0443\u044E \u0441\u0440\u0435\u0434\u0443." },
        { title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A", desc: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0443, \u0433\u0440\u0443\u043F\u043F\u044B \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439, \u043C\u0438\u043D\u0443\u0441-\u0441\u043B\u043E\u0432\u0430, \u0446\u0435\u043B\u0438 \u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439." },
        { title: "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0438 \u0432\u0435\u0434\u0435\u043D\u0438\u0435", desc: "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u0447\u0438\u0441\u0442\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u044B, \u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u043C \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u043F\u0435\u0440\u0435\u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0431\u044E\u0434\u0436\u0435\u0442." },
        { title: munaText("\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Tahlil va hisobot"), desc: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0437\u0430\u044F\u0432\u043A\u0438, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u0440\u0430\u0444\u0438\u043A\u0430 \u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043F\u043E \u0440\u043E\u0441\u0442\u0443." }
      ],
      cases: [
        { brand: "B2B SaaS", task: "\u0421\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043B\u0438\u0434\u0430 \u0438 \u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0434\u043E\u043B\u044E \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A.", work: "\u041F\u0440\u043E\u0432\u0435\u043B\u0438 \u0430\u0443\u0434\u0438\u0442, \u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0440\u0430\u043B\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443, \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 \u0443\u0437\u0431\u0435\u043A\u0441\u043A\u0443\u044E \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0443 \u0438 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u043F\u043E\u0441\u0430\u0434\u043E\u0447\u043D\u044B\u0435.", result: "CPL \u0441\u043D\u0438\u0437\u0438\u043B\u0441\u044F \u0441 $18 \u0434\u043E $7,4 \u0437\u0430 2 \u043C\u0435\u0441\u044F\u0446\u0430, \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043B\u0438\u0434\u044B \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 87%." },
        { brand: "E-commerce", task: "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C ROAS \u0438 \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u043E\u043B\u044E \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432 \u0432 \u0432\u044B\u0440\u0443\u0447\u043A\u0435.", result: "ROAS \u0432\u044B\u0440\u043E\u0441 \u0441\u043E 180% \u0434\u043E 420%, \u0434\u043E\u043B\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432 \u0441\u043D\u0438\u0437\u0438\u043B\u0430\u0441\u044C \u0441 14% \u0434\u043E 6%." }
      ],
      standards: ["\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u043C\u0443 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0443.", "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0435 \u0438 \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0435 \u043E\u0442\u0447\u0435\u0442\u044B.", "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u0440\u0435\u0436\u0435 2 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    telegram: {
      intro: "\u0421\u0442\u0440\u043E\u0438\u043C Telegram-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u043A\u0430\u043D\u0430\u043B\u044B \u0431\u0440\u0435\u043D\u0434\u0430, \u043F\u043E\u0441\u0435\u0432\u044B, Telegram Ads, \u0431\u043E\u0442\u044B, \u043F\u0440\u043E\u043C\u043E-\u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0438 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044E.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 Telegram \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u0432\u0435\u0441\u0442\u0438 \u043A\u0430\u043A Instagram",
      problem: ["Telegram \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 - \u043E\u0434\u0438\u043D \u0438\u0437 \u0433\u043B\u0430\u0432\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0439 \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438. \u0415\u0441\u043B\u0438 \u0431\u0440\u0435\u043D\u0434 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u0430\u043C, \u043E\u043D \u0442\u0435\u0440\u044F\u0435\u0442 \u043F\u0440\u044F\u043C\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439.", "\u041D\u043E Telegram \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438: \u0434\u0440\u0443\u0433\u043E\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0442\u0435\u043A\u0441\u0442\u0430, \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u043A \u043A\u0430\u043D\u0430\u043B\u0430\u043C, \u043F\u043E\u0441\u0435\u0432\u044B, \u0431\u043E\u0442\u044B \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0438\u0437 Instagram."],
      approachTitle: "Telegram \u043A\u0430\u043A \u043A\u0430\u043D\u0430\u043B \u043E\u0445\u0432\u0430\u0442\u0430, \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u043F\u0440\u044F\u043C\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0438",
      approach: ["\u041C\u044B \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u0438 \u0432\u0435\u0434\u0435\u043C \u0431\u0440\u0435\u043D\u0434-\u043A\u0430\u043D\u0430\u043B\u044B, \u0437\u0430\u043A\u0443\u043F\u0430\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0432 \u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043A\u0430\u043D\u0430\u043B\u0430\u0445, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C Telegram Ads \u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044E \u0441 \u0431\u043E\u0442\u0430\u043C\u0438, \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430\u043C\u0438 \u0438 \u0437\u0430\u044F\u0432\u043A\u0430\u043C\u0438."],
      deliverables: [
        { title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F \u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043D\u0430\u043B\u0430", desc: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0440\u043E\u043B\u044C Telegram, \u0440\u0443\u0431\u0440\u0438\u043A\u0438, tone of voice \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0440\u043E\u0441\u0442\u0430." },
        { title: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u043A\u0430\u043D\u0430\u043B\u0430 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442", desc: "\u041F\u0438\u0448\u0435\u043C \u043F\u043E\u0441\u0442\u044B, \u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0438\u0437\u0443\u0430\u043B\u044B \u0438 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u0434 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E." },
        { title: "Telegram Ads", desc: "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0438 \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0435\u043C \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C." },
        { title: "\u041F\u043E\u0441\u0435\u0432\u044B \u0432 \u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043A\u0430\u043D\u0430\u043B\u0430\u0445", desc: "\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043A\u0430\u043D\u0430\u043B\u044B, \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432\u044B\u0445\u043E\u0434\u044B." }
      ],
      cases: [
        { brand: "Retail chain", task: "\u0417\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043D\u0430\u043B\u0430, 15 \u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0438 Telegram Ads.", result: "22 \u0442\u044B\u0441. \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432 \u0437\u0430 8 \u043D\u0435\u0434\u0435\u043B\u044C, \u0441\u0440\u0435\u0434\u043D\u0438\u0439 \u043E\u0445\u0432\u0430\u0442 8400, Telegram direct sales - 12% \u0432\u044B\u0440\u0443\u0447\u043A\u0438." },
        { brand: "EdTech", task: "\u041F\u043E\u0441\u0435\u0432\u044B \u0432 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u0430\u0445 \u0438 Telegram-\u0431\u043E\u0442 \u0434\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.", result: "3600 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0439 \u0437\u0430 2 \u043D\u0435\u0434\u0435\u043B\u0438, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u0432 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E 31%, \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 $1,2." }
      ],
      standards: ["\u0410\u0443\u0434\u0438\u0442 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0441\u0435\u0432\u0430\u043C\u0438.", "\u041E\u0442\u0447\u0435\u0442 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044E.", "\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442-\u043F\u043B\u0430\u043D.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442."]
    },
    events: {
      intro: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u043C \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432, B2B-\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F, \u043F\u0440\u043E\u043C\u043E-\u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0438 \u043E\u0442 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438 \u0434\u043E \u043E\u0442\u0447\u0435\u0442\u0430.",
      problemTitle: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0438\u0432\u0435\u043D\u0442 \u043D\u0430 \u043D\u043E\u0432\u043E\u043C \u0440\u044B\u043D\u043A\u0435 \u043B\u0435\u0433\u043A\u043E \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0440\u0438\u0441\u043A",
      problem: ["\u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u0432 \u043D\u0435\u0437\u043D\u0430\u043A\u043E\u043C\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0435 - \u044D\u0442\u043E \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u0442\u0435\u0445\u043D\u0438\u043A\u0430, \u0433\u043E\u0441\u0442\u0438, \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0438\u0441\u043A\u0438. \u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043E\u0434\u043D\u043E\u043C \u0437\u0432\u0435\u043D\u0435 \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0432\u0435\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u043A.", "\u041C\u044B \u0434\u0435\u043B\u0430\u0435\u043C \u0438\u0432\u0435\u043D\u0442 \u043D\u0435 \u043A\u0430\u043A \u0448\u043E\u0443 \u0440\u0430\u0434\u0438 \u0448\u043E\u0443, \u0430 \u043A\u0430\u043A \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0441 \u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0439 \u0437\u0430\u0434\u0430\u0447\u0435\u0439, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439 \u0438 \u043F\u043E\u0441\u0442-\u0438\u0432\u0435\u043D\u0442 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439."],
      approachTitle: "\u0418\u0432\u0435\u043D\u0442 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438",
      approach: ["\u0411\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044E, \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0443, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432, \u043B\u043E\u0433\u0438\u0441\u0442\u0438\u043A\u0443, \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438, \u0421\u041C\u0418, \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C. \u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442, \u043B\u0438\u0434\u044B, PR \u0438\u043B\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438."],
      deliverables: [
        { title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F \u0438 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F", desc: "\u0424\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0435\u043C \u0437\u0430\u0434\u0430\u0447\u0443 \u0441\u043E\u0431\u044B\u0442\u0438\u044F, \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u0435." },
        { title: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0438 \u043B\u043E\u0433\u0438\u0441\u0442\u0438\u043A\u0430", desc: "\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u0442\u0435\u0445\u043D\u0438\u043A\u0430, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438, \u0433\u043E\u0441\u0442\u0438, \u0442\u0430\u0439\u043C\u0438\u043D\u0433 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0434\u043D\u044F \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F." },
        { title: "\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", desc: "PR, \u0431\u043B\u043E\u0433\u0435\u0440\u044B, \u0441\u043E\u0446\u0441\u0435\u0442\u0438, \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0432\u043E\u043A\u0440\u0443\u0433 \u0441\u043E\u0431\u044B\u0442\u0438\u044F." },
        { title: "Post-event \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430", desc: "\u041E\u0442\u0447\u0435\u0442 \u043F\u043E \u0433\u043E\u0441\u0442\u044F\u043C, \u043B\u0438\u0434\u0430\u043C, \u043E\u0445\u0432\u0430\u0442\u0430\u043C, \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F\u043C \u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u0448\u0430\u0433\u0430\u043C." }
      ],
      cases: [
        { brand: "International IT company", task: "\u041F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0434\u043B\u044F 200 B2B-\u0433\u043E\u0441\u0442\u0435\u0439.", work: "\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u0442\u0435\u0445\u043D\u0438\u043A\u0430, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0434\u0438\u0430 \u0438 Telegram, \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044F \u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430.", result: "180 \u0446\u0435\u043B\u0435\u0432\u044B\u0445 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432, 34 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043B\u0438\u0434\u0430, 12 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u0432 \u0431\u0438\u0437\u043D\u0435\u0441-\u043C\u0435\u0434\u0438\u0430." },
        { brand: "FMCG launch", task: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0441 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043E\u043C, \u0431\u043B\u043E\u0433\u0435\u0440\u0430\u043C\u0438, \u0436\u0443\u0440\u043D\u0430\u043B\u0438\u0441\u0442\u0430\u043C\u0438 \u0438 B2B-\u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C\u0438.", result: "28 \u043C\u0435\u0434\u0438\u0430 \u0438 Telegram-\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439, \u043E\u0445\u0432\u0430\u0442 1,4 \u043C\u043B\u043D, \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u043F\u0435\u0440\u0432\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0438 \u0432\u044B\u0448\u0435 \u043F\u043B\u0430\u043D\u0430 \u043D\u0430 55%." }
      ],
      standards: ["\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0439 \u0431\u0440\u0438\u0444 \u0438 \u0441\u043C\u0435\u0442\u0430 \u0434\u043E \u0441\u0442\u0430\u0440\u0442\u0430.", "\u0415\u0434\u0438\u043D\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440.", "\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442.", "Post-event \u043E\u0442\u0447\u0435\u0442 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 5 \u0434\u043D\u0435\u0439."]
    }
  };
  Object.keys(SERVICE_COPY).forEach((key) => {
    if (!SERVICE_PAGES[key]) return;
    SERVICE_PAGES[key] = {
      ...SERVICE_PAGES[key],
      ...SERVICE_COPY[key],
      qa: [...SERVICE_PAGES[key].qa || [], ...SHARED_SERVICE_FAQ]
    };
  });
  function getServicePage() {
    return SERVICE_PAGES[window.SERVICE_KEY] || SERVICE_PAGES.led;
  }
  Object.assign(window, { SERVICE_PAGES, getServicePage });
  if (MUNA_UZ) Object.entries({ "led": { "title": "LED ekranlar", "hero": "Shaharda ko'rinadigan LED reklama", "intro": "Joy tanlash, rolikni ekran talabiga moslashtirish va reklama chiqishlarini tekshirishni bir rejaga birlashtiramiz. Ekranlar mavjudligi va narxi brifdan keyin tasdiqlanadi.", "problemTitle": "Ekran narxini emas, reklama chiqishini tekshiring", "needs": ["Ekran manzili va ko'rinish yo'nalishi aniqmi?", "Rolik davomiyligi, takrorlanishi va davri yozilganmi?", "Savdo nuqtasiga yo'l reklama xabariga mosmi?"], "problem": ["Ekran manzili va ko'rinish yo'nalishi aniqmi?", "Rolik davomiyligi, takrorlanishi va davri yozilganmi? Savdo nuqtasiga yo'l reklama xabariga mosmi?"], "approachTitle": "LED ekranlar uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Ekranning o'rni, ko'rish masofasi va atrofini tekshiramiz.", "O'lcham, davomiylik va o'qiladigan matnni kelishamiz.", "Davr, takrorlanish va xarajatni media rejada ajratamiz."], "marquee": ["LED ekranlar", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Manzil va ko'rinish", "desc": "Ekranning o'rni, ko'rish masofasi va atrofini tekshiramiz." }, { "title": "Rolikni moslashtirish", "desc": "O'lcham, davomiylik va o'qiladigan matnni kelishamiz." }, { "title": "Chiqish jadvali", "desc": "Davr, takrorlanish va xarajatni media rejada ajratamiz." }, { "title": "Tasdiqlovchi hisobot", "desc": "Kelishilgan foto, video yoki operator ma'lumotlarini yig'amiz." }], "cases": [{ "brand": "Mahsulot taqdimoti \xB7 rejalashtirish misoli", "task": "Savdo nuqtalari yaqinidagi ekranlarni internet reklamasi bilan birga baholash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Test haydoviga taklif \xB7 rejalashtirish misoli", "task": "Qisqa xabar va eslab qolish oson manzilni solishtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["LED reklamani qachon boshlash mumkin?", "Muddat rolik tayyorligi, operator roziligi va ekran mavjudligiga bog'liq."], ["Rolik tayyorlaysizmi?", "Tayyor videoni moslashtirish yoki yangi rolik hajmini brifda kelishamiz."], ["LED natijasi qanday baholanadi?", "Chiqish tasdig'i bilan savdo yoki so'rovlar ma'lumotini alohida kuzatamiz. Qamrov bahosi o'lchov usulisiz va'da qilinmaydi."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "LED ekranlar bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "gas": { "title": "AYoQShdagi reklama", "hero": "Haydovchilar uchun AYoQSh reklamasi", "intro": "AYoQSh manzillari, formatlar va reklama xabarini haydovchining yo'li bilan bog'laymiz. Tarmoq roziligi va mavjud joylar oldindan tekshiriladi.", "problemTitle": "Haydovchiga qaysi nuqtada murojaat qilasiz?", "needs": ["Kassa, do'kon yoki yoqilg'i hududidan qaysi biri mos?", "Taklifni to'xtab turgan odam tez tushunadimi?", "Aksiya shartlari va amal muddati aniqmi?"], "problem": ["Kassa, do'kon yoki yoqilg'i hududidan qaysi biri mos?", "Taklifni to'xtab turgan odam tez tushunadimi? Aksiya shartlari va amal muddati aniqmi?"], "approachTitle": "AYoQShdagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Hudud, yo'nalish va savdo nuqtalariga yaqinlikni solishtiramiz.", "Ekran, poster yoki promo joyini operator bilan tasdiqlaymiz.", "Matn va tasvirni ko'rish masofasiga moslaymiz."], "marquee": ["AYoQShdagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Manzillar ro'yxati", "desc": "Hudud, yo'nalish va savdo nuqtalariga yaqinlikni solishtiramiz." }, { "title": "Formatni tanlash", "desc": "Ekran, poster yoki promo joyini operator bilan tasdiqlaymiz." }, { "title": "Material tayyorlash", "desc": "Matn va tasvirni ko'rish masofasiga moslaymiz." }, { "title": "Joylashtirish nazorati", "desc": "Har bir tasdiqlangan manzil uchun hisobot tartibini belgilaymiz." }], "cases": [{ "brand": "Avtomobil sug'urtasi \xB7 rejalashtirish misoli", "task": "AYoQShdagi xabardan maslahat olish sahifasiga o'tish yo'lini rejalashtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Yetkazib berish aksiyasi \xB7 rejalashtirish misoli", "task": "Promokod va uning amal hududini buyurtma shartlari bilan moslashtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Qanday formatlar bor?", "Formatlar tarmoq va bekatga bog'liq. Mavjudligi brifdan keyin tekshiriladi."], ["Faqat ayrim hududlarni tanlash mumkinmi?", "Ha. Manzillarni xizmat yoki savdo hududingiz asosida saralaymiz."], ["QR yoki promokod qo'shish mumkinmi?", "Ha. O'tish sahifasi, aksiya sharti va hisoblash usulini oldindan tayyorlash kerak."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "AYoQShdagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "malls": { "title": "Savdo markazlaridagi reklama", "hero": "Xaridga yaqin joydagi reklama", "intro": "Savdo markazida ekran, yo'l ko'rsatkichlari yoki promo hududini xaridorning yo'li asosida rejalashtiramiz. Maydon va ruxsatlar ma'muriyat bilan tasdiqlanadi.", "problemTitle": "Reklama xaridorga qayerda kerak?", "needs": ["Kirish, qavat yoki do'kon oldidan qaysi biri vazifaga mos?", "Promo jamoa xaridor savoliga qanday javob beradi?", "Aksiya zaxira va sotuv nuqtasiga mosmi?"], "problem": ["Kirish, qavat yoki do'kon oldidan qaysi biri vazifaga mos?", "Promo jamoa xaridor savoliga qanday javob beradi? Aksiya zaxira va sotuv nuqtasiga mosmi?"], "approachTitle": "Savdo markazlaridagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Savdo nuqtasi, xaridor yo'li va kampaniya davrini bog'laymiz.", "O'lcham, ko'rinish va ma'muriyat shartlarini tekshiramiz.", "Maslahatchi, mahsulot namunasi yoki ro'yxatdan o'tishni rejalashtiramiz."], "marquee": ["Savdo markazlaridagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Markaz va hudud", "desc": "Savdo nuqtasi, xaridor yo'li va kampaniya davrini bog'laymiz." }, { "title": "Ichki formatlar", "desc": "O'lcham, ko'rinish va ma'muriyat shartlarini tekshiramiz." }, { "title": "Promo ish rejasi", "desc": "Maslahatchi, mahsulot namunasi yoki ro'yxatdan o'tishni rejalashtiramiz." }, { "title": "Natija hisobi", "desc": "Joylashtirish va promo natijalarini alohida qayd qilamiz." }], "cases": [{ "brand": "Mahsulotni sinab ko'rish \xB7 rejalashtirish misoli", "task": "Namuna tarqatish, maslahat va xarid yo'lini bir ssenariyga bog'lash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Moliyaviy xizmat \xB7 rejalashtirish misoli", "task": "Maslahatchi nuqtasida rozilik va murojaat hisobini rejalashtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Promo stend qo'yish mumkinmi?", "Tanlangan markaz va hudud ruxsat bersa, maket va ish hajmini kelishamiz."], ["Qaysi savdo markazlari bilan ishlaysiz?", "Vazifa, davr va maydon mavjudligiga qarab ro'yxatni tekshiramiz. Tayyor inventar va'da qilinmaydi."], ["Alohida dizayn kerakmi?", "Odatda maket o'lcham va ko'rish masofasiga moslashtiriladi."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Savdo markazlaridagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "buses": { "title": "Avtobuslardagi reklama", "hero": "Kundalik yo'nalishlarda brendingiz", "intro": "Avtobus reklamasi uchun yo'nalish, tashuvchi ruxsati, maket, bosma va o'rnatish ishlarini rejalashtiramiz. Transport soni va mavjudligi tasdiqlangandan keyin hisoblanadi.", "problemTitle": "Avtobusning yo'nalishi xabaringizga mosmi?", "needs": ["Auditoriyangiz qaysi yo'nalishlarda yuradi?", "Maketni harakat paytida o'qish mumkinmi?", "Transport almashsa yoki ta'mirga kirsa, tartib qanday?"], "problem": ["Auditoriyangiz qaysi yo'nalishlarda yuradi?", "Maketni harakat paytida o'qish mumkinmi? Transport almashsa yoki ta'mirga kirsa, tartib qanday?"], "approachTitle": "Avtobuslardagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Savdo va xizmat hududlari bilan yo'nalishlarni solishtiramiz.", "Material, maket va montaj talablarini kelishamiz.", "Transport holati va o'zgarishlar bo'yicha aloqa tartibini belgilaymiz."], "marquee": ["Avtobuslardagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Yo'nalish tanlash", "desc": "Savdo va xizmat hududlari bilan yo'nalishlarni solishtiramiz." }, { "title": "Bosma va o'rnatish", "desc": "Material, maket va montaj talablarini kelishamiz." }, { "title": "Davr nazorati", "desc": "Transport holati va o'zgarishlar bo'yicha aloqa tartibini belgilaymiz." }, { "title": "Foto hisobot", "desc": "Har bir kelishilgan transport uchun tasdiq yig'amiz." }], "cases": [{ "brand": "Do'kon ochilishi \xB7 rejalashtirish misoli", "task": "Do'kon hududidan o'tadigan yo'nalishlarni ochilish taqvimi bilan solishtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Xizmatni tanishtirish \xB7 rejalashtirish misoli", "task": "Yirik matn va bitta aloqa usuli tushunarliligini sinash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Yo'nalishni tanlash mumkinmi?", "Mavjud transport va tashuvchi shartlari asosida ro'yxat tuziladi."], ["Bosma va montajni ham qilasizmi?", "Bu ishlarni smetaga alohida qo'shib, pudratchi va muddatni kelishamiz."], ["Joylashtirish qancha davom etadi?", "Davr tashuvchi shartlari, ishlab chiqarish va kampaniya maqsadiga bog'liq."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Avtobuslardagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "busStops": { "title": "Bekatlardagi reklama", "hero": "Mahalliy auditoriya uchun bekat reklamasi", "intro": "Bekat manzili, reklama yuzasi holati va xabarning o'qilishini tekshirib, manzilli joylashtirish rejasini tuzamiz.", "problemTitle": "Bekatni manzil bo'yicha baholang", "needs": ["Kerakli savdo yoki xizmat nuqtasiga piyoda yo'l bormi?", "Yuzaga yorug'lik va atrofdagi to'siqlar ta'sir qiladimi?", "Telefon yoki manzilni tez eslab qolish mumkinmi?"], "problem": ["Kerakli savdo yoki xizmat nuqtasiga piyoda yo'l bormi?", "Yuzaga yorug'lik va atrofdagi to'siqlar ta'sir qiladimi? Telefon yoki manzilni tez eslab qolish mumkinmi?"], "approachTitle": "Bekatlardagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Har bir nuqtaning vazifasini xaritada ko'rsatamiz.", "Masofa, yorug'lik va matn hajmini hisobga olamiz.", "Yuzaning holati, o'rnatish va davrni tekshiramiz."], "marquee": ["Bekatlardagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Bekatlar ro'yxati", "desc": "Har bir nuqtaning vazifasini xaritada ko'rsatamiz." }, { "title": "Maket tayyorlash", "desc": "Masofa, yorug'lik va matn hajmini hisobga olamiz." }, { "title": "Joylashtirish tekshiruvi", "desc": "Yuzaning holati, o'rnatish va davrni tekshiramiz." }, { "title": "Tasdiq va hisobot", "desc": "Oldingi va keyingi holat uchun foto tartibini kelishamiz." }], "cases": [{ "brand": "Dorixona yo'nalishi \xB7 rejalashtirish misoli", "task": "Bekatdan savdo nuqtasiga tushunarli yo'l ko'rsatish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "O'quv kursi \xB7 rejalashtirish misoli", "task": "Qabul muddati, yo'nalish va ro'yxatdan o'tish usulini bitta xabarga joylash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Qayerda joylashtirish ma'qul?", "Auditoriya yo'li va savdo hududini o'rganib, manzillarni taklif qilamiz."], ["Manzilli dastur tuzasizmi?", "Ha. Har bir tasdiqlangan nuqtaning tanlanish sababini yozamiz."], ["Matn qisqa bo'lishi kerakmi?", "Bitta taklif, o'qiladigan matn va bitta keyingi qadamni tavsiya qilamiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Bekatlardagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "metro": { "title": "Metrodagi reklama", "hero": "Toshkent metrosida reklama rejalashtirish", "intro": "Toshkent metrosidagi reklama uchun bekat, yo'lovchi yo'li, format va ruxsatlarni tekshiramiz. Hududiy sahifalar boshqa shaharlarda metro borligini anglatmaydi.", "problemTitle": "Bekat va formatni oldindan tekshiring", "needs": ["Auditoriyangiz qaysi bekatdan foydalanadi?", "Maket odamning yurish yoki kutish holatiga mosmi?", "Rozilik va ishlab chiqarish qancha vaqt oladi?"], "problem": ["Auditoriyangiz qaysi bekatdan foydalanadi?", "Maket odamning yurish yoki kutish holatiga mosmi? Rozilik va ishlab chiqarish qancha vaqt oladi?"], "approachTitle": "Metrodagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Yo'nalish va kerakli nuqtalarga yaqinlikni baholaymiz.", "Panel, poster yoki boshqa format mavjudligini tasdiqlaymiz.", "Xabarni masofa va ko'rish vaqtiga moslaymiz."], "marquee": ["Metrodagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Bekat tanlash", "desc": "Yo'nalish va kerakli nuqtalarga yaqinlikni baholaymiz." }, { "title": "Formatni tekshirish", "desc": "Panel, poster yoki boshqa format mavjudligini tasdiqlaymiz." }, { "title": "Maketni moslashtirish", "desc": "Xabarni masofa va ko'rish vaqtiga moslaymiz." }, { "title": "Ruxsat va hisobot", "desc": "Operator shartlari va chiqish tasdig'ini kelishamiz." }], "cases": [{ "brand": "Ilovaga taklif \xB7 rejalashtirish misoli", "task": "QR havola va ilova sahifasidagi keyingi qadamni tekshirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Qabul kampaniyasi \xB7 rejalashtirish misoli", "task": "Bekatdan o'quv manziliga borish yo'lini va qabul muddatini ko'rsatish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Metroda qanday formatlar bor?", "Mavjudlik bekat va operatorga bog'liq. Ro'yxat alohida tasdiqlanadi."], ["Aniq bekatni tanlash mumkinmi?", "Ha, lekin joy va davr bo'yicha ruxsat tekshiriladi."], ["Boshqa shaharlarda ham metro reklamasi bormi?", "Bu xizmat sahifasi Toshkent metrosiga tegishli. Boshqa shaharlarga uni ko'chirmaymiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Metrodagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "airport": { "title": "Aeroportdagi reklama", "hero": "Yo'lovchi yo'liga mos aeroport reklamasi", "intro": "Aeroport reklamasini yo'lovchining kelish, ketish yoki kutish yo'li bo'yicha rejalashtiramiz. Hudud, format va ruxsat operator bilan tekshiriladi.", "problemTitle": "Aeroportdagi har bir hududning vazifasi boshqa", "needs": ["Xabaringiz kelayotgan yoki ketayotgan yo'lovchi uchunmi?", "Taklif tili va xizmat hududi mosmi?", "Ruxsat, xavfsizlik va montaj talablari aniqmi?"], "problem": ["Xabaringiz kelayotgan yoki ketayotgan yo'lovchi uchunmi?", "Taklif tili va xizmat hududi mosmi? Ruxsat, xavfsizlik va montaj talablari aniqmi?"], "approachTitle": "Aeroportdagi reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Yo'lovchi yo'li va xizmat vazifasini bog'laymiz.", "Ekran yoki boshqa yuzalar mavjudligini tekshiramiz.", "Maket va tillarni operator talabiga moslaymiz."], "marquee": ["Aeroportdagi reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Hududlarni solishtirish", "desc": "Yo'lovchi yo'li va xizmat vazifasini bog'laymiz." }, { "title": "Formatlar ro'yxati", "desc": "Ekran yoki boshqa yuzalar mavjudligini tekshiramiz." }, { "title": "Material tayyorlash", "desc": "Maket va tillarni operator talabiga moslaymiz." }, { "title": "Rozilik va tasdiq", "desc": "Ma'muriyat roziligi hamda hisobot tartibini kelishamiz." }], "cases": [{ "brand": "Mehmonxona taklifi \xB7 rejalashtirish misoli", "task": "Kelish hududidan band qilish sahifasiga o'tish yo'lini rejalashtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Biznes xizmati \xB7 rejalashtirish misoli", "task": "Xizmat sharti va murojaat usulini kutish hududiga moslashtirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Kimlar reklamani ko'radi?", "Tanlangan hududga qarab yo'lovchilar yoki kutib oluvchilar. Auditoriya bahosi manbasi alohida tekshiriladi."], ["Brend tanishtirish kampaniyasi mumkinmi?", "Ha, format va xabar auditoriya yo'liga mos tanlanadi."], ["Kelishish qancha vaqt oladi?", "Operator ruxsati, xavfsizlik va ishlab chiqarish talablariga bog'liq. Muddatni oldindan tekshiramiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Aeroportdagi reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "seo": { "title": "SEO", "hero": "Qidiruvdan keladigan arizalar uchun SEO", "intro": "Saytning texnik holati, o'zbekcha va ruscha qidiruv so'rovlari, sahifa tuzilishi va foydali matnlar ustida ishlaymiz. Qidiruvdagi o'rin kafolatlanmaydi.", "problemTitle": "Qidiruvdagi muammoni sahifadan boshlang", "needs": ["Sayt sahifalari ochilib, indeksga kira oladimi?", "O'zbekcha va ruscha so'rovlarning ma'nosi hisobga olinganmi?", "Sahifa xizmat sharti va keyingi qadamga javob beradimi?"], "problem": ["Sayt sahifalari ochilib, indeksga kira oladimi?", "O'zbekcha va ruscha so'rovlarning ma'nosi hisobga olinganmi? Sahifa xizmat sharti va keyingi qadamga javob beradimi?"], "approachTitle": "SEO uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Tezlik, mobil ko'rinish, indekslash va URL tuzilishini tekshiramiz.", "O'zbekcha va ruscha so'rovlarni vazifa hamda hudud bo'yicha ajratamiz.", "Mijoz savoliga javob beradigan sahifa va maqolalar tayyorlaymiz."], "marquee": ["SEO", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Texnik tekshiruv", "desc": "Tezlik, mobil ko'rinish, indekslash va URL tuzilishini tekshiramiz." }, { "title": "Qidiruv so'rovlari", "desc": "O'zbekcha va ruscha so'rovlarni vazifa hamda hudud bo'yicha ajratamiz." }, { "title": "Kontent rejasi", "desc": "Mijoz savoliga javob beradigan sahifa va maqolalar tayyorlaymiz." }, { "title": "Havolalar va natija", "desc": "Ichki havolalar, arizalar va qidiruv ko'rsatkichlarini kuzatamiz." }], "cases": [{ "brand": "Onlayn do'kon \xB7 rejalashtirish misoli", "task": "Mahsulot bo'limlari, filtrlar va xarid savollarini tekshirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Mahalliy xizmat \xB7 rejalashtirish misoli", "task": "Xizmat hududi, narxga ta'sir qiladigan shartlar va murojaat yo'lini aniq yozish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["SEO qachon natija beradi?", "Texnik xatolar va raqobatga bog'liq. Barqaror o'sish vaqt talab qiladi, aniq muddat yoki o'rin va'da qilmaymiz."], ["Matn ham tayyorlaysizmi?", "Ha. Tuzilma va matnni mijoz savollari va qidiruv ma'nosiga moslaymiz."], ["Tekshiruvdan boshlash mumkinmi?", "Ha. Avval xatolar va ustuvor vazifalar ro'yxatini tuzamiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "SEO bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "context": { "title": "Kontekst reklama", "hero": "Ariza va budjet nazorati bilan qidiruv reklamasi", "intro": "Google Ads kampaniyalari, qidiruv so'rovlari va e'lonlarni ariza sifatiga qarab boshqaramiz. Natija hisobini reklama budjeti sarflanishidan oldin sozlaymiz.", "problemTitle": "Klikdan keyingi yo'lni tekshiring", "needs": ["Qidiruv so'rovi taklifingizga mosmi?", "Sahifa kerakli til va hudud shartini ko'rsatadimi?", "Ariza sifati va savdoga o'tish qanday o'lchanadi?"], "problem": ["Qidiruv so'rovi taklifingizga mosmi?", "Sahifa kerakli til va hudud shartini ko'rsatadimi? Ariza sifati va savdoga o'tish qanday o'lchanadi?"], "approachTitle": "Kontekst reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Mavjud kampaniya, sahifa va maqsadlarni tekshiramiz.", "So'rovlar, e'lon guruhlari va istisno so'zlarni yig'amiz.", "Matn va sahifalarni sinab, budjetni natijaga qarab taqsimlaymiz."], "marquee": ["Kontekst reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Hisob va sayt tekshiruvi", "desc": "Mavjud kampaniya, sahifa va maqsadlarni tekshiramiz." }, { "title": "Kampaniya tuzilishi", "desc": "So'rovlar, e'lon guruhlari va istisno so'zlarni yig'amiz." }, { "title": "Sinov va boshqaruv", "desc": "Matn va sahifalarni sinab, budjetni natijaga qarab taqsimlaymiz." }, { "title": "Hisobot", "desc": "Ariza narxi, sifati va keyingi o'zgarishlarni ko'rsatamiz." }], "cases": [{ "brand": "Maslahat so'rovi \xB7 rejalashtirish misoli", "task": "Sifatli murojaat mezonini savdo jamoasi bilan belgilash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Onlayn xarid \xB7 rejalashtirish misoli", "task": "Xarid va daromad hisobini reklama xarajatidan ajratib tekshirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Qancha budjet kerak?", "Yo'nalish va raqobatga qarab sinov rejasini taklif qilamiz."], ["Tahlilni ham sozlaysizmi?", "Ha. Klik, ariza va natija maqsadlarini oldindan tekshiramiz."], ["Ishlamagan e'lonni to'xtatish mumkinmi?", "Ha. Qaror mezoni va tekshirish davrini kampaniya boshida kelishamiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Kontekst reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "smm": { "title": "SMM", "hero": "Brend va auditoriya o'rtasida muntazam aloqa", "intro": "Instagram, Telegram va boshqa mos tarmoqlar uchun kontent rejasi, matn, vizual material va javob berish tartibini tayyorlaymiz.", "problemTitle": "Kontentni auditoriya savoliga bog'lang", "needs": ["Qaysi kanal mijoz bilan aloqa uchun kerak?", "Savollarga kim va qachon javob beradi?", "Nashrlar reklama va savdo rejasi bilan mosmi?"], "problem": ["Qaysi kanal mijoz bilan aloqa uchun kerak?", "Savollarga kim va qachon javob beradi? Nashrlar reklama va savdo rejasi bilan mosmi?"], "approachTitle": "SMM uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Kanallar, mavzular, til va ko'rsatkichlarni kelishamiz.", "Matn, tasvir va videoni har bir kanalga moslaymiz.", "Izoh va xabarlarga javob berish qoidalarini belgilaymiz."], "marquee": ["SMM", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Strategiya va reja", "desc": "Kanallar, mavzular, til va ko'rsatkichlarni kelishamiz." }, { "title": "Kontent tayyorlash", "desc": "Matn, tasvir va videoni har bir kanalga moslaymiz." }, { "title": "Muloqot tartibi", "desc": "Izoh va xabarlarga javob berish qoidalarini belgilaymiz." }, { "title": "Tahlil va hisobot", "desc": "O'tishlar, murojaatlar va kontent natijasini ajratib ko'rsatamiz." }], "cases": [{ "brand": "Yangi brend kanali \xB7 rejalashtirish misoli", "task": "Mahsulot savollari va dastlabki kontent bo'limlarini tuzish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Xizmatni tushuntirish \xB7 rejalashtirish misoli", "task": "Ko'p so'raladigan savollar uchun sodda video va matn rejasini tayyorlash.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Qaysi tarmoqlarni yuritasiz?", "Auditoriya va vazifaga mos kanallarni brifda tanlaymiz."], ["Matn va dizayn ham kiradimi?", "Ish hajmiga qarab matn, vizual va video tarkibini smetada ajratamiz."], ["Natijani qanday ko'rsatasiz?", "Obunachi va ko'rishlardan tashqari o'tishlar va murojaatlarni ham o'lchash usulini kelishamiz."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "SMM bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "influence": { "title": "Blogerlar bilan reklama", "hero": "Auditoriyasi tekshirilgan blogerlar bilan kampaniya", "intro": "Blogerlarni auditoriya, til, yo'nalish va brend vazifasi asosida saralaymiz. Mavjudlik, narx va reklama shartlari alohida tasdiqlanadi.", "problemTitle": "Obunachi sonining o'zi yetarli emas", "needs": ["Auditoriyaning hududi va tili brifga mosmi?", "Oldingi reklamalar va obro'ga xavflar tekshirilganmi?", "Nashr muddati va natija hisobi kelishilganmi?"], "problem": ["Auditoriyaning hududi va tili brifga mosmi?", "Oldingi reklamalar va obro'ga xavflar tekshirilganmi? Nashr muddati va natija hisobi kelishilganmi?"], "approachTitle": "Blogerlar bilan reklama uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Auditoriya va brendga moslikni tekshiramiz.", "Muddati, format va to'lov shartini yozamiz.", "Brif, kelishish va nashrni kuzatamiz."], "marquee": ["Blogerlar bilan reklama", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Saralash", "desc": "Auditoriya va brendga moslikni tekshiramiz." }, { "title": "Shartnoma", "desc": "Muddati, format va to'lov shartini yozamiz." }, { "title": "Material nazorati", "desc": "Brif, kelishish va nashrni kuzatamiz." }, { "title": "Natijani baholash", "desc": "Havola, promokod va arizalar orqali natijani hisoblaymiz." }], "cases": [{ "brand": "Mahsulot sharhi \xB7 rejalashtirish misoli", "task": "Tekshiriladigan xususiyatlar va reklama shartlarini brifga yozish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Aksiya haqida xabar \xB7 rejalashtirish misoli", "task": "Qatnashish qoidasi va ro'yxatdan o'tish yo'lini tushuntirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Blogerni qanday tanlaysiz?", "Auditoriya, hudud, til, obro' va oldingi materiallarini solishtiramiz."], ["Sotuvni o'lchash mumkinmi?", "Promokod va belgilangan havolalar yordam beradi. Cheklovlarini oldindan kelishamiz."], ["Faqat yirik blogerlar bilan ishlaysizmi?", "Yo'q. Tanlov vazifa va auditoriyaga bog'liq."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Blogerlar bilan reklama bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "telegram": { "title": "Telegram marketing", "hero": "Telegramda reklama va to'g'ridan-to'g'ri aloqa", "intro": "Brend kanali, mavzuli kanallardagi reklama, Telegram Ads va botga o'tish yo'lini yagona reja asosida boshqaramiz.", "problemTitle": "Kanaldagi xabar keyingi qadamga olib borsin", "needs": ["Kanal auditoriyasi hudud va til bo'yicha mosmi?", "E'lon bilan bot yoki sahifa va'dasi bir xilmi?", "Har bir joylashtirish alohida o'lchanadimi?"], "problem": ["Kanal auditoriyasi hudud va til bo'yicha mosmi?", "E'lon bilan bot yoki sahifa va'dasi bir xilmi? Har bir joylashtirish alohida o'lchanadimi?"], "approachTitle": "Telegram marketing uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Vazifa, mavzular, til va nashr tartibini belgilaymiz.", "Qisqa xabar va tushunarli keyingi qadam tayyorlaymiz.", "Telegram Ads imkoniyatlari va hisoblash usulini tekshiramiz."], "marquee": ["Telegram marketing", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "Kanal strategiyasi", "desc": "Vazifa, mavzular, til va nashr tartibini belgilaymiz." }, { "title": "Matn va vizual", "desc": "Qisqa xabar va tushunarli keyingi qadam tayyorlaymiz." }, { "title": "Reklama sozlash", "desc": "Telegram Ads imkoniyatlari va hisoblash usulini tekshiramiz." }, { "title": "Kanallarda joylashtirish", "desc": "Auditoriyani tekshirib, nashr va hisobotni kuzatamiz." }], "cases": [{ "brand": "Brend kanalini boshlash \xB7 rejalashtirish misoli", "task": "Mahsulot savollari, nashr taqvimi va ariza yo'lini tuzish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Tadbirga ro'yxat \xB7 rejalashtirish misoli", "task": "E'londan botga o'tish va ro'yxatdan o'tish bosqichlarini tekshirish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Kanalni noldan ochasizmi?", "Ha. Maqsad, nomlash, mavzular va boshlang'ich materiallarni kelishamiz."], ["Kanal auditoriyasini tekshirasizmi?", "Reklamadan oldin hudud, til va faollik bo'yicha mavjud dalillarni ko'ramiz."], ["Hisobotda nima bo'ladi?", "Nashr havolasi, ko'rishlar va belgilangan maqsadlar alohida ko'rsatiladi."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Telegram marketing bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." }, "events": { "title": "Tadbirlarni boshqarish", "hero": "Mahsulot va biznes tadbirlarini rejalashtirish", "intro": "Taqdimot, hamkorlar uchrashuvi va promo tadbir uchun g'oya, joy, pudratchilar, mehmonlar va yakuniy hisobotni boshqaramiz.", "problemTitle": "Tadbir kuni uchun barcha mas'ullar aniqmi?", "needs": ["Mehmon kim va tadbirdan keyin qanday qadam kutilyapti?", "Joy, texnika va yetkazish vaqti tasdiqlanganmi?", "Zaxira reja va xavfsizlik mas'uli belgilanganmi?"], "problem": ["Mehmon kim va tadbirdan keyin qanday qadam kutilyapti?", "Joy, texnika va yetkazish vaqti tasdiqlanganmi? Zaxira reja va xavfsizlik mas'uli belgilanganmi?"], "approachTitle": "Tadbirlarni boshqarish uchun ish rejasi", "approach": ["Avval vazifani aniqlaymiz, keyin joylar yoki kanallarni tekshiramiz. Mavjudlik va narx faqat tasdiqdan keyin smetaga kiritiladi."], "why": ["Vazifa, auditoriya va dastur ketma-ketligini yozamiz.", "Maydon, texnika, pudratchi va mehmon yo'lini kelishamiz.", "OAV, bloger va ishtirokchilar uchun xabarlarni moslaymiz."], "marquee": ["Tadbirlarni boshqarish", "Reja", "Tekshiruv", "Hisobot", "O'zbekiston"], "deliverables": [{ "title": "G'oya va ssenariy", "desc": "Vazifa, auditoriya va dastur ketma-ketligini yozamiz." }, { "title": "Joy va logistika", "desc": "Maydon, texnika, pudratchi va mehmon yo'lini kelishamiz." }, { "title": "Aloqa va takliflar", "desc": "OAV, bloger va ishtirokchilar uchun xabarlarni moslaymiz." }, { "title": "Yakuniy tahlil", "desc": "Ishtirok, murojaatlar va keyingi ishlarni hisobotga yig'amiz." }], "cases": [{ "brand": "Biznes taqdimoti \xB7 rejalashtirish misoli", "task": "Taklifdan ro'yxat va uchrashuvgacha bo'lgan yo'lni tuzish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }, { "brand": "Mahsulotni tanishtirish \xB7 rejalashtirish misoli", "task": "Namoyish, savollar va keyingi xarid yo'lini ssenariyga kiritish.", "work": "Bu ssenariy bajarilgan loyiha yoki mavjud reklama joyi haqidagi da'vo emas.", "result": "Natija mezoni va ish hajmi brifda kelishiladi. Mavjudlik alohida tasdiqlanadi." }], "standards": ["Brif, ish hajmi va smeta boshlanishidan oldin kelishiladi.", "Joylar yoki kanallar mavjudligi hamda ruxsatlar tekshiriladi.", "Hisobot tarkibi va topshirish sanasi shartnomada belgilanadi.", "Mas'ul menejer va javob muddati oldindan kelishiladi."], "qa": [["Tadbirni to'liq boshqarasizmi?", "Ish hajmiga qarab g'oya, joy, pudratchilar va koordinatsiyani kelishamiz."], ["Bloger va OAVni taklif qilish mumkinmi?", "Ha. Taklif, kontent va nashr shartlari alohida kelishiladi."], ["Qanday tadbirlar rejalashtirasiz?", "Mahsulot taqdimoti, promo tadbir, hamkorlar uchrashuvi va biznes tadbirlari."], ["Faqat yirik biznes bilan ishlaysizmi?", "Ish tarkibi vazifa, auditoriya va budjetga qarab kelishiladi."], ["Faqat Toshkentda ishlaysizmi?", "O'zbekiston shaharlari uchun reja tuzamiz. Mahalliy bajarish, ruxsat va reklama joylari alohida tekshiriladi."], ["Qachon boshlash mumkin?", "Material, ruxsat va mavjudlik tekshirilgach, muddatni kelishamiz."], ["Qanday hisobot olaman?", "Kelishilgan ishlar tasdig'i, xarajat va o'lchanadigan natijalar. Hisobot turi xizmatga bog'liq."]], "ctaTitle": "Tadbirlarni boshqarish bo'yicha reja kerakmi?", "ctaText": "Shahar, auditoriya, vazifa va muddatni yozing. Ish hajmi va keyingi qadamni kelishamiz." } }).forEach(([key, value]) => {
    if (SERVICE_PAGES[key]) Object.assign(SERVICE_PAGES[key], value);
  });
  function ServiceHero() {
    const s = getServicePage();
    React.useEffect(() => {
      document.title = `${s.title} | Muna Media`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", s.intro);
    }, [s.title, s.intro]);
    return /* @__PURE__ */ React.createElement("section", { id: "hero", style: { paddingTop: 96, paddingBottom: 56, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "blob-shape", style: {
      width: 420,
      height: 420,
      background: "var(--accent)",
      top: -120,
      right: -120,
      opacity: 0.12,
      filter: "blur(80px)"
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " ", s.group), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "Muna Media / Uzbekistan")), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 96px)", margin: "0 0 28px", maxWidth: 1120, lineHeight: 1.03 } }, s.hero), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 820, margin: 0, color: "var(--ink-soft)" } }, s.intro), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn lime", style: { background: "var(--accent)", color: "white", borderColor: "var(--accent)" } }, munaText("\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442","Loyihani boshlash"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")), /* @__PURE__ */ React.createElement("a", { href: "/services-uzbekistan", className: "btn ghost" }, munaText("\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438","Barcha xizmatlar"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))))));
  }
  function ServiceMarquee() {
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
    const items = [...partners, ...partners, ...partners];
    return /* @__PURE__ */ React.createElement("div", { className: "marquee partner-marquee" }, /* @__PURE__ */ React.createElement("style", { dangerouslySetInnerHTML: { __html: `
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` } }), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "marquee-track",
        style: {
          display: "flex",
          alignItems: "center",
          width: "max-content"
        }
      },
      items.map((partner, i) => /* @__PURE__ */ React.createElement("div", { key: `${partner.name}-${i}`, className: "logo-chip brand-logo-chip" }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: partner.src,
          alt: partner.name,
          style: { "--logo-w": `${partner.width}px` }
        }
      )))
    ));
  }
  function ServiceDescription() {
    const s = getServicePage();
    const problemText = Array.isArray(s.problem) ? s.problem : [s.problem].filter(Boolean);
    const scenarios = s.needs || [];
    return /* @__PURE__ */ React.createElement("section", { id: "description", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 01 \u2014 \u0417\u0430\u0447\u0435\u043C \u043D\u0443\u0436\u043D\u0430"," 01 · Xizmat vazifasi"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: "0 0 22px" } }, s.problemTitle || munaText("\u041A\u043E\u0433\u0434\u0430 \u044D\u0442\u0430 \u0443\u0441\u043B\u0443\u0433\u0430 \u0440\u0435\u0448\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0443","Bu xizmat qachon kerak")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14, fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: 720 } }, (problemText.length ? problemText : [`${s.title} \u043D\u0443\u0436\u043D\u0430, \u043A\u043E\u0433\u0434\u0430 \u0431\u0440\u0435\u043D\u0434\u0443 \u0432\u0430\u0436\u043D\u043E \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u044F\u0432\u0438\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u043D\u0430\u043B\u0435, \u0430 \u0432\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0435\u0433\u043E \u0432 \u043F\u043E\u043D\u044F\u0442\u043D\u0443\u044E \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443: \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0435\u0439, \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\u043C, \u0441\u0440\u043E\u043A\u0430\u043C\u0438, \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C\u044E \u0438 \u0441\u0432\u044F\u0437\u044C\u044E \u0441 \u043F\u0440\u043E\u0434\u0430\u0436\u0430\u043C\u0438.`]).map((text) => /* @__PURE__ */ React.createElement("p", { key: text, style: { margin: 0 } }, text)))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 34 } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, marginBottom: 18 } }, munaText("\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F","Qo'llash misollari")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, scenarios.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: item, style: { display: "flex", gap: 12, alignItems: "flex-start", paddingTop: i ? 14 : 0, borderTop: i ? "1px dashed var(--ink)" : "none" } }, /* @__PURE__ */ React.createElement("span", { className: "glyph", style: { width: 34, height: 34, flexShrink: 0 } }, i + 1), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.5 } }, item))))))));
  }
  function ServiceWhyUs() {
    const s = getServicePage();
    const approachText = Array.isArray(s.approach) ? s.approach : [s.approach].filter(Boolean);
    const cards = s.deliverables || (s.why || []).map((item, i) => ({ title: `\u041F\u0440\u0438\u0447\u0438\u043D\u0430 0${i + 1}`, desc: item }));
    return /* @__PURE__ */ React.createElement("section", { id: "why-us", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 02 \u2014 \u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"," 02 · Nega Muna"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, s.approachTitle || munaText("\u041F\u043E\u0447\u0435\u043C\u0443 Muna Media","Nega Muna Media"))), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 520, color: "var(--ink-soft)", margin: 0, display: "grid", gap: 10 } }, (approachText.length ? approachText : [munaText("\u041C\u044B \u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0435\u043C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u044B\u043D\u043E\u043A, \u043A\u0440\u0435\u0430\u0442\u0438\u0432, \u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u0432 \u043E\u0434\u043D\u0443 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443.","Reja, material, pudratchi va tahlilni bir joyda boshqaramiz.")]).map((text) => /* @__PURE__ */ React.createElement("p", { key: text, style: { margin: 0 } }, text)))), /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow", style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" \u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 \u0443\u0441\u043B\u0443\u0433\u0443"," Xizmat tarkibi"))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 24 } }, cards.map((item, i) => /* @__PURE__ */ React.createElement("article", { key: item.title || item.desc, className: "card", style: { padding: 30, minHeight: 210 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700 } }, munaText("\u0411\u041B\u041E\u041A 0","BO'LIM 0"), i + 1), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 26, margin: "20px 0 12px", lineHeight: 1.1 } }, item.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, item.desc))))));
  }
  function ServiceCase() {
    const s = getServicePage();
    const cases = s.cases || [{ brand: s.caseName, task: s.caseText, result: munaText("\u041A\u0430\u043D\u0430\u043B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u043E\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 Muna Media.","Kanal kampaniyaning bir qismi sifatida rejalashtiriladi.") }];
    return /* @__PURE__ */ React.createElement("section", { id: "case", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "clamp(34px, 5vw, 58px)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 03 \u2014 \u0413\u0434\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438"," 03 · Rejalashtirish misollari")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(34px, 5vw, 60px)", margin: "0 0 18px" } }, munaText("\u041A\u0435\u0439\u0441\u044B \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B","Vazifalar va baholash mezonlari")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)", margin: "0 0 26px", maxWidth: 820 } }, munaText("\u041D\u0438\u0436\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0437\u0430\u0434\u0430\u0447, \u0433\u0434\u0435 \u044D\u0442\u043E\u0442 \u043A\u0430\u043D\u0430\u043B \u0440\u0430\u0431\u043E\u0442\u0430\u043B \u043D\u0435 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E, \u0430 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B.","Quyidagi ssenariylar rejalashtirish misollari. Ular bajarilgan loyiha, natija yoki mavjud reklama joyi haqidagi da'vo emas."))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 22 } }, cases.map((item, i) => /* @__PURE__ */ React.createElement("article", { key: `${item.brand}-${i}`, style: { border: "1.5px solid var(--ink)", borderRadius: 24, padding: 28, background: "white" } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, marginBottom: 14 } }, munaText("\u041A\u0415\u0419\u0421 0","MISOL 0"), i + 1), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 30, margin: "0 0 12px" } }, item.brand), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 12px", color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, item.task), item.work && /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 12px", color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, item.work), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px dashed var(--ink)", paddingTop: 14, fontWeight: 800, fontSize: 18 } }, item.result)))))));
  }
  function ServiceTestimonial() {
    const s = getServicePage();
    const standards = s.standards || [];
    if (standards.length) {
      return /* @__PURE__ */ React.createElement("section", { id: "standards", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 04 \u2014 SLA")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u041D\u0430\u0448\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B","Ish tartibimiz"))), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 480, color: "var(--ink-soft)", margin: 0 } }, munaText("\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E: \u0441 \u043E\u0442\u0447\u0435\u0442\u0430\u043C\u0438, \u0441\u0440\u043E\u043A\u0430\u043C\u0438, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439 \u0438 \u0431\u044B\u0441\u0442\u0440\u044B\u043C \u043E\u0442\u0432\u0435\u0442\u043E\u043C \u043A\u043E\u043C\u0430\u043D\u0434\u044B.","Hisobot tarkibi, muddat, tekshiruv va mas'ul jamoani oldindan kelishamiz."))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 22 } }, standards.map((item, i) => /* @__PURE__ */ React.createElement("article", { key: item, className: "card", style: { padding: 28, display: "flex", gap: 16, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { className: "glyph", style: { width: 38, height: 38, flexShrink: 0 } }, i + 1), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.55 } }, item))))));
    }
    return /* @__PURE__ */ React.createElement("section", { id: "testimonial", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { background: "var(--ink)", color: "var(--bg)", padding: "clamp(36px, 6vw, 72px)" } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "rgba(255,255,255,.62)", marginBottom: 20 } }, munaText("04 \u2014 \u041E\u0442\u0437\u044B\u0432","04 · Arxivdagi fikr")), /* @__PURE__ */ React.createElement("blockquote", { className: "display", style: { fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.05, margin: "0 0 26px", color: "var(--bg)" } }, "\u201C", s.testimonial, "\u201D"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "rgba(255,255,255,.72)", fontSize: 18 } }, s.author))));
  }
  function ServiceFAQ() {
    const s = getServicePage();
    const [open, setOpen] = React.useState(0);
    return /* @__PURE__ */ React.createElement("section", { id: "qa", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 05 \u2014 Q&A")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043E\u0442\u0432\u0435\u0442\u044B","Savol va javoblar")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, s.qa.map(([q, a], i) => /* @__PURE__ */ React.createElement("div", { key: q, className: "card", style: { boxShadow: "none", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpen(open === i ? -1 : i),
        style: {
          width: "100%",
          background: "transparent",
          border: 0,
          padding: "22px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          cursor: "pointer",
          textAlign: "left",
          color: "var(--ink)"
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "display", style: { fontSize: 24, lineHeight: 1.1 } }, q),
      /* @__PURE__ */ React.createElement("span", { className: "glyph", style: { flexShrink: 0 } }, open === i ? "-" : "+")
    ), open === i && /* @__PURE__ */ React.createElement("p", { style: { margin: 0, padding: "0 26px 24px", maxWidth: 880, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 } }, a))))));
  }
  function ServiceCTA() {
    const s = getServicePage();
    return /* @__PURE__ */ React.createElement("section", { id: "contact", style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "clamp(38px, 6vw, 72px)", textAlign: "center", background: "var(--accent)", color: "white" } }, /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 6vw, 72px)", margin: "0 0 18px", color: "white" } }, s.ctaTitle || `\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \xAB${s.title}\xBB?`), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: "0 auto 28px", color: "rgba(255,255,255,.86)" } }, s.ctaText || munaText("\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043C \u043C\u0435\u0434\u0438\u0430\u043F\u043B\u0430\u043D, \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0438 \u043F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u043E\u0434 \u0432\u0430\u0448\u0443 \u0437\u0430\u0434\u0430\u0447\u0443, \u0441\u0440\u043E\u043A\u0438 \u0438 \u0440\u044B\u043D\u043E\u043A \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430.","Vazifa, muddat va O'zbekistondagi auditoriyangizga mos media reja tayyorlaymiz.")), /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn", style: { background: "white", color: "var(--ink)", justifyContent: "center" } }, munaText("\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443","Ariza qoldirish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))));
  }
  function ServiceFooter() {
    return /* @__PURE__ */ React.createElement(MunaFooter, null);
  }
  function InfluenceMarketingPage() {
    React.useEffect(() => {
      document.title = munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 | Muna Media","Blogerlar bilan reklama | Muna Media");
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435: \u0430\u0443\u0434\u0438\u0442 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432, \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u044B, \u043C\u0435\u0442\u0440\u0438\u043A\u0438, CAC \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0430\u044F \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.","O'zbekistonda blogerlar bilan reklama: auditoriya tekshiruvi, strategiya, shartnomalar va natija hisobi."));
      }
    }, []);
    const painPoints = [
      munaText("\u0411\u043B\u043E\u0433\u0435\u0440 \u0432\u0437\u044F\u043B \u0434\u0435\u043D\u044C\u0433\u0438 - \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0432\u044B\u0448\u0435\u043B \u0447\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u0438 \u043D\u0435 \u0432 \u0442\u043E\u043C \u0444\u043E\u0440\u043C\u0430\u0442\u0435","Nashr muddati yoki formati brifga mos kelmagan"),
      munaText("\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0445\u0432\u0430\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043E\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u0432 3 \u0440\u0430\u0437\u0430 \u043C\u0435\u043D\u044C\u0448\u0435 \u0437\u0430\u044F\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E","Ko'rishlar soni kutilganidan kam bo'lgan"),
      munaText("\u041D\u0435\u0442 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F, \u043A\u0430\u043A\u043E\u0439 \u0431\u043B\u043E\u0433\u0435\u0440 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u0440\u0438\u0432\u0435\u043B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432","Qaysi bloger mijoz olib kelgani o'lchanmagan"),
      munaText("\u041F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043F\u043E \u0441\u0435\u0440\u044B\u043C \u0441\u0445\u0435\u043C\u0430\u043C - \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0435 \u0440\u0438\u0441\u043A\u0438 \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0431\u0440\u0435\u043D\u0434\u0430","To'lov hujjatlari va javobgarlik oldindan kelishilmagan")
    ];
    const serviceBlocks = [
      {
        title: munaText("\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F \u0438 \u043F\u043E\u0434\u0431\u043E\u0440","Strategiya va tanlash"),
        desc: munaText("\u0410\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u043C \u0432\u0430\u0448\u0443 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u0438 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043B\u0438\u0434\u0435\u0440\u043E\u0432 \u043C\u043D\u0435\u043D\u0438\u0439 \u043F\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u043C \u0434\u0430\u043D\u043D\u044B\u043C. \u0411\u0435\u0437 \u0443\u0433\u0430\u0434\u0430\u0439\u043A\u0438 - \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0435, \u043A\u0442\u043E \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435 \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435.","Auditoriya, til va hududga mos blogerlarni tanlaymiz. Tanlovni mavjud ma'lumot va oldingi materiallar bilan tekshiramiz.")
      },
      {
        title: munaText("\u0410\u0443\u0434\u0438\u0442 \u0438 \u043B\u0435\u0433\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432","Bloger va hujjatlarini tekshirish"),
        desc: munaText("\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0431\u043B\u043E\u0433\u0435\u0440\u0430: \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0439 \u0441\u0442\u0430\u0442\u0443\u0441, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0438\u0441\u043A\u0438. \u0411\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u0432\u0441\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u044B \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044B - \u0432\u044B \u043D\u0435 \u043D\u0435\u0441\u0435\u0442\u0435 \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0445 \u0440\u0438\u0441\u043A\u043E\u0432 \u043F\u043E \u0441\u0435\u0440\u044B\u043C \u0432\u044B\u043F\u043B\u0430\u0442\u0430\u043C.","Auditoriya, soliq maqomi va obro'ga xavflarni tekshiramiz. Shartnomalar va to'lov tartibini kelishamiz.")
      },
      {
        title: munaText("\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C","Kontentni boshqarish"),
        desc: munaText("\u0420\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u0422\u0417 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0432\u044B\u0445\u043E\u0434 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u201C\u0431\u043B\u043E\u0433\u0435\u0440 \u0441\u0430\u043C \u0437\u043D\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0435\u201D. \u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0432\u0430\u0448\u0438 \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0438 - \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044E, \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E, \u043F\u0440\u043E\u0434\u0430\u0436\u0443.","Brif, materialni kelishish va nashr muddatini nazorat qilamiz. Xabarni ariza, ro'yxat yoki xarid yo'liga bog'laymiz.")
      },
      {
        title: munaText("\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Tahlil va hisobot"),
        desc: munaText("\u041F\u043E\u0441\u043B\u0435 \u043A\u0430\u0436\u0434\u043E\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u043D\u0435 PDF \u0441 \u043E\u0445\u0432\u0430\u0442\u0430\u043C\u0438, \u0430 \u0440\u0430\u0437\u0431\u043E\u0440 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0438: \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u043E\u0438\u043B \u043E\u0434\u0438\u043D \u043F\u0440\u0438\u0448\u0435\u0434\u0448\u0438\u0439 \u043A\u043B\u0438\u0435\u043D\u0442, \u043A\u0430\u043A\u043E\u0439 \u0431\u043B\u043E\u0433\u0435\u0440 \u0434\u0430\u043B \u043B\u0443\u0447\u0448\u0438\u0439 CAC, \u0447\u0442\u043E \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0444\u043B\u0430\u0439\u0442\u0435.","Ko'rishlar bilan birga havolalar, promokodlar va arizalarni solishtiramiz. Hisoblash cheklovlarini ham ko'rsatamiz.")
      }
    ];
    const standards = [
      [munaText("\u0410\u0443\u0434\u0438\u0442 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0431\u043B\u043E\u0433\u0435\u0440\u0430","Har bir blogerni tekshirish"), munaText("\u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E \u043D\u0430 \u043D\u0430\u043A\u0440\u0443\u0442\u043A\u0443, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0438 \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u0434\u043E \u0441\u0442\u0430\u0440\u0442\u0430 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438","reklamadan oldin auditoriya, obro' va hujjatlar bo'yicha mavjud dalillarni ko'ramiz")],
      [munaText("\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u0441 \u043A\u0430\u0436\u0434\u044B\u043C \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u043C","Har bir bloger bilan kelishuv"), munaText("\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B, \u0432\u0441\u0435 \u0432\u044B\u043F\u043B\u0430\u0442\u044B \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u044B, \u0440\u0438\u0441\u043A\u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430","format, muddat, to'lov va javobgarlik shartnomada yoziladi")],
      [munaText("\u041E\u0442\u0432\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442","Kelishilgan javob muddati"), munaText("24/7, 365 \u0434\u043D\u0435\u0439 \u0432 \u0433\u043E\u0434\u0443. \u0415\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \u0441 \u0432\u044B\u0445\u043E\u0434\u043E\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 - \u043C\u044B \u0440\u0435\u0448\u0430\u0435\u043C, \u043D\u0435 \u0436\u0434\u0435\u043C","aloqa va muammolarni hal qilish tartibi oldindan belgilanadi")],
      [munaText("\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0430\u044F \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u044C","Ochiq hisobot"), munaText("\u0432\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044E: \u043E\u0445\u0432\u0430\u0442, \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u044B, \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044E, CAC","har bir nashr bo'yicha mavjud ko'rishlar, o'tishlar va natija ma'lumotlari")]
    ];
    const faq = [
      [munaText("\u041A\u0430\u043A \u0432\u044B \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442\u0435, \u043A\u0430\u043A\u043E\u0439 \u0431\u043B\u043E\u0433\u0435\u0440 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0431\u0440\u0435\u043D\u0434\u0443?","Bloger brendga mosligini qanday aniqlaysiz?"), munaText("\u041C\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u043C \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043E\u0445\u0432\u0430\u0442\u044B. \u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E, \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u044C, \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E, \u043F\u0440\u043E\u0448\u043B\u044B\u0435 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438, \u043D\u0438\u0448\u0443, \u0433\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432. \u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043F\u043E\u0434 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0443\u044E \u0431\u0438\u0437\u043D\u0435\u0441-\u0437\u0430\u0434\u0430\u0447\u0443.","Auditoriya, faollik, obro', oldingi reklama, yo'nalish va hududni tekshiramiz. Keyin vazifangizga mos ro'yxatni taklif qilamiz.")],
      [munaText("\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0438\u0437\u043C\u0435\u0440\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438\u043B\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0441 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432?","Blogerdan kelgan savdo yoki ro'yxatni o'lchash mumkinmi?"), munaText("\u0414\u0430. \u0414\u043B\u044F \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C UTM-\u043C\u0435\u0442\u043A\u0438, \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u044B, Telegram-\u0431\u043E\u0442\u044B, \u043B\u0435\u043D\u0434\u0438\u043D\u0433\u0438 \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0438 \u0430\u0442\u0440\u0438\u0431\u0443\u0446\u0438\u0438. \u041D\u0430\u0448\u0430 \u0446\u0435\u043B\u044C - \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B, \u0430 \u0432\u043A\u043B\u0430\u0434 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0431\u043B\u043E\u0433\u0435\u0440\u0430 \u0432 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.","Belgilangan havola, promokod, bot yoki alohida sahifa yordam beradi. Hisoblash usuli va cheklovlari oldindan kelishiladi.")],
      [munaText("\u0412\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u043A\u0440\u0443\u043F\u043D\u044B\u043C\u0438 \u0431\u043B\u043E\u0433\u0435\u0440\u0430\u043C\u0438?","Faqat yirik blogerlar bilan ishlaysizmi?"), munaText("\u041D\u0435\u0442. \u0427\u0430\u0441\u0442\u043E \u043C\u0438\u043A\u0440\u043E- \u0438 \u043D\u0438\u0448\u0435\u0432\u044B\u0435 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B \u0434\u0430\u044E\u0442 \u0431\u043E\u043B\u0435\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0438 \u043B\u0443\u0447\u0448\u0438\u0439 CAC. \u041C\u044B \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043C\u0438\u043A\u0441: \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u043B\u0438\u0434\u0435\u0440\u044B \u043C\u043D\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u043E\u0445\u0432\u0430\u0442\u0430, \u043D\u0438\u0448\u0435\u0432\u044B\u0435 - \u0434\u043B\u044F \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438.","Yo'q. Kichik yoki tor yo'nalishdagi bloger ham vazifaga mos bo'lishi mumkin. Tanlov auditoriya va maqsadga bog'liq.")],
      [munaText("\u041A\u0442\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442, \u0435\u0441\u043B\u0438 \u0431\u043B\u043E\u0433\u0435\u0440 \u0441\u043E\u0440\u0432\u0430\u043B \u0441\u0440\u043E\u043A\u0438 \u0438\u043B\u0438 \u0432\u044B\u043F\u0443\u0441\u0442\u0438\u043B \u043D\u0435 \u0442\u043E\u0442 \u043A\u043E\u043D\u0442\u0435\u043D\u0442?","Bloger muddat yoki formatni buzsa nima bo'ladi?"), munaText("\u041C\u044B. \u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0435\u0441\u0442\u044C \u0422\u0417, \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F, \u0434\u043E\u0433\u043E\u0432\u043E\u0440 \u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432\u044B\u0445\u043E\u0434\u0430. \u0415\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u0438\u0434\u0435\u0442 \u043D\u0435 \u043F\u043E \u043F\u043B\u0430\u043D\u0443, \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0440\u0435\u0448\u0430\u0435\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \u0441 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u043C \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430.","Brif, kelishish va shartnoma asosida masalani bloger bilan hal qilamiz. Javobgarlik va choralar shartnomada belgilanadi.")],
      [munaText("\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E, \u0431\u0435\u0437 \u0441\u0435\u0440\u044B\u0445 \u0432\u044B\u043F\u043B\u0430\u0442?","Rasmiy shartnoma bilan ishlash mumkinmi?"), munaText("\u0414\u0430. \u041C\u044B \u0431\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u044B, \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0441 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u0430\u043C\u0438, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0435 \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0440\u0438\u0441\u043A\u0438 \u043D\u0435 \u043E\u0441\u0442\u0430\u0432\u0430\u043B\u0438\u0441\u044C \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0431\u0440\u0435\u043D\u0434\u0430.","Ha. Shartnoma, to'lov va yakuniy hujjatlarni ish boshlanishidan oldin kelishamiz.")]
    ];
    const [openFaq, setOpenFaq] = React.useState(0);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement("section", { id: "hero", style: { paddingTop: 96, paddingBottom: 64, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" \u0421\u043E\u0446\u0441\u0435\u0442\u0438 \u0438 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B"," Ijtimoiy tarmoqlar va blogerlar")), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, "Influence / Uzbekistan")), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 96px)", margin: "0 0 28px", maxWidth: 1160, lineHeight: 1.03 } }, munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0434\u043B\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u0430\u0436\u0435\u043D \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442","Natijasi o'lchanadigan blogerlar kampaniyasi")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 900, margin: "0 0 34px", color: "var(--ink-soft)" } }, munaText("\u041C\u044B \u043D\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0430\u0435\u043C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0443 \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432. \u041C\u044B \u0441\u0442\u0440\u043E\u0438\u043C \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u0432\u043B\u0438\u044F\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 - \u0441 \u0430\u0443\u0434\u0438\u0442\u043E\u043C, \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438 \u0438 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.","O'zbekistondagi auditoriya uchun blogerlar bilan ishni tekshiruv, brif va natija hisobi asosida boshqaramiz.")), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "btn lime", style: { background: "var(--accent)", color: "white", borderColor: "var(--accent)" } }, munaText("\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443","Blogerlar ro'yxatini so'rash"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))), /* @__PURE__ */ React.createElement(ServiceMarquee, null), /* @__PURE__ */ React.createElement("section", { id: "problem", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)", borderTop: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 01 - \u0411\u043E\u043B\u044C"," 01 · Muammolar"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: "0 0 22px" } }, munaText("\u041F\u043E\u0447\u0435\u043C\u0443 80% \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u0441\u043B\u0438\u0432\u0430\u044E\u0442 \u0431\u044E\u0434\u0436\u0435\u0442","Blogerlar kampaniyasida budjetni qanday nazorat qilasiz?")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 16, color: "var(--ink-soft)", fontSize: 18, lineHeight: 1.65 } }, /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, munaText("\u0423\u0437\u0431\u0435\u043A\u0441\u043A\u0438\u0439 \u0440\u044B\u043D\u043E\u043A \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432 - \u044D\u0442\u043E \u0445\u0430\u043E\u0441 \u0431\u0435\u0437 \u043F\u0440\u0430\u0432\u0438\u043B. \u0410\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0434\u0430\u044E\u0442 \u043E\u0445\u0432\u0430\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435 \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u0443\u044E\u0442\u0441\u044F. \u0411\u043B\u043E\u0433\u0435\u0440\u044B \u043D\u0430\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u044E\u0442 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E. \u041D\u0438\u043A\u0442\u043E \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u0442, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439 \u043F\u0440\u0438\u0448\u043B\u043E \u0441 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438.","Auditoriya mosligi, nashr sharti va natija hisobi oldindan tekshirilmasa, ko'rishlar savdoga qanday ta'sir qilganini tushunish qiyin.")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, munaText("\u0412 \u0438\u0442\u043E\u0433\u0435 \u0431\u0440\u0435\u043D\u0434 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u0441 \u043C\u0438\u043B\u043B\u0438\u043E\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432 - \u0438 \u043D\u043E\u043B\u044C \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F, \u043E\u043A\u0443\u043F\u0438\u043B\u0430\u0441\u044C \u043B\u0438 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044F.","Hisobot faqat ko'rishlardan iborat bo'lmasligi uchun maqsad va o'lchash usulini oldindan belgilang.")))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 34 } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, marginBottom: 18 } }, munaText("\u0422\u0438\u043F\u0438\u0447\u043D\u044B\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B","Uchrashi mumkin bo'lgan muammolar")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, painPoints.map((point, i) => /* @__PURE__ */ React.createElement("div", { key: point, style: { display: "flex", gap: 12, alignItems: "flex-start", paddingTop: i ? 14 : 0, borderTop: i ? "1px dashed var(--ink)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 28, height: 28, borderRadius: 999, background: "var(--ink)", color: "white", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800 } }, "!"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 16, lineHeight: 1.55 } }, point)))))))), /* @__PURE__ */ React.createElement("section", { id: "approach", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 02 - \u041F\u043E\u0434\u0445\u043E\u0434"," 02 · Yondashuv"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: "0 0 24px", maxWidth: 1040 } }, munaText("\u0418\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u043A\u0430\u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442, \u0430 \u043D\u0435 \u043B\u043E\u0442\u0435\u0440\u0435\u044F","Blogerlar bilan ishni biznes vazifasiga bog'laymiz")), /* @__PURE__ */ React.createElement("div", { className: "card influence-content-grid", style: { padding: "clamp(30px, 5vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 34, alignItems: "start" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 } }, munaText("\u041C\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u043B\u0438\u0434\u0435\u0440\u0430\u043C\u0438 \u043C\u043D\u0435\u043D\u0438\u0439 \u0432 \u043B\u043E\u0433\u0438\u043A\u0443 \u0431\u0438\u0437\u043D\u0435\u0441\u0430: \u043A\u0430\u0436\u0434\u044B\u0439 \u0431\u043B\u043E\u0433\u0435\u0440 - \u044D\u0442\u043E \u043A\u0430\u043D\u0430\u043B \u0441 \u0438\u0437\u043C\u0435\u0440\u0438\u043C\u043E\u0439 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430 (CAC). \u041C\u044B \u0437\u043D\u0430\u0435\u043C, \u043A\u0442\u043E \u0438\u0437 \u043D\u0438\u0445 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435, \u0430 \u043A\u0442\u043E \u043F\u0440\u043E\u0434\u0430\u0435\u0442 \u0432\u043E\u0437\u0434\u0443\u0445.","Har bir blogerning xarajatini o'tishlar, arizalar va mavjud savdo ma'lumotlari bilan solishtirishni rejalashtiramiz.")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 } }, munaText("\u041D\u0430\u0448\u0430 \u0431\u0430\u0437\u0430 - \u044D\u0442\u043E \u0432\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043B\u0438\u0434\u0435\u0440\u044B \u043C\u043D\u0435\u043D\u0438\u0439 \u043F\u043E \u043D\u0438\u0448\u0430\u043C: e-commerce, \u0444\u0438\u043D\u0442\u0435\u0445, FMCG, \u0430\u0432\u0442\u043E, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, beauty. \u041F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043E\u043D \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0439 \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442.","Blogerlarni yo'nalish, til va auditoriya hududi bo'yicha saralaymiz. Mavjudlik, narx va xavflar reklama boshlanishidan oldin tekshiriladi."))))), /* @__PURE__ */ React.createElement("section", { id: "included", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 03 - \u0423\u0441\u043B\u0443\u0433\u0430"," 03 · Xizmat"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u0427\u0442\u043E \u043C\u044B \u0434\u0435\u043B\u0430\u0435\u043C","Bajaradigan ishlarimiz")))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 28 } }, serviceBlocks.map((block, i) => /* @__PURE__ */ React.createElement("article", { key: block.title, className: "card", style: { padding: 34, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700 } }, munaText("\u0411\u041B\u041E\u041A 0","BO'LIM 0"), i + 1), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 30, margin: 0 } }, block.title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.65 } }, block.desc)))))), /* @__PURE__ */ React.createElement("section", { id: "case", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card influence-case-grid", style: { padding: "clamp(34px, 5vw, 58px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)", gap: 42, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 04 - \u041A\u0435\u0439\u0441"," 04 · Arxiv loyihasi")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(34px, 5vw, 60px)", margin: "0 0 18px" } }, munaText("UnionPay: \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u044B \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u044C \u043F\u0440\u043E\u043C\u043E-\u0432\u043E\u0440\u043E\u043D\u043A\u0438","UnionPay: promo kampaniyadagi blogerlar")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 } }, munaText("\u0412 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 UnionPay \u0431\u043B\u043E\u0433\u0435\u0440\u044B \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u0430\u0432\u0430\u043B\u0438 \u043E\u0445\u0432\u0430\u0442. \u041E\u043D\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u043B\u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u043A\u0443 \u0430\u043A\u0446\u0438\u0438, \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043A \u0443\u0447\u0430\u0441\u0442\u0438\u044E \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 Telegram, \u0440\u0438\u0442\u0435\u0439\u043B\u043E\u043C \u0438 \u0441\u0430\u0439\u0442\u043E\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438.","UnionPay arxiv loyihasida blogerlar aksiya shartlarini tushuntirdi. Ular Telegram, savdo nuqtalari va sayt bilan birga ishladi."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 20, boxShadow: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: 34, color: "var(--accent)" } }, "91 940"), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginTop: 6 } }, munaText("\u043E\u0445\u0432\u0430\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439","nashrlar qamrovi"))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 20, boxShadow: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: 34, color: "var(--accent)" } }, "13,91%"), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", marginTop: 6 } }, munaText("\u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0441\u0442\u044C","faollik")))), /* @__PURE__ */ React.createElement("a", { href: "/unionpay", className: "btn lime", style: { justifyContent: "center", background: "var(--accent)", color: "white", borderColor: "var(--accent)" } }, munaText("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441","Loyihani ko'rish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192")))))), /* @__PURE__ */ React.createElement("section", { id: "standards", style: { background: "var(--bg-2)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 05 - SLA")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u041D\u0430\u0448\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B - \u043D\u0435 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u044F","Oldindan kelishiladigan ish shartlari")))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 24 } }, standards.map(([title, desc], i) => /* @__PURE__ */ React.createElement("article", { key: title, className: "card", style: { padding: 30, display: "flex", gap: 18, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 42, height: 42, borderRadius: 999, background: "var(--accent)", color: "white", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800 } }, i + 1), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 24, margin: "0 0 8px" } }, title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, desc))))))), /* @__PURE__ */ React.createElement("section", { id: "faq", style: { borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " 06 - FAQ")), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B","Ko'p beriladigan savollar"))), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 460, color: "var(--ink-soft)", margin: 0 } }, munaText("\u041A\u043E\u0440\u043E\u0442\u043A\u043E \u043E \u0442\u043E\u043C, \u043A\u0430\u043A \u043C\u044B \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0431\u043B\u043E\u0433\u0435\u0440\u043E\u0432, \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0438 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0431\u0440\u0435\u043D\u0434 \u043E\u0442 \u0445\u0430\u043E\u0441\u0430 \u0440\u044B\u043D\u043A\u0430.","Bloger tanlash, natija hisobi va ish tartibi haqida qisqa javoblar."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 14 } }, faq.map(([question, answer], i) => /* @__PURE__ */ React.createElement("div", { key: question, className: "card", style: { boxShadow: "none", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpenFaq(openFaq === i ? -1 : i),
        style: {
          width: "100%",
          background: "transparent",
          border: 0,
          padding: "22px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          cursor: "pointer",
          textAlign: "left",
          color: "var(--ink)"
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "display", style: { fontSize: 24, lineHeight: 1.1 } }, question),
      /* @__PURE__ */ React.createElement("span", { style: {
        width: 36,
        height: 36,
        borderRadius: 999,
        border: "1.5px solid var(--ink)",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        fontWeight: 800,
        background: openFaq === i ? "var(--accent)" : "var(--bg)",
        color: openFaq === i ? "white" : "var(--ink)"
      } }, openFaq === i ? "-" : "+")
    ), openFaq === i && /* @__PURE__ */ React.createElement("p", { style: { margin: 0, padding: "0 26px 24px", maxWidth: 900, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.65 } }, answer)))))), /* @__PURE__ */ React.createElement("section", { id: "contact", style: { paddingBottom: 60 } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "clamp(38px, 6vw, 72px)", textAlign: "center", background: "var(--accent)", color: "white" } }, /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 6vw, 72px)", margin: "0 0 18px", color: "white" } }, munaText("\u0413\u043E\u0442\u043E\u0432\u044B \u0432\u044B\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441-\u043A\u0430\u043D\u0430\u043B?","Blogerlar bilan kampaniya kerakmi?")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, lineHeight: 1.6, maxWidth: 820, margin: "0 auto 28px", color: "rgba(255,255,255,.86)" } }, munaText("\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0435 - \u043C\u044B \u043F\u043E\u043A\u0430\u0436\u0435\u043C, \u043A\u0430\u043A\u0438\u0435 \u043B\u0438\u0434\u0435\u0440\u044B \u043C\u043D\u0435\u043D\u0438\u0439 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0432 \u0432\u0430\u0448\u0435\u0439 \u043D\u0438\u0448\u0435 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435 \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u0442\u043E\u0438\u0442\u044C \u043E\u0434\u0438\u043D \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442.","Mahsulot, auditoriya, shahar va muddatni yozing. Mos blogerlar va ish hajmini tekshirishdan boshlaymiz.")), /* @__PURE__ */ React.createElement("a", { href: "/#contact", className: "btn", style: { background: "white", color: "var(--ink)", justifyContent: "center" } }, munaText("\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E","Kampaniyani boshlash"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))))), /* @__PURE__ */ React.createElement(ServiceFooter, null));
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
    const isInfluencePage = window.SERVICE_KEY === "influence";
    React.useEffect(() => {
      const p = PALETTES[t.palette] || PALETTES.blue;
      document.documentElement.style.setProperty("--accent", p.accent);
      document.documentElement.style.setProperty("--accent-2", p.accent2);
      document.documentElement.style.setProperty(
        "--shadow",
        t.borderStyle === "soft" ? "0 14px 32px -10px rgba(14,14,12,0.22)" : "6px 6px 0 0 var(--ink)"
      );
    }, [t.palette, t.borderStyle]);
    if (isInfluencePage) {
      return /* @__PURE__ */ React.createElement(InfluenceMarketingPage, null);
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(ServiceHero, null), /* @__PURE__ */ React.createElement(ServiceMarquee, null), /* @__PURE__ */ React.createElement(ServiceDescription, null), /* @__PURE__ */ React.createElement(ServiceWhyUs, null), /* @__PURE__ */ React.createElement(ServiceCase, null), /* @__PURE__ */ React.createElement(ServiceTestimonial, null), /* @__PURE__ */ React.createElement(ServiceCTA, null), /* @__PURE__ */ React.createElement(ServiceFAQ, null), /* @__PURE__ */ React.createElement(ServiceFooter, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: munaText("\u041F\u0430\u043B\u0438\u0442\u0440\u0430","Ranglar") }), /* @__PURE__ */ React.createElement(
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
