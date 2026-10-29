# Spec 016 — Estrategia de pruebas y pipeline DevSecOps (backend)

- **Dueños:** BE-A (contrato, mutación, informe) y BE-B (CI/seguridad, base de datos, rendimiento) · **Prioridad:** P1 · **Ventana:** fase 1: 30 oct–2 nov · fase 2: 3–11 nov (por módulo) · fase 3: 12–15 nov · **Depende de:** 001 (base), 012
- **Constitución:** v1.2.0 · **Estado:** Borrador

## 1. Objetivo y por qué
El curso exige que el backend incluya **siete tipos de pruebas**, tal como la solución de referencia `WebAPIDevSecOps` (proyectos `UnitTest`, `IntegrationTest`, `ContractTest`, `DatabaseTest`, `MutationTest`, `PerformanceTest` y `SecurityTest`). VAIVÉN usa Go y MongoDB, así que se construye el **equivalente exacto en esa pila**, con las mismas categorías, y un **pipeline DevSecOps** que las ejecuta y bloquea los cambios con fallos. Esta spec define cómo; las specs 001–015 ya piden pruebas por tarea.

## 2. Equivalencias con la solución de referencia
| Proyecto de referencia | Equivalente en VAIVÉN | Carpeta | Comando |
|---|---|---|---|
| `UnitTest` | `go test` con dobles escritos a mano, pruebas de tabla, `testify`; ≥ 80 % en `domain` y `usecase` | junto al código (`*_test.go`) | `make test-unit` |
| `IntegrationTest` | MongoDB real (testcontainers), recorrido E2E y repositorios | `test/e2e/`, `*_integration_test.go` | `make test-integration` |
| `ContractTest` | Respuestas validadas contra `api/openapi.yaml` (`kin-openapi`) | `test/contract/` | `make test-contract` |
| `DatabaseTest` | Índices, unicidad, TTL, planes de consulta sin barrido, transacciones | `test/database/` | `make test-database` |
| `MutationTest` | Pruebas de mutación con `gremlins` en los paquetes críticos | `test/mutation/` | `make test-mutation` |
| `PerformanceTest` | `k6` (humo, carga, estrés) y *benchmarks* de Go | `test/performance/`, `*_bench_test.go` | `make test-performance` |
| `SecurityTest` | Pruebas de autorización, inyección y abuso + `gosec`, `govulncheck`, `gitleaks`, `trivy`, ZAP | `test/security/` | `make test-security` |
| `WebAPIDevSecOps` (la API) | `cmd/api` + pipeline en `.github/workflows/` | — | `make test-all` |

