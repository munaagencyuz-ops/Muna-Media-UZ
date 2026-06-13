export async function onRequestGet(context) {
  const {request, env} = context
  const url = new URL(request.url)
  const slug = getSlug(url.pathname)

  if (slug) {
    const post = await getPost(env, slug)
    if (!post) return htmlResponse(renderNotFound(), 404)
    return htmlResponse(renderPost(post, url.origin))
  }

  const posts = await getPosts(env)
  return htmlResponse(renderIndex(posts, url.origin))
}

function getSlug(pathname) {
  const cleaned = pathname.replace(/^\/blog\/?/, '').replace(/\/$/, '')
  return cleaned || ''
}

async function getPosts(env) {
  const query = '*[_type == "blogPost" && published == true && defined(slug.current)] | order(publishedAt desc){title,"slug":slug.current,excerpt,publishedAt,seoTitle,seoDescription}'
  const data = await sanityQuery(env, query)
  return data?.result || []
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
  if (!response.ok) {
    console.error('Sanity blog query failed', response.status, await response.text())
    return null
  }
  return response.json()
}

function renderIndex(posts, origin) {
  const title = 'Блог Muna Media — маркетинг и реклама в Узбекистане'
  const description = 'Статьи Muna Media про маркетинг, рекламу, SEO, инфлюенсеров и выход брендов на рынок Узбекистана.'
  const cards = posts.length ? posts.map(post => `
    <article class="post-card">
      <div class="mono">${formatDate(post.publishedAt)}</div>
      <h2><a href="/blog/${escapeAttr(post.slug)}">${escapeHtml(post.title)}</a></h2>
      ${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ''}
      <a class="read-more" href="/blog/${escapeAttr(post.slug)}">Читать статью →</a>
    </article>`).join('') : `<div class="empty card">Пока нет опубликованных статей. Создайте первую статью в Sanity Studio → Blog Posts.</div>`

  return layout({
    title,
    description,
    canonical: `${origin}/blog`,
    body: `
      <section class="hero">
        <div class="pill"><span class="dot"></span> Muna Media Blog</div>
        <h1>Блог о маркетинге и рекламе в Узбекистане</h1>
        <p>Публикуйте статьи в Sanity — они автоматически появятся здесь с SEO title, description, H1 и отдельной страницей.</p>
      </section>
      <section class="posts-grid">${cards}</section>
    `,
  })
}

function renderPost(post, origin) {
  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || `${post.title} — статья Muna Media.`
  const body = portableTextToHtml(post.body || [])
  return layout({
    title,
    description,
    canonical: `${origin}/blog/${escapeAttr(post.slug)}`,
    body: `
      <article class="article">
        <a class="back" href="/blog">← Все статьи</a>
        <div class="mono">${formatDate(post.publishedAt)}</div>
        <h1>${escapeHtml(post.title)}</h1>
        ${post.excerpt ? `<p class="lead">${escapeHtml(post.excerpt)}</p>` : ''}
        <div class="article-body">${body}</div>
      </article>
    `,
  })
}

function renderNotFound() {
  return layout({
    title: 'Статья не найдена — Muna Media',
    description: 'Статья не найдена.',
    body: '<section class="hero"><h1>Статья не найдена</h1><p><a href="/blog">Вернуться в блог</a></p></section>',
  })
}

function layout({title, description, canonical = '', body}) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeAttr(description)}">
${canonical ? `<link rel="canonical" href="${escapeAttr(canonical)}">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#fff;--bg-2:#F5F5F7;--ink:#000;--muted:#86868B;--accent:#295AE9;--shadow:6px 6px 0 0 var(--ink)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Montserrat,system-ui,sans-serif;line-height:1.55}.container{max-width:1180px;margin:0 auto;padding:0 28px}.nav{border-bottom:1.5px solid var(--ink);background:#fff;position:sticky;top:0;z-index:10}.nav-inner{height:70px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:800;text-decoration:none;color:#000}.nav a{color:#000;text-decoration:none;font-weight:600}.nav-links{display:flex;gap:18px;align-items:center}.btn{display:inline-flex;padding:14px 20px;border:1.5px solid #000;border-radius:999px;background:#000;color:#fff!important}.hero{padding:76px 0 44px}.pill{display:inline-flex;gap:8px;align-items:center;border:1.5px solid #000;border-radius:999px;padding:8px 14px;font:600 11px JetBrains Mono;text-transform:uppercase}.dot{width:8px;height:8px;border-radius:99px;background:var(--accent)}h1{font-size:clamp(40px,6vw,82px);line-height:1.03;letter-spacing:-.04em;margin:24px 0 18px}h2{font-size:28px;line-height:1.15;margin:8px 0 12px}.hero p,.lead{font-size:20px;max-width:820px;color:#1D1D1F}.posts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;padding:20px 0 80px}.post-card,.card{border:1.5px solid #000;border-radius:24px;padding:28px;background:#fff;box-shadow:var(--shadow)}.post-card a{color:#000}.read-more{display:inline-block;margin-top:12px;font-weight:700}.mono{font:600 12px JetBrains Mono;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}.article{max-width:860px;margin:0 auto;padding:56px 28px 100px}.back{color:#000;font-weight:700}.article-body{font-size:18px}.article-body h2{font-size:34px;margin-top:42px}.article-body h3{font-size:26px;margin-top:32px}.article-body p{margin:18px 0}.article-body ul,.article-body ol{padding-left:24px}.article-body blockquote{border-left:5px solid var(--accent);margin:28px 0;padding:10px 0 10px 20px;background:var(--bg-2)}footer{border-top:1.5px solid #000;padding:28px 0;color:var(--muted)}@media(max-width:700px){.nav-links{display:none}.container{padding:0 18px}.article{padding-left:18px;padding-right:18px}}
</style>
</head>
<body>
<nav class="nav"><div class="container nav-inner"><a class="brand" href="/">Muna Media</a><div class="nav-links"><a href="/services-uzbekistan.html">Услуги</a><a href="/cases.html">Кейсы</a><a href="/blog">Блог</a><a href="/about.html">О компании</a><a class="btn" href="/#contact">Запустить проект</a></div></div></nav>
<main class="container">${body}</main>
<footer><div class="container">© Muna Media · <a href="/">Главная</a></div></footer>
</body></html>`
}

function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks) || !blocks.length) return '<p>Текст статьи пока не заполнен.</p>'
  return blocks.map(block => {
    if (block._type !== 'block') return ''
    const children = (block.children || []).map(child => renderSpan(child, block.markDefs || [])).join('')
    switch (block.style) {
      case 'h2': return `<h2>${children}</h2>`
      case 'h3': return `<h3>${children}</h3>`
      case 'blockquote': return `<blockquote>${children}</blockquote>`
      default: return `<p>${children}</p>`
    }
  }).join('')
}

function renderSpan(child, markDefs) {
  let text = escapeHtml(child.text || '')
  for (const mark of child.marks || []) {
    if (mark === 'strong') text = `<strong>${text}</strong>`
    if (mark === 'em') text = `<em>${text}</em>`
    const def = markDefs.find(item => item._key === mark && item._type === 'link')
    if (def?.href) text = `<a href="${escapeAttr(def.href)}">${text}</a>`
  }
  return text
}

function htmlResponse(html, status = 200) {
  return new Response(html, {status, headers: {'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60'}})
}

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(value))
}

function escapeHtml(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function escapeAttr(value) { return escapeHtml(value) }
