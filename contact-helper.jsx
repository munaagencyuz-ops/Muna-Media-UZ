// Shared lead form helper for Muna Media
function createLeadFormState(defaults = {}) {
  return {
    name: '',
    company: '',
    phone: '',
    email: '',
    task: '',
    ...defaults,
  };
}

// RAM only: no form values/nonces in localStorage, sessionStorage, or analytics.
// Keep failed/unknown submissions keyed by their exact bytes across explicit retries.
const pendingLeadSubmissions = new Map();
async function submitLeadForm(form, page) {
  const city = munaCityTask();
  const task = form.task || form.budget || '';
  const payload = {
    name: form.name || '',
    company: form.company || '',
    phone: form.phone || '',
    email: form.email || '',
    task: [city && !task.startsWith(city) ? city : '', task].filter(Boolean).join('\n'),
    page: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
  };
  const body = JSON.stringify(payload);
  let nonce = pendingLeadSubmissions.get(body);
  if (!nonce) {
    if (pendingLeadSubmissions.size >= 32) throw new Error(munaText('Слишком много незавершённых отправок. Свяжитесь с нами по email.', "Tugallanmagan arizalar ko'p. Email orqali bog'laning."));
    nonce = crypto.randomUUID();
    pendingLeadSubmissions.set(body, nonce);
  }
  let response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': nonce },
      body,
    });
  } catch {
    throw new Error(munaText('Подтверждение не получено. Повторите без изменения полей или свяжитесь с нами.', "Tasdiq olinmadi. Maydonlarni o'zgartirmay qayta urining yoki biz bilan bog'laning."));
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok !== true || result.stored !== true || result.delivered?.telegram !== true || result.delivered?.email !== true || typeof result.receipt !== 'string' || !/^lead\.[0-9a-f-]{36}$/.test(result.receipt)) {
    const messages = {
      DELIVERY_UNKNOWN: munaText('Отправка подтверждена не полностью. Не создавайте новую заявку; свяжитесь с нами по email или в Telegram.', "Yuborish to'liq tasdiqlanmadi. Yangi ariza yubormang; email yoki Telegram orqali bog'laning."),
      DELIVERY_PARTIAL: munaText('Заявка отправлена не в оба канала. Повторите без изменения полей — подтверждённый канал не получит дубликат.', "Ariza ikkala kanalga ham yuborilmadi. Maydonlarni o'zgartirmay qayta urining — tasdiqlangan kanalga qayta yuborilmaydi."),
      UNAVAILABLE: munaText('Форма сейчас недоступна. Напишите нам по email или в Telegram.', "Shakl hozir ishlamayapti. Email yoki Telegram orqali yozing."),
      IDEMPOTENCY_CONFLICT: munaText('Ключ отправки уже использован. Свяжитесь с нами по email.', "Yuborish kaliti ishlatilgan. Email orqali bog'laning."),
    };
    throw new Error(messages[result.code] || munaText('Не удалось подтвердить отправку в оба канала. Проверьте поля и повторите без изменений или свяжитесь с нами.', "Ikkala kanalga yuborish tasdiqlanmadi. Maydonlarni tekshiring, o'zgartirmay qayta urining yoki biz bilan bog'laning."));
  }
  pendingLeadSubmissions.delete(body);
  return result;
}

function leadErrorMessage(error) {
  return error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте позже.';
}
