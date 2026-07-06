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
  const phone = clean(payload.phone);
  const email = clean(payload.email).toLowerCase();
  const task = clean(payload.task);
  const page = clean(payload.page || request.headers.get('referer') || '');

  if (!name || !company || !phone || !email || !task) {
    return json({ ok: false, error: 'Заполните имя, компанию, телефон, email и задачу.' }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Укажите корректный email.' }, 400);
  }

  const submittedAt = new Date().toISOString();
  const lead = {
    _type: 'lead',
    name,
    company,
    phone,
    email,
    task,
    page,
    status: 'new',
    submittedAt,
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

  const telegramResult = await sendTelegramLead(env, lead);
  if (!telegramResult.ok) {
    console.warn('Telegram lead notification was not sent:', telegramResult.reason);
    return json({ ok: false, error: 'Заявка не отправлена в Telegram. Попробуйте позже.' }, 502);
  }

  return json({ ok: true, message: 'Заявка принята.' });
}

export async function onRequestGet() {
  return json({ ok: true, message: 'Muna Media contact endpoint is active. Use POST.' });
}

function clean(value) {
  return String(value || '').trim().slice(0, 4000);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendTelegramLead(env, lead) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, reason: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured' };
  }

  const page = lead.page || '-';
  const text = [
    '📩 Новая заявка с сайта Muna Media',
    '',
    `Имя: ${lead.name}`,
    `Компания: ${lead.company}`,
    `Телефон: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Страница: ${page}`,
    '',
    `Задача / бюджет:\n${lead.task}`,
    '',
    `Время: ${lead.submittedAt}`,
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return { ok: false, reason: details.slice(0, 500) };
  }
  return { ok: true };
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
