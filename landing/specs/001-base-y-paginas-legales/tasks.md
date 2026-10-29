# Tareas L001 — Base del sitio y páginas legales (landing)

- **Dueño:** MO-B · **Estado:** sin ejecutar · `[P]` = paralelizable
- **Ruta crítica:** T001–T008 deben terminar el **1 de nov** para completar la ficha de Google Play y empezar la prueba cerrada.

- [ ] **T001** Raíz del sitio y archivos de configuración
  - Archivos: `index.html` (provisional), `robots.txt`, `_headers`, `.gitignore`, `README.md`
  - Agente: `dev-web` · Depende de: —
  - Aceptación: `index.html` válido con `lang="es-MX"`, un `h1` y enlaces a las 3 páginas legales; `_headers` con P-07; `robots.txt` permite todo y apunta al sitemap
  - Refs: RF-02, RF-06 · Art. IX

- [ ] **T002** [P] Hoja de estilos base
  - Archivos: `assets/css/styles.css`
  - Agente: `dev-web` · Depende de: —
  - Aceptación: variables en `:root`; mobile-first; `.skip-link`, `.container`, tipografía de lectura para texto legal (`.prose`), tablas responsivas, foco visible, `prefers-reduced-motion`; ≤ 30 KB; sin valores literales fuera de `:root`
  - Refs: RNF-02 · P-02 · Art. VIII

- [ ] **T003** [P] Configuración, script del sitio y plantilla de página
  - Archivos: `assets/js/config.js`, `assets/js/site.js`, `docs/plantilla.html`
  - Agente: `dev-web` · Depende de: —
  - Aceptación: `config.js` según P-01; `site.js` (≤ 5 KB) rellena correo/fecha, controla el menú móvil y el botón de Google Play (sin `playUrl` → «Próximamente en Google Play», no enlace); la plantilla trae `<head>`, cabecera con navegación y pie con enlaces legales; todo funciona sin JS
  - Refs: RF-01 · P-01, P-03

- [ ] **T004** Verificador automático
  - Archivos: `scripts/check.mjs`
  - Agente: `dev-web` · Depende de: T001, T003
  - Aceptación: valida CA-02 y CA-05 y el Art. X: enlaces internos existentes, `lang`, `title` único, `description`, `canonical`, un `h1`, `alt`, cabecera/pie iguales a la plantilla, sin `<form>`, sin URL de otros dominios en `src`/`href` de recursos (salvo `mailto:` y enlaces `<a>` con `rel="noopener noreferrer"`), tamaños (CSS ≤ 30 KB, JS ≤ 5 KB, imágenes ≤ 150 KB); sale con código ≠ 0 si falla; solo módulos de Node
  - Refs: RF-07 · P-04

- [ ] **T005** Aviso de privacidad (borrador)
  - Archivos: `privacidad/index.html`
  - Agente: `dev-web` · Depende de: T002, T003
  - Aceptación: esquema del plan §3; tabla de datos coherente con `../mobile/specs` y `../backend/specs` (CA-03); etiqueta «Borrador pendiente de revisión legal» (RF-09); sin afirmar controles que la app no tiene
  - Refs: RF-03 · P-05 · Art. VI

- [ ] **T006** [P] Términos y condiciones (borrador)
  - Archivos: `terminos/index.html`
  - Agente: `dev-web` · Depende de: T002, T003
  - Aceptación: esquema del plan §3; deja claro que los pagos son entre personas y que VAIVÉN no es parte del préstamo/renta; etiqueta de borrador
  - Refs: RF-04 · Art. VI

- [ ] **T007** [P] Eliminar cuenta y página 404
  - Archivos: `eliminar-cuenta/index.html`, `404.html`
  - Agente: `dev-web` · Depende de: T002, T003
  - Aceptación: CA-04; pasos exactos de la app según `mobile/specs/003` (Perfil → Eliminar cuenta, pide contraseña); condición de reservas activas; alternativa por correo con plazo; 404 con enlace al inicio
  - Refs: RF-05, RF-06 · P-06

- [ ] **T008** Sitemap y comprobación local
  - Archivos: `sitemap.xml`, `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T004, T005, T006, T007
  - Aceptación: `node scripts/check.mjs` sin errores; sitemap con las URL; revisión visual a 360/768/1280 px anotada
  - Refs: CA-02 · P-08

- [ ] **T009** Publicación gratuita y URL para la ficha (**la hace una persona**)
  - Archivos: `docs/publicacion.md`, `assets/js/config.js` y `sitemap.xml`/`canonical` con la URL real, `memoria.md` (solo anexar)
  - Agente: — (manual, asistido por `dev-web` para los archivos) · Depende de: T008
  - Aceptación: sitio publicado en un subdominio gratuito desde `main` (P-09); CA-01 y CA-06; URL de privacidad y de eliminación de cuenta anotadas en `memoria.md` y entregadas a quien llena la ficha de Play
  - Refs: RF-08

- [ ] **T010** Revisión legal humana y conformidad
  - Archivos: `privacidad/index.html`, `terminos/index.html`, `eliminar-cuenta/index.html` (quitar la etiqueta de borrador), `memoria.md` (solo anexar)
  - Agente: `revisor-constitucion` + **persona responsable** · Depende de: T009
  - Aceptación: una persona aprobó los textos y se quitó la etiqueta; correo y responsable reales; veredicto **CONFORME**; hito «Landing legal» marcado en el ROADMAP
  - Refs: RF-09 · Art. VI

| Total | 10 tareas |
|---|---|
