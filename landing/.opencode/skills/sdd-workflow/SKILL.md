---
name: sdd-workflow
description: Flujo Spec Driven Development de la landing de VAIVÉN. Úsala al crear o ejecutar una spec, un plan o una lista de tareas.
---

# Skill: Spec Driven Development (landing)

Orden fijo: `constitution.md → spec.md → plan.md → tasks.md → implementación → revisión`.

## spec.md (QUÉ y POR QUÉ)
Objetivo · historias (`Como <rol>, quiero <acción>, para <beneficio>`, P0/P1/P2) · requisitos `RF-xx`/`RNF-xx` medibles · criterios `CA-xx` (dado/cuando/entonces) · fuera de alcance · `[NEEDS CLARIFICATION]`.

## plan.md (CÓMO)
Archivos a crear · decisiones numeradas `P-xx` · contenido de cada página (secciones y mensajes) · pruebas (`check.mjs` + revisión visual) · tabla de verificación de constitución.

## tasks.md
- Cada tarea: título, `Archivos`, `Agente`, `Depende de`, `Aceptación` verificable, `Refs`.
- 1–3 archivos por tarea; `[P]` si es paralelizable.
- Última tarea: memoria + revisión de conformidad.

## Lista de comprobación
- [ ] ¿Cada tarea toca ≤ 3 archivos?
- [ ] ¿La aceptación se puede verificar con `check.mjs` o a simple vista?
- [ ] ¿Todo lo dudoso es `[NEEDS CLARIFICATION]`?
- [ ] ¿Nada de la app está inventado?
