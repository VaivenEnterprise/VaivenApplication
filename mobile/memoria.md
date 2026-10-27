# Memoria de la App Móvil — VAIVÉN

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
| Versión de Expo SDK | _Por fijar en T001 (SDK estable vigente)_ |

## 2. Decisiones (registro tipo ADR)

| # | Fecha | Decisión | Motivo | Constitución |
|---|---|---|---|---|
| D-001 | 2026-10-26 | Expo + TypeScript estricto + Expo Router | Estándar actual de Expo; rutas por archivos | Art. III, VI |
| D-002 | 2026-10-26 | La app solo consume la API del backend | Backend con MongoDB es la fuente de verdad | Art. II |
| D-003 | 2026-10-26 | TanStack Query para datos del servidor; sin almacén global por ahora | Menos código y menos estado | Art. X |
| D-004 | 2026-10-26 | `StyleSheet` + tokens propios, sin librería de UI | Menos dependencias; consistencia por tokens | Art. VII, X |
| D-005 | 2026-10-26 | Dinero en centavos; `formatMXN` para mostrar | Igual que el backend | Art. V |
| D-006 | 2026-10-26 | Errores normalizados en `lib/api` con códigos del servidor + `network_error` y `timeout` | Un solo punto de manejo | Art. IV |
| D-007 | 2026-10-26 | Solo OpenCode + modelos gratuitos de Zen | Requisito del curso | Art. XI |
| D-008 | 2026-10-26 | Documentos y prompts de agentes en español | Preferencia del equipo | Art. XI |
| D-009 | 2026-10-26 | `task.md` se nombra `tasks.md` | Convención estándar de SDD | Art. I |
| D-010 | 2026-10-26 | Gestor de paquetes `npm` | Simplicidad; sin herramientas extra | Art. X |

## 3. Modelos gratuitos asignados (OpenCode Zen)

Fuente de verdad: `opencode.json`. Verificados en septiembre de 2026; **los IDs gratuitos rotan**.

| Rol | Modelo | Agentes |
|---|---|---|
| Razonamiento / planeación | `opencode/nemotron-3-ultra-free` | `plan`, `spec-writer` |
| Revisión | `opencode/big-pickle` | `revisor-constitucion` (modelo por defecto) |
| Implementación | `opencode/nemotron-3-lightning-free` | `build`, `dev-expo` |
| Pruebas / tareas rápidas | `opencode/ling-flash-free` | `qa-mobile`, `small_model` |
| Alternos | `opencode/mimo-free`, `opencode/muse-spark-free` | — |

**Cómo validar y cambiar:**
1. Ejecutar `opencode models` y confirmar que cada ID existe.
2. Editar solo `opencode.json` (sección `agent`, `model`, `small_model`).
3. Registrar el cambio en esta tabla y en la sección 2.

**Compatibilidad de versión:** los agentes usan el formato estable de OpenCode (`permission:` como mapa, carpeta `.opencode/agents/`). Si tu versión de OpenCode es la V2 y reporta campos obsoletos, cambia `permission:` por la lista `permissions:` (`action`, `resource`, `effect`) en cada agente.

## 4. Convenciones aprendidas

_(Los agentes agregan aquí hallazgos útiles y breves, uno por línea, con fecha.)_

- 2026-10-26 — Los modelos gratuitos rinden mejor con tareas de 1–3 archivos y criterios de aceptación explícitos.
- 2026-10-26 — En emulador Android, el equipo anfitrión es `10.0.2.2`; en dispositivo físico, la IP local de la red.

## 5. Dependencias registradas

| Dependencia | Para qué | Spec |
|---|---|---|
| `expo`, `react`, `react-native` | Base de la app | 001 |
| `expo-router` (+ `react-native-safe-area-context`, `react-native-screens`) | Navegación | 001 |
| `expo-constants` | Leer configuración | 001 |
| `expo-secure-store` | Almacenamiento seguro | 001 |
| `expo-status-bar` | Barra de estado | 001 |
| `@tanstack/react-query` | Datos del servidor | 001 |
| `zod` | Validación de configuración y respuestas | 001 |
| `typescript`, `eslint`, `eslint-config-expo`, `prettier` | Calidad | 001 |
| `jest`, `jest-expo`, `@testing-library/react-native`, `@types/jest` | Pruebas | 001 |

## 6. Pendientes y preguntas abiertas

- [ ] Aprobación humana de `specs/001-arquitectura-base/`.
- [ ] Paleta oficial y tipografía de VAIVÉN (los *tokens* de la spec 001 son provisionales).
- [ ] Mecanismo de autenticación: se define en la primera spec funcional (coordinado con el backend).
- [ ] Estrategia de compilación y distribución (EAS): fuera de la spec 001.

## 7. Riesgos conocidos

- Los modelos gratuitos pueden desaparecer o limitar el uso sin aviso → mantener alternos listados en la sección 3.
- Algunos modelos gratuitos pueden usar los datos enviados para mejorarse → **no pegar secretos ni datos personales reales** en las conversaciones con agentes.
- Los modelos pueden proponer APIs obsoletas de Expo/React Native → verificar con `npx expo install --check` y la documentación de la versión fijada.
