// @ts-nocheck
(() => {
  const MUNA_CITY_NAMES = { "1726": "Toshkent", "1703401": "Andijon", "1703408": "Xonobod", "1706401": "Buxoro", "1706403": "Kogon", "1708401": "Jizzax", "1710401": "Qarshi", "1710405": "Shahrisabz", "1712401": "Navoiy", "1712408": "Zarafshon", "1712412": "G'ozg'on", "1714401": "Namangan", "1718401": "Samarqand", "1718406": "Kattaqo'rg'on", "1722401": "Termiz", "1724401": "Guliston", "1724410": "Shirin", "1724413": "Yangiyer", "1727401": "Nurafshon", "1727404": "Olmaliq", "1727407": "Angren", "1727413": "Bekobod", "1727415": "Ohangaron", "1727419": "Chirchiq", "1727424": "Yangiyo'l", "1730401": "Farg'ona", "1730405": "Qo'qon", "1730408": "Quvasoy", "1730412": "Marg'ilon", "1733401": "Urganch", "1733406": "Xiva", "1735401": "Nukus", "1703211501": "Jalaquduq", "1703214501": "Paytug", "1703220501": "Qo'rg'ontepa", "1703220505": "Qorasuv", "1703224501": "Asaka", "1703227501": "Marxamat", "1703230501": "Shaxrixon", "1703232501": "Paxtaobod", "1703236501": "Xo'jaobod", "1706204501": "Olot", "1706207501": "Gala Osiyo", "1706212501": "Vobkent", "1706215501": "G'ijduvon", "1706230501": "Qorako'l", "1706232501": "Qorovulbozor", "1706242501": "Romitan", "1706242505": "Gazli", "1706258501": "Shofirkon", "1708209501": "G'allaorol", "1708215501": "Do'stlik", "1708218503": "Dashtobod", "1708223501": "Gagarin", "1708228501": "Paxtakor", "1710207501": "G'uzor", "1710220501": "Qamashi", "1710224501": "Beshkent", "1710229501": "Koson", "1710232501": "Kitob", "1710234501": "Muborak", "1710235501": "Yangi Nishon", "1710235505": "Talimarjon", "1710242501": "Chiroqchi", "1710250501": "Yakkabog'", "1712216501": "Qiziltepa", "1712238501": "Nurota", "1712248501": "Uchquduq", "1712251501": "Yangirabod", "1714207501": "Kosonsoy", "1714216501": "Xaqqulobod", "1714219501": "Pop", "1714224501": "To'raqo'rg'on", "1714234501": "Uchqo'rg'on", "1714236501": "Chortoq", "1714237501": "Chust", "1718206501": "Bulung'ur", "1718209501": "Jomboy", "1718212501": "Ishtixon", "1718218501": "Oqtosh", "1718224501": "Payariq", "1718224502": "Chelak", "1718227501": "Juma", "1718235501": "Nurobod", "1718236501": "Urgut", "1722204501": "Boysun", "1722210501": "Denov", "1722212501": "Jarqo'rg'on", "1722214501": "Qumqo'rg'on", "1722217505": "Sharg'un", "1722223501": "Sherobod", "1722226501": "Sho'rchi", "1724231501": "Sirdaryo", "1724231503": "Baxt", "1727206501": "Oqqo'rg'on", "1727224501": "G'azalkent", "1727228501": "Bo'ka", "1727233501": "Do'stobod", "1727249501": "Parkent", "1727250501": "Pskent", "1727256501": "Chinoz", "1727265501": "Keles", "1727407505": "Yangiobod", "1730203508": "Tinchlik", "1730215501": "Beshariq", "1730218501": "Quva", "1730224501": "Rishton", "1730230501": "Yaypan", "1733221501": "Pitnak", "1735204501": "Mang'it", "1735207501": "Beruniy", "1735212505": "Xalqobod", "1735215501": "Qo'ng'irot", "1735222501": "Mo'ynoq", "1735228501": "Taxiatosh", "1735233501": "To'rtko'l", "1735236501": "Xo'jayli", "1735240501": "Chimboy", "1735243501": "Shumanay", "1735250501": "Bo'ston" };
  const MUNA_UZ = document.documentElement.lang === "uz";
  function munaText(ru, uz) {
    return MUNA_UZ ? uz : ru;
  }
  function munaCityTask() {
    const code = new URLSearchParams(window.location.search).get("soato");
    return Object.hasOwn(MUNA_CITY_NAMES, code) ? munaText("\u0413\u043E\u0440\u043E\u0434: ", "Shahar: ") + MUNA_CITY_NAMES[code] + " (SOATO " + code + ")" : "";
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
  function MunaLeadContactNotice() {
    const [available, setAvailable] = navUseState(null);
    navUseEffect(() => {
      let active = true;
      fetch("/api/contact", { method: "GET", cache: "no-store" }).then((response) => response.ok ? response.json() : {}).then((result) => {
        if (active) setAvailable(result.available === true);
      }).catch(() => {
        if (active) setAvailable(false);
      });
      return () => {
        active = false;
      };
    }, []);
    return /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, lineHeight: 1.5, margin: 0 } }, /* @__PURE__ */ React.createElement("p", { role: "status", style: { margin: "0 0 8px" } }, available === null ? munaText("\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C \u0444\u043E\u0440\u043C\u044B. ", "Shakl tayyorligini tekshiryapmiz. ") : available ? munaText("\u0424\u043E\u0440\u043C\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0432 Telegram \u0438 \u043D\u0430 email. ", "Shakl Telegram va emailga yuborish uchun sozlangan. ") : munaText("\u0424\u043E\u0440\u043C\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430. \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C: ", "Shakl hozir ishlamayapti. Bizga yozing: "), /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me" }, "info@munamedia.me"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "https://t.me/munamedia" }, "Telegram"), "."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, margin: 0 } }, munaText(
      "\u041F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0435 Muna Media \u0432 Telegram \u0438 \u043D\u0430 email. \u041D\u0435 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0438 \u043F\u043B\u0430\u0442\u0451\u0436\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u043F\u0440\u0438\u0451\u043C \u043E\u0431\u043E\u0438\u043C\u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043C\u0438, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0447\u0442\u0435\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F.",
      "Yuborilganda ma'lumotlar Muna Media jamoasiga Telegram va email orqali uzatiladi. Maxfiy hujjat va to'lov ma'lumotlarini yozmang. Tasdiq \u2014 ikkala xizmat qabul qilganini bildiradi, xabar o'qilganini emas."
    )));
  }
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
  const pendingLeadSubmissions = /* @__PURE__ */ new Map();
  async function submitLeadForm(form, page) {
    var _a, _b;
    const city = munaCityTask();
    const task = form.task || form.budget || "";
    const payload = {
      name: form.name || "",
      company: form.company || "",
      phone: form.phone || "",
      email: form.email || "",
      task: [city && !task.startsWith(city) ? city : "", task].filter(Boolean).join("\n"),
      page: page || (typeof window !== "undefined" ? window.location.pathname : "")
    };
    const body = JSON.stringify(payload);
    let nonce = pendingLeadSubmissions.get(body);
    if (!nonce) {
      if (pendingLeadSubmissions.size >= 32) throw new Error(munaText("\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u043F\u0440\u0430\u0432\u043E\u043A. \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E email.", "Tugallanmagan arizalar ko'p. Email orqali bog'laning."));
      nonce = crypto.randomUUID();
      pendingLeadSubmissions.set(body, nonce);
    }
    let response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": nonce },
        body
      });
    } catch (e) {
      throw new Error(munaText("\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0435\u0439 \u0438\u043B\u0438 \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438.", "Tasdiq olinmadi. Maydonlarni o'zgartirmay qayta urining yoki biz bilan bog'laning."));
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true || result.stored !== true || ((_a = result.delivered) == null ? void 0 : _a.telegram) !== true || ((_b = result.delivered) == null ? void 0 : _b.email) !== true || typeof result.receipt !== "string" || !/^lead\.[0-9a-f-]{36}$/.test(result.receipt)) {
      const messages = {
        DELIVERY_UNKNOWN: munaText("\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430 \u043D\u0435 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E. \u041D\u0435 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u044F\u0432\u043A\u0443; \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E email \u0438\u043B\u0438 \u0432 Telegram.", "Yuborish to'liq tasdiqlanmadi. Yangi ariza yubormang; email yoki Telegram orqali bog'laning."),
        DELIVERY_PARTIAL: munaText("\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0435 \u0432 \u043E\u0431\u0430 \u043A\u0430\u043D\u0430\u043B\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0435\u0439 \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u0442 \u0434\u0443\u0431\u043B\u0438\u043A\u0430\u0442.", "Ariza ikkala kanalga ham yuborilmadi. Maydonlarni o'zgartirmay qayta urining \u2014 tasdiqlangan kanalga qayta yuborilmaydi."),
        UNAVAILABLE: munaText("\u0424\u043E\u0440\u043C\u0430 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430. \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u043F\u043E email \u0438\u043B\u0438 \u0432 Telegram.", "Shakl hozir ishlamayapti. Email yoki Telegram orqali yozing."),
        IDEMPOTENCY_CONFLICT: munaText("\u041A\u043B\u044E\u0447 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D. \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E email.", "Yuborish kaliti ishlatilgan. Email orqali bog'laning.")
      };
      throw new Error(messages[result.code] || munaText("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u0432 \u043E\u0431\u0430 \u043A\u0430\u043D\u0430\u043B\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u043B\u044F \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0438\u043B\u0438 \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438.", "Ikkala kanalga yuborish tasdiqlanmadi. Maydonlarni tekshiring, o'zgartirmay qayta urining yoki biz bilan bog'laning."));
    }
    pendingLeadSubmissions.delete(body);
    return result;
  }
  function leadErrorMessage(error) {
    return error instanceof Error ? error.message : munaText("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.","Arizani yuborib bo'lmadi. Keyinroq qayta urinib ko'ring.");
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
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("span", { className: "pill solid" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" \u0413\u0440\u0443\u043F\u043F\u0430 Muna Media"," Muna Media jamoasi")), /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--muted)" } }, munaText("\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432","Yirik mijozlar bilan ishlash tartibi"))), /* @__PURE__ */ React.createElement("h1", { className: "display", style: { fontSize: "clamp(44px, 7.5vw, 100px)", margin: "0 0 28px", maxWidth: 1100, lineHeight: 1.05 } }, munaText("Muna Media \u2014 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0446\u0438\u043A\u043B\u0430 \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441-\u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432.","Muna Media biznes uchun reklama rejasini tuzadi va kampaniyalarni boshqaradi.")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 22, lineHeight: 1.5, maxWidth: 840, margin: 0, color: "var(--ink-soft)" } }, munaText("Muna Media \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0431\u0440\u0435\u043D\u0434\u0430\u043C \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u0443: \u043E\u0442 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u0438 \u0432\u044B\u0431\u043E\u0440\u0430 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0434\u043E \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0439 \u0438 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u0438.","Muna Media O'zbekistondagi brendlar uchun reklama rejasini tuzadi: strategiya va kanal tanlashdan joylashtirish va hisobotgacha."))));
  }
  function Positioning() {
    return /* @__PURE__ */ React.createElement("section", { id: "positioning", style: { paddingTop: 40, borderTop: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 01 \u2014 \u041A\u0442\u043E \u043C\u044B"," 01 · Biz haqimizda"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, maxWidth: 900 } }, munaText("\u041D\u0430\u0448\u0430 \u043C\u0438\u0441\u0441\u0438\u044F \u2014 \u043F\u043E\u043C\u043E\u0433\u0430\u0442\u044C \u0431\u0440\u0435\u043D\u0434\u0430\u043C \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u0443.","Maqsadimiz: O'zbekistondagi brendlarga reklamani rejalashtirish va ishga tushirishda yordam berish.")))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, fontSize: 13 } }, munaText("01. \u0414\u043B\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430","01. O'zbekistondagi brendlar uchun")), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, munaText("\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u0440\u0435\u043A\u043B\u0430\u043C\u044B","Reklamani rejalashtirish va ishga tushirish")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 } }, munaText("\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0432\u044B\u0431\u043E\u0440 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0438 \u0437\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430.","O'zbekistondagi brendlar uchun strategiya tuzamiz, kanallarni tanlaymiz va kampaniyani boshqaramiz."))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: 40, display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "mono", style: { color: "var(--accent)", fontWeight: 700, fontSize: 13 } }, munaText("02. \u0414\u043B\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043B\u0438\u0434\u0435\u0440\u043E\u0432","02. Mahalliy biznes uchun")), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, munaText("\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0441\u0442\u0430\u0442\u0443\u0441 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430","Strategiya va tahlil")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 } }, munaText("\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u0441\u0442\u0430\u0442\u0443\u0441 \u0434\u043B\u044F \u0444\u0438\u043D\u0442\u0435\u0445\u0430, \u0440\u0438\u0442\u0435\u0439\u043B\u0430 \u0438 e-commerce \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435.","O'zbekistondagi moliyaviy xizmatlar, savdo va onlayn do'konlar uchun strategiya va tahlil."))))));
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
    } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 56, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 02 \u2014 \u0417\u0430\u043A\u043E\u043D \u0436\u0435\u0440\u0442\u0432\u044B"," 02 · Ish tamoyillari"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0, color: "var(--bg)" } }, munaText("\u041E\u0442 \u0447\u0435\u0433\u043E \u043C\u044B \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C,","Nimaga e'tibor beramiz:"), /* @__PURE__ */ React.createElement("br", null), munaText(" \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u043C\u0438."," hamkorlik shartlariga."))), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 380, color: "rgba(255, 255, 255, 0.7)", margin: 0 } }, munaText("\u041E\u0442 \u0447\u0435\u0433\u043E \u043C\u044B \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u043C\u0438.","Hamkorlik shartlarini oldindan kelishamiz."))), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, [
      [munaText("\u041D\u0435\u0442 \u0440\u0430\u0437\u043E\u0432\u044B\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C","Uzoq muddatli hamkorlik"), munaText("\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0434\u043E\u043B\u0433\u0443\u044E \u043F\u043E \u043C\u043E\u0434\u0435\u043B\u0438 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438 \u0438 \u0431\u043E\u043D\u0443\u0441\u0430 \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.","Boshqaruv haqi va natija uchun qo'shimcha to'lov shartnomada kelishiladi.")],
      [munaText("\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0431\u044E\u0434\u0436\u0435\u0442\u044B","Vazifaga mos budjet"), munaText("\u0424\u043E\u043A\u0443\u0441 \u043D\u0430 \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0441 \u0440\u0430\u0441\u0447\u0435\u0442\u043E\u043C \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432 \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0438 \u0431\u0438\u0437\u043D\u0435\u0441\u0430.","Budjetni biznes vazifasi, ish hajmi va kerakli jamoa asosida hisoblaymiz.")],
      [munaText("\u041D\u0435\u0442 \u0442\u0435\u043D\u0435\u0432\u043E\u043C\u0443 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044E","Tekshirilgan reklama joylari"), munaText("\u0422\u043E\u043B\u044C\u043A\u043E \u043E\u0446\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0447\u0435\u0440\u0435\u0437 Minora AI.","Joylashtirish ma'lumotlari va tasdiqlovchi hujjatlarni tekshiramiz.")]
    ].map(([title, desc], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      padding: "32px 0",
      borderTop: "1px solid rgba(255, 255, 255, 0.18)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    } }, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--accent)", fontSize: 13, fontWeight: 700 } }, "0", i + 1, " // ", title), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: 16, lineHeight: 1.6 } }, desc))))));
  }
  function Leadership() {
    return /* @__PURE__ */ React.createElement("section", { id: "leadership" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 03 \u2014 \u042D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430"," 03 · Tajriba"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043E\u0432","Mutaxassislar jamoasi")))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { alignItems: "center", gap: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 20, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 24px" } }, munaText("[\u0424\u043E\u0442\u043E \u0438 \u0432\u0438\u0434\u0435\u043E\u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439]","[Jamoa fotosuratlari va videotanishuvlari tayyorlanmoqda]")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: 0 } }, munaText("\u041D\u0430\u0448 \u043F\u043E\u0434\u0445\u043E\u0434: \u0441\u0438\u043D\u0442\u0435\u0437 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0445 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0439 \u0441 \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u043C \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435\u043C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043A\u043E\u0434\u043E\u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0430.","Reja tuzishda O'zbekiston auditoriyasining tili, odatlari va xarid yo'lini hisobga olamiz."))), /* @__PURE__ */ React.createElement("div", { className: "card cta-grid", style: { padding: 24, background: "var(--bg-2)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "ph", style: { height: 240, background: "var(--bg)" } }, munaText("[\u0424\u043E\u0442\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439]","[Asoschilar fotosuratlari tayyorlanmoqda]")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 20 } }, munaText("\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E Muna","Muna rahbariyati")), /* @__PURE__ */ React.createElement("div", { className: "mono", style: { color: "var(--muted)", fontSize: 11 } }, munaText("\u0422\u0430\u0448\u043A\u0435\u043D\u0442 \xB7 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D","Toshkent · O'zbekiston")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.4 } }, munaText("\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u044B \u043B\u0438\u0447\u043D\u043E \u0432\u043E\u0432\u043B\u0435\u0447\u0435\u043D\u044B \u0432\u043E \u0432\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0443\u0440\u043E\u0432\u043D\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u043D\u0435\u0441\u0443\u0442 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u043E\u043D\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.","Yirik loyihalarda hamkorlar reja, pudratchilar va hisobotni shaxsan nazorat qiladi.")))))));
  }
  function Guarantees() {
    const items = [
      {
        title: munaText("\u041F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u043E 120 \u0434\u043D\u0435\u0439","Keyinroq to'lash shartlari"),
        desc: munaText("\u0414\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432 \u043C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0433\u0438\u0431\u043A\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043F\u043E\u0441\u0442\u043E\u043F\u043B\u0430\u0442\u044B \u0438 \u0440\u0430\u0441\u0441\u0440\u043E\u0447\u043A\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439, \u0441\u043D\u0438\u0436\u0430\u044F \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0443 \u043D\u0430 \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0434\u0435\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u044B \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0439.","Keyinroq to'lash imkoniyati hamkor, shartnoma va moliyaviy tekshiruvga bog'liq. Muddatlar alohida kelishiladi.")
      },
      {
        title: munaText("\u0420\u0430\u0434\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435","Ochiq xarajatlar"),
        desc: munaText("\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043D\u0430\u0446\u0435\u043D\u043E\u043A. \u041A\u043B\u0438\u0435\u043D\u0442\u044B \u0432\u0438\u0434\u044F\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0441\u0447\u0435\u0442\u0430 \u043E\u0442 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438. \u0424\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0448\u0430 \u043E\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044F.","Joylashtirish narxi va agentlik haqini alohida ko'rsatamiz. Hisoblar va hisobotga kirish tartibini shartnomada belgilaymiz.")
      },
      {
        title: munaText("\u0422\u043E\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0441\u0443\u0431\u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432","Pudratchilarni tekshirish"),
        desc: munaText("\u041F\u043E\u043B\u043D\u044B\u0439 \u0430\u0443\u0434\u0438\u0442 \u0441\u0443\u0431\u043F\u043E\u0434\u0440\u044F\u0434\u0447\u0438\u043A\u043E\u0432 \u0438 \u043B\u0435\u0433\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0434\u043B\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u043E\u0439 \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.","Pudratchining hujjatlari, to'lov va ish shartlarini tekshiramiz.")
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "guarantees", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 04 \u2014 \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C"," 04 · Xavflarni boshqarish"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432","Yirik loyihalar uchun ish tartibi"))), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 380, fontSize: 16, color: "var(--ink-soft)", margin: 0 } }, munaText("\u041C\u044B \u0431\u0435\u0440\u0435\u043C \u043D\u0430 \u0441\u0435\u0431\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0438\u0441\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0443\u044E \u043F\u0440\u0435\u0434\u0441\u043A\u0430\u0437\u0443\u0435\u043C\u043E\u0441\u0442\u044C \u0432\u0430\u0448\u0435\u0433\u043E \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u0430.","Ish hajmi, to'lovlar va javobgarlikni kampaniya boshlanishidan oldin kelishamiz."))), /* @__PURE__ */ React.createElement("div", { className: "grid-3", style: { gap: 32 } }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "card", style: { padding: 32, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
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
    return /* @__PURE__ */ React.createElement("section", { id: "sla" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head", style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 05 \u2014 \u0420\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u044B"," 05 · Aloqa tartibi"))), /* @__PURE__ */ React.createElement("h2", { className: "display sec-title", style: { margin: 0 } }, munaText("\u0416\u0435\u0441\u0442\u043A\u0438\u0439 Service Level Agreement","Xizmat darajasi bo'yicha kelishuv")))), /* @__PURE__ */ React.createElement("div", { className: "grid-2", style: { gap: 40 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: {
      padding: 48,
      background: "var(--ink)",
      color: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 20
    } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: munaText("clamp(64px, 8vw, 100px)", "clamp(28px, 5vw, 56px)"), color: "var(--accent)" } }, munaText("99.99%", "Kelishiladi")), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 24, margin: 0 } }, munaText("\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438\u043D\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B","Tahlil vositalariga kirish")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "rgba(255, 255, 255, 0.8)", fontSize: 16, lineHeight: 1.6 } }, munaText("\u041D\u0430\u0448\u0438 \u0441\u043A\u0432\u043E\u0437\u043D\u044B\u0435 \u0434\u0430\u0448\u0431\u043E\u0440\u0434\u044B, \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0440\u0435\u043A\u0438\u043D\u0433\u0430 \u0438\u043D\u0444\u043B\u044E\u0435\u043D\u0441\u0435\u0440\u043E\u0432 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0431\u0435\u0441\u043F\u0435\u0440\u0435\u0431\u043E\u0439\u043D\u043E \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 24/7.","Hisobot va tahlil vositalarining ishlash tartibi loyiha kelishuvida belgilanadi."))), /* @__PURE__ */ React.createElement("div", { className: "card", style: {
      padding: 48,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 20
    } }, /* @__PURE__ */ React.createElement("div", { className: "num-big", style: { fontSize: munaText("clamp(64px, 8vw, 100px)", "clamp(28px, 5vw, 56px)"), color: "var(--accent)" } }, munaText(munaText("15 \u043C\u0438\u043D","Kelishiladi"), "Kelishiladi")), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 24, margin: 0, color: "var(--ink)" } }, munaText("\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438","Javob berish muddati")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 } }, munaText("\u041A\u0430\u0436\u0434\u043E\u043C\u0443 \u043A\u0440\u0443\u043F\u043D\u043E\u043C\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u0432\u044B\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438\u0447\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442-\u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0432 \u0432 Telegram-\u0447\u0430\u0442\u0435 \u0441 \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C\u044E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F.","Mas'ul menejer, aloqa kanali va javob muddati shartnomada kelishiladi."))))));
  }
  function Principles() {
    return /* @__PURE__ */ React.createElement("section", { id: "principles", style: { background: "var(--bg-2)", borderTop: "1.5px solid var(--ink)", borderBottom: "1.5px solid var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { maxWidth: 1e3 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { className: "pill solid", style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" \u041F\u0440\u0438\u043D\u0446\u0438\u043F\u044B Muna"," Muna tamoyillari")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0 } }, munaText("\u041C\u0430\u043D\u0438\u0444\u0435\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438","Javobgarlik tamoyillari"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 32, fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)" } }, /* @__PURE__ */ React.createElement("blockquote", { style: {
      margin: 0,
      paddingLeft: 24,
      borderLeft: "4px solid var(--accent)",
      fontStyle: "italic",
      fontSize: 22,
      color: "var(--ink)",
      fontFamily: "Instrument Serif"
    } }, munaText("\xAB\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0434\u0430\u043D\u043D\u044B\u0445, \u0430 \u043D\u0435 \u0438\u043D\u0442\u0443\u0438\u0446\u0438\u0438. \u041C\u044B \u043A\u0440\u0435\u0434\u0438\u0442\u0443\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u043D\u0435\u0441\u0435\u043C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443.\xBB","Qarorlarni ma'lumot bilan tekshiramiz. To'lov va natijani o'lchash shartlarini oldindan kelishamiz.")), /* @__PURE__ */ React.createElement("p", null, "1. ", /* @__PURE__ */ React.createElement("strong", null, munaText("\u0414\u0430\u043D\u043D\u044B\u0435 \u0432\u043C\u0435\u0441\u0442\u043E \u0438\u043D\u0442\u0443\u0438\u0446\u0438\u0438.","Qarorlar ma'lumotga tayanadi.")), munaText(" \u041A\u0430\u0436\u0434\u044B\u0439 \u0448\u0430\u0433 \u043E\u043F\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0446\u0438\u0444\u0440\u044B, \u0442\u0435\u0441\u0442\u044B \u0438 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u043D\u0443\u044E \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443."," Har bir qadamni ma'lumot, sinov va mijozni jalb qilish xarajati bilan baholaymiz.")), /* @__PURE__ */ React.createElement("p", null, "2. ", /* @__PURE__ */ React.createElement("strong", null, munaText("\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u044E\u043D\u0438\u0442-\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443.","Xarajat va natijani birga hisoblaymiz.")), munaText(" \u041C\u044B \u043A\u0440\u0435\u0434\u0438\u0442\u0443\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0438 \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0435\u043C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0441 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C\u044E \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E \u043A\u043B\u0438\u0435\u043D\u0442\u0430."," Reklama qarorlarini mijozni jalb qilish narxi va savdodagi qiymati bilan bog'laymiz.")), /* @__PURE__ */ React.createElement("p", null, "3. ", /* @__PURE__ */ React.createElement("strong", null, munaText("\u0417\u0430\u0449\u0438\u0442\u0430 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0438 \u0437\u0430\u0440\u0430\u043D\u0435\u0435.","Obro'ni oldindan asraymiz.")), munaText(" \u041C\u044B \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u043C \u0432\u0430\u0448\u0443 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u044E \u0434\u043E \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0443\u0433\u0440\u043E\u0437\u044B \u043E\u0431\u0440\u0443\u0448\u0430\u0442 \u0432\u043E\u0440\u043E\u043D\u043A\u0443 \u043F\u0440\u043E\u0434\u0430\u0436."," E'lon va blogerlarni tekshirib, brend obro'siga xavflarni kamaytiramiz.")))));
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
    } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }, className: "cta-grid" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { className: "sec-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "pill solid", style: { borderColor: "var(--bg)", color: "var(--bg)" } }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), munaText(" 06 \u2014 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"," 06 · Bog'lanish"))), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "var(--bg)", lineHeight: 1.05 } }, munaText("\u0425\u043E\u0442\u0438\u0442\u0435 \u043E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0440\u0435\u043D\u0434\u0430 \u0432 \u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D\u0435?","Brendingiz uchun O'zbekistonda reklama rejalashtiryapsizmi?")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, fontSize: 18, color: "rgba(255,255,255,0.78)", maxWidth: 480 } }, munaText("\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0431\u0440\u0435\u043D\u0434\u0435, \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438, \u0437\u0430\u0434\u0430\u0447\u0435 \u0438 \u0441\u0440\u043E\u043A\u0430\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438. \u041E\u0431\u0441\u0443\u0434\u0438\u043C \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043A\u0430\u043D\u0430\u043B\u044B.","Brend, auditoriya, vazifa va muddatni yozing. Mos kanallarni birga tanlaymiz.")), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 24,
      paddingTop: 24,
      borderTop: "1px solid rgba(255,255,255,0.18)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" } }, /* @__PURE__ */ React.createElement("strong", null, munaText("\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439 \u043E\u0444\u0438\u0441 \u0422\u0430\u0448\u043A\u0435\u043D\u0442:","Toshkentdagi aloqa manzili:")), /* @__PURE__ */ React.createElement("br", null), munaText("\u0423\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u0430\u043D, \u0433. \u0422\u0430\u0448\u043A\u0435\u043D\u0442, \u0443\u043B. \u0410\u043C\u0438\u0440\u0430 \u0422\u0435\u043C\u0443\u0440\u0430, 107\u0411","O'zbekiston, Toshkent shahri, Amir Temur ko'chasi, 107B"), /* @__PURE__ */ React.createElement("br", null), munaText("\u0411\u0438\u0437\u043D\u0435\u0441-\u0446\u0435\u043D\u0442\u0440 \xABInternational\xBB, 4 \u044D\u0442\u0430\u0436","International biznes markazi, 4-qavat")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "mono", style: { opacity: 0.6, fontSize: 11 } }, munaText("\u041F\u0440\u044F\u043C\u0430\u044F \u043B\u0438\u043D\u0438\u044F","To'g'ridan-to'g'ri aloqa")), /* @__PURE__ */ React.createElement("a", { href: "mailto:info@munamedia.me", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "info@munamedia.me"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "tel:+998901381313", style: { color: "var(--bg)", textDecoration: "none", fontSize: 18, fontWeight: 600 } }, "+998 90 138 13 13")))), /* @__PURE__ */ React.createElement("div", { style: {
      background: "var(--bg)",
      color: "var(--ink)",
      border: "1.5px solid var(--bg)",
      borderRadius: 24,
      padding: 32,
      position: "relative"
    } }, !submitted ? /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement(MunaLeadContactNotice, null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "about-name", className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, munaText("\u0418\u043C\u044F","Ismingiz")), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "about-name",
        name: "name",
        autoComplete: "name",
        className: "input",
        placeholder: munaText("\u041A\u0430\u043C\u0438\u043B\u0430 \u0423\u0441\u043C\u0430\u043D\u043E\u0432\u0430","Ismingizni yozing"),
        value: form.name,
        onChange: (e) => setForm({ ...form, name: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "about-company", className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, munaText("\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F","Kompaniya")), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "about-company",
        name: "company",
        autoComplete: "organization",
        className: "input",
        placeholder: "Brand Co.",
        value: form.company,
        onChange: (e) => setForm({ ...form, company: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, className: "form-contact-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "about-phone", className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, munaText("\u0422\u0435\u043B\u0435\u0444\u043E\u043D","Telefon")), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "about-phone",
        name: "phone",
        autoComplete: "tel",
        className: "input",
        type: "tel",
        placeholder: "+998 90 123 45 67",
        value: form.phone,
        onChange: (e) => setForm({ ...form, phone: e.target.value }),
        required: true
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "about-email", className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, "Email"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "about-email",
        name: "email",
        autoComplete: "email",
        className: "input",
        type: "email",
        placeholder: "name@company.com",
        value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "about-task", className: "mono", style: { color: "var(--muted)", display: "block", marginBottom: 8 } }, munaText("\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442","Rejalashtirilgan budjet")), /* @__PURE__ */ React.createElement(
      "select",
      {
        id: "about-task",
        name: "task",
        autoComplete: "off",
        className: "input",
        value: form.task,
        onChange: (e) => setForm({ ...form, task: e.target.value }),
        required: true,
        style: { height: 58 }
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, munaText("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0431\u044E\u0434\u0436\u0435\u0442\u043E\u0432","Budjet oralig'ini tanlang")),
      /* @__PURE__ */ React.createElement("option", { value: "10k-20k" }, munaText("\u043E\u0442 $10,000 \u0434\u043E $20,000 / \u043C\u0435\u0441","Oyiga $10 000 dan $20 000 gacha")),
      /* @__PURE__ */ React.createElement("option", { value: "20k-50k" }, munaText("\u043E\u0442 $20,000 \u0434\u043E $50,000 / \u043C\u0435\u0441","Oyiga $20 000 dan $50 000 gacha")),
      /* @__PURE__ */ React.createElement("option", { value: "50k+" }, munaText("\u0431\u043E\u043B\u0435\u0435 $50,000 / \u043C\u0435\u0441","Oyiga $50 000 dan ko'p"))
    )), error ? /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "#d32f2f", fontSize: 14 } }, error) : null, /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn", style: { justifyContent: "center", marginTop: 4 }, disabled: submitting }, submitting ? munaText("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C...","Yuborilmoqda...") : munaText("\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0442\u0440\u0435\u0447\u0443","Uchrashuvni muhokama qilish"), /* @__PURE__ */ React.createElement("span", { className: "arrow" }, "\u2192"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", padding: "20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 72,
      height: 72,
      borderRadius: 999,
      background: "var(--accent)",
      border: "1.5px solid var(--ink)",
      display: "grid",
      placeItems: "center",
      fontSize: 32
    } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "display", style: { fontSize: 32, margin: 0 } }, munaText("\u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D!","Arizangiz qabul qilindi!")), /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: "var(--ink-soft)" } }, munaText("\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u043C\u0443 email \u0434\u043B\u044F \u043F\u043E\u0434\u0431\u043E\u0440\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0432\u043E\u043D\u043A\u0430.","Jamoamiz siz bilan bog'lanib, suhbat vaqti va loyiha tafsilotlarini kelishadi."))))))));
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(AboutHero, { variant: t.heroLayout }), /* @__PURE__ */ React.createElement(Positioning, null), /* @__PURE__ */ React.createElement(Sacrifice, null), /* @__PURE__ */ React.createElement(Leadership, null), /* @__PURE__ */ React.createElement(Guarantees, null), /* @__PURE__ */ React.createElement(SLA, null), /* @__PURE__ */ React.createElement(Principles, null), /* @__PURE__ */ React.createElement(AboutCTA, null), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(TweakSection, { label: munaText("\u041F\u0430\u043B\u0438\u0442\u0440\u0430","Ranglar") }), /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Hero" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: munaText("\u0411\u0435\u0439\u0434\u0436","Belgi"),
        value: t.heroLayout,
        options: [
          { value: "default", label: munaText("\u0421 \u0431\u0435\u0439\u0434\u0436\u0435\u043C","Belgili") },
          { value: "minimal", label: munaText("\u0411\u0435\u0437","Belgisiz") }
        ],
        onChange: (v) => setTweak("heroLayout", v)
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
