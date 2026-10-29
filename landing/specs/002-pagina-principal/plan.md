# Plan L002 — Página principal informativa

- **Spec:** `spec.md` · **Dueño:** MO-B

## 1. Archivos
```
index.html (reemplaza el provisional)
assets/css/styles.css (secciones: .hero, .steps, .cards, .trust, .faq, .cta)
assets/img/{hero.svg, step-1.svg … step-4.svg, og-image.png, google-play-badge.* (insignia oficial), captura-*.webp (P2)}
assets/js/config.js (playUrl al publicar)
sitemap.xml
```

## 2. Estructura de la página (orden)
1. `header` con navegación y botón de descarga.
2. `hero`: `h1` «Presta lo que no usas. Encuentra lo que necesitas.» *(provisional)*, apoyo, botón de Play, ilustración.
3. `#como-funciona`: `ol` de 4 pasos con icono SVG.
4. `#que-puedes-compartir`: tarjetas por categoría (herramientas manuales, herramientas eléctricas, construcción y jardinería, movilidad, deportes, hogar).
5. `#confianza`: 4–5 puntos con texto breve y la aclaración de pagos y seguros.
6. `#para-quien`: dos columnas.
7. `#preguntas`: `<details>` ×7.
8. `cta` final con botón de Play.
9. `footer` (plantilla).

## 3. Decisiones
| # | Decisión | Art. |
|---|---|---|
| P-01 | Ilustraciones SVG propias, simples y con `role="img"`/`aria-label`; no se usan ilustraciones de terceros | V.4 |
| P-02 | La insignia oficial de Google Play se descarga del recurso oficial y se coloca sin modificar; con tamaño mínimo y espacio libre según los lineamientos de Google; la persona responsable la agrega (no se genera) | V.3 |
| P-03 | Botón de Play: `<a data-play-link href="#">`; `site.js` fija el `href` desde `config.js`; sin URL, se reemplaza por un `<span>` «Próximamente en Google Play» | IV.3 |
| P-04 | Acordeón con `<details><summary>`: accesible y sin JS | VIII |
| P-05 | Imagen Open Graph 1200×630 propia (nombre + frase + paleta) en PNG/WebP ≤ 150 KB | VIII |
| P-06 | JSON-LD `MobileApplication` (`name`, `operatingSystem: ANDROID`, `applicationCategory`, `url`), sin `aggregateRating` | V.2 |
| P-07 | Cada afirmación se verifica contra las specs y se cita en `memoria.md` (tabla afirmación → spec) | V.2 |
| P-08 | Las capturas (P2) se agregan solo cuando existan en una versión estable de la app; si faltan, la sección no aparece | V.2 |
| P-09 | Tras publicar en Play, tarea final: poner `playUrl`, actualizar `sitemap`/OG y volver a ejecutar `check.mjs` | IV.3 |

## 4. Pruebas
`check.mjs`; Lighthouse móvil; revisión a 360/768/1280 px; navegación con teclado; lectura con lector de pantalla en la sección de pasos y preguntas; revisión de textos contra specs.

## 5. Verificación de constitución
| Art. | Cumple |
|---|---|
| II | Solo información |
| V | Nada inventado; insignia oficial sin alterar |
| VII | Sin terceros |
| VIII | Accesibilidad, rendimiento, SEO |
