# Spec L002 — Página principal informativa (landing)

- **Dueño:** MO-B · **Prioridad:** P1 · **Ventana:** 2–9 nov (actualización final tras publicar la app) · **Depende de:** L001
- **Constitución:** landing v1.0.0 · **Estado:** Borrador

## 1. Objetivo y por qué
Explicar en menos de un minuto **qué es VAIVÉN, cómo funciona y por qué es seguro**, y llevar a la persona a **descargar la app en Google Play**. Es la cara pública del proyecto y la página a la que dirigirá la ficha de la tienda. Solo informa: no ofrece servicios.

## 2. Historias
| # | Prio. | Historia |
|---|---|---|
| H-01 | P0 | Como visitante, quiero entender qué es VAIVÉN en pocos segundos, para decidir si me interesa. |
| H-02 | P0 | Como visitante, quiero descargar la app desde Google Play con un toque. |
| H-03 | P1 | Como propietario potencial, quiero saber cómo ganar dinero (o ayudar) prestando lo que no uso. |
| H-04 | P1 | Como solicitante potencial, quiero saber cómo pido algo prestado o rentado y qué me protege. |
| H-05 | P2 | Como visitante, quiero ver cómo se ve la app (capturas reales). |

## 3. Requisitos
| ID | Requisito |
|---|---|
| RF-01 | **Cabecera** con logotipo/nombre, navegación (Cómo funciona, Qué puedes compartir, Confianza, Preguntas) y botón de descarga. |
| RF-02 | **Sección principal (hero):** frase central, 1–2 líneas de apoyo, botón «Disponible en Google Play» (o «Próximamente en Google Play» mientras no haya URL) e ilustración propia. |
| RF-03 | **Cómo funciona** en 4 pasos, fieles a la app: (1) Publica o busca un objeto cerca de ti; (2) Solicita fechas (hasta 7 días) y revisa el total antes de enviar; (3) Acuerden el encuentro por el chat y confirmen la entrega con evidencia fotográfica y un código QR; (4) Devuelvan, confirmen con otro QR y califiquen. |
| RF-04 | **Qué puedes compartir:** herramientas de trabajo (manuales y eléctricas), construcción y jardinería, movilidad (patines, patinetas, bicicletas), deportes y aire libre, hogar y otros. |
| RF-05 | **Confianza y seguridad:** evidencia con fotos en entrega y devolución; QR de un solo uso; calificaciones de 1 a 5; reporte de contenido y de incidencias con revisión del equipo; cuentas solo para mayores de 18 años; ubicación aproximada (no tu dirección exacta). Sin prometer seguridad absoluta. |
| RF-06 | **Aclaraciones honestas:** VAIVÉN no procesa pagos ni ofrece seguros; los pagos se acuerdan y registran entre las personas; las personas son responsables de lo que prestan y de lo que usan. |
| RF-07 | **Para quién:** dos bloques breves (quienes prestan/rentan y quienes piden). |
| RF-08 | **Preguntas frecuentes** (acordeón con `<details>`): ¿Cuesta usar VAIVÉN?, ¿cómo se paga?, ¿qué pasa si algo se daña o no se devuelve?, ¿qué datos se usan?, ¿cómo borro mi cuenta?, ¿en qué ciudades funciona?, ¿hay versión para iPhone? Respuestas coherentes con las specs. |
| RF-09 | **Descarga final** (llamada a la acción repetida) y pie con enlaces a privacidad, términos, eliminar cuenta y correo de soporte. |
| RF-10 | Capturas de la app (P2): 3–4 capturas reales en teléfono, con `alt` descriptivo, cuando exista una versión estable. |
| RF-11 | Metadatos y SEO: `title`, `description`, Open Graph con imagen 1200×630, `canonical`, datos estructurados `MobileApplication` **sin** calificaciones ni reseñas. |
| RF-12 | Al publicarse la app, `config.js` recibe la URL real de Google Play y el botón pasa a ser un enlace. |
| RNF-01 | Lighthouse móvil ≥ 90 en las cuatro categorías; peso total de la página < 500 KB. |
| RNF-02 | Funciona sin JavaScript; legible desde 320 px. |

## 4. Criterios de aceptación
| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado un teléfono, cuando abro la página, entonces veo la propuesta y el botón de Google Play sin desplazarme. |
| CA-02 | Dada la app publicada, cuando toco el botón, entonces abre la ficha de Google Play. |
| CA-03 | Dada la app sin publicar, entonces el botón dice «Próximamente en Google Play» y no es enlace. |
| CA-04 | Dado cada dato de «Cómo funciona» y «Confianza», entonces existe en las specs de la app. |
| CA-05 | Dado `node scripts/check.mjs`, entonces pasa sin errores. |
| CA-06 | Dado Lighthouse móvil, entonces ≥ 90 en las cuatro categorías. |

## 5. Fuera de alcance
Registro, contacto por formulario, blog, testimonios, cifras de uso, comparativas con otras plataformas, versión para iPhone, videos incrustados, analítica.

## 6. Preguntas abiertas
- [NEEDS CLARIFICATION: frase central y tono de marca (¿cercano y familiar, o más práctico?). Provisional: cercano y claro.]
- [NEEDS CLARIFICATION: ciudades o zonas de lanzamiento para la pregunta frecuente «¿dónde funciona?». Provisional: «México».]
- [NEEDS CLARIFICATION: paleta y logotipo definitivos.]
