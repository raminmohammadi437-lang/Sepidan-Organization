const currentPage = location.pathname.split('/').pop() || 'index.html';
const pageLinks = [
  ['index.html', 'Home'],
  ['about.html', 'About'],
  ['schedule.html', 'Schedule'],
  ['announcements.html', 'Announcements'],
  ['verify.html', 'Diploma Verification'],
  ['contact.html', 'Contact']
];

const logoMarkup = (size = 'md') => {
  const sizeClass = size === 'lg' ? 'brand-mark-lg' : 'brand-mark';
  return `<span class="${sizeClass}" aria-hidden="true"><img src="assets/sepidan-logo-official.png" alt=""></span>`;
};

const shellHeader = document.querySelector('[data-site-header]');
if (shellHeader) {
  shellHeader.innerHTML = `
    <a href="#main" class="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-navy px-4 py-2 text-white focus:not-sr-only">Skip to content</a>
    <header class="sticky top-0 z-40 border-b border-[#dbe6f0] bg-white/95 shadow-[0_10px_30px_-28px_rgba(15,29,46,.65)] backdrop-blur">
      <div class="public-shell flex h-[88px] items-center justify-between">
        <a href="index.html" class="flex items-center gap-3" aria-label="Sepidan Organization home">${logoMarkup()}<span class="text-sm font-extrabold tracking-tight text-navy sm:text-base">Sepidan Organization</span></a>
        <div class="flex items-center gap-3">
          <nav class="hidden items-center gap-5 md:flex lg:gap-7" aria-label="Primary navigation">${pageLinks.map(([url, label]) => `<a class="nav-link ${currentPage === url ? 'active' : ''}" href="${url}">${label}</a>`).join('')}</nav>
          <button data-language-toggle class="language-toggle gap-2" type="button"><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg><span data-language-label>دری</span></button>
          <button data-menu-button class="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy md:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
        </div>
      </div>
      <nav id="mobile-menu" data-mobile-menu class="hidden border-t border-slate-100 bg-white px-5 py-4 md:hidden" aria-label="Mobile navigation"><div class="mx-auto grid max-w-shell gap-1">${pageLinks.map(([url, label]) => `<a data-mobile-link class="rounded-lg px-4 py-3 font-semibold ${currentPage === url ? 'bg-mist text-navy' : 'text-navy/75 hover:bg-mist'}" href="${url}">${label}</a>`).join('')}</div></nav>
    </header>`;
}

const shellFooter = document.querySelector('[data-site-footer]');
if (shellFooter) {
  shellFooter.innerHTML = `
    <footer class="border-t border-[#dbe6f0] bg-white py-16 text-navy">
      <div class="public-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
        <div><div class="flex items-center gap-3">${logoMarkup('lg')}<span class="text-lg font-extrabold">Sepidan Organization</span></div><p class="mt-4 max-w-sm text-sm leading-6 text-muted">Cultivating confidence and empowering futures through education, culture, technology, and youth leadership.</p></div>
        <div><h2 class="text-sm font-extrabold">Quick links</h2><nav class="mt-4 grid gap-3 text-sm font-semibold text-muted"><a class="hover:text-brandblue" href="about.html">About</a><a class="hover:text-brandblue" href="schedule.html">Schedule</a><a class="hover:text-brandblue" href="announcements.html">Announcements</a><a class="hover:text-brandblue" href="verify.html">Diploma verification</a></nav></div>
        <div><h2 class="text-sm font-extrabold">Contact</h2><address class="mt-4 space-y-3 text-sm not-italic text-muted"><p>Kabul, Afghanistan</p><p><a class="hover:text-brandblue" href="mailto:info@sepidan.org">info@sepidan.org</a></p><p><a class="hover:text-brandblue" href="https://wa.me/93791448387" target="_blank" rel="noreferrer">WhatsApp: 079 144 8387</a></p><p><a class="hover:text-brandblue" href="https://www.linkedin.com/company/sepidan-organization/" target="_blank" rel="noreferrer">LinkedIn</a></p></address></div>
      </div>
      <div class="public-shell mt-12 border-t border-[#dbe6f0] pt-6 text-xs text-muted"><p>© 2026 Sepidan Organization. Public information sourced from the organization’s official LinkedIn presence.</p></div>
    </footer>`;
}

const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileMenu?.classList.toggle('hidden');
});

document.querySelectorAll('[data-mobile-link]').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.add('hidden');
  });
});

const marquee = document.querySelector('.marquee');
const marqueeTrack = marquee?.querySelector('.marquee-track');
const marqueeToggle = document.querySelector('[data-marquee-toggle]');
const marqueePauseIcon = document.querySelector('[data-marquee-pause]');
const marqueePlayIcon = document.querySelector('[data-marquee-play]');
let marqueeSpeedFrame;
let marqueeManuallyPaused = false;
if (marqueeTrack) marqueeTrack.dataset.marqueeRate = '1.000';

