# AGENTS.md — Landing VAIVÉN (sitio estático informativo)

Instrucciones para cualquier agente de OpenCode que trabaje en `landing/`. Se carga automáticamente. **Subordinado a `constitution.md`.**

## 1. Orden de lectura obligatorio
1. `constitution.md` (artículos I a XI). Para saber qué spec toca y quién es la dueña, `../ROADMAP.md`.
2. `memoria.md`.
3. `specs/<spec-activa>/spec.md` → `plan.md` → `tasks.md`.
4. Solo entonces, el sitio.

Si algo no está definido, **no lo inventes**: pregunta o anótalo como `[NEEDS CLARIFICATION]`.

## 2. Proyecto en una línea
Sitio **estático** (HTML + CSS + JS mínimo, sin compilar) que presenta VAIVÉN, publica las páginas legales que exige Google Play y envía a la persona a descargar la app en Google Play. Sin servicios, sin formularios, sin analítica, sin costo.

## 3. Flujo SDD
| Fase | Quién | Resultado |
|---|---|---|
| Especificar / Planificar / Dividir | `plan` + `spec-writer` | `spec.md`, `plan.md`, `tasks.md` |
| Implementar | `build` + `dev-web` | páginas, estilos y scripts, **una tarea por vez** |
| Revisar | `revisor-constitucion` | informe de conformidad |

## 4. Agentes (`.opencode/agents/`)
| Agente | Responsabilidad | Edita |
|---|---|---|
| `spec-writer` | Redacta `spec.md`, `plan.md`, `tasks.md` y `memoria.md` | `specs/`, `memoria.md` |
| `dev-web` | Implementa tareas de HTML/CSS/JS y textos | sitio |
| `revisor-constitucion` | Verifica conformidad (también del contenido legal contra la app) | nada |

Invocación: `@dev-web implementa la tarea T003 de specs/001-base-y-paginas-legales/tasks.md`.

## 5. Skills (`.opencode/skills/`)
| Skill | Cuándo |
|---|---|
| `sdd-workflow` | Al crear o ejecutar spec, plan o tareas |
| `static-site-conventions` | Al escribir o cambiar cualquier página, estilo o script |

## 6. Comandos
```bash
python -m http.server 8080 --directory .   # ver el sitio en http://localhost:8080
node scripts/check.mjs                      # verificación obligatoria antes de cerrar tarea
```
Sin `npm install`: no hay dependencias.

## 7. Reglas duras
- Solo se editan los archivos que lista la tarea.
- Sin `<form>`, sin cookies, sin recursos de otros dominios, sin analítica, sin fuentes externas.
- Textos en español de México; nada inventado sobre la app (se verifica contra `../backend/specs` y `../mobile/specs`).
- Textos legales: **borrador del agente, revisión de una persona** antes de publicar.
- Nunca secretos en el repositorio.
- Git: commits convencionales (`feat(landing): …`); no se hace `push --force`.

## 8. Cierre de tarea
1. `node scripts/check.mjs` sin errores. 2. Revisión visual a 360/768/1280 px. 3. Marcar `[x]` en `tasks.md`. 4. Anexar a `memoria.md` si hubo decisión. 5. Commit.
