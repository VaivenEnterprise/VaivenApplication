# Tareas 012 — Integración, endurecimiento y entrega (backend)

- **Dueños:** indicados por tarea · **Estado:** sin ejecutar · `[P]` = paralelizable
- Esta spec **no cambia contratos**; los hallazgos se corrigen en el módulo y por su dueño.

- [ ] **T001** Cliente y utilidades de prueba E2E
  - Archivos: `test/e2e/helpers_test.go`, `test/e2e/fake_cloudinary_test.go`
  - Dueño: BE-A · Agente: `qa-go` · Depende de: 001–010 integradas
  - Aceptación: levanta router real + Mongo (testcontainers) + Cloudinary falso; helpers `register`, `login`, `do`; reloj ajustable
  - Refs: P-01…P-03

- [ ] **T002** Recorrido E2E principal
  - Archivos: `test/e2e/journey_test.go`
  - Dueño: BE-A · Agente: `qa-go` · Depende de: T001
  - Aceptación: RF-01 completo (registro→publicar→buscar→cotizar→solicitar→aceptar→chat→entrega con QR→pagos→devolución con QR→calificar→incidencia); pasa con `-tags e2e` (CA-01)
  - Refs: RF-01

- [ ] **T003** [P] Límite global y cabeceras de seguridad
  - Archivos: `internal/adapter/http/middleware/{ratelimit_global.go, security_headers.go, middleware_global_test.go}`, `internal/adapter/http/router.go` (una línea)
  - Dueño: BE-A · Agente: `dev-go` · Depende de: 001-T013
  - Aceptación: 120 peticiones/min por IP → 429; cabeceras del RF-04; probado con reloj inyectado
  - Refs: RF-04

- [ ] **T004** [P] Comando `indexes`
  - Archivos: `cmd/admin/indexes.go`, `cmd/admin/indexes_test.go`
  - Dueño: BE-B · Agente: `modelador-mongo` · Depende de: 001-T014
  - Aceptación: lista índices faltantes y sobrantes por colección; código ≠ 0 si faltan (CA-03)
  - Refs: RF-03 · P-05

- [ ] **T005** Comando `seed`
  - Archivos: `cmd/admin/{seed.go, seed_data.go}`, `cmd/admin/assets/*.jpg`
  - Dueño: BE-B · Agente: `dev-go` · Depende de: T002
  - Aceptación: crea 6 personas, 15 objetos con fotos, 3 reservas en estados distintos y 1 admin; idempotente (CA-02); sube imágenes de ≤ 100 KB con `images.Service`
  - Refs: RF-02 · P-04

- [ ] **T006** [P] Rendimiento y `explain`
  - Archivos: `docs/seguridad.md` (sección rendimiento), `cmd/admin/explain.go` (opcional)
  - Dueño: BE-B · Agente: `qa-go` · Depende de: T005
  - Aceptación: con `seed` ×100, p95 < 500 ms en `GET /items` y `GET /me/bookings`; las 10 consultas más frecuentes usan índice (sin `COLLSCAN`); resultados anotados
  - Refs: RF-08

- [ ] **T007** [P] Validación OpenAPI en CI y E2E nocturna
  - Archivos: `.github/workflows/monorepo-ci.yml` (trabajo del backend) y `.github/workflows/nightly.yml`
  - Dueño: BE-B · Agente: `dev-go` · Depende de: 001-T020
  - Aceptación: `npx @redocly/cli lint api/openapi.yaml` falla ante errores; trabajo programado diario que ejecuta E2E y publica el resultado
  - Refs: RF-06

- [ ] **T008** Revisión de seguridad
  - Archivos: `docs/seguridad.md`
  - Dueño: BE-A · Agente: `revisor-constitucion` · Depende de: T003
  - Aceptación: lista de comprobación del RF-05 completa y fechada; búsqueda de secretos en el historial; hallazgos corregidos por su dueño
  - Refs: RF-05 · P-08

- [ ] **T009** Despliegue final en staging
  - Archivos: `docs/despliegue.md`
  - Dueño: BE-B · Agente: `dev-go` · Depende de: T004, T005, T007
  - Aceptación: versión final desplegada; `check-services`, `indexes` y `seed` ejecutados; `/readyz` 200; pasos documentados (RF-07)
  - Refs: RF-07

- [ ] **T010** [P] Documentación final
  - Archivos: `README.md`, `docs/api.md`, `docs/politicas.md`, `docs/demo.md`, `docs/validacion.md`
  - Dueño: BE-B · Agente: `spec-writer` · Depende de: T009
  - Aceptación: RF-09 y RF-10; `demo.md` seguido por una persona ajena al backend sin ayuda (CA-04); `politicas.md` lista el valor vigente de cada POL-xx
  - Refs: RF-09, RF-10

- [ ] **T011** Revisión final y congelamiento
  - Archivos: `memoria.md` (solo anexar), etiqueta `v1.0.0-backend`
  - Dueño: BE-A · Agente: `revisor-constitucion` · Depende de: T008, T010
  - Aceptación: veredicto **CONFORME** sobre todo el repositorio; `make fmt lint test` + integración + E2E pasan; código congelado el 15 de nov
  - Refs: RNF-01, RNF-02

| Total | 11 tareas |
|---|---|