function easeMarqueeSpeed(targetRate, duration) {
  if (marqueeManuallyPaused && targetRate > 0) return;
  const animation = marqueeTrack?.getAnimations()[0];
  if (!animation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cancelAnimationFrame(marqueeSpeedFrame);
  const startingRate = animation.playbackRate;
  const startedAt = performance.now();

  const updateSpeed = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const nextRate = startingRate + ((targetRate - startingRate) * eased);
    if (typeof animation.updatePlaybackRate === 'function') animation.updatePlaybackRate(nextRate);
    else animation.playbackRate = nextRate;
    marqueeTrack.dataset.marqueeRate = nextRate.toFixed(3);
    if (progress < 1) marqueeSpeedFrame = requestAnimationFrame(updateSpeed);
  };

  marqueeSpeedFrame = requestAnimationFrame(updateSpeed);
}

function refreshMarqueeControl() {
  if (!marqueeToggle) return;
  const englishLabel = marqueeManuallyPaused ? 'Resume program animation' : 'Pause program animation';
  marqueeToggle.setAttribute('aria-pressed', String(marqueeManuallyPaused));
  marqueeToggle.setAttribute('aria-label', window.SepidanI18n?.translatePhrase(englishLabel) || englishLabel);
  marqueePauseIcon?.classList.toggle('hidden', marqueeManuallyPaused);
  marqueePlayIcon?.classList.toggle('hidden', !marqueeManuallyPaused);
}

marqueeToggle?.addEventListener('click', () => {
  marqueeManuallyPaused = !marqueeManuallyPaused;
  easeMarqueeSpeed(marqueeManuallyPaused ? 0 : 1, marqueeManuallyPaused ? 900 : 700);
  refreshMarqueeControl();
});

document.addEventListener('languagechange', refreshMarqueeControl);

marquee?.addEventListener('pointerenter', () => easeMarqueeSpeed(0, 1400));
marquee?.addEventListener('pointerleave', () => easeMarqueeSpeed(1, 850));
marquee?.addEventListener('focusin', () => easeMarqueeSpeed(0, 1400));
marquee?.addEventListener('focusout', (event) => {
  if (!marquee.contains(event.relatedTarget)) easeMarqueeSpeed(1, 850);
});

const diplomaRecords = {
  'DEMO-SEPIDAN-2026': {
    name: 'Prototype record',
    program: 'Youth Development Program',
    issued: 'Demo only — not an official certificate',
    number: 'DEMO-SEPIDAN-2026'
  }
};

const verifyForm = document.querySelector('[data-verify-form]');
const verifyInput = document.querySelector('[data-verify-input]');
const verifyResult = document.querySelector('[data-verify-result]');

const requestedSerial = new URLSearchParams(location.search).get('serial');
if (verifyInput && requestedSerial) verifyInput.value = requestedSerial;

verifyForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = verifyInput.value.trim().toUpperCase();
  const record = diplomaRecords[code];

  if (!code) {
    renderVerification('Enter a diploma serial code to continue.');
    return;
  }

  if (!record) {
    renderVerification('Certificate not found. This preview is not connected to Sepidan’s official records.');
    return;
  }

  verifyResult.innerHTML = `
    <div class="flex items-start gap-4">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal" aria-hidden="true"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg></span>
      <div><p class="font-extrabold text-navy">Demo verification result</p><p class="mt-1 text-sm text-amber-700">This record demonstrates the interface only. It is not an official Sepidan certificate.</p><dl class="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2"><div><dt class="text-muted">Holder</dt><dd class="font-semibold text-navy">${record.name}</dd></div><div><dt class="text-muted">Program</dt><dd class="font-semibold text-navy">${record.program}</dd></div><div><dt class="text-muted">Issue status</dt><dd class="font-semibold text-navy">${record.issued}</dd></div><div><dt class="text-muted">Serial number</dt><dd class="font-semibold text-navy">${record.number}</dd></div></dl></div>
    </div>`;
  verifyResult.className = 'mt-5 rounded-xl border border-teal/30 bg-teal/5 p-5';
  verifyResult.hidden = false;
});

function renderVerification(message) {
  verifyResult.innerHTML = `<p class="flex items-start gap-2 text-sm font-semibold text-red-700"><span aria-hidden="true">!</span><span>${message}</span></p>`;
  verifyResult.className = 'mt-5 rounded-xl border border-red-200 bg-red-50 p-5';
  verifyResult.hidden = false;
}

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('This preview cannot send messages yet. Please email info@sepidan.org or use WhatsApp.');
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('[data-filter-group]');
    group.querySelectorAll('[data-filter]').forEach((item) => {
      item.classList.remove('bg-navy', 'text-white');
      item.classList.add('bg-white', 'text-navy');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('bg-navy', 'text-white');
    button.classList.remove('bg-white', 'text-navy');
    button.setAttribute('aria-pressed', 'true');

    const value = button.dataset.filter;
    document.querySelectorAll('[data-filter-item]').forEach((item) => {
      item.hidden = value !== 'all' && item.dataset.filterItem !== value;
    });
  });
});

function showToast(message) {
  document.querySelector('[data-toast]')?.remove();
  const toast = document.createElement('div');
  toast.dataset.toast = '';
  toast.className = 'toast fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-navy px-5 py-4 text-sm font-semibold text-white shadow-2xl';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

window.SepidanI18n.initializeI18n();
