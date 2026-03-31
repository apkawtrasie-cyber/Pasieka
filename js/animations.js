/**
 * ============================================================
 * PASIEKA — Animations Module
 * ============================================================
 * - IntersectionObserver for visibility (zero forced reflow)
 * - GSAP ScrollTrigger ONLY for parallax (scrub)
 * - Hero intro: GSAP stagger (no ScrollTrigger)
 * ============================================================
 */

/* ══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — replaces ScrollTrigger for visibility
   ══════════════════════════════════════════════════════════════ */
function initVisibilityObserver() {
  const elements = document.querySelectorAll(
    '.gsap-fade-up, .gsap-fade-in, .gsap-scale-in'
  );
  if (!elements.length) return;

  let staggerIndex = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Skip hero elements — GSAP handles those
        if (el.closest('#hero')) return;
        // Stagger delay for grouped reveals
        const delay = (staggerIndex % 4) * 80;
        staggerIndex++;
        setTimeout(() => el.classList.add('is-visible'), delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -12% 0px',
  });

  elements.forEach((el) => {
    // Skip hero — GSAP controls hero animations
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   GLASS PANELS — subtle slide-in (IntersectionObserver, no GSAP)
   ══════════════════════════════════════════════════════════════ */
function initGlassPanels() {
  const panels = document.querySelectorAll(
    '.glass-lipowy, .glass-gryczany, .glass-akacjowy, .glass-spadziowy, .glass-nawlociowy'
  );
  if (!panels.length) return;

  panels.forEach((panel) => {
    const isLeft = panel.classList.contains('glass-gryczany') || panel.classList.contains('glass-spadziowy');
    const isCenter = panel.classList.contains('glass-nawlociowy');
    
    panel.style.opacity = '0';
    if (isCenter) {
      panel.style.transform = 'translate(-50%, 20px)'; // Preserve -translate-x-1/2 centering
    } else {
      panel.style.transform = `translateX(${isLeft ? -20 : 20}px)`;
    }
    panel.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  let idx = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const d = (idx % 3) * 100;
        idx++;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          const isCenter = entry.target.classList.contains('glass-nawlociowy');
          entry.target.style.transform = isCenter ? 'translate(-50%, 0)' : 'none';
        }, d);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  panels.forEach((p) => observer.observe(p));
}

/* ══════════════════════════════════════════════════════════════
   ABOUT SECTION — IntersectionObserver
   ══════════════════════════════════════════════════════════════ */
function initAboutAnimations() {
  const headline = document.getElementById('about-headline');
  const paragraphs = document.querySelectorAll('#about-paragraphs p');

  if (headline) {
    headline.style.opacity = '0';
    headline.style.transform = 'translateY(30px)';
    headline.style.transition = 'opacity 1s ease, transform 1s ease';
  }

  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(25px)';
    p.style.transition = `opacity .8s ease ${i * 0.15}s, transform .8s ease ${i * 0.15}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -12% 0px' });

  if (headline) observer.observe(headline);
  paragraphs.forEach((p) => observer.observe(p));
}

/* ══════════════════════════════════════════════════════════════
   BENEFIT CARDS — IntersectionObserver
   ══════════════════════════════════════════════════════════════ */
function initBenefitCards() {
  const cards = document.querySelectorAll('#benefits-grid > div');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity .7s ease ${i * 0.08}s, transform .7s ease ${i * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  cards.forEach((c) => observer.observe(c));
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT — init all animations
   ══════════════════════════════════════════════════════════════ */
export function initAnimations() {
  // IntersectionObserver animations — work WITHOUT GSAP, zero reflow
  initVisibilityObserver();
  initGlassPanels();
  initAboutAnimations();
  initBenefitCards();

  // GSAP-dependent: parallax + hero intro only
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Pasieka] GSAP/ScrollTrigger nie załadowany.');
    revealAllElements();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true });
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

  requestAnimationFrame(() => {
    createHoneyDrops();
    animateHoneyParallax();
    animateHeroSection();
    animateParallaxEffects();
  });

  // No ScrollTrigger.refresh() — scrub triggers self-correct on scroll
}

/* ══════════════════════════════════════════════════════════════
   HONEY DRIP — TWORZENIE KROPEL
   ══════════════════════════════════════════════════════════════ */
function createHoneyDrops() {
  const container = document.getElementById('honey-drip-container');
  if (!container) return;

  const drops = [
    { size: 80,  left: 10, top: 15 },
    { size: 120, left: 75, top: 25 },
    { size: 60,  left: 40, top: 60 },
    { size: 100, left: 85, top: 70 },
    { size: 140, left: 20, top: 80 },
    { size: 70,  left: 55, top: 10 },
  ];

  drops.forEach(({ size, left, top }) => {
    const drop = document.createElement('div');
    drop.className = 'honey-drip-bg__drop';
    drop.style.cssText = `width:${size}px;height:${size}px;left:${left}%;top:${top}%;opacity:0`;
    container.appendChild(drop);
  });
}

/* ══════════════════════════════════════════════════════════════
   HONEY DRIP — PARALLAX (GSAP scrub — 1 trigger)
   ══════════════════════════════════════════════════════════════ */
function animateHoneyParallax() {
  const drops = document.querySelectorAll('.honey-drip-bg__drop');
  if (!drops.length) return;

  gsap.to(drops, { opacity: 0.8, duration: 1.5, stagger: 0.15, ease: 'power2.inOut' });

  const speeds = [40, -60, 30, -50, 70, -35];
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  drops.forEach((drop, i) => tl.to(drop, { y: speeds[i % speeds.length], duration: 1 }, 0));
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION — GSAP stagger intro (no ScrollTrigger)
   ══════════════════════════════════════════════════════════════ */
function animateHeroSection() {
  const heroElements = document.querySelectorAll('#hero .gsap-fade-up');
  const heroFadeIn = document.querySelectorAll('#hero .gsap-fade-in');

  if (heroElements.length) {
    gsap.fromTo(heroElements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.3, ease: 'power4.out' }
    );
  }

  if (heroFadeIn.length) {
    gsap.fromTo(heroFadeIn,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 1, ease: 'power2.inOut' }
    );
  }

  // Video parallax — single scrub trigger
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX EFFECTS — GSAP scrub only (about image, product cards)
   ══════════════════════════════════════════════════════════════ */
function animateParallaxEffects() {
  // About image gentle zoom — only parallax left
  const aboutImg = document.querySelector('#o-nas img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      scale: 1.05, ease: 'none',
      scrollTrigger: { trigger: '#o-nas', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   FALLBACK — reveal if GSAP fails
   ══════════════════════════════════════════════════════════════ */
function revealAllElements() {
  document.querySelectorAll('.gsap-fade-up, .gsap-fade-in, .gsap-scale-in').forEach((el) => {
    el.classList.add('is-visible');
  });
}
