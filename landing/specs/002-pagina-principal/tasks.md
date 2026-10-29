# Tareas L002 — Página principal informativa (landing)

- **Dueño:** MO-B · **Estado:** sin ejecutar · `[P]` = paralelizable

- [ ] **T001** Esqueleto de `index.html`, cabecera y sección principal
  - Archivos: `index.html`, `assets/css/styles.css` (bloque `.hero` y `.site-header` ampliado)
  - Agente: `dev-web` · Depende de: L001-T008
  - Aceptación: estructura del plan §2 con secciones vacías y anclas; `hero` con botón de Play (P-03); CA-01 a 360 px
  - Refs: RF-01, RF-02

- [ ] **T002** [P] Ilustraciones SVG propias
  - Archivos: `assets/img/hero.svg`, `assets/img/step-1.svg`, `assets/img/step-2.svg`, `assets/img/step-3.svg`, `assets/img/step-4.svg` *(se pueden dividir en dos tareas si el modelo falla)*
  - Agente: `dev-web` · Depende de: —
  - Aceptación: SVG simples con la paleta, ≤ 8 KB cada uno, `viewBox` definido, sin texto incrustado ni elementos de terceros
  - Refs: P-01 · Art. V.4

- [ ] **T003** Cómo funciona y qué puedes compartir
  - Archivos: `index.html` (secciones `#como-funciona`, `#que-puedes-compartir`), `assets/css/styles.css` (`.steps`, `.cards`)
  - Agente: `dev-web` · Depende de: T001, T002
  - Aceptación: 4 pasos y 6 categorías según RF-03/RF-04; el plazo máximo (7 días) y los QR coinciden con las specs (CA-04)
  - Refs: RF-03, RF-04, RF-07

- [ ] **T004** Confianza, aclaraciones y para quién
  - Archivos: `index.html` (secciones `#confianza`, `#para-quien`), `assets/css/styles.css` (`.trust`)
  - Agente: `dev-web` · Depende de: T001
  - Aceptación: RF-05 y RF-06 sin promesas absolutas; dice claramente que no procesa pagos ni ofrece seguros; verificado contra specs de reservas, entrega, incidencias y moderación
  - Refs: RF-05, RF-06, RF-07 · P-07

- [ ] **T005** Preguntas frecuentes y llamada final
  - Archivos: `index.html` (secciones `#preguntas`, `.cta`), `assets/css/styles.css` (`.faq`, `.cta`)
  - Agente: `dev-web` · Depende de: T003, T004
  - Aceptación: 7 preguntas con `<details>`; respuestas coherentes con las specs (p. ej. eliminar cuenta, iPhone: «por ahora solo Android»); CTA repetida
  - Refs: RF-08, RF-09 · P-04

- [ ] **T006** Insignia oficial de Google Play (**la hace una persona**)
  - Archivos: `assets/img/google-play-badge.*` (descargada del recurso oficial de Google), `index.html` (uso en el botón), `memoria.md` (solo anexar)
  - Agente: — (manual) · Depende de: T001
  - Aceptación: insignia sin alteraciones, con tamaño y espacio libre correctos; se anota en `memoria.md` de dónde se descargó y la fecha
  - Refs: P-02 · Art. V.3

- [ ] **T007** [P] Metadatos, imagen social y datos estructurados
  - Archivos: `index.html` (`<head>`), `assets/img/og-image.png`, `sitemap.xml`
  - Agente: `dev-web` · Depende de: T005
  - Aceptación: `title`, `description`, `canonical`, Open Graph (imagen 1200×630 ≤ 150 KB), JSON-LD `MobileApplication` sin calificaciones; `check.mjs` verde
  - Refs: RF-11 · P-05, P-06

- [ ] **T008** Rendimiento, accesibilidad y revisión visual
  - Archivos: `assets/css/styles.css` (ajustes), `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T006, T007
  - Aceptación: CA-05 y CA-06; revisión a 360/768/1280 px; teclado y lector de pantalla; peso total < 500 KB; resultados anotados
  - Refs: RNF-01, RNF-02

- [ ] **T009** Capturas reales (P2, **la hace una persona**)
  - Archivos: `assets/img/captura-1.webp` … `captura-4.webp`, `index.html` (sección `#capturas`)
  - Agente: `dev-web` (maquetación) · Depende de: T008 y de una versión estable de la app (H4)
  - Aceptación: 3–4 capturas reales ≤ 150 KB con `alt` descriptivo y sin datos personales visibles; si no hay versión estable, se omite la sección
  - Refs: RF-10 · P-08

- [ ] **T010** Enlace de Google Play tras la publicación y cierre
  - Archivos: `assets/js/config.js`, `sitemap.xml`, `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T008 y de la app publicada (mobile 013-T010)
  - Aceptación: CA-02 con la URL real (`https://play.google.com/store/apps/details?id=mx.vaiven.app`); `check.mjs` verde; veredicto **CONFORME** de `revisor-constitucion`
  - Refs: RF-12 · P-09

| Total | 10 tareas |
|---|---|
