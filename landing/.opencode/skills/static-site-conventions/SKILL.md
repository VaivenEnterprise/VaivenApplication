---
name: static-site-conventions
description: Convenciones HTML/CSS/JS de la landing de VAIVÉN (estructura, accesibilidad, metadatos, rendimiento). Úsala al escribir o cambiar páginas, estilos o scripts.
---

# Skill: convenciones del sitio estático

## Estructura de página
```html
<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Título único · VAIVÉN</title>
  <meta name="description" content="…≤ 155 caracteres…">
  <link rel="canonical" href="https://…/ruta/">
  <meta property="og:title" content="…"> <!-- + og:description, og:type, og:url, og:image -->
  <meta name="theme-color" content="#…">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script type="module" src="/assets/js/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header">…</header>
  <main id="contenido"> <h1>…</h1> … </main>
  <footer class="site-footer">…</footer>
</body>
</html>
```
Cabecera y pie salen de `docs/plantilla.html` (copiar tal cual).

## CSS
- Variables en `:root` (`--color-*`, `--space-*`, `--radius-*`, `--font-*`); nunca valores literales en reglas.
- Mobile-first: reglas base para 320 px y `@media (min-width: 48em)` / `(min-width: 64em)`.
- Tipografía: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Foco visible con `:focus-visible`; respetar `prefers-reduced-motion` y `prefers-color-scheme` (opcional).
- Nombres de clase por bloque (`.hero`, `.steps`, `.faq`), sin ids para estilos.

## JavaScript (solo mejora)
- ES module pequeño: menú móvil y enlace a Google Play desde `config.js`.
- Sin librerías, sin `eval`, sin `innerHTML` con datos externos.
- Si `playUrl` está vacío, el botón muestra «Próximamente en Google Play» y no es un enlace.

## Contenido
- Español de México, frases cortas, voz activa, sin jerga técnica.
- Un `h1` y jerarquía `h2 → h3` sin saltos.
- Enlaces con texto descriptivo («Leer el aviso de privacidad»), nunca «clic aquí».
- Imágenes: `alt` útil, `width`/`height`, `loading="lazy"` (no en la primera).
