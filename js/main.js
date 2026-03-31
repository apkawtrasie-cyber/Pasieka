/**
 * ============================================================
 * PASIEKA — Main Module (Lenis + GSAP Integration)
 * ============================================================
 * - Lenis smooth scroll zsynchronizowany z GSAP ScrollTrigger
 * - Bezpieczne renderowanie (createElement + textContent)
 * - Dark premium theme
 * ============================================================
 */

import { CONFIG } from './config.js?v=8';
import { initAnimations } from './animations.js?v=8';
import { t, getLang, setLang, getFlags, getLangNames, getAvailableLangs, translatePage } from './i18n.js?v=8';

/* ── App Object ── */
const App = {
  lenis: null,

  init() {
    this.renderContent();
    this.initInteractions();

    // Lenis + GSAP: defer to idle time to prevent forced reflow on init
    const bootDeferred = () => {
      const run = () => {
        this.initSmoothScroll();
        if (window.gsap && window.ScrollTrigger) {
          initAnimations();
        }
      };
      // Let browser finish painting before forcing layout reads
      if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 300 });
      } else {
        setTimeout(run, 150);
      }
    };

    if (typeof Lenis !== 'undefined' && window.gsap && window.ScrollTrigger) {
      bootDeferred();
    } else {
      window.addEventListener('load', bootDeferred);
    }
  },

  initSmoothScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('[Pasieka] Lenis nie załadowany. Smooth scroll wyłączony.');
      return;
    }

    // Inicjalizacja Lenis
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronizacja Lenis z GSAP ScrollTrigger
    this.lenis.on('scroll', () => {
      if (window.ScrollTrigger) {
        ScrollTrigger.update();
      }
    });

    // Integracja z GSAP ticker
    if (window.gsap) {
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback: requestAnimationFrame
      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  },

  renderContent() {
    try { renderLangSwitcher(); } catch(e) { console.warn('[Pasieka] renderLangSwitcher error:', e); }
    try { renderHero(); } catch(e) { console.warn('[Pasieka] renderHero error:', e); }
    try { renderAbout(); } catch(e) { console.warn('[Pasieka] renderAbout error:', e); }
    try { renderBenefits(); } catch(e) { console.warn('[Pasieka] renderBenefits error:', e); }
    try { renderContact(); } catch(e) { console.warn('[Pasieka] renderContact error:', e); }
    try { renderFooter(); } catch(e) { console.warn('[Pasieka] renderFooter error:', e); }
    try { injectProductSchema(); } catch(e) { console.warn('[Pasieka] injectProductSchema error:', e); }
    try { translatePage(); } catch(e) { console.warn('[Pasieka] translatePage error:', e); }
  },

  initInteractions() {
    try { initMobileMenu(); } catch(e) { console.warn('[Pasieka] initMobileMenu error:', e); }
    try { initHeroVideo(); } catch(e) { console.warn('[Pasieka] initHeroVideo error:', e); }
    try { deobfuscatePhone(); } catch(e) { console.warn('[Pasieka] deobfuscatePhone error:', e); }
    try { initContactForm(); } catch(e) { console.warn('[Pasieka] initContactForm error:', e); }
    try { initStickyCTA(); } catch(e) { console.warn('[Pasieka] initStickyCTA error:', e); }
    try { initHeaderScroll(); } catch(e) { console.warn('[Pasieka] initHeaderScroll error:', e); }
    try { initMapFacade(); } catch(e) { console.warn('[Pasieka] initMapFacade error:', e); }
  }
};

/* ── Helpers ── */

/**
 * Tworzy element DOM z atrybutami i dziećmi.
 * @param {string} tag
 * @param {Object} attrs
 * @param  {...(Node|string)} children
 * @returns {HTMLElement}
 */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') {
      node.className = value;
    } else if (key === 'dataset') {
      for (const [dk, dv] of Object.entries(value)) {
        node.dataset[dk] = dv;
      }
    } else if (key.startsWith('aria')) {
      node.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      node.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      node.appendChild(child);
    }
  }
  return node;
}

/**
 * Skrót: ustawia textContent elementu po ID.
 */
function setText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

