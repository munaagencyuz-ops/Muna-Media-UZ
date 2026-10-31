import compiled from './dist/_worker.js';
export { LeadDelivery } from './server/lead-delivery.mjs';

export default {
  async fetch(request, env, context) {
    let path;
    try { path = decodeURIComponent(new URL(request.url).pathname); } catch { path = '/invalid-path'; }
    // CMS/studio stay on their original private origin via explicit route exclusions.
    // Defense in depth: never serve their assets if an exclusion is misconfigured.
    if (/^\/(cms|studio|admin)(\/|$)/.test(path)) {
      return new Response('Not found', {status:404,headers:{'x-robots-tag':'noindex','cache-control':'no-store'}});
    }
    if (path.startsWith('/api/') && env.LEAD_RATE_LIMITER) {
      try {
        const {success} = await env.LEAD_RATE_LIMITER.limit({key:request.headers.get('cf-connecting-ip') || 'unknown-client'});
        if (!success) return Response.json({ok:false,stored:false,error:'Bir ozdan keyin qayta urinib ko‘ring.'},{status:429,headers:{'cache-control':'no-store','retry-after':'60'}});
      } catch { return Response.json({ok:false,stored:false},{status:503,headers:{'cache-control':'no-store'}}); }
    }
    const original = await compiled.fetch(request, env, context);
    const response = new Response(original.body, original);
    response.headers.set('X-Frame-Options','DENY');
    response.headers.set('X-Content-Type-Options','nosniff');
    response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    if ((response.headers.get('content-type') || '').includes('text/html')) response.headers.set('Cache-Control','public, max-age=0, must-revalidate');
    if (path.startsWith('/assets/')) response.headers.set('Cache-Control','public, max-age=31536000, immutable');
    if (path.startsWith('/api/')) response.headers.set('Cache-Control','no-store');
    return response;
  }
};
