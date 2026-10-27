# Memoria del Backend — VAIVÉN

Memoria viva del proyecto. Los agentes la leen después de `constitution.md` y la **actualizan** al cerrar cada tarea relevante. No contradice la constitución: si hay conflicto, gana la constitución.

_Última actualización: 2026-10-26_

## 1. Estado actual

| Elemento | Estado |
|---|---|
| Constitución | v1.0.0 ratificada |
| Spec 001 — Arquitectura base | Redactada, pendiente de aprobación humana |
| Plan 001 | Redactado |
| Tareas 001 | Redactadas, **sin ejecutar** |
| Specs funcionales (002+) | No iniciadas (se definen en la siguiente clase) |
| Código | Ninguno todavía |

## 2. Decisiones (registro tipo ADR)

| # | Fecha | Decisión | Motivo | Constitución |
|---|---|---|---|---|
| D-001 | 2026-10-26 | Go + chi + Clean Architecture | Router ligero, cercano a `net/http`; capas claras para modelos con poco contexto | Art. III |
| D-002 | 2026-10-26 | MongoDB 7+ con driver oficial v2, replica set | Requisito del proyecto (NoSQL); replica set habilita transacciones futuras | Art. II |
| D-003 | 2026-10-26 | Dinero en centavos `int64`, sufijo `Cents` | Evitar errores de punto flotante; MXN único | Art. V |
| D-004 | 2026-10-26 | JSON y campos BSON en `camelCase`; colecciones `snake_case` plural | Un solo nombre por campo, sin mapeos intermedios | Art. IV, §6 |
| D-005 | 2026-10-26 | Errores con envoltorio único `{error:{code,message,details,requestId}}` | El móvil los normaliza en un solo lugar | Art. IV |
| D-006 | 2026-10-26 | Solo OpenCode + modelos gratuitos de Zen | Requisito del curso | Art. X |
| D-007 | 2026-10-26 | Documentos y prompts de agentes en español | Preferencia del equipo | Art. X |
| D-008 | 2026-10-26 | `task.md` se nombra `tasks.md` | Convención estándar de SDD | Art. I |

## 3. Modelos gratuitos asignados (OpenCode Zen)

Fuente de verdad: `opencode.json`. Verificados en septiembre de 2026; **los IDs gratuitos rotan**.

| Rol | Modelo | Agentes |
|---|---|---|
| Razonamiento / planeación | `opencode/nemotron-3-ultra-free` | `plan`, `spec-writer`, `modelador-mongo` |
| Revisión | `opencode/big-pickle` | `revisor-constitucion` (modelo por defecto) |
| Implementación | `opencode/nemotron-3-lightning-free` | `build`, `dev-go` |
| Pruebas / tareas rápidas | `opencode/ling-flash-free` | `qa-go`, `small_model` |
| Alternos | `opencode/mimo-free`, `opencode/muse-spark-free` | — |

**Cómo validar y cambiar:**
1. Ejecutar `opencode models` y confirmar que cada ID existe.
2. Editar solo `opencode.json` (sección `agent`, `model`, `small_model`).
3. Registrar el cambio en esta tabla y en la sección 2.

**Compatibilidad de versión:** los agentes usan el formato estable de OpenCode (`permission:` como mapa, carpeta `.opencode/agents/`). Si tu versión de OpenCode es la V2 y reporta campos obsoletos, cambia `permission:` por la lista `permissions:` (`action`, `resource`, `effect`) en cada agente.

## 4. Convenciones aprendidas

_(Los agentes agregan aquí hallazgos útiles y breves, uno por línea, con fecha.)_

- 2026-10-26 — Los modelos gratuitos rinden mejor con tareas de 1–3 archivos y criterios de aceptación explícitos.

## 5. Dependencias registradas

| Dependencia | Versión | Para qué | Spec |
|---|---|---|---|
| `github.com/go-chi/chi/v5` | última v5 | Router HTTP | 001 |
| `go.mongodb.org/mongo-driver/v2` | última v2 | Acceso a MongoDB | 001 |
| `github.com/go-playground/validator/v10` | última v10 | Validación de entrada | Primera spec funcional (no 001) |
| `github.com/stretchr/testify` | última | Aserciones en pruebas | 001 |
| `github.com/testcontainers/testcontainers-go` (+ módulo `mongodb`) | última | Pruebas de integración | 001 |

## 6. Pendientes y preguntas abiertas

- [ ] Aprobación humana de `specs/001-arquitectura-base/`.
- [ ] Definir el mecanismo de autenticación en la primera spec funcional.
- [ ] Definir proveedor de MongoDB para producción (p. ej. Atlas gratuito M0 o instancia propia) — **fuera de la spec 001**.
- [ ] Política de conservación de chat y evidencias (según el documento de idea; se define en specs funcionales).

## 7. Riesgos conocidos

- Los modelos gratuitos pueden desaparecer o limitar el uso sin aviso → mantener alternos listados en la sección 3.
- Algunos modelos gratuitos pueden usar los datos enviados para mejorarse → **no pegar secretos ni datos personales reales** en las conversaciones con agentes.
- `make` no viene en Windows por defecto → usar Git Bash/WSL o los comandos equivalentes.
