# AGENTS.md — Backend VAIVÉN (Go + MongoDB)

Instrucciones para cualquier agente de OpenCode que trabaje en `backend/`. Este archivo se carga automáticamente. **Subordinado a `constitution.md`.**

## 1. Orden de lectura obligatorio

1. `constitution.md` — reglas no negociables (artículos I a XI).
2. `memoria.md` — decisiones, estado actual y aprendizajes.
3. `specs/<spec-activa>/spec.md` → `plan.md` → `tasks.md`.
4. Solo entonces, el código.

Si algo no está definido en esos archivos, **no lo inventes**: pregunta a la persona o anótalo como `[NEEDS CLARIFICATION]` en la spec.

## 2. Proyecto en una línea

API REST en Go (chi) con MongoDB para VAIVÉN, una plataforma móvil de préstamo y renta de objetos en México (MXN). Arquitectura Clean: `domain → usecase → adapter → cmd`.

## 3. Flujo SDD (cómo trabajar)

| Fase | Quién | Resultado |
|---|---|---|
| Especificar | `plan` + subagente `spec-writer` | `spec.md` (qué y por qué, sin tecnología) |
| Planificar | `plan` + `spec-writer` (+ `modelador-mongo` si hay datos) | `plan.md` (cómo) |
| Dividir | `plan` + `spec-writer` | `tasks.md` (tareas pequeñas) |
| Implementar | `build` + `dev-go`, `modelador-mongo` | código + pruebas, **una tarea por vez** |
| Probar | `qa-go` | pruebas y cobertura |
| Revisar | `revisor-constitucion` | informe de conformidad |

Detalle en la skill `sdd-workflow`.

## 4. Agentes disponibles

Agentes nativos de OpenCode (se reutilizan tal cual):

| Agente | Modo | Uso en este proyecto |
|---|---|---|
| `plan` | primario | Especificar, planificar y dividir tareas. Solo lectura de código. |
| `build` | primario | Implementar tareas aprobadas. |
| `explore` | subagente | Buscar en el código sin modificarlo. |
| `general` | subagente | Investigación de varios pasos. |

Subagentes propios (`.opencode/agents/`):

| Agente | Responsabilidad | Edita código |
|---|---|---|
| `spec-writer` | Redacta `spec.md`, `plan.md`, `tasks.md` y actualiza `memoria.md` | No (solo `specs/` y `memoria.md`) |
| `dev-go` | Implementa tareas en Go siguiendo Clean Architecture | Sí |
| `modelador-mongo` | Diseña colecciones, índices, repositorios y validación de esquema | Sí (`adapter/mongo`) |
| `qa-go` | Escribe y ejecuta pruebas, mide cobertura | Solo `*_test.go` |
| `revisor-constitucion` | Verifica conformidad con la constitución | No |

Invocación: `@dev-go implementa la tarea T005 de specs/001-arquitectura-base/tasks.md`.

## 5. Skills disponibles (`.opencode/skills/`)

| Skill | Cuándo cargarla |
|---|---|
| `sdd-workflow` | Al crear o ejecutar spec, plan o tareas |
| `go-clean-architecture` | Al crear o modificar paquetes de Go |
| `mongodb-go-patterns` | Al tocar colecciones, índices o repositorios |
| `api-rest-conventions` | Al crear o modificar endpoints, errores o `openapi.yaml` |

## 6. Comandos

```bash
make run          # levanta la API (requiere MongoDB en marcha)
make up           # docker compose up -d (MongoDB replica set)
make down         # docker compose down
make test         # go test ./... -race -cover
make lint         # golangci-lint run
make fmt          # gofmt -s -w .
make build        # compila bin/api
```

Si `make` no está disponible en Windows, usar Git Bash o WSL, o ejecutar el comando equivalente que aparece en el `Makefile`.

## 7. Reglas de oro

1. **Una tarea a la vez.** Termina y verifica antes de pasar a la siguiente.
2. **Toca solo los archivos listados** en la tarea. Si necesitas otro, avisa y justifica.
3. **Sin dependencias nuevas** sin registrarlas en `plan.md` y `memoria.md`.
4. **Nunca** uses `float` para dinero, SQL, ni importes `mongo`/`bson` en `domain` o `usecase`.
5. **Nunca** escribas secretos, datos personales ni tokens en código, logs o commits.
6. **Nunca** modifiques `constitution.md`; propón la enmienda por escrito.
7. Al terminar una tarea: ejecuta `make fmt lint test`, marca `[x]` en `tasks.md`, actualiza `memoria.md` si aprendiste algo y haz un commit convencional.
8. Si un comando falla dos veces con el mismo error, **detente** y explica el problema en lugar de probar variaciones al azar.
9. Responde en español; el código, los identificadores y los mensajes de commit técnicos, en inglés.

## 8. Alcance actual

Solo está permitido trabajar en `specs/001-arquitectura-base/` (arquitectura base, sin funcionalidad de negocio). Las specs funcionales (`002-*` y siguientes) aún no existen.
