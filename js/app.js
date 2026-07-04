/* ====================================================
   FINFLOW — app.js  (utilidades globales)
   GA6-220501096-AA4-EV03
   ==================================================== */

// ── Formateo de moneda ────────────────────────────────
function formatCurrency(value, currency = 'COP') {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

// ── Formateo de fecha ─────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Toast notifications ───────────────────────────────
function showToast(message, type = 'info', duration = 3000) {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ── Validación de formulario ──────────────────────────
function validateForm(formEl) {
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form-group');
    const errEl = group && group.querySelector('.error-msg');
    if (!field.value.trim()) {
      field.classList.add('error');
      if (errEl) errEl.textContent = 'Este campo es obligatorio.';
      valid = false;
    } else {
      field.classList.remove('error');
      if (errEl) errEl.textContent = '';
    }
  });
  return valid;
}

// ── Barra lateral responsiva ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar   = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target) && e.target !== toggleBtn) sidebar.classList.remove('open');
    });
  }

  // Marcar nav-item activo
  const currentPage = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === currentPage) item.classList.add('active');
  });
});
