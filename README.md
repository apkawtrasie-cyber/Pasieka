# 🍯 Pasieka Złoty Nektar

Nowoczesna, w pełni responsywna i wysoce zoptymalizowana pod kątem wydajności strona internetowa (typu Landing Page/One-Page) stworzona dla rodzinnej pasieki z Kazimierza Dolnego. Celem projektu jest prezentacja oferty w 100% naturalnych, surowych i niepasteryzowanych miodów z wykorzystaniem nowoczesnego designu (Premium/Dark Mode) oraz płynnych animacji.

---

## 🛠 Stos Technologiczny (Tech Stack)

Projekt opiera się na lekkim, nowoczesnym stosie z naciskiem na **Vanilla JS** i **brak ciężkich frameworków (typu React czy Vue)**, co gwarantuje błyskawiczne ładowanie i maksymalną wydajność (wysoki wynik w PageSpeed Insights).

### Frontend / UI
*   **HTML5**: Semantyczny, dostępny (ARIA) kod strukturalny.
*   **Tailwind CSS (v3)**: Główny framework narzędziowy do stylowania. Plik CSS jest budowany i minifikowany przed wdrożeniem, pozostawiając tylko używane klasy (`css/tailwind.min.css`).
*   **Custom CSS (`style.css`)**: Niestandardowe zmienne CSS, efekty `backdrop-filter` (Frosted Glass), style dla dedykowanych komponentów, których nie da się łatwo opisać tylko klasami Tailwind.
*   **Vanilla JavaScript (ES6+)**: Cała logika interfejsu bez zależności od jQuery.

### Animacje i Interakcje
*   **Lenis**: Lekka biblioteka zapewniająca idealnie płynne przewijanie (Smooth Scrolling) na urządzeniach desktopowych.
*   **GSAP (GreenSock) & ScrollTrigger**: Użyte punktowo wyłącznie do obsługi **efektów parallax** (animowane spadające krople miodu, parallax tła wideo w sekcji Hero oraz zbliżenie zdjęcia "O nas" z atrybutem `scrub: true`).
*   **IntersectionObserver API**: Natywne API przeglądarki użyte do animacji wejścia (slide-in, fade-up) szklanych paneli i tekstów. Zastąpiło ScrollTrigger w celu eliminacji zjawiska *forced reflow* i zwiększenia płynności na urządzeniach mobilnych.

### Wydajność i Optymalizacja (Web Performance)
*   **Critical CSS**: Krytyczne style CSS dla pierwszego widoku (Hero & Header) są osadzone bezpośrednio (inline) w znaczniku `<head>`, zapewniając błyskawiczny First Contentful Paint (FCP).
*   **Asynchroniczne ładowanie CSS**: Pliki stylów takie jak Google Fonts czy `style.css` są ładowane asynchronicznie za pomocą techniki `media="print" onload="this.media='all'"`.
*   **WebP Format**: Wszystkie grafiki (zdjęcia miodów, tła) zostały skonwertowane do formatu bezstratnego `.webp`, znacznie redukując wagę strony.
*   **Google Maps Facade Pattern**: Zamiast ładować ciężką ramkę interaktywnej mapy i skrypty na start, strona wyświetla lekki placeholder graficzny (Facade). Prawdziwa mapa Google Maps ładuje się **dopiero po kliknięciu**, co oszczędza transfer i procesor na starcie.
*   **Redukcja użycia GPU na mobile**: Usunięcie problematycznych właściwości `will-change: transform` by uniknąć rozmywania tekstów i przeciążania pamięci układu graficznego w telefonach.

---

## ⚙️ Kluczowe Funkcjonalności (Features)

1.  **Wielojęzyczność (i18n)**:
    *   Własny, autorski moduł `js/i18n.js`.
    *   Wsparcie dla 5 języków: Polski (PL), Angielski (EN), Niemiecki (DE), Włoski (IT), Francuski (FR).
    *   Tłumaczenia wstrzykiwane w czasie rzeczywistym poprzez atrybuty `data-i18n="..."` bez przeładowania strony.
    *   Zapis preferencji użytkownika w `localStorage`.

2.  **Asymetryczny Grid Produktów**:
    *   Karty miodów korzystają z dedykowanych proporcji (aspect-ratio) i CSS Grid, by tworzyć elegancką, "magazynową" strukturę.
    *   Karty zawierają nakładające się na nie panele "Glassmorphism".
    *   Na urządzeniach mobilnych animacje produktów zostały uproszczone/wyłączone, aby zagwarantować pełną ostrość obrazów bez zacięć.

3.  **Sticky Mobile CTA**:
    *   Pływający przycisk "Zadzwoń" dla użytkowników mobilnych pojawiający się na dole ekranu po przewinięciu pierwszej sekcji.

4.  **Parallax Honey Drips**:
    *   Unikalny wizualny efekt spadających kropel miodu w tle o różnych prędkościach podczas scrollowania (stworzony za pomocą GSAP).

---

## 📂 Architektura Projektu

```text
/
├── index.html            # Główny i jedyny plik strukturalny (Landing Page)
├── css/
│   ├── style.css         # Customowe reguły i Glassmorphism
│   └── tailwind.min.css  # Skompilowany, lekki plik Tailwind
├── js/
│   ├── main.js           # Główna logika (Mobile Menu, Mapa, Bootowanie)
│   ├── animations.js     # Moduł odpowiedzialny za GSAP, Parallax i IntersectionObserver
│   └── i18n.js           # Silnik tłumaczeń i słowniki
├── public/
│   ├── images/           # Zoptymalizowane pliki .webp, favicon, wideo (hero-bg.mp4)
├── package.json          # Zależności developerskie (np. tailwindcss do kompilacji)
└── vercel.json           # Konfiguracja cache'owania (Cache-Control) pod deployment
```

## 🚀 Wdrożenie (Deployment)
Projekt został przygotowany pod wdrożenie na platformę **Vercel** (powiązane z repozytorium GitHub `apkawtrasie-cyber/Pasieka`). Platforma ta zapewnia Edge Caching oraz bezproblemowe serwowanie plików statycznych ze zoptymalizowanymi nagłówkami.
