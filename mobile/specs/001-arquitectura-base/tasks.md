# Tareas 001 — Arquitectura base de la app móvil

- **Spec:** `spec.md` · **Plan:** `plan.md`
- **Estado:** Redactadas, **sin ejecutar**. No empezar hasta que la persona apruebe spec y plan.
- Leyenda: `[P]` = puede hacerse en paralelo con otras `[P]` de la misma fase (no comparten archivos). Una tarea = un commit convencional.
- Agentes: `dev-expo`, `qa-mobile`, `spec-writer`, `revisor-constitucion`.

## Fase 0 — Preparación

- [ ] **T001** Crear el proyecto Expo con TypeScript y reorganizarlo a `src/`
  - Archivos: `package.json`, `app.config.ts`, `tsconfig.json`, `.gitignore`, estructura `src/` vacía según plan §2 (con `.gitkeep`)
  - Agente: `dev-expo`
  - Depende de: —
  - Aceptación: `npx expo start` arranca sin errores; `npx expo-doctor` sin problemas críticos; versión del SDK anotada en `memoria.md`; el contenido de ejemplo de la plantilla fue eliminado
  - Refs: plan P-01 · Art. VI, X

- [ ] **T002** TypeScript estricto y alias `@/`
  - Archivos: `tsconfig.json`
  - Agente: `dev-expo`
  - Depende de: T001
  - Aceptación: `strict: true`, `noUncheckedIndexedAccess: true`, alias `@/*` → `src/*`; `npx tsc --noEmit` pasa
  - Refs: plan P-02 · Art. III

- [ ] **T003** [P] ESLint, Prettier y scripts de calidad
  - Archivos: `eslint.config.js`, `.prettierrc`, `package.json` (scripts)
  - Agente: `dev-expo`
  - Depende de: T002
  - Aceptación: existen `typecheck`, `lint`, `format`; `eslint` prohíbe `any` explícito y `@ts-ignore`; `npm run lint` pasa
  - Refs: RF-13 · Art. III, IX

- [ ] **T004** [P] Jest, jest-expo y React Native Testing Library
  - Archivos: `jest.config.js`, `jest.setup.ts`, `package.json` (script `test`), `src/lib/smoke.test.ts`
  - Agente: `qa-mobile`
  - Depende de: T002
  - Aceptación: `npm test` ejecuta la prueba de humo y genera cobertura; el alias `@/` funciona en pruebas
  - Refs: RF-13 · Art. IX

## Fase 1 — Fundamentos

- [ ] **T005** Configuración validada
  - Archivos: `src/lib/config.ts`, `src/lib/config.test.ts`, `.env.example`
  - Agente: `dev-expo`
  - Depende de: T003, T004
  - Aceptación: `loadConfig(env)` valida con `zod`; URL inválida o faltante → error con mensaje claro; `appEnv` por defecto `development`; `.env.example` sin secretos; pruebas de tabla
  - Refs: plan §4.1 · RF-02 · Art. II, VIII

- [ ] **T006** [P] Tokens de diseño
  - Archivos: `src/theme/tokens.ts`, `src/theme/index.ts`
  - Agente: `dev-expo`
  - Depende de: T003
  - Aceptación: exporta `colors`, `spacing`, `radius`, `typography`, `touch` con los valores de plan §4.2 como `as const`; `typecheck` pasa
  - Refs: plan §4.2 · RF-04 · Art. VII

- [ ] **T007** [P] Textos es-MX
  - Archivos: `src/i18n/es-MX.ts`
  - Agente: `dev-expo`
  - Depende de: T003
  - Aceptación: exporta `es` con las secciones de plan §4.3; incluye un mensaje por cada `ApiErrorCode` (incl. `network_error`, `timeout`, `invalid_response`), `unexpected` y `config`
  - Refs: RF-05, RF-07 · Art. V

- [ ] **T008** [P] Formato de dinero y fechas
  - Archivos: `src/lib/format/money.ts`, `src/lib/format/date.ts`, `src/lib/format/format.test.ts`
  - Agente: `dev-expo`
  - Depende de: T004
  - Aceptación: `formatMXN(12345)` → `$123.45`; `formatMXN(0)` → `$0.00`; `formatDate`/`formatDateTime` reciben ISO UTC y formatean en `es-MX`; entrada inválida no lanza excepción (devuelve cadena vacía); cobertura ≥ 80 %
  - Refs: RF-11 · Art. V

