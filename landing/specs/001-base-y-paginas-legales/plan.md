# Plan L001 — Base del sitio y páginas legales

- **Spec:** `spec.md` · **Dueño:** MO-B

## 1. Archivos
```
index.html (provisional) · 404.html · robots.txt · sitemap.xml · _headers · .gitignore · README.md
privacidad/index.html · terminos/index.html · eliminar-cuenta/index.html
assets/css/styles.css · assets/js/{site.js, config.js}
docs/{plantilla.html, publicacion.md}
scripts/check.mjs
```

## 2. Decisiones
| # | Decisión | Art. |
|---|---|---|
| P-01 | `config.js` exporta `export const SITE = { name, url, playUrl:"", supportEmail:"", legalUpdated:"" }`; `site.js` rellena `[data-support-email]`, `[data-legal-updated]` y el botón de Play; el HTML trae valores de reserva legibles sin JS | IV.3 |
| P-02 | Tokens de CSS: paleta provisional verde azulado oscuro y verde (según el documento de idea), escala de espacios `--space-1…8`, radios, sombras discretas; modo oscuro opcional con `prefers-color-scheme` | VIII |
| P-03 | Sin plantillas ni generador: cabecera/pie/head común en `docs/plantilla.html`; `check.mjs` compara el bloque de cabecera y pie de cada página con la plantilla (normalizando la ruta activa) | IV.2 |
| P-04 | `check.mjs` solo con `node:fs`, `node:path`, `node:url`; analiza HTML con expresiones regulares acotadas (suficiente para estas reglas) | III |
| P-05 | Los textos legales siguen la **Ley Federal de Protección de Datos Personales en Posesión de los Particulares** (aviso de privacidad, derechos ARCO) en lenguaje claro; se marcan como borrador | VI |
| P-06 | Eliminación de cuenta por correo: la persona escribe desde el correo registrado; se responde en ≤ 10 días hábiles *(provisional)* | VI |
| P-07 | `_headers`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` vacía para cámara, micrófono y geolocalización, `Content-Security-Policy: default-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`; caché larga para `/assets/*` | IX |
| P-08 | `sitemap.xml` y `canonical` usan la URL final solo cuando se conoce; antes, la URL provisional del subdominio gratuito (se actualiza en la tarea de publicación) | VIII |
| P-09 | Publicación: Cloudflare Pages conectado al repositorio, *root directory* `landing`, sin comando de compilación, salida `/`; ramas de vista previa por PR | IX |

## 3. Contenido de las páginas legales (esquema)
**Privacidad:** 1 Quiénes somos · 2 Datos que recopilamos (tabla dato → para qué → obligatorio/opcional) · 3 Cómo los usamos · 4 Con quién los compartimos · 5 Cuánto tiempo los conservamos · 6 Tus derechos (ARCO) y cómo ejercerlos · 7 Seguridad · 8 Menores · 9 Cambios · 10 Contacto.
**Términos:** 1 Qué es VAIVÉN · 2 Requisitos · 3 Tu cuenta · 4 Reglas para publicar · 5 Reglas para pedir · 6 Pagos entre personas · 7 Entrega, devolución y evidencia · 8 Contenido prohibido y reportes · 9 Incidencias y sanciones · 10 Límites de responsabilidad · 11 Terminación · 12 Ley aplicable · 13 Contacto.
**Eliminar cuenta:** Desde la app · Si no tienes la app · Qué se elimina y qué se conserva · Plazos · Contacto.

## 4. Pruebas
`node scripts/check.mjs` y revisión visual a 360/768/1280 px; Lighthouse móvil sobre las 3 páginas legales; prueba de ruta (`/privacidad` redirige a `/privacidad/`).

## 5. Verificación de constitución
| Art. | Cumple |
|---|---|
| II | Solo información; sin formularios |
| III | Sin dependencias ni compilación |
| VI | Borrador marcado, revisión humana, coincide con la app |
| VII | Sin cookies ni terceros |
| VIII | Accesibilidad y metadatos |
| IX | `_headers` y despliegue desde `main` |
