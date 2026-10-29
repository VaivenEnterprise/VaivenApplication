# Tareas 016 — Pruebas y pipeline DevSecOps (backend)

- **Dueños:** BE-A y BE-B (indicado por tarea) · **Estado:** sin ejecutar · `[P]` = paralelizable
- **Línea de corte:** T010 (trivy y ZAP) es P2. Nunca se recortan T003–T007 (contrato, base de datos y seguridad).
- La tarea 012-T006 (rendimiento y `explain`) es el punto de partida: T005 y T009 la **extienden** a pruebas permanentes y automatizadas, sin duplicarla.
- Los archivos que no son `*_test.go` (guiones `k6`, YAML, `Makefile`) los hace `dev-go`; `qa-go` solo escribe pruebas `*_test.go`.

## Fase 1 — Cimientos (30 oct–2 nov)

- [ ] **T001** Estructura `test/`, `Makefile` y equivalencias
  - Archivos: `Makefile` (solo añade objetivos), `test/{contract,database,mutation,performance,security}/README.md`, `docs/pruebas.md` (esqueleto con la tabla de la spec §2)
  - Dueño: BE-A · Agente: `dev-go` · Depende de: 001-T002
  - Aceptación: existen `test-unit`, `test-integration`, `test-contract`, `test-database`, `test-mutation`, `test-performance`, `test-security` y `test-all`; cada uno falla con un mensaje claro si su carpeta aún no tiene pruebas; `docs/pruebas.md` trae la tabla de equivalencias
  - Refs: RF-01 · CA-01, CA-08

- [ ] **T002** Pipeline DevSecOps
  - Archivos: `.github/workflows/monorepo-ci.yml` (amplía el trabajo del backend), `.github/scripts/ci-plan.cjs` (solo si hace falta), `.github/workflows/nightly.yml`, `.github/dependabot.yml` (agrega `gomod` y `docker`)
  - Dueño: BE-B · Agente: `dev-go` · Depende de: 001-T020, T001
  - Aceptación: etapas de plan §3 **sobre la CI existente** (sin segundo workflow de PR; sigue habiendo un solo check obligatorio, `CI monorepo`); servicio MongoDB replica set en Actions; las pruebas de contrato, base de datos y seguridad se suman al trabajo `Backend Go`; las pruebas de `ci-plan.cjs` siguen pasando; acciones fijadas a commits completos, sin secretos, sin `pull_request_target` y sin cachés (reglas de `docs/CI_MONOREPO.md`); `nightly.yml` con mutación, `k6` y ZAP (pueden ser marcadores hasta T008–T010); `dependabot` suma `gomod` y `docker`
  - Refs: RF-02, RF-06 · CA-02 · P-04

## Fase 2 — Pruebas por categoría (3–11 nov, conforme se integran los módulos)

- [ ] **T003** Arnés de pruebas de contrato
  - Archivos: `test/contract/{harness_test.go, routes_test.go}`, `go.mod` (`kin-openapi`, solo pruebas)
  - Dueño: BE-A · Agente: `qa-go` · Depende de: T001, 001-T018, 001-T012
  - Aceptación: helper que valida cada respuesta contra OpenAPI (éxito y envoltorio de error); prueba que rutas registradas y rutas del contrato coinciden en ambos sentidos (CA-03); cubre `/healthz`, `/readyz` y `/api/v1/meta`; dependencia registrada en `memoria.md`
  - Refs: RF-03 · CA-03 · P-01

- [ ] **T004** Contrato por módulo
  - Archivos: `test/contract/<modulo>_test.go` (uno por módulo 003–015)
  - Dueño: BE-A · Agente: `qa-go` · Depende de: T003, 003–011 integradas (cada módulo al integrarse), 014 y 015
  - Aceptación: por endpoint, un caso de éxito y uno por cada código de error del contrato, validados contra el esquema; se agrega el mismo día en que se integra el módulo
  - Refs: RF-03 · CA-03

- [ ] **T005** [P] Pruebas de base de datos
  - Archivos: `test/database/{harness_test.go, indexes_test.go, constraints_test.go, queries_test.go, tx_test.go}`
  - Dueño: BE-B · Agente: `qa-go` (con `modelador-mongo` como revisor) · Depende de: T001, 001-T014, 012-T004, 012-T005
  - Aceptación: RF-04 completo: índices esperados sin faltantes ni sobrantes; unicidades efectivas; TTL con `expireAfterSeconds`; las 10 consultas más frecuentes con `IXSCAN` sobre `seed ×100`; arreglos acotados; atomicidad de aceptar reserva; `EnsureAll` idempotente (CA-04)
  - Refs: RF-04 · CA-04

