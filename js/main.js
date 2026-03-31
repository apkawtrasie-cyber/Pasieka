/**
 * ============================================================
 * PASIEKA — Main Module (Lenis + GSAP Integration)
 * ============================================================
 * - Lenis smooth scroll zsynchronizowany z GSAP ScrollTrigger
 * - Bezpieczne renderowanie (createElement + textContent)
 * - Dark premium theme
 * ============================================================
 */

import { CONFIG } from './config.js';
import { initAnimations } from './animations.js';
import { t, getLang, setLang, getFlags, getLangNames, getAvailableLangs, translatePage } from './i18n.js';

/* ── App Object ── */
const App = {
  lenis: null,

  init() {
    this.initSmoothScroll();
    this.renderContent();
    this.initInteractions();
    
    // Inicjalizacja animacji po załadowaniu GSAP
    if (window.gsap && window.ScrollTrigger) {
      initAnimations();
    } else {
      window.addEventListener('load', () => {
        if (window.gsap && window.ScrollTrigger) {
          initAnimations();
        }
      });
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
    renderLangSwitcher();
    renderNav();
    renderHero();
    renderAbout();
    // renderProducts(); // Produkty są teraz statyczne w HTML
    renderBenefits();
    renderContact();
    renderFooter();
    injectProductSchema();
    translatePage();
  },

  initInteractions() {
    initHeroVideo();
    deobfuscatePhone();
    initContactForm();
    initStickyCTA();
    initHeaderScroll();
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
   0. LANGUAGE SWITCHER — Dropdown (all breakpoints)
   ══════════════════════════════════════════════════════════════ */
function renderLangSwitcher() {
  const flags = getFlags();
  const names = getLangNames();
  const langs = getAvailableLangs();
  const current = getLang();

  // ── Header dropdown (visible on ALL breakpoints) ──
  const headerDiv = document.querySelector('#site-header .max-w-7xl');
  const wrapper = el('div', { className: 'relative ml-3', id: 'lang-dropdown-wrapper' });

  // Trigger button — shows current flag
  const trigger = el('button', {
    className: 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10',
    id: 'lang-dropdown-trigger',
    'aria-label': 'Zmień język',
    'aria-expanded': 'false',
  });
  const flagSpan = el('span', { className: 'text-lg', id: 'lang-current-flag' }, flags[current]);
  const arrowSvg = document.createElement('template');
  arrowSvg.innerHTML = '<svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" id="lang-arrow" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>';
  trigger.appendChild(flagSpan);
  trigger.appendChild(arrowSvg.content.firstChild);
  wrapper.appendChild(trigger);

  // Dropdown panel
  const panel = el('div', {
    className: 'absolute right-0 top-full mt-2 py-2 rounded-xl shadow-2xl border opacity-0 pointer-events-none transition-all duration-200 origin-top-right scale-95 z-50',
    id: 'lang-dropdown-panel',
    style: 'min-width: 180px; background: rgba(20,18,15,0.98); border-color: rgba(212,175,55,0.2); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);',
  });

  langs.forEach(lang => {
    const isActive = lang === current;
    const item = el('button', {
      className: `flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors ${isActive ? 'bg-amber-500/10' : 'hover:bg-white/5'}`,
      dataset: { lang, dropdownItem: 'true' },
      'aria-label': names[lang],
    });
    const itemFlag = el('span', { className: 'text-lg' }, flags[lang]);
    const itemName = el('span', {
      className: isActive ? 'font-bold' : 'font-medium',
      style: `color: ${isActive ? '#d4af37' : '#d1d5db'};`,
    }, names[lang]);
    item.appendChild(itemFlag);
    item.appendChild(itemName);
    if (isActive) {
      const checkTpl = document.createElement('template');
      checkTpl.innerHTML = '<svg class="w-4 h-4 ml-auto" style="color:#d4af37" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
      item.appendChild(checkTpl.content.firstChild);
    }
    panel.appendChild(item);
  });

  wrapper.appendChild(panel);
  // Insert before the hamburger toggle (or at end for desktop)
  const hamburgerBtn = document.getElementById('mobile-menu-toggle');
  headerDiv.insertBefore(wrapper, hamburgerBtn);

  // ── Toggle logic ──
  let isOpen = false;
  function openDropdown() {
    isOpen = true;
    panel.style.opacity = '1';
    panel.style.pointerEvents = 'auto';
    panel.style.transform = 'scale(1)';
    trigger.setAttribute('aria-expanded', 'true');
    const arrow = document.getElementById('lang-arrow');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
  function closeDropdown() {
    isOpen = false;
    panel.style.opacity = '0';
    panel.style.pointerEvents = 'none';
    panel.style.transform = 'scale(0.95)';
    trigger.setAttribute('aria-expanded', 'false');
    const arrow = document.getElementById('lang-arrow');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !wrapper.contains(e.target)) closeDropdown();
  });

  // ── Language selection (dropdown items) ──
  panel.querySelectorAll('[data-dropdown-item]').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      if (lang === getLang()) { closeDropdown(); return; }
      setLang(lang);
      closeDropdown();
      updateDropdownUI();
      applyTranslations();
    });
  });

  // ── Mobile menu overlay flags ──
  const mobileSwitcher = document.getElementById('mobile-lang-switcher');
  if (mobileSwitcher) {
    langs.forEach(lang => {
      const btn = el('button', {
        className: `text-xl px-3 py-2 rounded-lg transition-colors ${lang === current ? 'bg-amber-500/20 ring-2 ring-amber-500' : 'opacity-60 hover:opacity-100'}`,
        'aria-label': names[lang],
        dataset: { lang, mobileLangBtn: 'true' },
      }, flags[lang]);
      mobileSwitcher.appendChild(btn);
    });

    mobileSwitcher.querySelectorAll('[data-mobile-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === getLang()) return;
        setLang(lang);
        updateDropdownUI();
        applyTranslations();
      });
    });
  }
}

