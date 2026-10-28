// Locale selection is explicit in HTML, never inferred from location/IP or a cookie.
const MUNA_UZ = document.documentElement.lang === 'uz';
function munaText(ru, uz) { return MUNA_UZ ? uz : ru; }
function munaCityTask() {
 const code=new URLSearchParams(window.location.search).get('soato');
 return Object.hasOwn(MUNA_CITY_NAMES,code) ? munaText('Город: ', 'Shahar: ')+MUNA_CITY_NAMES[code]+' (SOATO '+code+')' : '';
}
function munaLocaleHref(href) {
 if (typeof href !== 'string') return href;
 if (href.startsWith('assets/')) return '/' + href;
 if (!MUNA_UZ && href.startsWith('/') && !href.startsWith('//') && !/^\/(assets|api|cms|ru)(\/|$)/.test(href)) {
  return '/ru' + (href === '/' ? '/' : href);
 }
 return href;
}
const munaCreateElement = React.createElement;
React.createElement = function(type, props, ...children) {
 if (props && typeof type === 'string') {
  props={...props};
  if(props.href && !props['data-locale-switch'])props.href=munaLocaleHref(props.href);
  if(typeof props.src==='string' && props.src.startsWith('assets/'))props.src='/'+props.src;
 }
 return munaCreateElement.call(React,type,props,...children);
};
function MunaLanguageLink() {
 const path=window.location.pathname.replace(/\.html$/,'').replace(/\/$/,'') || '/';
 const target=MUNA_UZ ? '/ru'+(path==='/'?'/':path) : path.replace(/^\/ru(?=\/|$)/,'')||'/';
 return <a className="nav-link" href={target} hrefLang={MUNA_UZ?'ru':'uz'} lang={MUNA_UZ?'ru':'uz'} data-locale-switch="true">{MUNA_UZ?'Русский':"O'zbekcha"}</a>;
}
