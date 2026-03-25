(function () {
  function pushDL(obj) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj);
  }

  var path = (typeof location !== 'undefined' && location.pathname) || '';
  if (path.indexOf('pricing.html') !== -1) {
    pushDL({ event: 'pricing_view' });
  }

  var scroll75Done = false;
  function scrollPct() {
    var el = document.documentElement;
    var st = el.scrollTop || document.body.scrollTop;
    var total = el.scrollHeight - el.clientHeight;
    return total <= 0 ? 1 : st / total;
  }
  function onScroll() {
    if (scroll75Done || scrollPct() < 0.75) return;
    scroll75Done = true;
    pushDL({ event: 'scroll_75' });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target && e.target.closest && e.target.closest('[data-gtm-cta]');
      if (!el) return;
      var label = el.getAttribute('data-gtm-cta');
      if (!label) return;
      pushDL({ event: 'cta_click', cta_label: label });
    },
    true
  );

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('hidden');
      var open = !mobileNav.classList.contains('hidden');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var email = (fd.get('email') || '').toString().trim();
      var vehicle = (fd.get('vehicle') || '').toString().trim().toUpperCase();
      var role = (fd.get('role') || '').toString();
      var roleLabel = { driver: 'Kierowca', inspector: 'Kontroler biletów' }[role] || '—';
      // Przykładowy wiersz danych (LAB) — w produkcji: fetch do backendu / analytics
      var line = 'email: ' + email + ' | rejestracja: ' + vehicle + ' | rola: ' + roleLabel;
      console.log('[poBilet signup]', line);
      pushDL({
        event: 'form_submit',
        form_id: 'signup',
        signup_role: role || 'unknown',
      });
      alert('Dziękujemy! (demo)\n\n' + line);
      form.reset();
    });
  }
})();
