# Plan 002 — Servicios externos y compilación (móvil)

- **Spec:** `spec.md` · **Dueño:** MO-B

## 1. Archivos
```
app.config.ts (modificar) · eas.json · .env.example
src/config/{env.ts (modificar)}
src/features/diagnostics/ (ampliar con versión y readyz)
docs/compilacion.md
```

## 2. Decisiones
| # | Decisión | Art. |
|---|---|---|
| P-01 | `expo-dev-client` + EAS Build; `preview` genera APK (no AAB) para repartir por enlace | II |
| P-02 | Variables públicas con prefijo `EXPO_PUBLIC_`; validadas con el esquema existente de 001-T005 | VI |
| P-03 | `app.config.ts` lee `APP_VARIANT` para diferenciar identificadores de `development` y `preview` y poder instalar ambos | — |
| P-04 | Permisos declarados desde ahora (cámara, ubicación, fotos, notificaciones) para no recompilar el cliente de desarrollo por cada feature | II |
| P-05 | Los módulos nativos aprobados en la constitución v1.1.0 se instalan en esta spec: `expo-camera`, `expo-location`, `expo-image-picker`, `expo-image-manipulator`, `expo-image`, `expo-notifications`, `expo-device`, `expo-linking`, `react-native-svg`, `react-native-qrcode-svg`, `@react-native-community/datetimepicker` | II.4, XIII |
| P-06 | El resto de dependencias JS (`react-hook-form`, `@hookform/resolvers`) las agrega 003 | XIII |

> P-05 evita que cada persona compile un cliente distinto: **un solo build de desarrollo** sirve para todas las specs.

## 3. Verificación de constitución
| Art. | Cumple |
|---|---|
| II.4 | Solo dependencias aprobadas en v1.1.0 |
| VI | Sin secretos; textos de permisos en es-MX |
| XIII | Cambios de configuración solo en esta spec (dueña MO-B) |
