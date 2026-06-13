export async function onRequestGet(context) {
  const {request, env, params} = context
  const url = new URL(request.url)
  const slug = params.slug || url.pathname.split('/').filter(Boolean).pop()
  const post = await getPost(env, slug)
  if (!post) return htmlResponse(renderNotFound(), 404)
  return htmlResponse(renderPost(post, url.origin))
}

async function getPost(env, slug) {
  const query = '*[_type == "blogPost" && slug.current == $slug && published == true][0]{title,"slug":slug.current,excerpt,publishedAt,seoTitle,seoDescription,body}'
  const data = await sanityQuery(env, query, {slug})
  return data?.result || null
}

async function sanityQuery(env, query, params = {}) {
  if (!env.SANITY_PROJECT_ID || !env.SANITY_DATASET) return null
  const apiVersion = env.SANITY_API_VERSION || '2025-01-01'
  const search = new URLSearchParams({query})
  for (const [key, value] of Object.entries(params)) search.set(`$${key}`, JSON.stringify(value))
  const endpoint = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${apiVersion}/data/query/${env.SANITY_DATASET}?${search}`
  const headers = env.SANITY_API_TOKEN ? {authorization: `Bearer ${env.SANITY_API_TOKEN}`} : {}
  const response = await fetch(endpoint, {headers})
  if (!response.ok) return null
  return response.json()
}

function renderPost(post, origin) {
  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || `${post.title} — статья Muna Media.`
  return layout({title, description, canonical: `${origin}/blog/${escapeAttr(post.slug)}`, body: `
    <article class="article">
      <a class="back" href="/blog">← Все статьи</a>
      <div class="mono">${formatDate(post.publishedAt)}</div>
      <h1>${escapeHtml(post.title)}</h1>
      ${post.excerpt ? `<p class="lead">${escapeHtml(post.excerpt)}</p>` : ''}
      <div class="article-body">${portableTextToHtml(post.body || [])}</div>
    </article>`})
}

function renderNotFound() {
  return layout({title: 'Статья не найдена — Muna Media', description: 'Статья не найдена.', body: '<section class="hero"><h1>Статья не найдена</h1><p><a href="/blog">Вернуться в блог</a></p></section>'})
}

function layout({title, description, canonical = '', body}) {
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeAttr(description)}">${canonical ? `<link rel="canonical" href="${escapeAttr(canonical)}">` : ''}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"><style>:root{--bg:#fff;--bg-2:#F5F5F7;--ink:#000;--muted:#86868B;--accent:#295AE9;--shadow:6px 6px 0 0 var(--ink)}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Montserrat,system-ui,sans-serif;line-height:1.55}.container{max-width:1180px;margin:0 auto;padding:0 28px}.nav{border-bottom:1.5px solid var(--ink);background:#fff;position:sticky;top:0;z-index:10}.nav-inner{height:70px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:800;text-decoration:none;color:#000}.nav a{color:#000;text-decoration:none;font-weight:600}.nav-links{display:flex;gap:18px;align-items:center}.btn{display:inline-flex;padding:14px 20px;border:1.5px solid #000;border-radius:999px;background:#000;color:#fff!important}h1{font-size:clamp(40px,6vw,82px);line-height:1.03;letter-spacing:-.04em;margin:24px 0 18px}.lead{font-size:20px;max-width:820px;color:#1D1D1F}.mono{font:600 12px JetBrains Mono;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}.article{max-width:860px;margin:0 auto;padding:56px 28px 100px}.back{color:#000;font-weight:700}.article-body{font-size:18px}.article-body h2{font-size:34px;margin-top:42px}.article-body h3{font-size:26px;margin-top:32px}.article-body p{margin:18px 0}footer{border-top:1.5px solid #000;padding:28px 0;color:var(--muted)}@media(max-width:700px){.nav-links{display:none}.container{padding:0 18px}.article{padding-left:18px;padding-right:18px}}</style></head><body><nav class="nav"><div class="container nav-inner"><a class="brand" href="/">Muna Media</a><div class="nav-links"><a href="/services-uzbekistan.html">Услуги</a><a href="/cases.html">Кейсы</a><a href="/blog">Блог</a><a href="/about.html">О компании</a><a class="btn" href="/#contact">Запустить проект</a></div></div></nav><main class="container">${body}</main><footer><div class="container">© Muna Media · <a href="/">Главная</a></div></footer></body></html>`
}

function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks) || !blocks.length) return '<p>Текст статьи пока не заполнен.</p>'
  return blocks.map(block => {
    if (block._type !== 'block') return ''
    const children = (block.children || []).map(child => escapeHtml(child.text || '')).join('')
    if (block.style === 'h2') return `<h2>${children}</h2>`
    if (block.style === 'h3') return `<h3>${children}</h3>`
    if (block.style === 'blockquote') return `<blockquote>${children}</blockquote>`
    return `<p>${children}</p>`
  }).join('')
}

function htmlResponse(html, status = 200) { return new Response(html, {status, headers: {'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60'}}) }
function formatDate(value) { return value ? new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(value)) : '' }
function escapeHtml(value) { return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') }
function escapeAttr(value) { return escapeHtml(value) }
