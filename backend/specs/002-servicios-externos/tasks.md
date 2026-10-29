# Tareas 002 — Servicios externos y staging (backend)

- **Dueño:** BE-B · **Estado:** sin ejecutar · `[P]` = paralelizable
- Las cuentas (Atlas, Cloudinary, hosting) las crea la persona administradora (ROADMAP §10); estas tareas solo las usan.

- [ ] **T001** Config modular y subestructura de Cloudinary
  - Archivos: `internal/config/cloudinary.go`, `internal/config/cloudinary_test.go`, `internal/config/config.go`
  - Agente: `dev-go` · Depende de: 001-T005
  - Aceptación: `Load()` incluye `Cloudinary`; faltantes listados todos juntos; `APP_ENV=test` no las exige; `Secret` imprime `***`; pruebas de tabla; cobertura ≥ 80 %
  - Refs: RF-01, RF-02 · Art. VI, XII

- [ ] **T002** [P] Cliente de ping a Cloudinary
  - Archivos: `internal/platform/cloudinary/ping.go`, `internal/platform/cloudinary/ping_test.go`
  - Agente: `dev-go` · Depende de: T001
  - Aceptación: `Ping(ctx, cfg)` llama a `/v1_1/<cloud>/ping` con autenticación básica y timeout 5 s; 200 `{"status":"OK"}` → nil; 401 → error que **no contiene** el secreto; pruebas con `httptest`
  - Refs: RF-03 · P-03

- [ ] **T003** Comando `check-services`
  - Archivos: `cmd/admin/main.go`, `cmd/admin/check_services.go`, `cmd/admin/check_services_test.go`
  - Agente: `dev-go` · Depende de: T001, T002, 001-T008
  - Aceptación: imprime `OK`/`FALLA` por servicio; código de salida ≠ 0 si alguno falla; no imprime secretos; prueba con dobles
  - Refs: RF-03, CA-01, CA-02

- [ ] **T004** [P] `.env.example` y documentación de servicios
  - Archivos: `.env.example`, `docs/servicios.md`
  - Agente: `spec-writer` · Depende de: T001
  - Aceptación: lista todas las variables sin valores reales; `servicios.md` explica Atlas, Cloudinary y hosting, cómo rotar claves y los riesgos conocidos
  - Refs: RF-07 · Art. VI

- [ ] **T005** Despliegue de staging
  - Archivos: `render.yaml` (o equivalente del proveedor), ajuste de `CORS_ALLOWED_ORIGINS` en la documentación
  - Agente: `dev-go` · Depende de: T001, 001-T019
  - Aceptación: el servicio de **staging** despliega desde `develop` (producción lo hará desde `main`, que solo recibe ramas `release/`); variables definidas en el panel del proveedor; `APP_ENV=staging`
  - Refs: RF-05, RF-06 · P-05

- [ ] **T006** Verificar staging contra Atlas y anotar la URL
  - Archivos: `memoria.md` (solo anexar), `docs/servicios.md`
  - Agente: `qa-go` · Depende de: T005
  - Aceptación: `/healthz`, `/readyz` y `/api/v1/meta` devuelven 200 en HTTPS; URL de staging registrada para el móvil; CA-04 comprobado
  - Refs: RF-04, RF-05

- [ ] **T007** Revisión de conformidad
  - Archivos: ninguno
  - Agente: `revisor-constitucion` · Depende de: T006
  - Aceptación: veredicto **CONFORME**; sin secretos en el repositorio (búsqueda de cadenas sospechosas)
  - Refs: DoD

| Total | 7 tareas |
|---|---|
