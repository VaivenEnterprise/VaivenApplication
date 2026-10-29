# Spec 002 — Servicios externos y staging (backend)

- **Dueño:** BE-B · **Prioridad:** P0 · **Ventana:** 29–31 oct · **Depende de:** 001
- **Constitución:** v1.1.0 · **Estado:** Borrador, pendiente de aprobación

## 1. Objetivo y por qué
Conectar el backend con los servicios gratuitos que usará todo el proyecto (MongoDB Atlas, Cloudinary) y tener un **entorno de staging** público, para que las 4 personas y la app móvil trabajen contra el mismo servidor desde el primer día. Sin funcionalidad de negocio.

## 2. Historias técnicas
| # | Prio. | Historia |
|---|---|---|
| H-01 | P1 | Como **desarrollador**, quiero un comando que compruebe que mis credenciales de MongoDB y Cloudinary funcionan, para detectar errores de configuración antes de programar. |
| H-02 | P1 | Como **equipo**, quiero un backend de staging con HTTPS conectado a Atlas, para probar la app móvil contra un servidor real. |
| H-03 | P1 | Como **desarrollador**, quiero que cada módulo agregue su configuración sin editar un archivo común, para evitar conflictos entre las 4 personas. |
| H-04 | P2 | Como **equipo**, quiero documentación de cada servicio sin secretos, para que cualquiera pueda reproducir el entorno. |

## 3. Requisitos
| ID | Requisito |
|---|---|
| RF-01 | La configuración se divide en subestructuras cargadas desde archivos separados (`Cloudinary`, y las que agreguen specs posteriores); `Load()` las reúne y reporta **todos** los errores juntos. |
| RF-02 | Variables nuevas: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (obligatorias salvo `APP_ENV=test`), `CLOUDINARY_BASE_FOLDER` (por defecto `vaiven/<APP_ENV>`). |
| RF-03 | `go run ./cmd/admin check-services` verifica MongoDB (ping) y Cloudinary (`GET /v1_1/<cloud>/ping` con autenticación básica) e imprime `OK`/`FALLA` por servicio, **sin imprimir secretos**; sale con código ≠ 0 si alguno falla. |
| RF-04 | El backend se conecta a MongoDB Atlas con una URI `mongodb+srv://…` y `/readyz` responde 200. |
| RF-05 | Existe un despliegue de staging con HTTPS donde `/healthz`, `/readyz` y `/api/v1/meta` responden; sus variables de entorno se configuran en el proveedor, no en el repositorio. |
| RF-06 | `CORS_ALLOWED_ORIGINS` y `APP_ENV=staging` (valor nuevo permitido) están soportados. |
| RF-07 | `docs/servicios.md` describe: qué servicio es, para qué, cómo se creó la cuenta, qué variables necesita y cómo rotar claves; **sin ningún valor secreto**. |
| RNF-01 | Ningún secreto en el repositorio ni en logs; `check-services` oculta credenciales. |
| RNF-02 | Cobertura ≥ 80 % en el código nuevo de `config`. |

## 4. Criterios de aceptación
| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado un `.env` válido, cuando ejecuto `check-services`, entonces veo `OK` en ambos servicios y código 0. |
| CA-02 | Dado un `CLOUDINARY_API_SECRET` incorrecto, cuando ejecuto `check-services`, entonces Cloudinary muestra `FALLA` sin revelar el valor y el código es ≠ 0. |
| CA-03 | Dado `APP_ENV=production` sin variables de Cloudinary, cuando arranca la API, entonces falla listando todas las faltantes. |
| CA-04 | Dado el staging desplegado, cuando consulto `https://<staging>/readyz`, entonces recibo 200. |

## 5. Fuera de alcance
Subida real de imágenes (spec 004), autenticación (003), dominios propios, monitoreo avanzado, copias de seguridad.

## 6. Preguntas abiertas
- Hosting: **Render, plan gratuito** (confirmado el 28 de oct). Se duerme tras inactividad y el primer acceso tarda ~1 min; se mitiga con un monitor gratuito de ping (backend 013). Se crean dos servicios: `vaiven-staging` y `vaiven-prod` (este último, spec 013).
- [NEEDS CLARIFICATION: ¿Una sola base Atlas para todo (`vaiven_staging`) o una por persona para desarrollo local? Provisional: Mongo local con Docker para desarrollo y Atlas para staging.]