- [ ] **T009** [P] Almacenamiento seguro
  - Archivos: `src/lib/storage/secureStorage.ts`, `src/lib/storage/secureStorage.test.ts`
  - Agente: `dev-expo`
  - Depende de: T004
  - Aceptación: `get`, `set`, `remove` sobre `expo-secure-store`; errores del módulo devuelven `null`/`false` sin lanzar; pruebas con el módulo simulado
  - Refs: RF-12 · Art. VIII

## Fase 2 — Datos y errores

- [ ] **T010** Errores de API y generador de `requestId`
  - Archivos: `src/lib/api/errors.ts`, `src/lib/api/request-id.ts`, `src/lib/api/errors.test.ts`
  - Agente: `dev-expo`
  - Depende de: T007
  - Aceptación: `ApiError` y `ApiErrorCode` según skill `react-query-api-client`; `fromServerError` toma el envoltorio del backend y, si el cuerpo no lo cumple, deriva el `code` del estado HTTP; `newRequestId()` devuelve 32 caracteres hex; pruebas de tabla por código
  - Refs: plan §4.4 · RF-06, RF-07 · Art. IV

- [ ] **T011** Cliente de API
  - Archivos: `src/lib/api/client.ts`, `src/lib/api/client.test.ts`
  - Agente: `dev-expo`
  - Depende de: T005, T010
  - Aceptación: `request(path, schema, init)` usa `config.apiBaseUrl`, envía `X-Request-Id`, aplica tiempo máximo de 10 s, valida con `zod`; casos probados: éxito, 400 con detalles, 404, 500, esquema inválido (`invalid_response`), fallo de red (`network_error`), vencimiento (`timeout`); cobertura ≥ 80 %
  - Refs: RF-06 · CA-05, CA-06, CA-07 · Art. II, IV

- [ ] **T012** Caché de consultas y proveedores
  - Archivos: `src/lib/query/queryClient.ts`, `src/lib/query/queryClient.test.ts`, `src/providers/AppProviders.tsx`
  - Agente: `dev-expo`
  - Depende de: T010
  - Aceptación: `staleTime` 30 s; `retry` devuelve true una sola vez para `network_error`, `timeout` y 5xx, y false para 4xx (probado); `AppProviders` envuelve con `QueryClientProvider`
  - Refs: RF-08 · plan P-06 · Art. X

- [ ] **T013** Feature `diagnostics`
  - Archivos: `src/features/diagnostics/types.ts`, `src/features/diagnostics/api/getMeta.ts`, `src/features/diagnostics/hooks/useMeta.ts`, `src/features/diagnostics/hooks/useMeta.test.tsx`
  - Agente: `dev-expo`
  - Depende de: T011, T012
  - Aceptación: `useMeta` devuelve `name`, `version`, `environment`, `serverTime` con `fetch` simulado; maneja error de red; clave `['meta']` en constante
  - Refs: plan §4.7 · RF-09 · Art. VI

## Fase 3 — UI y rutas

- [ ] **T014** Componentes base: `Screen` y `AppText`
  - Archivos: `src/components/ui/Screen.tsx`, `src/components/ui/AppText.tsx`, `src/components/ui/ui.test.tsx`
  - Agente: `dev-expo`
  - Depende de: T006
  - Aceptación: solo usan *tokens* (sin valores literales); `Screen` respeta área segura; `AppText` admite variantes de `typography`; pruebas de renderizado
  - Refs: plan §4.5 · RF-04 · Art. VII

- [ ] **T015** Componentes base: `Button`, `LoadingState`, `ErrorState`
  - Archivos: `src/components/ui/Button.tsx`, `src/components/ui/LoadingState.tsx`, `src/components/ui/ErrorState.tsx`, `src/components/ui/states.test.tsx`
  - Agente: `dev-expo`
  - Depende de: T007, T010, T014
  - Aceptación: `Button` con rol `button`, área ≥ 44, variantes y estado cargando/deshabilitado; `ErrorState` muestra el mensaje de `i18n` según `ApiError.code` y llama `onRetry` al pulsar; `LoadingState` con texto accesible; pruebas por rol y texto
  - Refs: plan §4.5 · RF-04 · RNF-07 · Art. VII

