# Plan 002 — Servicios externos y staging (backend)

- **Spec:** `spec.md` · **Dueño:** BE-B

## 1. Archivos
```
internal/config/{config.go (modificar), cloudinary.go, cloudinary_test.go}
cmd/admin/{main.go, check_services.go, check_services_test.go}
internal/platform/cloudinary/ping.go (+ test)
docs/servicios.md
.env.example (modificar)
render.yaml  (o el archivo del proveedor elegido)
```

## 2. Decisiones
| # | Decisión | Art. |
|---|---|---|
| P-01 | `config.Load()` llama a `loadCloudinary(getenv)`; futuras specs agregan `loadAuth`, `loadPush` en su propio archivo y **una línea** en `Load()` | XII |
| P-02 | `Cloudinary` expone `CloudName`, `APIKey`, `APISecret`, `BaseFolder`; el secreto no tiene método `String()` que lo imprima (tipo `Secret` con `String() = "***"`) | VI |
| P-03 | Ping a Cloudinary con `net/http`, `http.NewRequestWithContext`, autenticación básica y timeout de 5 s | VIII |
| P-04 | `cmd/admin` usa subcomandos con `os.Args` (sin librería) | VIII |
| P-05 | Staging: Docker del 001 (T019) desplegado en el proveedor; variables definidas en su panel; `APP_ENV=staging` | VI |
| P-06 | Atlas M0: usuario de base con rol `readWrite` solo sobre `vaiven_staging`; lista de red `0.0.0.0/0` (necesaria con hosting gratuito sin IP fija; se documenta el riesgo) | VI |

## 3. Variables (se suman a las del 001)
| Variable | Oblig. | Descripción |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Sí* | Nombre de la nube |
| `CLOUDINARY_API_KEY` | Sí* | Clave pública de la API |
| `CLOUDINARY_API_SECRET` | Sí* | **Secreto**; solo en el backend |
| `CLOUDINARY_BASE_FOLDER` | No | Por defecto `vaiven/<APP_ENV>` |
\* Excepto `APP_ENV=test`.

## 4. Pruebas
Unitarias de `config` (válido, faltantes, `test`); `ping` con servidor HTTP simulado (`httptest`): 200 → OK, 401 → error sin filtrar el secreto; `check-services` con dobles.

## 5. Verificación de constitución
| Art. | Cumple |
|---|---|
| II.4 | Solo se prepara Cloudinary; sin binarios en Mongo |
| VI.1, VI.7 | Secretos por entorno, `Secret` oculto, documentación sin valores |
| VIII | Sin dependencias nuevas |
| XII | Config por archivo, sin tocar código de otros |

## 6. Riesgos
| Riesgo | Mitigación |
|---|---|
| El plan gratuito del host duerme el servicio | Documentarlo; "calentar" con `/healthz` antes de demostrar |
| Credenciales filtradas | `Secret`, `.gitignore`, rotación documentada |
