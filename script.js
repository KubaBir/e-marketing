(function () {
    function pushDL(obj) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(obj);
    }

    function getAbVariant() {
        var key = 'ab_variant';
        var variant;
        try {
            variant = localStorage.getItem(key);
        } catch (err) {
            variant = null;
        }

        if (variant !== 'A' && variant !== 'B') {
            variant = Math.random() < 0.5 ? 'A' : 'B';
            try {
                localStorage.setItem(key, variant);
            } catch (err) {
                // brak dostępu do localStorage
            }
        }
        return variant;
    }

    function applyAbVariant(variant) {
        var ctaMain = document.getElementById('cta-main');
        if (!ctaMain) return;

        if (variant === 'B') {
            ctaMain.textContent = 'Zacznij teraz';
            return;
        }
        ctaMain.textContent = 'Wypróbuj za darmo';
    }

    var abVariant = getAbVariant();
    applyAbVariant(abVariant);
    pushDL({ event: 'ab_impression', variant: abVariant });

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
            pushDL({ event: 'cta_click', cta_label: label, variant: abVariant });
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
            var line = 'email: ' + email + ' | rejestracja: ' + vehicle + ' | rola: ' + roleLabel;
            console.log('[poBilet signup]', line);
            pushDL({
                event: 'form_submit',
                form_id: 'signup',
                signup_role: role || 'unknown',
                variant: abVariant,
            });
            alert('Dziękujemy! (demo)\n\n' + line);
            form.reset();
        });
    }
})();
