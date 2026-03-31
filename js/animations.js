/**
 * ============================================================
 * PASIEKA — Animations Module (Lenis + GSAP Optimized)
 * ============================================================
 * - Zoptymalizowane dla Lenis smooth scroll
 * - will-change dla GPU acceleration
 * - scrub: true dla płynnego parallax
 * - Brak clearProps dla lepszej wydajności
 * ============================================================
 */

export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[Pasieka] GSAP lub ScrollTrigger nie załadowany. Animacje wyłączone.');
    revealAllElements();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Ustawienia domyślne */
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });

  /* Inicjalizacja animacji */
  createHoneyDrops();
  animateHoneyParallax();
  animateHeroSection();
  animateFadeUpElements();
  animateProductCards();
  animateScaleInElements();
  animateMobileExtras();

  /* Odśwież ScrollTrigger po załadowaniu */
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}

/* ══════════════════════════════════════════════════════════════
   1. HONEY DRIP — TWORZENIE KROPEL
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
    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;
    drop.style.left = `${left}%`;
    drop.style.top = `${top}%`;
    drop.style.opacity = '0';
    container.appendChild(drop);
  });
}

/* ══════════════════════════════════════════════════════════════
   2. HONEY DRIP — PARALLAX
   ══════════════════════════════════════════════════════════════ */
function animateHoneyParallax() {
  const drops = document.querySelectorAll('.honey-drip-bg__drop');
  if (!drops.length) return;

  /* Fade-in kropel */
  gsap.to(drops, {
    opacity: 0.8,
    duration: 1.5,
    stagger: 0.15,
    ease: 'power2.inOut',
  });

  /* Każda kropla porusza się z inną prędkością (parallax) — TYLKO scrub, zero repeat */
  const speeds = [40, -60, 30, -50, 70, -35];

  drops.forEach((drop, index) => {
    gsap.to(drop, {
      y: speeds[index % speeds.length],
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   3. HERO SECTION — STAGGERED INTRO (Amber & Earth)
   ══════════════════════════════════════════════════════════════ */
function animateHeroSection() {
  const heroElements = document.querySelectorAll('#hero .gsap-fade-up');
  const heroFadeIn = document.querySelectorAll('#hero .gsap-fade-in');

  // Staggered fade-up intro dla wszystkich elementów hero
  if (heroElements.length) {
    gsap.from(heroElements, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.3,
      ease: 'power4.out',
    });
  }

  if (heroFadeIn.length) {
    gsap.from(heroFadeIn, {
      opacity: 0,
      duration: 1.5,
      delay: 1,
      ease: 'power2.inOut',
    });
  }

  // Parallax dla wideo w tle (subtle movement)
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    gsap.to(heroVideo, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   4. FADE-UP — ScrollTrigger (wszystkie sekcje poza hero)
   ══════════════════════════════════════════════════════════════ */
function animateFadeUpElements() {
  const elements = document.querySelectorAll(
    '#o-nas .gsap-fade-up, #korzysci .gsap-fade-up, #kontakt .gsap-fade-up, #produkty > div > .gsap-fade-up'
  );

  elements.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   5. PRODUCT CARDS — STAGGERED INTRO + PARALLAX
   ══════════════════════════════════════════════════════════════ */
function animateProductCards() {
  const cards = document.querySelectorAll('#produkty .product-card');
  if (!cards.length) return;

  // Karty domyślnie widoczne — GSAP animuje tylko jeśli sekcja poniżej viewportu
  const section = document.querySelector('#produkty');
  const rect = section.getBoundingClientRect();
  const isBelowViewport = rect.top > window.innerHeight * 0.5;

  if (isBelowViewport) {
    // Rząd 1 — wjazd z góry
    const row1Cards = document.querySelectorAll('.produkty-row-1 .product-card');
    gsap.set(row1Cards, { y: 50, opacity: 0 });
    ScrollTrigger.batch(row1Cards, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', overwrite: true });
      },
    });

    // Rząd 2 — Akacjowy z lewej, Spadziowy z prawej
    const akacjowy = document.querySelector('.card-akacjowy');
    const spadziowy = document.querySelector('.card-spadziowy');

    if (akacjowy) {
      gsap.set(akacjowy, { x: -80, opacity: 0 });
      gsap.to(akacjowy, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: akacjowy, start: 'top 85%', once: true },
      });
    }

    if (spadziowy) {
      gsap.set(spadziowy, { x: 80, opacity: 0 });
      gsap.to(spadziowy, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: spadziowy, start: 'top 85%', once: true },
      });
    }

    // Nawłociowy — wjazd z dołu
    const nawlociowy = document.querySelector('.card-nawlociowy');
    if (nawlociowy) {
      gsap.set(nawlociowy, { y: 60, opacity: 0 });
      gsap.to(nawlociowy, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: nawlociowy, start: 'top 90%', once: true },
      });
    }
  }

  // Parallax — różne prędkości per karta (data-parallax-speed)
  cards.forEach((card) => {
    const speed = parseFloat(card.dataset.parallaxSpeed) || 0;
    if (speed === 0) return;

    gsap.to(card, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '#produkty',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   6. SCALE-IN — ScrollTrigger
   ══════════════════════════════════════════════════════════════ */
function animateScaleInElements() {
  const elements = document.querySelectorAll(
    '#o-nas .gsap-scale-in'
  );

  elements.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   7. MOBILE EXTRAS — Glass Panel Slide-ins + O Nas Animations
   ══════════════════════════════════════════════════════════════ */
function animateMobileExtras() {
  // Glass panels — slide in from side on scroll
  const glassPanels = document.querySelectorAll(
    '.glass-lipowy, .glass-gryczany, .glass-akacjowy, .glass-spadziowy, .glass-nawlociowy'
  );

  glassPanels.forEach((panel) => {
    const isLeft = panel.classList.contains('glass-gryczany') || panel.classList.contains('glass-spadziowy');
    gsap.set(panel, { x: isLeft ? -40 : 40, opacity: 0 });
    gsap.to(panel, {
      x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: panel,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // O nas — headline slide + paragraphs stagger
  const aboutHeadline = document.getElementById('about-headline');
  if (aboutHeadline) {
    gsap.set(aboutHeadline, { y: 30, opacity: 0 });
    gsap.to(aboutHeadline, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: aboutHeadline, start: 'top 85%', once: true },
    });
  }

  const aboutParagraphs = document.querySelectorAll('#about-paragraphs p');
  aboutParagraphs.forEach((p, i) => {
    gsap.set(p, { y: 25, opacity: 0 });
    gsap.to(p, {
      y: 0, opacity: 1, duration: 0.8, delay: i * 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: p, start: 'top 88%', once: true },
    });
  });

  // O nas — image gentle zoom on scroll
  const aboutImg = document.querySelector('#o-nas img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: '#o-nas',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Product images — subtle reveal on mobile
  const productImgs = document.querySelectorAll('#produkty .product-card img');
  productImgs.forEach((img) => {
    gsap.set(img, { scale: 1.1 });
    gsap.to(img, {
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img.closest('.product-card'),
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Benefits cards — staggered entrance
  const benefitCards = document.querySelectorAll('#benefits-grid > div');
  benefitCards.forEach((card, i) => {
    gsap.set(card, { y: 30, opacity: 0 });
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   FALLBACK — Jeśli GSAP nie załadował się, pokaż elementy
   ══════════════════════════════════════════════════════════════ */
function revealAllElements() {
  const hidden = document.querySelectorAll('.gsap-fade-up, .gsap-fade-in, .gsap-scale-in');
  hidden.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
