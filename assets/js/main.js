/* ── FAQ Accordion ───────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const header = item.querySelector('.faq-header');
  if (!header) return;
  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const h = i.querySelector('.faq-header');
      if (h) h.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Program Tabs ────────────────────────────────────────── */
const progTabs = document.querySelector('.prog-tabs');
if (progTabs) {
  progTabs.addEventListener('click', e => {
    const tab = e.target.closest('[data-panel]');
    if (!tab) return;
    document.querySelectorAll('.prog-tab').forEach(t => {
      t.classList.remove('prog-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.prog-panel').forEach(p => p.classList.remove('prog-panel--active'));
    tab.classList.add('prog-tab--active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-' + tab.dataset.panel);
    if (panel) panel.classList.add('prog-panel--active');
  });
}

/* ── Sticky mobile CTA ───────────────────────────────────── */
const hero = document.querySelector('.hero');
const stickyCTA = document.querySelector('.sticky-cta');

if (hero && stickyCTA) {
  const observer = new IntersectionObserver(
    ([entry]) => stickyCTA.classList.toggle('visible', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
}

/* ── Contact form (Ajax) ─────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('contactSubmitBtn');
    const successEl = document.getElementById('contactSuccess');
    const errorEl = document.getElementById('contactError');

    btn.disabled = true;
    btn.textContent = '送信中...';
    errorEl.style.display = 'none';

    try {
      const res = await fetch('https://formspree.io/f/xljrkrbk', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });
      if (res.ok) {
        contactForm.querySelectorAll('input, textarea').forEach(el => el.value = '');
        successEl.style.display = 'block';
        btn.style.display = 'none';
      } else {
        throw new Error();
      }
    } catch {
      errorEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = '送信する';
    }
  });
}
