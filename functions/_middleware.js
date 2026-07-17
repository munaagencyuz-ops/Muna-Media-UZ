export async function onRequest(context) {
  const {request} = context
  const url = new URL(request.url)

  if (request.method === 'GET' && url.hostname === 'www.munamedia.uz') {
    return Response.redirect(`https://munamedia.uz${url.pathname}${url.search}${url.hash}`, 301)
  }

  if (request.method === 'GET' && url.pathname.endsWith('.html')) {
    const cleanPath = normalizePath(url.pathname)
    return Response.redirect(`https://munamedia.uz${cleanPath === '/' ? '/' : cleanPath}${url.search}${url.hash}`, 301)
  }

  if (request.method !== 'GET' || shouldSkip(url.pathname)) {
    return context.next()
  }

  const response = await context.next()
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) return response

  const normalizedPath = normalizePath(url.pathname)
  const seo = await getPageSeo(context.env, normalizedPath)
  const canonicalUrl = seo?.canonicalUrl || defaultCanonicalUrl(normalizedPath)

  const rewriter = new HTMLRewriter()
  if (seo?.metaTitle) rewriter.on('title', replaceText(seo.metaTitle))
  if (seo?.metaDescription) rewriter.on('meta[name="description"]', setAttr('content', seo.metaDescription))
  if (seo?.h1) rewriter.on('h1', replaceFirstText(seo.h1))
  if (seo?.subtitle) rewriter.on('[data-cms="subtitle"]', replaceFirstText(seo.subtitle))
  rewriter.on('head', appendHtml(seo?.noindex ? '<meta name="robots" content="noindex,nofollow">' : '<meta name="robots" content="index,follow">'))

  return rewriter.transform(response)
}

function shouldSkip(pathname) {
  return pathname.startsWith('/api/') || pathname.startsWith('/blog') || pathname.startsWith('/assets/') || pathname.includes('.') && !pathname.endsWith('.html')
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') return '/'
  let path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
  if (path.endsWith('.html')) path = path.slice(0, -5)
  return path || '/'
}

function defaultCanonicalUrl(path) {
  return `https://munamedia.uz${path === '/' ? '/' : path}`
}

function buildJsonLd(path, canonicalUrl) {
  const base = 'https://munamedia.uz'
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'AdvertisingAgency',
    '@id': `${base}/#organization`,
    name: 'Muna Media',
    url: base + '/',
    logo: `${base}/assets/logo/muna-media-navbar-logo.png`,
    areaServed: [{ '@type': 'Country', name: 'Uzbekistan' }, { '@type': 'City', name: 'Tashkent' }],
    contactPoint: [{ '@type': 'ContactPoint', telephone: '+998331301313', contactType: 'sales', availableLanguage: ['ru', 'uz', 'en'] }],
    sameAs: ['https://t.me/munamedia']
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base + '/',
    name: 'Muna Media',
    publisher: { '@id': `${base}/#organization` },
    inLanguage: 'ru'
  }
  const graph = [organization, website]
  const serviceNames = {
    '/services-uzbekistan': 'Маркетинговые услуги в Узбекистане',
    '/influence': 'Influence-маркетинг в Узбекистане',
    '/influencer-marketing': 'Инфлюенс-маркетинг в Узбекистане',
    '/telegram-marketing': 'Telegram-маркетинг в Узбекистане',
    '/smm': 'SMM в Узбекистане',
    '/seo-optimization': 'SEO-оптимизация в Узбекистане',
    '/context-ads': 'Контекстная реклама в Узбекистане',
    '/event-management': 'Ивент-менеджмент в Узбекистане',
    '/gas-station-ads': 'Реклама на АЗС в Узбекистане',
    '/airport-ads': 'Реклама в аэропорту в Узбекистане',
    '/bus-ads': 'Реклама на автобусах в Узбекистане',
    '/bus-stop-ads': 'Реклама на автобусных остановках в Узбекистане',
    '/led-screens': 'Реклама на LED-экранах в Ташкенте',
    '/mall-ads': 'Реклама в торговых центрах в Узбекистане',
    '/metro-ads': 'Реклама в метро в Ташкенте'
  }
  if (serviceNames[path]) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: serviceNames[path],
      provider: { '@id': `${base}/#organization` },
      areaServed: { '@type': 'Country', name: 'Uzbekistan' },
      url: canonicalUrl
    })
  }
  if (path !== '/') {
    const name = serviceNames[path] || path.replace('/', '').replaceAll('-', ' ')
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: base + '/' },
        { '@type': 'ListItem', position: 2, name, item: canonicalUrl }
      ]
    })
  }
  return `<script type="application/ld+json">${escapeScript(JSON.stringify(graph))}</script>`
}

async function getPageSeo(env, path) {
  if (!env.SANITY_PROJECT_ID || !env.SANITY_DATASET) return null
  const query = '*[_type == "pageSeo" && path == $path][0]{metaTitle,metaDescription,h1,subtitle,canonicalUrl,noindex}'
  const data = await sanityQuery(env, query, {path})
  return data?.result || null
}

async function sanityQuery(env, query, params = {}) {
  const apiVersion = env.SANITY_API_VERSION || '2025-01-01'
  const search = new URLSearchParams({query})
  for (const [key, value] of Object.entries(params)) search.set(`$${key}`, JSON.stringify(value))
  const endpoint = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${apiVersion}/data/query/${env.SANITY_DATASET}?${search}`
  const headers = env.SANITY_API_TOKEN ? {authorization: `Bearer ${env.SANITY_API_TOKEN}`} : {}
  const response = await fetch(endpoint, {headers})
  if (!response.ok) {
    console.error('Sanity SEO query failed', response.status, await response.text())
    return null
  }
  return response.json()
}

function replaceText(text) { return {element(element) { element.setInnerContent(text) }} }
function replaceFirstText(text) { let done = false; return {element(element) { if (!done) { element.setInnerContent(text); done = true } }} }
function setAttr(name, value) { return {element(element) { element.setAttribute(name, value) }} }
function appendHtml(html) { return {element(element) { element.append(html, {html: true}) }} }
function escapeAttr(value) { return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;') }
function escapeScript(value) { return String(value).replaceAll('</script', '<\\/script') }
