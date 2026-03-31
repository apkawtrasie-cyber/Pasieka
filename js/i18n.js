/**
 * ============================================================
 * PASIEKA — Internationalization (i18n) Module
 * ============================================================
 * Languages: PL, EN, DE, IT, FR
 * ============================================================
 */

const TRANSLATIONS = {
  pl: {
    // Nav
    nav_about: 'O nas',
    nav_products: 'Produkty',
    nav_benefits: 'Korzyści',
    nav_contact: 'Kontakt',
    nav_call: 'Zadzwoń',

    // Hero
    hero_eyebrow: 'Od 1987 roku — tradycja i jakość',
    hero_headline: 'Przestań kupować cukier w słoiku',
    hero_sub: 'Prawdziwy miód to nie tylko słodycz. To płynna architektura natury, zamknięta w szkle przez rzemieślników, którzy szanują każdą kroplę.',
    hero_cta_primary: 'Odkryj kolekcję',
    hero_cta_secondary: 'Nasza historia',

    // About
    about_headline: 'Ponad 35 lat pasji do pszczelarstwa',
    about_p1: 'Nasza pasieka powstała w 1987 roku z miłości do natury i pszczół. Od trzech pokoleń dbamy o tradycyjne metody pozyskiwania miodu, które gwarantują najwyższą jakość i pełnię smaku.',
    about_p2: 'Każdy słoik, który opuszcza naszą pasiekę, jest ręcznie napełniany i etykietowany. Nie stosujemy pasteryzacji ani sztucznych dodatków — dostajesz czysty, surowy miód prosto z plastra.',

    // Products
    products_eyebrow: 'Sezonowa edycja',
    products_headline: 'Płynne rzemiosło z polskich pasiek.',
    product_lipowy: 'Lipowy',
    product_lipowy_desc: 'Złocisty aromat kwiatów lipy',
    product_lipowy_price: '85 PLN',
    product_gryczany: 'Gryczany',
    product_gryczany_desc: 'Intensywny, ciemny aromat',
    product_gryczany_price: '92 PLN',
    product_akacjowy: 'Akacjowy',
    product_akacjowy_desc: 'Delikatny, jasny i słodki',
    product_akacjowy_price: '82 PLN',
    product_spadziowy: 'Spadziowy',
    product_spadziowy_desc: 'Leśny, ciemny miód z iglaków',
    product_spadziowy_price: '115 PLN',
    product_nawlociowy: 'Nawłociowy',
    product_nawlociowy_sub: 'Limitowana edycja jesienna',
    product_nawlociowy_cta: 'KUP TERAZ · 79 PLN',

    // Benefits
    benefits_headline: 'Dlaczego Twój „miód" ze sklepu może Ci szkodzić?',
    benefits_sub: 'Większość miodów z supermarketu to pasteryzowany syrop pozbawiony enzymów. Oto co zyskujesz wybierając naszą pasiekę:',
    benefit_1_title: '100% czysty — zero syropu',
    benefit_1_text: 'Każda partia badana w laboratorium. Certyfikat jakości w każdym zamówieniu.',
    benefit_2_title: 'Niepasteryzowany — żywe enzymy',
    benefit_2_text: 'Nasz miód nigdy nie przekracza 40°C. Zachowuje pełnię witamin i właściwości leczniczych.',
    benefit_3_title: 'Od pszczelarza do drzwi',
    benefit_3_text: 'Bez pośredników. Zamawiasz telefonicznie, wysyłamy w 24h lub odbierasz osobiście.',
    benefit_4_title: 'Wsparcie dla pszczół',
    benefit_4_text: 'Kupując u nas, wspierasz etyczne pszczelarstwo i bioróżnorodność regionu.',

    // Contact
    contact_badge: 'Kontakt',
    contact_headline: 'Zamów miód lub zadaj pytanie',
    contact_sub: 'Odpowiadamy w ciągu 24 godzin. Możesz też zadzwonić — odbieramy codziennie od 8:00 do 20:00.',
    contact_phone_btn: '+48 600 123 456',
    contact_map_text: 'ul. Lipowa 12, 24-120 Kazimierz Dolny — kliknij, aby otworzyć w Google Maps',

    // Sticky CTA
    sticky_cta: 'Zadzwoń teraz',

    // Lang
    lang_label: 'Język',
  },

  en: {
    nav_about: 'About',
    nav_products: 'Products',
    nav_benefits: 'Benefits',
    nav_contact: 'Contact',
    nav_call: 'Call us',

    hero_eyebrow: 'Since 1987 — Tradition & Quality',
    hero_headline: 'Stop buying sugar in a jar',
    hero_sub: 'Real honey is more than sweetness. It is the liquid architecture of nature, sealed in glass by craftsmen who respect every drop.',
    hero_cta_primary: 'Explore collection',
    hero_cta_secondary: 'Our story',

    about_headline: 'Over 35 years of passion for beekeeping',
    about_p1: 'Our apiary was founded in 1987 out of love for nature and bees. For three generations, we have preserved traditional honey harvesting methods that guarantee the highest quality and full flavour.',
    about_p2: 'Every jar that leaves our apiary is hand-filled and labelled. We never pasteurise or add artificial ingredients — you get pure, raw honey straight from the comb.',

    products_eyebrow: 'Seasonal edition',
    products_headline: 'Liquid craft from Polish apiaries.',
    product_lipowy: 'Linden',
    product_lipowy_desc: 'Golden aroma of linden blossoms',
    product_lipowy_price: '85 PLN',
    product_gryczany: 'Buckwheat',
    product_gryczany_desc: 'Intense, dark aroma',
    product_gryczany_price: '92 PLN',
    product_akacjowy: 'Acacia',
    product_akacjowy_desc: 'Delicate, light and sweet',
    product_akacjowy_price: '82 PLN',
    product_spadziowy: 'Honeydew',
    product_spadziowy_desc: 'Forest-dark honey from conifers',
    product_spadziowy_price: '115 PLN',
    product_nawlociowy: 'Goldenrod',
    product_nawlociowy_sub: 'Limited autumn edition',
    product_nawlociowy_cta: 'BUY NOW · 79 PLN',

    benefits_headline: 'Why your store-bought "honey" may be harming you',
    benefits_sub: 'Most supermarket honeys are pasteurised syrup stripped of enzymes. Here is what you gain by choosing our apiary:',
    benefit_1_title: '100% pure — zero syrup',
    benefit_1_text: 'Every batch lab-tested. Quality certificate included with every order.',
    benefit_2_title: 'Unpasteurised — living enzymes',
    benefit_2_text: 'Our honey never exceeds 40 °C. It retains all vitamins and healing properties.',
    benefit_3_title: 'From beekeeper to your door',
    benefit_3_text: 'No middlemen. Order by phone, we ship within 24 h or you can pick up in person.',
    benefit_4_title: 'Support for bees',
    benefit_4_text: 'By buying from us, you support ethical beekeeping and regional biodiversity.',

    contact_badge: 'Contact',
    contact_headline: 'Order honey or ask a question',
    contact_sub: 'We reply within 24 hours. You can also call — we answer every day from 8 AM to 8 PM.',
    contact_phone_btn: '+48 600 123 456',
    contact_map_text: 'ul. Lipowa 12, 24-120 Kazimierz Dolny — click to open in Google Maps',

    sticky_cta: 'Call now',
    lang_label: 'Language',
  },

  de: {
    nav_about: 'Über uns',
    nav_products: 'Produkte',
    nav_benefits: 'Vorteile',
    nav_contact: 'Kontakt',
    nav_call: 'Anrufen',

    hero_eyebrow: 'Seit 1987 — Tradition & Qualität',
    hero_headline: 'Hören Sie auf, Zucker im Glas zu kaufen',
    hero_sub: 'Echter Honig ist mehr als Süße. Er ist die flüssige Architektur der Natur, in Glas versiegelt von Handwerkern, die jeden Tropfen schätzen.',
    hero_cta_primary: 'Kollektion entdecken',
    hero_cta_secondary: 'Unsere Geschichte',

    about_headline: 'Über 35 Jahre Leidenschaft für Imkerei',
    about_p1: 'Unsere Imkerei wurde 1987 aus Liebe zur Natur und zu den Bienen gegründet. Seit drei Generationen bewahren wir traditionelle Methoden der Honiggewinnung, die höchste Qualität und vollen Geschmack garantieren.',
    about_p2: 'Jedes Glas, das unsere Imkerei verlässt, wird von Hand abgefüllt und etikettiert. Wir pasteurisieren nicht und verwenden keine künstlichen Zusätze — Sie erhalten reinen, rohen Honig direkt aus der Wabe.',

    products_eyebrow: 'Saisonale Ausgabe',
    products_headline: 'Flüssiges Handwerk aus polnischen Imkereien.',
    product_lipowy: 'Linden',
    product_lipowy_desc: 'Goldenes Aroma der Lindenblüten',
    product_lipowy_price: '85 PLN',
    product_gryczany: 'Buchweizen',
    product_gryczany_desc: 'Intensives, dunkles Aroma',
    product_gryczany_price: '92 PLN',
    product_akacjowy: 'Akazien',
    product_akacjowy_desc: 'Zart, hell und süß',
    product_akacjowy_price: '82 PLN',
    product_spadziowy: 'Honigtau',
    product_spadziowy_desc: 'Dunkler Waldhonig aus Nadelbäumen',
    product_spadziowy_price: '115 PLN',
    product_nawlociowy: 'Goldrute',
    product_nawlociowy_sub: 'Limitierte Herbstausgabe',
    product_nawlociowy_cta: 'JETZT KAUFEN · 79 PLN',

    benefits_headline: 'Warum Ihr „Honig" aus dem Supermarkt schaden kann',
    benefits_sub: 'Die meisten Supermarkthonige sind pasteurisierter Sirup ohne Enzyme. Das gewinnen Sie mit unserer Imkerei:',
    benefit_1_title: '100 % rein — kein Sirup',
    benefit_1_text: 'Jede Charge im Labor geprüft. Qualitätszertifikat bei jeder Bestellung.',
    benefit_2_title: 'Nicht pasteurisiert — lebende Enzyme',
    benefit_2_text: 'Unser Honig überschreitet nie 40 °C. Alle Vitamine und Heilkräfte bleiben erhalten.',
    benefit_3_title: 'Vom Imker an Ihre Tür',
    benefit_3_text: 'Ohne Zwischenhändler. Telefonisch bestellen, Versand in 24 Std. oder Selbstabholung.',
    benefit_4_title: 'Unterstützung für Bienen',
    benefit_4_text: 'Mit Ihrem Kauf unterstützen Sie ethische Imkerei und regionale Biodiversität.',

    contact_badge: 'Kontakt',
    contact_headline: 'Honig bestellen oder Frage stellen',
    contact_sub: 'Wir antworten innerhalb von 24 Stunden. Sie können auch anrufen — täglich von 8 bis 20 Uhr.',
    contact_phone_btn: '+48 600 123 456',
    contact_map_text: 'ul. Lipowa 12, 24-120 Kazimierz Dolny — klicken, um in Google Maps zu öffnen',

    sticky_cta: 'Jetzt anrufen',
    lang_label: 'Sprache',
  },

  it: {
    nav_about: 'Chi siamo',
    nav_products: 'Prodotti',
    nav_benefits: 'Vantaggi',
    nav_contact: 'Contatti',
    nav_call: 'Chiama',

    hero_eyebrow: 'Dal 1987 — Tradizione e Qualità',
    hero_headline: 'Smetti di comprare zucchero in un barattolo',
    hero_sub: 'Il vero miele è più di una dolcezza. È l\'architettura liquida della natura, sigillata nel vetro da artigiani che rispettano ogni goccia.',
    hero_cta_primary: 'Scopri la collezione',
    hero_cta_secondary: 'La nostra storia',

    about_headline: 'Oltre 35 anni di passione per l\'apicoltura',
    about_p1: 'Il nostro apiario è stato fondato nel 1987 per amore della natura e delle api. Da tre generazioni preserviamo i metodi tradizionali di raccolta del miele che garantiscono la massima qualità e pienezza di sapore.',
    about_p2: 'Ogni barattolo che lascia il nostro apiario è riempito e etichettato a mano. Non pastorizziamo né aggiungiamo ingredienti artificiali — ricevi miele puro e crudo direttamente dal favo.',

    products_eyebrow: 'Edizione stagionale',
    products_headline: 'Artigianato liquido dagli apiari polacchi.',
    product_lipowy: 'Tiglio',
    product_lipowy_desc: 'Aroma dorato dei fiori di tiglio',
    product_lipowy_price: '85 PLN',
    product_gryczany: 'Grano saraceno',
    product_gryczany_desc: 'Aroma intenso e scuro',
    product_gryczany_price: '92 PLN',
    product_akacjowy: 'Acacia',
    product_akacjowy_desc: 'Delicato, chiaro e dolce',
    product_akacjowy_price: '82 PLN',
    product_spadziowy: 'Melata',
    product_spadziowy_desc: 'Miele scuro di bosco di conifere',
    product_spadziowy_price: '115 PLN',
    product_nawlociowy: 'Verga d\'oro',
    product_nawlociowy_sub: 'Edizione autunnale limitata',
    product_nawlociowy_cta: 'ACQUISTA ORA · 79 PLN',

    benefits_headline: 'Perché il "miele" del supermercato può farti male',
    benefits_sub: 'La maggior parte dei mieli da supermercato è sciroppo pastorizzato privo di enzimi. Ecco cosa ottieni scegliendo il nostro apiario:',
    benefit_1_title: '100% puro — zero sciroppo',
    benefit_1_text: 'Ogni lotto testato in laboratorio. Certificato di qualità in ogni ordine.',
    benefit_2_title: 'Non pastorizzato — enzimi vivi',
    benefit_2_text: 'Il nostro miele non supera mai i 40 °C. Conserva tutte le vitamine e le proprietà curative.',
    benefit_3_title: 'Dall\'apicoltore alla tua porta',
    benefit_3_text: 'Senza intermediari. Ordini per telefono, spediamo in 24 ore o ritiri di persona.',
    benefit_4_title: 'Sostegno per le api',
    benefit_4_text: 'Acquistando da noi, sostieni l\'apicoltura etica e la biodiversità regionale.',

    contact_badge: 'Contatti',
    contact_headline: 'Ordina miele o fai una domanda',
    contact_sub: 'Rispondiamo entro 24 ore. Puoi anche chiamare — rispondiamo ogni giorno dalle 8 alle 20.',
    contact_phone_btn: '+48 600 123 456',
    contact_map_text: 'ul. Lipowa 12, 24-120 Kazimierz Dolny — clicca per aprire in Google Maps',

    sticky_cta: 'Chiama ora',
    lang_label: 'Lingua',
  },

  fr: {
    nav_about: 'À propos',
    nav_products: 'Produits',
    nav_benefits: 'Avantages',
    nav_contact: 'Contact',
    nav_call: 'Appeler',

    hero_eyebrow: 'Depuis 1987 — Tradition & Qualité',
    hero_headline: 'Arrêtez d\'acheter du sucre en pot',
    hero_sub: 'Le vrai miel est bien plus que de la douceur. C\'est l\'architecture liquide de la nature, scellée dans le verre par des artisans qui respectent chaque goutte.',
    hero_cta_primary: 'Découvrir la collection',
    hero_cta_secondary: 'Notre histoire',

    about_headline: 'Plus de 35 ans de passion pour l\'apiculture',
    about_p1: 'Notre rucher a été fondé en 1987 par amour de la nature et des abeilles. Depuis trois générations, nous préservons les méthodes traditionnelles de récolte du miel qui garantissent la plus haute qualité et la plénitude du goût.',
    about_p2: 'Chaque pot qui quitte notre rucher est rempli et étiqueté à la main. Nous ne pasteurisons pas et n\'ajoutons aucun ingrédient artificiel — vous recevez du miel pur et cru directement du rayon.',

    products_eyebrow: 'Édition saisonnière',
    products_headline: 'Artisanat liquide des ruchers polonais.',
    product_lipowy: 'Tilleul',
    product_lipowy_desc: 'Arôme doré des fleurs de tilleul',
    product_lipowy_price: '85 PLN',
    product_gryczany: 'Sarrasin',
    product_gryczany_desc: 'Arôme intense et sombre',
    product_gryczany_price: '92 PLN',
    product_akacjowy: 'Acacia',
    product_akacjowy_desc: 'Délicat, clair et doux',
    product_akacjowy_price: '82 PLN',
    product_spadziowy: 'Miellat',
    product_spadziowy_desc: 'Miel sombre de forêt de conifères',
    product_spadziowy_price: '115 PLN',
    product_nawlociowy: 'Verge d\'or',
    product_nawlociowy_sub: 'Édition limitée d\'automne',
    product_nawlociowy_cta: 'ACHETER · 79 PLN',

    benefits_headline: 'Pourquoi votre « miel » de supermarché peut vous nuire',
    benefits_sub: 'La plupart des miels de supermarché sont du sirop pasteurisé sans enzymes. Voici ce que vous gagnez en choisissant notre rucher :',
    benefit_1_title: '100 % pur — zéro sirop',
    benefit_1_text: 'Chaque lot testé en laboratoire. Certificat de qualité avec chaque commande.',
    benefit_2_title: 'Non pasteurisé — enzymes vivantes',
    benefit_2_text: 'Notre miel ne dépasse jamais 40 °C. Il conserve toutes les vitamines et propriétés curatives.',
    benefit_3_title: 'De l\'apiculteur à votre porte',
    benefit_3_text: 'Sans intermédiaires. Commandez par téléphone, nous expédions sous 24 h ou vous récupérez en personne.',
    benefit_4_title: 'Soutien aux abeilles',
    benefit_4_text: 'En achetant chez nous, vous soutenez l\'apiculture éthique et la biodiversité régionale.',

    contact_badge: 'Contact',
    contact_headline: 'Commander du miel ou poser une question',
    contact_sub: 'Nous répondons sous 24 heures. Vous pouvez aussi appeler — nous répondons tous les jours de 8h à 20h.',
    contact_phone_btn: '+48 600 123 456',
    contact_map_text: 'ul. Lipowa 12, 24-120 Kazimierz Dolny — cliquez pour ouvrir dans Google Maps',

    sticky_cta: 'Appeler maintenant',
    lang_label: 'Langue',
  },
};

const FLAGS = {
  pl: '🇵🇱',
  en: '🇬🇧',
  de: '🇩🇪',
  it: '🇮🇹',
  fr: '🇫🇷',
};

const LANG_NAMES = {
  pl: 'Polski',
  en: 'English',
  de: 'Deutsch',
  it: 'Italiano',
  fr: 'Français',
};

let currentLang = localStorage.getItem('pasieka_lang') || 'pl';

export function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.pl[key] || key;
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('pasieka_lang', lang);
}

export function getFlags() {
  return FLAGS;
}

export function getLangNames() {
  return LANG_NAMES;
}

export function getAvailableLangs() {
  return Object.keys(TRANSLATIONS);
}

/**
 * Translate all elements with [data-i18n] attribute
 */
export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
}