## 3. Requisitos
| ID | Requisito |
|---|---|
| RF-01 | Estructura `test/` y objetivos de `Makefile` para las siete categorías y `test-all`; `docs/pruebas.md` explica la equivalencia con la solución de referencia. |
| RF-02 | **Pipeline** `.github/workflows/ci.yml` (cada *push* y *pull request*): formato, `go vet`, `golangci-lint` (con `gosec`), unitarias con `-race` y cobertura (falla bajo 80 % en `domain`/`usecase`), integración + base de datos + contrato con MongoDB real, `govulncheck`, `gitleaks`, construcción de la imagen y `trivy`. `nightly.yml`: mutación, carga con `k6` y ZAP. `dependabot` para Go y Actions. |
| RF-03 | **Contrato:** arnés que levanta el router real y valida **cada respuesta** (éxito y error) contra el esquema OpenAPI; prueba de que las rutas registradas y las del contrato **coinciden en ambos sentidos**; casos por módulo 003–015 conforme se integran. |
| RF-04 | **Base de datos:** para cada colección, índices esperados presentes y sin sobrantes; restricciones únicas (correo, una calificación por participante y operación, etc.) efectivas; índices TTL con su `expireAfterSeconds`; **ninguna de las 10 consultas más frecuentes hace barrido de colección** (`explain` con `IXSCAN`) con `seed ×100`; arreglos acotados; atomicidad de las transacciones de reserva; `EnsureAll` idempotente. |
| RF-05 | **Seguridad (pruebas):** matriz de autorización generada desde OpenAPI (sin token → 401; token manipulado, expirado o con `alg: none` → 401; rol insuficiente → 403; **IDOR**: la persona B no accede a recursos de A); inyección NoSQL (`$ne`, `$gt`, `$where`, operadores en parámetros y cuerpos); asignación masiva (`role`, `ownerId`, `status` ignorados); cuerpo > 1 MiB → 413; límite de tasa → 429; cabeceras de seguridad; errores sin trazas ni detalles internos; registros sin datos personales. |
| RF-06 | **Seguridad (herramientas):** `gosec` (en el *linter*), `govulncheck`, `gitleaks` y `trivy` en el pipeline; ZAP *baseline* de noche contra el entorno de composición; hallazgos altos/críticos corregidos o justificados por escrito. |
| RF-07 | **Mutación:** `gremlins` sobre `domain` y `usecase` de precio y disponibilidad (005, 007), calificaciones (010) y el modelo de recomendación (015); puntuación ≥ 60 %; los mutantes sobrevivientes relevantes se matan con pruebas nuevas; informe en `docs/mutation.md`. |
| RF-08 | **Rendimiento:** `k6` con guion de **humo** (p95 < 500 ms, errores < 1 %), **carga** (50 usuarios virtuales, 2 min, sobre `GET /items`, `GET /items/{id}`, inicio de sesión y cotización) y **estrés**; *benchmarks* de Go para cálculo de precio, solapamiento de fechas y recomendación; manejo del arranque en frío de Render (calentamiento previo). |
| RF-09 | **Informe** `docs/pruebas.md` con los comandos, la equivalencia y los **resultados reales** (cobertura, puntuación de mutación, p95, vulnerabilidades, hallazgos de ZAP y su estado). |
| RF-10 | Las pruebas no usan red externa (Cloudinary, Gemini y Expo Push se simulan) ni dependen de la hora real. |
| RNF-01 | `make test-unit` termina en < 60 s; el pipeline de cada PR en < 10 min; mutación y carga solo de noche o a mano. |
| RNF-02 | Cero costo: GitHub Actions (repositorio público o minutos gratuitos), herramientas de código abierto. |

## 4. Criterios de aceptación
| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado `make test-all`, entonces corren las siete categorías y terminan en verde. |
| CA-02 | Dado un PR con una prueba rota, una vulnerabilidad alta o un secreto, entonces el pipeline falla y `main` no se integra. |
| CA-03 | Dada una respuesta que no cumple el esquema o una ruta ausente del contrato, entonces la prueba de contrato falla. |
| CA-04 | Dado un índice faltante, una restricción única ausente o una consulta con barrido, entonces la prueba de base de datos falla. |
| CA-05 | Dado un recurso de otra persona, entonces `403`/`404`, nunca `200`. |
| CA-06 | Dada la mutación en los paquetes críticos, entonces la puntuación es ≥ 60 %. |
| CA-07 | Dada la carga, entonces p95 < 500 ms y errores < 1 % en el entorno de composición. |
| CA-08 | Dado `docs/pruebas.md`, entonces trae resultados reales y la tabla de equivalencias. |

## 5. Fuera de alcance
Pruebas del móvil (siguen la constitución móvil), pruebas de accesibilidad, certificaciones de seguridad, pruebas de penetración manuales, monitoreo en producción más allá del ping de la spec 013.

## 6. Preguntas abiertas
- [NEEDS CLARIFICATION: ¿El curso espera exactamente estos nombres de carpetas/proyectos o basta la equivalencia documentada? Provisional: carpetas `test/<categoria>` y la tabla de equivalencias.]
- [NEEDS CLARIFICATION: ¿El repositorio será público o privado? Cambia los minutos gratuitos de GitHub Actions (público: ilimitados; privado: 2 000 min/mes). Provisional: se cuida el consumo con mutación y carga solo de noche.]