function updateDropdownUI() {
  const flags = getFlags();
  const names = getLangNames();
  const current = getLang();

  // Update header trigger flag
  const currentFlag = document.getElementById('lang-current-flag');
  if (currentFlag) currentFlag.textContent = flags[current];

  // Update dropdown items
  document.querySelectorAll('[data-dropdown-item]').forEach(item => {
    const lang = item.dataset.lang;
    const isActive = lang === current;
    item.className = `flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors ${isActive ? 'bg-amber-500/10' : 'hover:bg-white/5'}`;
    const nameSpan = item.querySelectorAll('span')[1];
    if (nameSpan) {
      nameSpan.className = isActive ? 'font-bold' : 'font-medium';
      nameSpan.style.color = isActive ? '#d4af37' : '#d1d5db';
    }
    // Remove/add check icon
    const existingCheck = item.querySelector('svg');
    if (existingCheck) existingCheck.remove();
    if (isActive) {
      const checkTpl = document.createElement('template');
      checkTpl.innerHTML = '<svg class="w-4 h-4 ml-auto" style="color:#d4af37" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
      item.appendChild(checkTpl.content.firstChild);
    }
  });

  // Update mobile overlay flags
  document.querySelectorAll('[data-mobile-lang-btn]').forEach(btn => {
    const isActive = btn.dataset.lang === current;
    btn.className = `text-xl px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-amber-500/20 ring-2 ring-amber-500' : 'opacity-60 hover:opacity-100'}`;
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

  // Update dropdown + mobile overlay UI
  updateDropdownUI();
}

function renderNav() {
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.querySelector('#mobile-menu nav');
  const navKeys = ['nav_about', 'nav_products', 'nav_benefits', 'nav_contact'];

  CONFIG.nav.forEach(({ label, href }, i) => {
    const translatedLabel = t(navKeys[i]) || label;

    // Desktop link
    const dLink = el('a', {
      href,
      className: 'nav-link text-stone-700 hover:text-amber-700 font-medium text-sm transition-colors',
      'aria-label': translatedLabel,
    }, translatedLabel);
    desktopNav.appendChild(dLink);

    // Mobile link
    const mLink = el('a', {
      href,
      className: 'text-2xl font-serif font-bold text-white hover:text-amber-400 transition-colors',
      'aria-label': translatedLabel,
      dataset: { mobileLink: 'true' },
    }, translatedLabel);
    mobileNav.appendChild(mLink);
  });

  // Mobile menu toggle
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  function openMenu() {
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    menu.style.opacity = '0';
    menu.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-hidden') === 'false';
    isOpen ? closeMenu() : openMenu();
  });

  // Close button (X) inside overlay
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  // Close mobile menu on link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ══════════════════════════════════════════════════════════════
   2. HERO — Dynamiczne wstrzykiwanie treści (Amber & Earth)
   ══════════════════════════════════════════════════════════════ */
function renderHero() {
  setText('hero-eyebrow', t('hero_eyebrow'));
  setText('hero-headline', t('hero_headline'));
  setText('hero-subheadline', t('hero_sub'));
  
  const ctaPrimary = document.getElementById('hero-cta-primary');
  const ctaSecondary = document.getElementById('hero-cta-secondary');
  
  if (ctaPrimary) {
    ctaPrimary.textContent = t('hero_cta_primary');
  }
  
  if (ctaSecondary) {
    ctaSecondary.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE) {
        node.remove();
      }
    });
    ctaSecondary.insertBefore(
      document.createTextNode(t('hero_cta_secondary')),
      ctaSecondary.firstChild
    );
  }
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
   INIT
   ══════════════════════════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
