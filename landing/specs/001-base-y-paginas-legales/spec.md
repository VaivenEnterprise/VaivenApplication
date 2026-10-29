# Spec L001 — Base del sitio y páginas legales (landing)

- **Dueño:** MO-B · **Prioridad:** P0 · **Ventana:** 30 oct–1 nov · **Depende de:** nada (arranca en paralelo)
- **Constitución:** landing v1.0.0 · **Estado:** Borrador

## 1. Objetivo y por qué
Poner en línea, gratis y lo antes posible, un sitio estático con las **tres páginas legales** que Google Play pide como URL públicas (aviso de privacidad, términos y eliminación de cuenta). Sin ellas no se puede crear la ficha ni iniciar la prueba cerrada, que es la ruta crítica hacia el 20 de noviembre.

## 2. Historias
| # | Prio. | Historia |
|---|---|---|
| H-01 | P0 | Como equipo, queremos las URL públicas de privacidad y eliminación de cuenta, para completar la ficha de Google Play. |
| H-02 | P0 | Como persona usuaria, quiero entender qué datos recopila VAIVÉN y para qué, para decidir si me registro. |
| H-03 | P0 | Como persona usuaria, quiero saber cómo borrar mi cuenta y mis datos, aunque ya no tenga la app. |
| H-04 | P1 | Como persona usuaria, quiero leer las reglas de uso (términos), para saber mis responsabilidades. |

## 3. Requisitos
| ID | Requisito |
|---|---|
| RF-01 | Estructura del sitio, hoja de estilos base con *tokens*, plantilla de página y `assets/js/config.js` (URL de Google Play vacía, correo de soporte, fecha de actualización legal). |
| RF-02 | `index.html` provisional («VAIVÉN llegará pronto») con enlaces a las páginas legales; L002 lo reemplaza. |
| RF-03 | **Aviso de privacidad** (`/privacidad/`), borrador completo: responsable y contacto; datos que recopila la app (correo, nombre, teléfono opcional, contraseña —solo como huella cifrada—, ubicación aproximada, fotos de objetos y de evidencia, mensajes, reservas, calificaciones, reportes e incidencias, token de notificaciones, datos técnicos de peticiones); para qué se usan; con quién se comparten (proveedores técnicos: base de datos, almacenamiento de imágenes, hosting y servicio de notificaciones) y con la contraparte de una reserva; conservación; derechos ARCO y cómo ejercerlos; edad mínima 18 años; seguridad; cambios del aviso; fecha. |
| RF-04 | **Términos y condiciones** (`/terminos/`), borrador: qué es VAIVÉN (plataforma que conecta personas, no es parte del préstamo/renta); requisitos (18+); responsabilidades de propietarios y solicitantes; pagos **entre personas**, sin procesamiento por VAIVÉN; contenido prohibido; incidencias y suspensiones; limitación de responsabilidad; terminación; ley aplicable (México); contacto. |
| RF-05 | **Eliminar cuenta** (`/eliminar-cuenta/`): pasos desde la app (Perfil → Eliminar cuenta), qué ocurre (la cuenta se anonimiza; reservas, evidencia e incidencias se conservan sin datos que identifiquen a la persona, por seguridad de la contraparte), condición (no tener reservas activas) y **alternativa por correo** con plazo de respuesta. |
| RF-06 | `404.html`, `robots.txt`, `sitemap.xml` y `_headers` (seguridad y caché). |
| RF-07 | `scripts/check.mjs` valida el Art. X de la constitución. |
| RF-08 | Publicación en Cloudflare Pages (o Netlify) desde `main`, carpeta `landing/`, con subdominio gratuito; instrucciones en `docs/publicacion.md`. |
| RF-09 | Las páginas legales muestran su fecha de última actualización y una etiqueta visible «Borrador pendiente de revisión legal» **hasta que una persona la apruebe**; la etiqueta se quita en la tarea final. |
| RNF-01 | Lighthouse móvil ≥ 90 en las cuatro categorías; página legal < 60 KB. |
| RNF-02 | Legibles desde 320 px; accesibles con teclado. |

## 4. Criterios de aceptación
| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado el sitio publicado, entonces `/privacidad/`, `/terminos/` y `/eliminar-cuenta/` responden 200 sin iniciar sesión. |
| CA-02 | Dado `node scripts/check.mjs`, entonces termina sin errores. |
| CA-03 | Dado el aviso de privacidad, entonces cada dato que recopila la app aparece con su finalidad. |
| CA-04 | Dada la página de eliminación, entonces una persona sin la app encuentra cómo pedir el borrado. |
| CA-05 | Dado un recurso externo o un `<form>`, entonces `check.mjs` falla. |
| CA-06 | Dadas las URL públicas, entonces quedan anotadas en `memoria.md` para la ficha de Play. |

## 5. Fuera de alcance
Página principal informativa (L002), blog, idiomas distintos al español, dominio propio, correo corporativo.

## 6. Preguntas abiertas
- Resuelto (28 oct): correo de soporte público `vaivenedeltrabajo@gmail.com` (contacto, ARCO y eliminación de cuenta).
- Resuelto (28 oct): responsable de los datos y nombre del desarrollador: Joseph Abrham Yañez Garcia (persona física).
- [NEEDS CLARIFICATION: revisión legal: el equipo aún no tiene asesoría ni trámites legales. Los textos se publican como borrador revisado por una persona del equipo; conviene una revisión profesional antes o poco después de publicar.]
- [NEEDS CLARIFICATION: plazo de conservación de datos anonimizados y de registros técnicos. Provisional: registros técnicos 90 días.]