- [ ] **T016** Manejador global de errores de renderizado
  - Archivos: `src/components/AppErrorBoundary.tsx`, `src/components/AppErrorBoundary.test.tsx`
  - Agente: `dev-expo`
  - Depende de: T015
  - Aceptación: captura un error de render, muestra mensaje en español y permite reintentar; no registra datos personales; prueba con componente que lanza (CA-08)
  - Refs: RF-10 · Art. VIII

- [ ] **T017** Rutas, layout raíz y pantalla base
  - Archivos: `src/app/_layout.tsx`, `src/app/index.tsx`, `src/app/+not-found.tsx`
  - Agente: `dev-expo`
  - Depende de: T005, T012, T015, T016
  - Aceptación: `_layout` envuelve con `AppErrorBoundary` y `AppProviders`; si la configuración es inválida muestra pantalla de error de configuración; `index` y `+not-found` usan solo componentes de `ui/` y textos de `i18n`; la app abre en emulador (CA-01, CA-02)
  - Refs: plan §4.6 · RF-02, RF-03 · Art. VI

- [ ] **T018** Pantalla de diagnóstico (solo desarrollo)
  - Archivos: `src/app/(dev)/_layout.tsx`, `src/app/(dev)/diagnostico.tsx`
  - Agente: `dev-expo`
  - Depende de: T013, T015, T017
  - Aceptación: `(dev)/_layout` redirige a `/` si `config.appEnv !== 'development'`; la pantalla muestra nombre, versión, entorno y hora (con `formatDateTime`) y los estados cargando y error con reintento; con el backend en marcha se ven los datos reales (CA-03) y sin él, el error de conexión (CA-04)
  - Refs: plan §4.6, P-10 · RF-09 · CA-10 · Art. VI, VII

## Fase 4 — Cierre

- [ ] **T019** Prueba de convención de diseño y textos
  - Archivos: `src/conventions.test.ts`
  - Agente: `qa-mobile`
  - Depende de: T018
  - Aceptación: la prueba falla si en `src/` (excepto `theme/` e `i18n/`) aparece un color literal `#hex` o un texto visible literal dentro de JSX; pasa en el estado actual
  - Refs: plan P-11 · RNF-04 · Art. V, VII

- [ ] **T020** [P] Verificación automática (CI)
  - Archivos: `.github/workflows/ci.yml`
  - Agente: `dev-expo`
  - Depende de: T003, T004
  - Aceptación: en cada *push* y *pull request* ejecuta `npm ci`, `npm run typecheck`, `npm run lint`, `npm test` y `npx prettier --check .`
  - Refs: H-10 · Art. IX

- [ ] **T021** [P] README de la app
  - Archivos: `README.md`
  - Agente: `spec-writer`
  - Depende de: T018
  - Aceptación: explica requisitos (Node, emulador o Expo Go), instalación, variables de entorno con tabla de URLs por plataforma (Android `10.0.2.2`, simulador iOS `localhost`, dispositivo físico IP local), comandos y estructura; un compañero puede seguirlo sin ayuda (CA-01)
  - Refs: RF-14 · H-01

- [ ] **T022** Actualizar memoria y verificar criterios de aceptación
  - Archivos: `memoria.md`
  - Agente: `spec-writer`
  - Depende de: T019, T020, T021
  - Aceptación: estado de la spec 001 actualizado; versión real del SDK y dependencias registradas; CA-01…CA-11 comprobados y anotados
  - Refs: Art. XII

- [ ] **T023** Revisión de conformidad con la constitución
  - Archivos: ninguno (solo informe)
  - Agente: `revisor-constitucion`
  - Depende de: T022
  - Aceptación: veredicto **CONFORME** o hallazgos corregidos y revisados de nuevo
  - Refs: DoD de la constitución §7

## Resumen

| Fase | Tareas | Total |
|---|---|---|
| 0 Preparación | T001–T004 | 4 |
| 1 Fundamentos | T005–T009 | 5 |
| 2 Datos y errores | T010–T013 | 4 |
| 3 UI y rutas | T014–T018 | 5 |
| 4 Cierre | T019–T023 | 5 |
| **Total** | | **23** |