- [ ] **T006** Arnés de seguridad y matriz de autorización
  - Archivos: `test/security/{harness_test.go, authz_matrix_test.go}`
  - Dueño: BE-B · Agente: `qa-go` · Depende de: T003, 003 integrada (autenticación)
  - Aceptación: matriz generada desde OpenAPI (P-03): sin token → 401; token manipulado, expirado y `alg: none` → 401; rol insuficiente → 403; IDOR entre dos personas en cada recurso con dueño → 403/404 (CA-05); falla si una ruta protegida no está en la matriz
  - Refs: RF-05 · CA-05 · P-03

- [ ] **T007** [P] Pruebas de inyección y abuso
  - Archivos: `test/security/{nosql_injection_test.go, abuse_test.go, headers_test.go, leakage_test.go}`
  - Dueño: BE-B · Agente: `qa-go` · Depende de: T006, 012-T003
  - Aceptación: operadores `$ne`, `$gt`, `$where` en parámetros y cuerpos no alteran consultas; asignación masiva ignorada; 413 sobre 1 MiB; 429 por tasa; cabeceras de seguridad; errores sin trazas ni mensajes internos; captura de `slog` sin correos, tokens ni cuerpos
  - Refs: RF-05, RF-10 · CA-05

## Fase 3 — Mutación, rendimiento y cierre (12–15 nov)

- [ ] **T008** [P] Pruebas de mutación
  - Archivos: `test/mutation/{README.md, gremlins.yaml}`, `docs/mutation.md`, pruebas `*_test.go` nuevas en los paquetes mutados
  - Dueño: BE-A · Agente: `qa-go` · Depende de: T001, 005, 007, 010 y 015 integradas
  - Aceptación: `make test-mutation` sobre precio y disponibilidad (005, 007), calificaciones (010) y modelo de recomendación (015); puntuación ≥ 60 % (CA-06); mutantes sobrevivientes relevantes matados con pruebas nuevas o justificados en `docs/mutation.md`
  - Refs: RF-07 · CA-06 · P-05

- [ ] **T009** [P] Pruebas de rendimiento
  - Archivos: `test/performance/{smoke.js, load.js, stress.js, README.md}`, `internal/**/*_bench_test.go` (precio, solapamiento de fechas, recomendación)
  - Dueño: BE-B · Agente: `dev-go` (guiones `k6`) / `qa-go` (*benchmarks*) · Depende de: T001, 012-T005, 007 y 015 integradas
  - Aceptación: humo con p95 < 500 ms y errores < 1 %; carga de 50 usuarios virtuales por 2 min sobre `GET /items`, `GET /items/{id}`, inicio de sesión y cotización (CA-07); estrés documentado; calentamiento previo para Render; `make test-performance` usa `k6` en contenedor
  - Refs: RF-08 · CA-07 · P-07

- [ ] **T010** [P] Escaneo de imagen y ZAP *baseline* (**P2**)
  - Archivos: `.github/workflows/{monorepo-ci.yml, nightly.yml}` (trabajos `trivy` y `zap`), `docs/seguridad.md`
  - Dueño: BE-B · Agente: `dev-go` · Depende de: T002
  - Aceptación: `trivy` sobre la imagen sin vulnerabilidades altas o críticas injustificadas; ZAP contra el entorno de composición; hallazgos triados en `docs/seguridad.md` (corregido / justificado)
  - Refs: RF-06 · CA-02

- [ ] **T011** Informe de pruebas
  - Archivos: `docs/pruebas.md`
  - Dueño: BE-A · Agente: `spec-writer` · Depende de: T004–T010
  - Aceptación: comandos, equivalencia con `WebAPIDevSecOps` y resultados **reales** (cobertura, mutación, p95, vulnerabilidades, ZAP) con fecha y versión; `make test-all` en verde (CA-01, CA-08)
  - Refs: RF-09 · CA-01, CA-08

- [ ] **T012** Memoria y revisión
  - Archivos: `memoria.md` (solo anexar)
  - Dueño: BE-A · Agente: `revisor-constitucion` · Depende de: T011
  - Aceptación: **CONFORME**; Art. VII.5–8 verificados; dependencia `kin-openapi` registrada
  - Refs: DoD

| Total | 12 tareas |
|---|---|
