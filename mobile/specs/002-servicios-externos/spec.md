# Spec 002 — Servicios externos y compilación (móvil)

- **Dueño:** MO-B · **Prioridad:** P0 · **Ventana:** 29–31 oct · **Depende de:** 001 (móvil) y 002 (backend, para la URL de staging)
- **Constitución:** v1.1.0 · **Estado:** Borrador

## 1. Objetivo y por qué
Dejar la app capaz de **instalarse en un teléfono real** (módulos nativos como cámara, QR y notificaciones no funcionan en Expo Go) y de hablar con el backend de staging. Sin esto, nadie puede probar nada desde el 3 de noviembre.

## 2. Historias
| # | Prio. | Historia |
|---|---|---|
| H-01 | P0 | Como persona del equipo, quiero instalar la app en mi teléfono Android con un solo comando, para probar mi trabajo. |
| H-02 | P0 | Como persona del equipo, quiero que la app apunte a staging o a mi backend local según el perfil, para trabajar sin cambiar código. |
| H-03 | P0 | Como persona del equipo, quiero ver en la pantalla de diagnóstico que el backend de staging responde, para descartar fallas de configuración. |

## 3. Requisitos
| ID | Requisito |
|---|---|
| RF-01 | `expo-dev-client` instalado; la app se compila como *development build* con EAS (perfil `development`). |
| RF-02 | `eas.json` con perfiles `development` (dev client, distribución interna), `preview` (APK interno para validación) y `production` (reservado). |
| RF-03 | `app.config.ts` define nombre «Vaivén», `slug`, `scheme: "vaiven"`, identificadores de paquete Android e iOS (**provisional** `mx.vaiven.app`) y permisos declarados (cámara, ubicación aproximada, fotos, notificaciones). Los textos de permisos están en español. |
| RF-04 | La URL del backend por perfil se lee de variables `EXPO_PUBLIC_API_URL` definidas en `eas.json`/`.env.*` (sin secretos); `src/config` valida que exista y falla con mensaje claro. |
| RF-05 | `.env.example` documenta todas las variables públicas; `.env*` está ignorado por git. |
| RF-06 | La pantalla de diagnóstico (001-T018) muestra la URL activa, el resultado de `/healthz` y `/readyz` y la versión del backend (`GET /api/v1/meta`). |
| RF-07 | Guía en `docs/compilacion.md`: cómo crear la cuenta de Expo, `eas login`, primer build, instalar el APK y recargar con Metro. |
| RF-08 | Ningún secreto de Cloudinary ni de otro servicio vive en la app; solo `cloudName` si hiciera falta (público). |
| RNF-01 | El primer *development build* se completa y se instala en al menos un teléfono Android real. |

## 4. Criterios de aceptación
| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado `eas build -p android --profile development`, entonces produce un APK instalable. |
| CA-02 | Dado el perfil `development` con la URL de staging, cuando abro diagnóstico, entonces `/readyz` aparece en verde. |
| CA-03 | Dada una URL ausente, cuando arranca la app en desarrollo, entonces muestra el error de configuración y no un fallo silencioso. |
| CA-04 | Dado el repositorio, cuando busco secretos, entonces no hay ninguno. |

## 5. Fuera de alcance
Publicación en tiendas, iOS firmado (requiere cuenta de pago), actualizaciones OTA, analítica.

## 6. Preguntas abiertas
- [NEEDS CLARIFICATION: ¿Cuenta de Expo compartida o una por persona? Provisional: una organización gratuita con 4 miembros.]
- Identificador de paquete: `mx.vaiven.app` (confirmado el 28 de oct: «que lleve el nombre vaiven»). **Una vez publicada la app en Google Play no se puede cambiar.**
- Esta versión se publica **solo en Google Play (Android)**; iOS/App Store queda fuera por costo.
