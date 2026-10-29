# Tareas 002 — Servicios externos y compilación (móvil)

- **Dueño:** MO-B · **Estado:** sin ejecutar · `[P]` = paralelizable

- [ ] **T001** Instalar dependencias nativas aprobadas
  - Archivos: `package.json`, `package-lock.json`
  - Agente: `dev-expo` · Depende de: 001-T023
  - Aceptación: instaladas con `npx expo install` las de plan P-05 y `expo-dev-client`; `npx expo-doctor` sin errores; ninguna dependencia fuera de la constitución v1.1.0
  - Refs: Art. II.4, XIII

- [ ] **T002** Configuración de la app y permisos
  - Archivos: `app.config.ts`
  - Agente: `dev-expo` · Depende de: T001
  - Aceptación: nombre, `slug`, `scheme: vaiven`, ids de paquete (provisional), variante por `APP_VARIANT`, permisos con textos en español; plugins de `expo-camera`, `expo-location`, `expo-image-picker`, `expo-notifications`
  - Refs: RF-03, P-03, P-04

- [ ] **T003** Perfiles de EAS
  - Archivos: `eas.json`, `.env.example`, `.gitignore`
  - Agente: `dev-expo` · Depende de: T002
  - Aceptación: perfiles `development`, `preview`, `production`; `EXPO_PUBLIC_API_URL` por perfil; `.env*` ignorado excepto `.env.example`; sin secretos (CA-04)
  - Refs: RF-02, RF-04, RF-05

- [ ] **T004** Validación de la URL del backend
  - Archivos: `src/config/env.ts`, `src/config/env.test.ts`
  - Agente: `dev-expo` · Depende de: T003
  - Aceptación: `EXPO_PUBLIC_API_URL` obligatoria y con formato de URL; mensaje claro en español si falta (CA-03); pruebas de ambos casos
  - Refs: RF-04 · 001-T005

- [ ] **T005** Diagnóstico ampliado
  - Archivos: `src/features/diagnostics/{api.ts, useDiagnostics.ts, DiagnosticsScreen.tsx}`, pruebas
  - Agente: `dev-expo` · Depende de: T004
  - Aceptación: muestra URL activa, `/healthz`, `/readyz` y versión y entorno (de `GET /api/v1/meta`); estados de carga y error con `LoadingState`/`ErrorState`
  - Refs: RF-06

- [ ] **T006** Guía de compilación
  - Archivos: `docs/compilacion.md`
  - Agente: `spec-writer` · Depende de: T003
  - Aceptación: pasos para cuenta de Expo, `eas login`, build, instalar APK, `npx expo start --dev-client`; solución a 3 errores comunes
  - Refs: RF-07

- [ ] **T007** Primer *development build* y verificación manual (**la hace una persona**)
  - Archivos: `memoria.md` (solo anexar)
  - Agente: — (manual, con ayuda de `docs/compilacion.md`) · Depende de: T005, 002-T006 (backend, staging)
  - Aceptación: APK instalado en un teléfono Android real; diagnóstico en verde contra staging (CA-01, CA-02); se registra el enlace del build en `memoria.md`
  - Refs: RNF-01

- [ ] **T008** Revisión de conformidad
  - Archivos: `memoria.md` (solo anexar)
  - Agente: `revisor-constitucion` · Depende de: T007
  - Aceptación: **CONFORME**; hito H0 (móvil) marcado en ROADMAP
  - Refs: DoD

| Total | 8 tareas |
|---|---|