/* ── SVG Icon Factory ── */
const ICONS = {
  shield: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  leaf: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 2.648.9 5.217 2.55 7.283l.148.186a2.25 2.25 0 01-.498 3.3l-.064.042a2.25 2.25 0 01-2.572-.004l-.064-.043a2.25 2.25 0 01-.498-3.3l.148-.186a12.27 12.27 0 002.55-7.283V3.03m-3 0v.568c0 2.648-.9 5.217-2.55 7.283l-.148.186a2.25 2.25 0 00.498 3.3l.064.042a2.25 2.25 0 002.572-.004l.064-.043a2.25 2.25 0 00.498-3.3l-.148-.186A12.27 12.27 0 019.75 3.598V3.03"/></svg>`,
  truck: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v12.75m0 0h3.75m-3.75 0c-.621 0-1.125-.504-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125h4.233a1.125 1.125 0 01.863.411l2.517 3.024a1.125 1.125 0 01.262.723V17.25m0 0a1.125 1.125 0 01-1.125 1.125"/></svg>`,
  heart: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`,
  phone: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  mail: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
  mapPin: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
  check: `<svg class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
};

/**
 * Tworzy ikonę SVG jako element DOM (bezpieczne — nie innerHTML na kontenerze użytkownika).
 * Ikony są predefiniowane, więc to bezpieczne użycie.
 */
function createIconElement(iconName) {
  const wrapper = document.createElement('div');
  wrapper.className = 'icon-wrapper';
  // Ikony są stałe, predefiniowane powyżej — nie pochodzą od użytkownika
  const template = document.createElement('template');
  template.innerHTML = ICONS[iconName] || '';
  const svgNode = template.content.firstChild;
  if (svgNode) wrapper.appendChild(svgNode);
  return wrapper;
}

function createSVGIcon(iconName) {
  const template = document.createElement('template');
  template.innerHTML = (ICONS[iconName] || '').trim();
  return template.content.firstChild;
}

/* ══════════════════════════════════════════════════════════════
   0. LANGUAGE SWITCHER — Dropdown (static HTML, JS events only)
   ══════════════════════════════════════════════════════════════ */
function renderLangSwitcher() {
  const flags = getFlags();
  const current = getLang();

  // Set correct flag on page load
  const currentFlag = document.getElementById('lang-current-flag');
  if (currentFlag) currentFlag.textContent = flags[current];

  // Highlight active language in dropdown
  highlightActiveLang();

  // Dropdown toggle
  const trigger = document.getElementById('lang-trigger');
  const panel = document.getElementById('lang-panel');
  const arrow = document.getElementById('lang-arrow');
  const dropdown = document.getElementById('lang-dropdown');

  if (!trigger || !panel) return;

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = panel.style.opacity === '1';
    if (open) {
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
      panel.style.transform = 'scale(0.95)';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
      panel.style.opacity = '1';
      panel.style.pointerEvents = 'auto';
      panel.style.transform = 'scale(1)';
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (dropdown && !dropdown.contains(e.target)) {
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
      panel.style.transform = 'scale(0.95)';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });

  // Language buttons in dropdown
  document.querySelectorAll('[data-switch-lang]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = btn.getAttribute('data-switch-lang');
      if (lang === getLang()) {
        panel.style.opacity = '0';
        panel.style.pointerEvents = 'none';
        panel.style.transform = 'scale(0.95)';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        return;
      }
      setLang(lang);
      // Close dropdown
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
      panel.style.transform = 'scale(0.95)';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
      // Update flag
      if (currentFlag) currentFlag.textContent = flags[lang];
      // Highlight
      highlightActiveLang();
      // Translate
      applyTranslations();
    });
  });
}

function highlightActiveLang() {
  var current = getLang();
  document.querySelectorAll('[data-switch-lang]').forEach(function(btn) {
    var lang = btn.getAttribute('data-switch-lang');
    var nameSpan = btn.querySelectorAll('span')[1];
    if (lang === current) {
      btn.style.background = 'rgba(245,158,11,0.1)';
      if (nameSpan) { nameSpan.style.color = '#d4af37'; nameSpan.style.fontWeight = 'bold'; }
    } else {
      btn.style.background = '';
      if (nameSpan) { nameSpan.style.color = '#d1d5db'; nameSpan.style.fontWeight = '500'; }
    }
  });
}

