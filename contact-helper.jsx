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

async function submitLeadForm(form, page) {
  const payload = {
    name: form.name || '',
    company: form.company || '',
    phone: form.phone || '',
    email: form.email || '',
    task: form.task || form.budget || '',
    page: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
  };

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok === false) {
    throw new Error(result.error || 'Не удалось отправить заявку. Попробуйте позже.');
  }
  return result;
}

function leadErrorMessage(error) {
  return error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте позже.';
}
