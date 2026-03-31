/**
 * ============================================================
 * PASIEKA — Single Source of Truth (CONFIG)
 * ============================================================
 * Wszystkie dane kontaktowe, produkty i treści marketingowe
 * zdefiniowane w jednym miejscu. Zmiana tutaj propaguje się
 * na całą stronę bez dotykania HTML.
 * ============================================================
 */

export const CONFIG = Object.freeze({

  /* ── Dane firmy ── */
  business: {
    name: 'Pasieka Złoty Nektar',
    tagline: 'Przestań kupować syrop cukrowy — wybierz 100% surowy miód prosto z ula',
    description:
      'Rodzinna pasieka z tradycjami od 1987 roku. Oferujemy miody niepasteryzowane, pyłek pszczeli i pierzgę — prosto od pszczelarza do Twojego stołu.',
    foundingYear: 1987,
    owner: 'Jan Kowalski',
    email: 'kontakt@pasieka-zloty-nektar.pl',
    // Obfuskacja telefonu (base64) - dekodowane przez JS
    phoneEncoded: 'KzQ4NjAwMTIzNDU2',
    address: {
      street: 'ul. Lipowa 12',
      city: 'Kazimierz Dolny',
      zip: '24-120',
      region: 'lubelskie',
      country: 'PL',
    },
    socialMedia: {
      facebook: 'https://facebook.com/pasiekazlotynektar',
      instagram: 'https://instagram.com/pasiekazlotynektar',
    },
    coordinates: { lat: 51.3189, lng: 21.9526 },
  },

  /* ── Nawigacja ── */
  nav: [
    { label: 'O nas', href: '#o-nas' },
    { label: 'Produkty', href: '#produkty' },
    { label: 'Korzyści', href: '#korzysci' },
    { label: 'Kontakt', href: '#kontakt' },
  ],

  /* ── Sekcja Hero ── */
  hero: {
    eyebrow: 'Od 1987 roku — tradycja i jakość',
    headline: 'Przestań kupować cukier w słoiku',
    subheadline: 'Prawdziwy miód to nie tylko słodycz. To płynna architektura natury, zamknięta w szkle przez rzemieślników, którzy szanują każdą kroplę.',
    cta: {
      primary: 'Odkryj kolekcję',
      secondary: 'Nasza historia',
    },
    video: {
      src: 'public/images/wideo.miod.mp4',
      poster: 'public/images/hero-poster.webp',
      alt: 'Miód spływający z łyżki w zwolnionym tempie',
    },
  },

  /* ── Sekcja O nas ── */
  about: {
    headline: 'Ponad 35 lat pasji do pszczelarstwa',
    paragraphs: [
      'Nasza pasieka powstała w 1987 roku z miłości do natury i pszczół. Od trzech pokoleń dbamy o tradycyjne metody pozyskiwania miodu, które gwarantują najwyższą jakość i pełnię smaku.',
      'Każdy słoik, który opuszcza naszą pasiekę, jest ręcznie napełniany i etykietowany. Nie stosujemy pasteryzacji ani sztucznych dodatków — dostajesz czysty, surowy miód prosto z plastra.',
    ],
    imgAlt: 'Pszczelarz przy ulach w pasiece rodzinnej',
  },

  /* ── Produkty ── */
  products: [
    {
      id: 'miod-lipowy',
      name: 'Lipowy',
      price: 45,
      unit: '500 ml',
      health_benefits: [
        'Łagodzi kaszel i ból gardła',
        'Wspomaga odporność w sezonie grypowym',
        'Naturalny środek uspokajający przed snem',
      ],
      img_url: 'public/images/lipowy.miod',
      imgAlt: 'Słoik miodu lipowego 500ml z pasieki Złoty Nektar',
    },
    {
      id: 'miod-wielokwiatowy',
      name: 'Miód Wielokwiatowy',
      price: 38,
      unit: '500 ml',
      health_benefits: [
        'Bogaty w enzymy i przeciwutleniacze',
        'Wspiera zdrową florę bakteryjną jelit',
        'Naturalny zastrzyk energii bez skoku cukru',
      ],
      img_url: 'public/images/miod-wielokwiatowy',
      imgAlt: 'Słoik miodu wielokwiatowego 500ml z pasieki Złoty Nektar',
    },
    {
      id: 'miod-spadziowy',
      name: 'Miód Spadziowy',
      price: 55,
      unit: '500 ml',
      health_benefits: [
        'Najwyższa zawartość minerałów spośród miodów',
        'Silne właściwości antybakteryjne',
        'Wsparcie dla układu krążenia',
      ],
      img_url: 'public/images/miod-spadziowy',
      imgAlt: 'Słoik ciemnego miodu spadziowego 500ml',
    },
    {
      id: 'pylek-pszczeli',
      name: 'Pyłek Pszczeli',
      price: 35,
      unit: '250 g',
      health_benefits: [
        'Naturalny suplement pełen białka i witamin',
        'Pomaga łagodzić objawy alergii sezonowych',
        'Wzmacnia regenerację organizmu po wysiłku',
      ],
      img_url: 'public/images/pylek-pszczeli',
      imgAlt: 'Opakowanie pyłku pszczelego 250g',
    },
    {
      id: 'pierzga',
      name: 'Pierzga (Chleb Pszczeli)',
      price: 60,
      unit: '200 g',
      health_benefits: [
        'Nazywana „naturalnym antybiotykiem"',
        'Wspiera wątrobę i procesy detoksykacji',
        'Reguluje poziom cholesterolu',
      ],
      img_url: 'public/images/pierzga',
      imgAlt: 'Opakowanie pierzgi — chleba pszczelego 200g',
    },
    {
      id: 'propolis',
      name: 'Propolis (Krople 20%)',
      price: 42,
      unit: '30 ml',
      health_benefits: [
        'Potężne właściwości przeciwzapalne',
        'Wspiera gojenie ran i regenerację tkanek',
        'Naturalny ochronnik układu odpornościowego',
      ],
      img_url: 'public/images/propolis',
      imgAlt: 'Buteleczka kropli propolisu 20% 30ml',
    },
  ],

  /* ── Sekcja Korzyści (Benefit / Fear) ── */
  benefits: {
    headline: 'Dlaczego Twój „miód" ze sklepu może Ci szkodzić?',
    subheadline:
      'Większość miodów z supermarketu to pasteryzowany syrop pozbawiony enzymów. Oto co zyskujesz wybierając naszą pasiekę:',
    items: [
      {
        icon: 'shield',
        title: '100% czysty — zero syropu',
        text: 'Każda partia badana w laboratorium. Certyfikat jakości w każdym zamówieniu.',
      },
      {
        icon: 'leaf',
        title: 'Niepasteryzowany — żywe enzymy',
        text: 'Nasz miód nigdy nie przekracza 40°C. Zachowuje pełnię witamin i właściwości leczniczych.',
      },
      {
        icon: 'truck',
        title: 'Od pszczelarza do drzwi',
        text: 'Bez pośredników. Zamawiasz telefonicznie, wysyłamy w 24h lub odbierasz osobiście.',
      },
      {
        icon: 'heart',
        title: 'Wsparcie dla pszczół',
        text: 'Kupując u nas, wspierasz etyczne pszczelarstwo i bioróżnorodność regionu.',
      },
    ],
  },

  /* ── Formularz kontaktowy ── */
  contact: {
    headline: 'Zamów miód lub zadaj pytanie',
    subheadline: 'Odpowiadamy w ciągu 24 godzin. Możesz też zadzwonić — odbieramy codziennie od 8:00 do 20:00.',
  },
});