function applyTranslations() {
  // Translate static data-i18n elements
  translatePage();

  // Translate dynamic content
  const headline = document.getElementById('hero-eyebrow');
  if (headline) headline.textContent = t('hero_eyebrow');
  setText('hero-headline', t('hero_headline'));
  setText('hero-subheadline', t('hero_sub'));

  const ctaPrimary = document.getElementById('hero-cta-primary');
  if (ctaPrimary) ctaPrimary.textContent = t('hero_cta_primary');

  const ctaSecondary = document.getElementById('hero-cta-secondary');
  if (ctaSecondary) {
    ctaSecondary.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    });
    ctaSecondary.insertBefore(document.createTextNode(t('hero_cta_secondary')), ctaSecondary.firstChild);
  }

  setText('about-headline', t('about_headline'));
  const aboutP = document.querySelectorAll('#about-paragraphs p');
  if (aboutP[0]) aboutP[0].textContent = t('about_p1');
  if (aboutP[1]) aboutP[1].textContent = t('about_p2');

  setText('benefits-headline', t('benefits_headline'));
  setText('benefits-subheadline', t('benefits_sub'));
  const benefitCards = document.querySelectorAll('#benefits-grid > div');
  const benefitKeys = ['benefit_1', 'benefit_2', 'benefit_3', 'benefit_4'];
  benefitCards.forEach((card, i) => {
    if (!benefitKeys[i]) return;
    const titleEl = card.querySelector('h3');
    const textEl = card.querySelector('p');
    if (titleEl) titleEl.textContent = t(`${benefitKeys[i]}_title`);
    if (textEl) textEl.textContent = t(`${benefitKeys[i]}_text`);
  });

  setText('contact-headline', t('contact_headline'));
  setText('contact-subheadline', t('contact_sub'));

  // Nav links
  const navKeys = ['nav_about', 'nav_products', 'nav_benefits', 'nav_contact'];
  document.querySelectorAll('#desktop-nav a').forEach((a, i) => {
    if (navKeys[i]) a.textContent = t(navKeys[i]);
  });
  document.querySelectorAll('#mobile-menu nav a').forEach((a, i) => {
    if (navKeys[i]) a.textContent = t(navKeys[i]);
  });
  // Update dropdown highlight
  highlightActiveLang();
}

/* ══════════════════════════════════════════════════════════════
   1b. MOBILE MENU TOGGLE
   ══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var hamburger = document.getElementById('hamburger-icon');
  var closeIcon = document.getElementById('close-icon');
  var closeBtn = document.getElementById('mobile-menu-close');

  if (!toggle || !menu) return;

  function setMenuOpen(open) {
    if (open) {
      menu.style.opacity = '1';
      menu.style.pointerEvents = 'auto';
      menu.setAttribute('aria-hidden', 'false');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      if (hamburger) hamburger.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      menu.style.opacity = '0';
      menu.style.pointerEvents = 'none';
      menu.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (hamburger) hamburger.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  // Hamburger button toggles menu
  toggle.addEventListener('click', function() {
    var isOpen = menu.style.opacity === '1';
    setMenuOpen(!isOpen);
  });

  // X close button
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      setMenuOpen(false);
    });
  }

  // Close menu on nav link click
  menu.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      setMenuOpen(false);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   2. HERO — Dynamiczne wstrzykiwanie treści (Amber & Earth)
   ══════════════════════════════════════════════════════════════ */
function renderHero() {
  // Hero text is now in HTML with data-i18n attributes.
  // translatePage() handles language switching automatically.
  // No manual setText calls needed — eliminates CLS.
}

/* ══════════════════════════════════════════════════════════════
   2a. PHONE DEOBFUSCATION — Lazy loading numeru telefonu
   ══════════════════════════════════════════════════════════════ */
function deobfuscatePhone() {
  try {
    const encoded = CONFIG.business.phoneEncoded;
    const decoded = atob(encoded);
    
    // Aktualizuj wszystkie linki tel: na stronie
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.href = `tel:${decoded}`;
    });
    
    // Aktualizuj wyświetlany numer w kontaktach
    const phoneDisplays = document.querySelectorAll('[data-phone-display]');
    phoneDisplays.forEach(el => {
      el.textContent = decoded;
    });
  } catch (error) {
    console.warn('[Pasieka] Błąd dekodowania telefonu:', error);
  }
}

/* ══════════════════════════════════════════════════════════════
   3. O NAS
   ══════════════════════════════════════════════════════════════ */
function renderAbout() {
  setText('about-headline', t('about_headline'));

  const container = document.getElementById('about-paragraphs');
  const paragraphKeys = ['about_p1', 'about_p2'];
  paragraphKeys.forEach((key) => {
    const p = el('p', { className: 'gsap-fade-up text-stone-600 text-lg leading-relaxed' }, t(key));
    container.appendChild(p);
  });
}

