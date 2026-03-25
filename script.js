(function () {
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
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'signup_submit',
        signup_role: role || 'unknown',
      });
      alert('Dziękujemy! (demo)\n\n' + line);
      form.reset();
    });
  }
})();
