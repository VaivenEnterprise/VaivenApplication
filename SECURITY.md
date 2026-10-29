# Seguridad de VAIVÉN

## Reportar una vulnerabilidad

Contacta a un mantenedor por un canal privado acordado con el equipo. No publiques claves, datos personales ni instrucciones de explotación en issues o PRs públicos.

Incluye los componentes afectados, el impacto y pasos de reproducción sin datos reales. El equipo debe confirmar el reporte, preparar la corrección y acordar su publicación. Aún no hay una versión de aplicación publicada ni un plazo de soporte definido.

## Controles incluidos

- **Gitleaks:** busca patrones de secretos en el historial completo disponible, incluyendo commits donde una credencial se agregó y luego se eliminó. Los resultados redactan las credenciales y no se publican como artefactos.
- **zizmor:** analiza las configuraciones de GitHub Actions; el job falla si encuentra problemas según sus reglas predeterminadas.
- **Dependabot:** propone semanalmente un PR agrupado con actualizaciones de las acciones de GitHub hacia `develop`. Las acciones se fijan a commits completos; las versiones de las herramientas internas se revisan manualmente.
- **Permisos mínimos:** el workflow de seguridad usa un token de solo lectura, no persiste credenciales de Git y no recibe secretos de AWS ni de producción.
- **Protecciones de ramas:** `main` y `develop` exigen revisión humana. Para impedir la fusión por un fallo de CI, hay que configurar los checks como obligatorios en GitHub.

Los escaneos se ejecutan en PRs y pushes a `main` y `develop`, además de una ejecución semanal sobre la rama predeterminada. No tienen filtros de carpetas: los secretos y los workflows afectan a todo el monorepo.

Estos controles reducen riesgos, pero no garantizan que no haya credenciales ni vulnerabilidades. Si una credencial se expone, revócala o rótala aunque luego se borre del repositorio.

## Nombres de ramas y automatización

Las ramas humanas usan `Tipo/SCRUM-Numero-Descripcion`. Se permiten dos excepciones de infraestructura:

- PRs de `main` hacia `develop` dentro de este repositorio, para sincronizar versiones y configuración.
- PRs cuyo autor es la cuenta oficial `dependabot[bot]`, con rama `dependabot/` dentro del mismo repositorio.

Las excepciones solo afectan al nombre. No omiten las revisiones ni los checks de seguridad.

## Activación después del merge

1. En el Ruleset, agrega estos checks obligatorios cuando aparezcan tras su primera ejecución:
   - `Validar nombre de rama`
   - `Detectar secretos`
   - `Seguridad de workflows`
   - `CI monorepo`
2. Selecciona GitHub Actions como origen esperado de cada comprobación.
3. Comprueba en Settings que Secret scanning y Push protection estén habilitados para los secretos compatibles de GitHub. Esta configuración no activa esas opciones.
4. Revisa y aprueba las actualizaciones de Dependabot; no se configura fusión automática.

La conexión usada para preparar este cambio permite leer las reglas pero no editarlas; importar archivos al repositorio no convierte por sí solo estos checks en obligatorios.

## Siguientes fases del monorepo

| Componente | Controles previstos al existir código |
|---|---|
| `backend/` (Go) | CI preparada para activarse con go.mod: formato, análisis estático, pruebas unitarias/integración, cobertura, compilación y govulncheck. |
| `mobile/` (Expo/TypeScript) | CI preparada para activarse con package.json y package-lock.json: instalación reproducible, formato, lint, tipos, pruebas, cobertura y npm audit. |
| Contenedores e infraestructura | Análisis de imágenes e infraestructura cuando existan Dockerfiles y Terraform u otra definición. |
| AWS | OIDC con roles IAM limitados por repositorio, rama y entorno; secretos en Secrets Manager y aprobación de producción. |

La [CI del monorepo](docs/CI_MONOREPO.md) se divide por componente y considera los archivos compartidos. Su check final `CI monorepo` produce un resultado aunque se omita un componente. Sin manifiestos todavía no se ejecutan pruebas de aplicación ni se comprueba su compatibilidad real con los comandos preparados.
