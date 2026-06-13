export async function onRequest(context) {
  const {request} = context
  const url = new URL(request.url)

  if (request.method === 'GET' && url.hostname === 'munamedia.uz' && url.pathname.startsWith('/cms')) {
    return Response.redirect(`https://www.munamedia.uz${url.pathname}${url.search}`, 301)
  }

  if (request.method !== 'GET' || shouldSkip(url.pathname)) {
    return context.next()
  }

  const response = await context.next()
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) return response

  const seo = await getPageSeo(context.env, normalizePath(url.pathname))
  if (!seo) return response

  const rewriter = new HTMLRewriter()
  if (seo.metaTitle) rewriter.on('title', replaceText(seo.metaTitle))
  if (seo.metaDescription) rewriter.on('meta[name="description"]', setAttr('content', seo.metaDescription))
  if (seo.h1) rewriter.on('h1', replaceFirstText(seo.h1))
  if (seo.subtitle) rewriter.on('[data-cms="subtitle"]', replaceFirstText(seo.subtitle))
  if (seo.canonicalUrl) rewriter.on('head', appendHtml(`<link rel="canonical" href="${escapeAttr(seo.canonicalUrl)}">`))
  if (seo.noindex) rewriter.on('head', appendHtml('<meta name="robots" content="noindex,nofollow">'))

  return rewriter.transform(response)
}

function shouldSkip(pathname) {
  return pathname.startsWith('/api/') || pathname.startsWith('/blog') || pathname.startsWith('/assets/') || pathname.includes('.') && !pathname.endsWith('.html')
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') return '/'
  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
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

function replaceText(text) {
  return {element(element) { element.setInnerContent(text) }}
}

function replaceFirstText(text) {
  let done = false
  return {element(element) { if (!done) { element.setInnerContent(text); done = true } }}
}

function setAttr(name, value) {
  return {element(element) { element.setAttribute(name, value) }}
}

function appendHtml(html) {
  return {element(element) { element.append(html, {html: true}) }}
}

function escapeAttr(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}
