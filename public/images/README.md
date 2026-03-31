# 📸 Instrukcja — Dodawanie prawdziwych zdjęć

## Wymagane pliki

Wklej swoje zdjęcia do tego folderu (`public/images/`) w **3 formatach** dla każdego obrazu:

### Hero Section
- `hero.avif` (600×500px)
- `hero.webp` (600×500px)
- `hero.jpg` (600×500px, fallback)

### Sekcja O nas
- `pszczelarz.avif` (600×450px)
- `pszczelarz.webp` (600×450px)
- `pszczelarz.jpg` (600×450px, fallback)

### Produkty (każdy 400×300px)
- `miod-lipowy.avif` / `.webp` / `.jpg`
- `miod-wielokwiatowy.avif` / `.webp` / `.jpg`
- `miod-spadziowy.avif` / `.webp` / `.jpg`
- `pylek-pszczeli.avif` / `.webp` / `.jpg`
- `pierzga.avif` / `.webp` / `.jpg`
- `propolis.avif` / `.webp` / `.jpg`

---

## Jak przekonwertować zdjęcia?

### Opcja 1: Online (najłatwiejsza)
1. Wejdź na https://squoosh.app/
2. Przeciągnij swoje zdjęcie JPG
3. Wybierz format wyjściowy: **WebP** (jakość 85%)
4. Pobierz i zapisz jako np. `hero.webp`
5. Powtórz dla **AVIF** (jakość 75%)
6. Oryginał JPG zapisz jako fallback

### Opcja 2: Wiersz poleceń (ImageMagick)
```bash
# Instalacja (macOS)
brew install imagemagick libavif

# Konwersja pojedynczego pliku
magick hero-original.jpg -resize 600x500^ -gravity center -extent 600x500 -quality 85 hero.webp
magick hero-original.jpg -resize 600x500^ -gravity center -extent 600x500 -quality 75 hero.avif
magick hero-original.jpg -resize 600x500^ -gravity center -extent 600x500 -quality 90 hero.jpg
```

### Opcja 3: Batch script (wszystkie produkty naraz)
Stwórz plik `convert.sh` w tym folderze:

```bash
#!/bin/bash
for img in miod-lipowy miod-wielokwiatowy miod-spadziowy pylek-pszczeli pierzga propolis; do
  magick "${img}-original.jpg" -resize 400x300^ -gravity center -extent 400x300 -quality 85 "${img}.webp"
  magick "${img}-original.jpg" -resize 400x300^ -gravity center -extent 400x300 -quality 75 "${img}.avif"
  magick "${img}-original.jpg" -resize 400x300^ -gravity center -extent 400x300 -quality 90 "${img}.jpg"
done
```

Uruchom: `chmod +x convert.sh && ./convert.sh`

---

## Po dodaniu zdjęć

Zaktualizuj ścieżki w `js/config.js`:

```javascript
// Zmień z:
img_url: 'assets/img/miod-lipowy.svg',

// Na:
img_url: 'public/images/miod-lipowy',
// (bez rozszerzenia — <picture> tag doda .avif/.webp/.jpg automatycznie)
```

Odkomentuj `<picture>` tagi w:
- `index.html` (hero i pszczelarz)
- `js/main.js` (funkcja renderProducts)

---

## Optymalizacja rozmiaru

**Cel**: Każde zdjęcie < 100KB

- **AVIF**: najlepsza kompresja (75% jakości wystarczy)
- **WebP**: dobra kompresja (85% jakości)
- **JPG**: fallback dla starych przeglądarek (90% jakości)

Sprawdź rozmiary:
```bash
ls -lh public/images/*.{avif,webp,jpg}
```

Jeśli plik > 100KB, zmniejsz jakość lub wymiary.
