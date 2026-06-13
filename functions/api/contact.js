export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const name = clean(payload.name);
  const company = clean(payload.company);
  const task = clean(payload.task);
  const page = clean(payload.page || request.headers.get('referer') || '');

  if (!name || !company || !task) {
    return json({ ok: false, error: 'Заполните имя, компанию и задачу.' }, 400);
  }

  const lead = {
    _type: 'lead',
    name,
    company,
    task,
    page,
    status: 'new',
    submittedAt: new Date().toISOString(),
  };

  if (env.SANITY_PROJECT_ID && env.SANITY_DATASET && env.SANITY_API_TOKEN) {
    const apiVersion = env.SANITY_API_VERSION || '2025-01-01';
    const url = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${apiVersion}/data/mutate/${env.SANITY_DATASET}`;

    const sanityResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [{ create: lead }] }),
    });

    if (!sanityResponse.ok) {
      const details = await sanityResponse.text();
      console.error('Sanity lead create failed:', details);
      return json({ ok: false, error: 'Не удалось сохранить заявку. Попробуйте позже.' }, 502);
    }
  } else {
    console.warn('Sanity env vars are not configured; lead was not persisted.', lead);
  }

  return json({ ok: true, message: 'Заявка принята.' });
}

export async function onRequestGet() {
  return json({ ok: true, message: 'Muna Media contact endpoint is active. Use POST.' });
}

function clean(value) {
  return String(value || '').trim().slice(0, 4000);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