/* ══════════════════════════════════════════════════════════════
   4. PRODUKTY (Duże karty grid - jak na obrazku)
   ══════════════════════════════════════════════════════════════ */
function renderProducts() {
  const grid = document.getElementById('products-grid');

  CONFIG.products.forEach((product) => {
    // Card container
    const card = el('article', {
      className: 'product-card-large gsap-fade-up group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer transition-transform duration-500 hover:scale-[1.02]',
      dataset: { productId: product.id },
    });

    // Background image
    const img = document.createElement('img');
    img.src = `${product.img_url}.jpg`;
    img.alt = product.imgAlt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'absolute inset-0 w-full h-full object-cover';

    // Dark overlay
    const overlay = el('div', {
      className: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20',
    });

    // Content (bottom)
    const content = el('div', {
      className: 'absolute bottom-0 left-0 right-0 p-6 md:p-8',
    });

    // Product name
    const nameEl = el('h3', {
      className: 'font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-3',
      style: 'color: #ffffff;',
    }, product.name);

    // Price badge
    const priceEl = el('div', {
      className: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm md:text-base',
      style: 'background: rgba(245, 158, 11, 0.9); color: #000;',
    }, `${product.price} PLN`);

    content.appendChild(nameEl);
    content.appendChild(priceEl);

    card.appendChild(img);
    card.appendChild(overlay);
    card.appendChild(content);

    // Click handler - scroll to contact or show details
    card.addEventListener('click', () => {
      window.location.href = '#kontakt';
    });

    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════════════
   5. KORZYŚCI
   ══════════════════════════════════════════════════════════════ */
function renderBenefits() {
  setText('benefits-headline', t('benefits_headline'));
  setText('benefits-subheadline', t('benefits_sub'));

  const grid = document.getElementById('benefits-grid');
  const benefitKeys = ['benefit_1', 'benefit_2', 'benefit_3', 'benefit_4'];
  CONFIG.benefits.items.forEach((item, i) => {
    const iconWrap = el('div', {
      className: 'w-14 h-14 flex items-center justify-center rounded-full bg-amber-500/20 text-amber-400',
    });
    const svgIcon = createSVGIcon(item.icon);
    if (svgIcon) iconWrap.appendChild(svgIcon);

    const titleText = benefitKeys[i] ? t(`${benefitKeys[i]}_title`) : item.title;
    const descText = benefitKeys[i] ? t(`${benefitKeys[i]}_text`) : item.text;
    const title = el('h3', { className: 'font-serif font-semibold text-lg text-white' }, titleText);
    const text = el('p', { className: 'text-stone-400 text-sm leading-relaxed' }, descText);

    const card = el('div', {
      className: 'gsap-fade-up flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm',
    });
    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(text);
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════════════
   6. KONTAKT
   ══════════════════════════════════════════════════════════════ */
function renderContact() {
  setText('contact-headline', t('contact_headline'));
  setText('contact-subheadline', t('contact_sub'));

  const details = document.getElementById('contact-details');
  const { business } = CONFIG;

  // Email
  const mailIcon = createSVGIcon('mail');
  const mailLink = el('a', {
    href: `mailto:${business.email}`,
    className: 'text-amber-700 font-semibold hover:underline',
    'aria-label': `Napisz e-mail: ${business.email}`,
  }, business.email);
  const mailRow = el('div', { className: 'flex items-center gap-3 text-stone-700' });
  if (mailIcon) mailRow.appendChild(mailIcon);
  mailRow.appendChild(mailLink);
  details.appendChild(mailRow);

  // Address
  const pinIcon = createSVGIcon('mapPin');
  const addrText = `${business.address.street}, ${business.address.zip} ${business.address.city}`;
  const addrSpan = el('span', {}, addrText);
  const addrRow = el('div', { className: 'flex items-center gap-3 text-stone-700' });
  if (pinIcon) addrRow.appendChild(pinIcon);
  addrRow.appendChild(addrSpan);
  details.appendChild(addrRow);

  // Social links
  const socialContainer = document.getElementById('contact-social');
  if (business.socialMedia.facebook) {
    const fbLink = el('a', {
      href: business.socialMedia.facebook,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors',
      'aria-label': 'Odwiedź nasz profil na Facebooku',
    }, 'FB');
    socialContainer.appendChild(fbLink);
  }
  if (business.socialMedia.instagram) {
    const igLink = el('a', {
      href: business.socialMedia.instagram,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors',
      'aria-label': 'Odwiedź nasz profil na Instagramie',
    }, 'IG');
    socialContainer.appendChild(igLink);
  }
}

/* ══════════════════════════════════════════════════════════════
   7. FOOTER
   ══════════════════════════════════════════════════════════════ */
function renderFooter() {
  setText('footer-business-name', CONFIG.business.name);
  setText('footer-copyright', `© ${new Date().getFullYear()} ${CONFIG.business.name}. Wszelkie prawa zastrzeżone.`);
}

/* ══════════════════════════════════════════════════════════════
   8. JSON-LD: PRODUCTS
   ══════════════════════════════════════════════════════════════ */
function injectProductSchema() {
  const productsSchema = CONFIG.products.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.health_benefits.join('. '),
    image: `https://pasieka-zloty-nektar.pl/${p.img_url}.jpg`,
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: CONFIG.business.name,
      },
    },
  }));

  const scriptEl = document.getElementById('json-ld-products');
  if (scriptEl) {
    scriptEl.textContent = JSON.stringify(productsSchema);
  }
}

/* ══════════════════════════════════════════════════════════════
   8. HERO VIDEO — SLOW MOTION
   ══════════════════════════════════════════════════════════════ */
function initHeroVideo() {
  const video = document.getElementById('hero-video');
  if (video) {
    // Ustawienie slow motion (0.5 = 50% prędkości)
    video.playbackRate = 0.5;
    
    // Zapewnienie, że wideo się odtworzy (niektóre przeglądarki blokują autoplay)
    video.play().catch((error) => {
      console.warn('[Pasieka] Autoplay wideo zablokowany:', error);
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   9. FORMULARZ + HONEYPOT
   ══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot check — jeśli bot wypełnił ukryte pole
    const honeypot = document.getElementById('contact-website');
    if (honeypot && honeypot.value.trim() !== '') {
      // Udajemy sukces, ale nic nie wysyłamy
      showFeedback(feedback, 'success', 'Dziękujemy! Wiadomość została wysłana.');
      form.reset();
      return;
    }

    // Basic validation
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showFeedback(feedback, 'error', 'Proszę wypełnić wszystkie pola.');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback(feedback, 'error', 'Proszę podać poprawny adres e-mail.');
      return;
    }

    // Symulacja wysyłki (tu można podpiąć fetch do backendu)
    showFeedback(feedback, 'success', 'Dziękujemy! Odpowiemy w ciągu 24 godzin.');
    form.reset();
  });
}

function showFeedback(feedbackEl, type, message) {
  feedbackEl.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
  if (type === 'success') {
    feedbackEl.classList.add('bg-green-100', 'text-green-800');
  } else {
    feedbackEl.classList.add('bg-red-100', 'text-red-800');
  }
  feedbackEl.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ══════════════════════════════════════════════════════════════
   10. STICKY CTA (MOBILE)
   ══════════════════════════════════════════════════════════════ */
function initStickyCTA() {
  const stickyCta = document.getElementById('sticky-cta');
  let shown = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // Pokaż sticky CTA gdy hero zniknie z widoku
      if (!entry.isIntersecting && !shown) {
        stickyCta.classList.remove('translate-y-full');
        stickyCta.setAttribute('aria-hidden', 'false');
        shown = true;
      } else if (entry.isIntersecting && shown) {
        stickyCta.classList.add('translate-y-full');
        stickyCta.setAttribute('aria-hidden', 'true');
        shown = false;
      }
    },
    { threshold: 0.1 }
  );

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}

/* ══════════════════════════════════════════════════════════════
   11. HEADER SCROLL EFFECT
   ══════════════════════════════════════════════════════════════ */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 100) {
      header.classList.add('shadow-md', 'shadow-amber-200/30');
    } else {
      header.classList.remove('shadow-md', 'shadow-amber-200/30');
    }
    lastY = y;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   12. GOOGLE MAPS FACADE
   ══════════════════════════════════════════════════════════════ */
function initMapFacade() {
  const container = document.getElementById('map-container');
  if (!container) return;

  container.addEventListener('click', function loadMap() {
    container.removeEventListener('click', loadMap);

    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.5!2d21.9526!3d51.3189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE5JzA4LjAiTiAyMcKwNTcnMDkuNCJF!5e0!3m2!1spl!2spl!4v1';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.zIndex = '10';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = 'Lokalizacja Pasieki Złoty Nektar';

    container.appendChild(iframe);
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
