# CI del monorepo (SCRUM-69)

El workflow `Monorepo CI` se ejecuta en PRs y pushes a `develop` y `main`, además de admitir ejecución manual.

## Selección de componentes

- Cambios en `backend/` ejecutan el backend si existe `backend/go.mod`.
- Cambios en `mobile/` ejecutan el móvil si existe `mobile/package.json` y su `package-lock.json`.
- Cambios compartidos en `.github/`, configuración de Git o manifiestos raíz ejecutan todos los componentes inicializados.
- En una ejecución manual o un push sin commit previo se revisan todos los componentes inicializados.
- En PRs se compara la rama con su punto de divergencia respecto de la base; en pushes se compara el estado anterior con el nuevo.
- Los escaneos de seguridad siguen ejecutándose sobre todo el repositorio, aunque un componente no haya cambiado.

No se utilizan filtros `paths` en el evento. El check **CI monorepo** siempre comprueba los resultados del plan y de los jobs solicitados. Debe ser el único check obligatorio de este workflow; no marques como obligatorios `Backend Go` ni `Mobile Expo`, porque pueden omitirse legítimamente.

## Estado actual: proyectos sin inicializar

Actualmente no existen `backend/go.mod` ni `mobile/package.json`. Los jobs de aplicación se omiten y el resumen dice **Sin inicializar: no se ejecutaron pruebas de aplicación**.

No se crean aplicaciones de ejemplo, no se aprueban las specs de producto ni se ejecutan tareas de implementación. Si aparecen archivos fuente sin su manifiesto, o un package.json móvil sin lockfile, la planificación falla en lugar de omitir silenciosamente el componente.

Los controles de selección y cobertura sí tienen pruebas automatizadas, ejecutadas en cada planificación.

## Backend

Al introducir el módulo Go:

1. Go se obtiene de `backend/go.mod`, conforme al mínimo de la constitución (Go 1.24 o superior).
2. Se comprueba gofmt sin modificar archivos.
3. Se descargan/verifican módulos y se exige que `go mod tidy -diff` no tenga diferencias.
4. Se ejecutan `go vet` y golangci-lint.
5. Las pruebas unitarias usan `-race` y generan cobertura. Se exige al menos 80 % de sentencias en cada grupo `internal/domain/` e `internal/usecase/` que tenga sentencias medibles.
6. Se ejecutan pruebas con la etiqueta `integration`; el runner Linux incluye Docker para testcontainers.
7. Se compilan los paquetes y se ejecuta govulncheck.

Un paquete con solo declaraciones y sin sentencias medibles se informa explícitamente. Las pruebas reales de la aplicación y las integraciones todavía no pueden verificarse en este repositorio vacío.

## Mobile

La versión base de CI es Node.js 24, con npm como exige la constitución. Al crear Expo, hay que comprobar su compatibilidad y mantener la versión de CI alineada con la versión elegida para desarrollo.

Al introducir el proyecto:

1. `npm ci` exige un lockfile consistente.
2. Se requieren scripts `typecheck`, `lint` y `test`. No se usa `--if-present`.
3. Se comprueba el formato con la dependencia local Prettier.
4. Jest se ejecuta en modo CI, sin `--passWithNoTests`, recopilando cobertura de `src/**/*.{ts,tsx}`, incluidos archivos no ejercitados.
5. Se exige 80 % en sentencias, ramas, funciones y líneas, por cada grupo de `src/lib/` y `src/features/*/hooks/` que tenga métricas medibles.
6. `npm audit --audit-level=high` falla ante vulnerabilidades altas o críticas, incluyendo dependencias de desarrollo.

El job usa una URL pública ficticia de API y no proporciona claves privadas. Las pruebas deben simular sus llamadas de red. Esta fase no genera binarios nativos firmados ni publica versiones en Expo o las tiendas.

## Seguridad de la CI

Las acciones se fijan a commits completos. El token solo tiene lectura del repositorio y checkout no persiste credenciales. No se usan secretos, credenciales cloud, cachés de dependencias ni `pull_request_target`.

Dependabot mantiene los pins de acciones; las versiones fijadas de golangci-lint y govulncheck se revisan manualmente.

## Activación y próximos pasos

Después de validar la ejecución, agrega como checks obligatorios con origen GitHub Actions:

- `Validar nombre de rama`
- `Detectar secretos`
- `Seguridad de workflows`
- `CI monorepo`

La configuración del workflow no edita el Ruleset. Mantén la aprobación humana requerida.

Cuando se implemente cada proyecto, su primer PR deberá ejecutar el job real y validar sus comandos, versiones y pruebas de integración. Después se añaden artefactos o imágenes, análisis de contenedores/infraestructura y CD a AWS mediante OIDC y aprobación de producción.
