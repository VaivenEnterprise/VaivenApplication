# VAIVÉN — Spec Driven Development con OpenCode

Plataforma móvil de préstamo y renta de objetos entre personas (México, MXN).
Contexto completo: [`docs/VAIVEN_Idea_y_Objetivo.pdf`](docs/VAIVEN_Idea_y_Objetivo.pdf).

Este repositorio contiene la **base de la metodología Spec Driven Development (SDD)** de los dos proyectos. Todavía **no hay código ni se han ejecutado tareas**: solo están definidos los archivos de gobierno y la spec de arquitectura base.

| Proyecto | Stack | Carpeta |
|---|---|---|
| Backend | Go + chi + MongoDB (NoSQL) | [`backend/`](backend/) |
| Móvil | React Native + Expo + TypeScript | [`mobile/`](mobile/) |

## Qué contiene cada proyecto

| Archivo / carpeta | Para qué sirve |
|---|---|
| `constitution.md` | Reglas técnicas no negociables. Máxima autoridad. |
| `AGENTS.md` | Instrucciones que OpenCode carga siempre: orden de lectura, flujo, agentes, comandos, reglas. |
| `memoria.md` | Decisiones, estado, modelos asignados, dependencias y aprendizajes. |
| `opencode.json` | Modelos gratuitos por agente, instrucciones cargadas y permisos. |
| `.opencode/agents/` | Subagentes propios (redactor de specs, desarrollo, pruebas, revisor…). |
| `.opencode/skills/` | Skills con plantillas y listas de comprobación. |
| `specs/001-arquitectura-base/` | `spec.md`, `plan.md` y `tasks.md` de la arquitectura base. |

## Cómo se usa con OpenCode

```bash
cd backend        # o: cd mobile
opencode          # abre OpenCode en ese proyecto
```
1. Ejecuta `opencode models` y confirma que los modelos de `opencode.json` existen (los gratuitos rotan). Si alguno no aparece, cámbialo solo en `opencode.json` y anótalo en `memoria.md`.
2. Pestaña/agente `plan`: revisa y ajusta `spec.md`, `plan.md` y `tasks.md`.
3. Cuando la persona apruebe, cambia al agente `build` y pide: `@dev-go implementa la tarea T001 de specs/001-arquitectura-base/tasks.md` (o `@dev-expo` en el móvil).
4. Al cerrar una fase, pide: `@revisor-constitucion revisa los cambios`.

## Coherencia entre los dos proyectos

- Los Artículos **IV** (contrato de API) y **V** (dinero, fechas, idioma) son equivalentes en ambas constituciones.
- La app móvil consume `GET /api/v1/meta` del backend en su pantalla de diagnóstico.
- Si cambias un artículo compartido, cámbialo en **ambas** constituciones y registra la decisión en ambas `memoria.md`.


## Colaboración y seguridad

- [Guía de contribución y flujo de ramas](CONTRIBUTING.md).
- [Controles de seguridad y siguientes fases del monorepo](SECURITY.md).
- Los PRs incluyen validación de nombres y escaneos de secretos y workflows. El bloqueo por checks se configura en el Ruleset después de comprobar su ejecución.

## Estado

- [x] Constituciones, `AGENTS.md`, `memoria.md`, agentes y skills
- [x] Spec 001, plan y tareas de arquitectura base (backend y móvil)
- [ ] Aprobación humana de las specs 001
- [ ] Ejecución de tareas _(aún no)_
- [ ] Specs funcionales (`002-*`) _(se definen en la siguiente clase)_
