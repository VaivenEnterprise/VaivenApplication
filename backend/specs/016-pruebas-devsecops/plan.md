# Plan 016 — Pruebas y pipeline DevSecOps (backend)

- **Spec:** `spec.md` · **Dueños:** BE-A y BE-B

## 1. Archivos
```
Makefile (objetivos test-*)                      docs/{pruebas.md, mutation.md}
.github/workflows/monorepo-ci.yml (existente, se amplía) · .github/workflows/nightly.yml · .github/dependabot.yml (existente, se amplía)
test/contract/{harness_test.go, routes_test.go, <modulo>_test.go}
test/database/{harness_test.go, indexes_test.go, queries_test.go, constraints_test.go, tx_test.go}
test/security/{harness_test.go, authz_matrix_test.go, nosql_injection_test.go, abuse_test.go, headers_test.go, leakage_test.go}
test/mutation/{README.md, gremlins.yaml}
test/performance/{smoke.js, load.js, stress.js, README.md}   + internal/**/*_bench_test.go
```
Las unitarias (`*_test.go`) y las de integración (`test/e2e/`, `*_integration_test.go`) ya existen por las specs 001–015; esta spec las organiza bajo `make test-unit` y `make test-integration`.

## 2. Decisiones
| # | Decisión | Art. |
|---|---|---|
| P-01 | `kin-openapi` solo en pruebas (valida respuestas y enumera rutas); no entra al binario de producción | VIII |
| P-02 | `gremlins`, `govulncheck`, `gitleaks`, `trivy`, `k6` y ZAP como binarios/contenedores; no en `go.mod` | VIII |
| P-03 | La matriz de autorización se **genera desde OpenAPI** para que crezca sola con cada módulo | IV |
| P-04 | Mutación y carga **de noche** (`nightly.yml`) y a mano; los PR corren solo lo rápido | RNF-01 |
| P-05 | Mutación acotada a paquetes críticos y puros (sin E/S) para que sea rápida y significativa | — |
| P-06 | Proveedores externos simulados con `httptest`; Mongo real con testcontainers | VII |
| P-07 | Las pruebas de rendimiento apuntan al entorno de composición; en staging solo humo (Render gratuito se duerme) | — |
| P-08 | Umbrales en la constitución (Art. VII.7): se cambian ahí, no en cada prueba | XI |

## 3. Etapas del pipeline
| Etapa | Trabajos | Cuándo |
|---|---|---|
| Calidad | `gofmt`, `go vet`, `golangci-lint` (+`gosec`), unitarias `-race -cover`, umbral de cobertura | PR / push |
| Pruebas con Mongo | integración, base de datos, contrato | PR / push |
| Seguridad | `govulncheck`, `gitleaks`, pruebas de `test/security` | PR / push |
| Imagen | `docker build`, `trivy` | PR / push |
| Nocturno | mutación, `k6` carga, ZAP *baseline* | programado y manual |

## 4. Verificación de constitución
| Art. | Cumple |
|---|---|
| VII.5–8 | Las siete categorías, el pipeline, los umbrales y el contrato |
| VI | `gitleaks`, sin secretos; registros sin datos personales (probado) |
| VIII | Única dependencia nueva: `kin-openapi`, solo en pruebas, registrada en `memoria.md` |
| XIII | Archivos nuevos en `test/` y `.github/`; los módulos no se editan |
