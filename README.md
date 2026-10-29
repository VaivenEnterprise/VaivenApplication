# VAIVÉN — Spec Driven Development con OpenCode

Plataforma móvil de préstamo y renta de objetos entre personas (México, MXN).
Contexto completo: [`docs/VAIVEN_Idea_y_Objetivo.pdf`](docs/VAIVEN_Idea_y_Objetivo.pdf).

Este repositorio contiene la **base de la metodología Spec Driven Development (SDD)** de los tres proyectos. Todavía **no hay código ni se han ejecutado tareas**: están definidos los archivos de gobierno y las **16 specs** (001–016; la 016 solo en backend) de backend y móvil y las 2 de la landing, con su plan y tareas. El calendario, el reparto entre 4 personas y las políticas confirmadas están en [`ROADMAP.md`](ROADMAP.md).


| Proyecto | Stack | Carpeta |
|---|---|---|
| Backend | Go + chi + MongoDB (NoSQL) | [`backend/`](backend/) |
| Móvil | React Native + Expo + TypeScript | [`mobile/`](mobile/) |
| Landing | Sitio estático informativo (HTML + CSS), hosting gratuito | [`landing/`](landing/) |

## Qué contiene cada proyecto

| Archivo / carpeta | Para qué sirve |
|---|---|
| `constitution.md` | Reglas técnicas no negociables. Máxima autoridad. |
| `AGENTS.md` | Instrucciones que OpenCode carga siempre: orden de lectura, flujo, agentes, comandos, reglas. |
| `memoria.md` | Decisiones, estado, modelos asignados, dependencias y aprendizajes. |
| `opencode.json` | Modelos gratuitos por agente, instrucciones cargadas y permisos. |
| `.opencode/agents/` | Subagentes propios (redactor de specs, desarrollo, pruebas, revisor…). |
| `.opencode/skills/` | Skills con plantillas y listas de comprobación. |
| `specs/001…016/` | `spec.md`, `plan.md` y `tasks.md` de cada fase: arquitectura base, servicios, cuenta, imágenes, objetos, búsqueda, reservas, chat, entrega y pagos, calificaciones, notificaciones, integración, publicación (Google Play / producción) IA (sugerencias por foto) y ML (recomendaciones), ambas en la v1.1, y pruebas y pipeline DevSecOps (siete categorías de pruebas, solo backend). La landing tiene `L001` (páginas legales) y `L002` (página principal). |
| `specs/001…015/` | `spec.md`, `plan.md` y `tasks.md` de cada fase: arquitectura base, servicios, cuenta, imágenes, objetos, búsqueda, reservas, chat, entrega y pagos, calificaciones, notificaciones, integración, publicación (Google Play / producción) IA (sugerencias por foto) y ML (recomendaciones), ambas en la v1.1. La landing tiene `L001` (páginas legales) y `L002` (página principal). |

## Cómo se usa con OpenCode

```bash
cd backend        # o: cd mobile  # o: cd landing
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

## Estado

- [x] Constituciones (v1.1.0), `AGENTS.md`, `memoria.md`, agentes y skills
- [x] Specs 001–012, plan y tareas (backend y móvil) — ver [`ROADMAP.md`](ROADMAP.md)
- [ ] Revisión humana de las specs (las políticas POL-01…17 ya están confirmadas, ROADMAP §8)
- [ ] Preparar repositorio, cuentas de servicios y OpenCode de las 4 personas (ROADMAP §10)
- [x] Decisiones de producto confirmadas el 28 oct (ROADMAP §8)
- [ ] Cuenta de desarrollador de Google Play y 15–20 testers (**ruta crítica**, ROADMAP §1)
- [ ] Ejecución de tareas _(arranque previsto: 29 oct; código congelado: 15 nov; **entrega oficial: 1–4 dic con todos los specs**; **prueba cerrada de Play del 1 al 14 nov; solicitud de producción el 15 nov; publicación 1.0 meta 20 nov, estimada 22–25 nov; IA como v1.1 después**)_
