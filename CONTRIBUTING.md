# Contribuir a VAIVÉN

## Flujo de trabajo

1. Actualiza tu copia de `develop` y crea desde ella una rama de trabajo.
2. Abre un PR hacia `develop` y describe el cambio y las pruebas.
3. El otro integrante del equipo revisa y aprueba el PR. Resuelve sus comentarios antes de fusionarlo.
4. Para preparar una versión, crea una rama `release/` desde `develop`. Tras validarla, abre su PR hacia `main`.
5. Si corriges algo en la rama de release, lleva también esas correcciones a `develop` mediante un PR.
6. Después de integrar la versión en `main`, crea el tag y la Release correspondientes. El despliegue a AWS se configurará en una fase posterior.

Usa **Create a merge commit** al integrar ramas de release con `main` y `develop`, para conservar su relación en el historial.

La configuración inicial se incorpora excepcionalmente a `main` sin tarea Jira. Después debe sincronizarse con `develop` antes de empezar nuevas tareas.

## Nombres de ramas

Formato:

```text
<Tipo>/SCRUM-<Numero>-<Descripcion>
```

Tipos: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`, `hotfix` y `release`.

- El tipo va en minúsculas y `SCRUM` en mayúsculas.
- El número es positivo y no lleva ceros iniciales.
- La descripción contiene solo letras A-Z/a-z y guiones entre palabras.
- No se admiten acentos, ñ, espacios, números ni otros símbolos en la descripción.
- No se admiten guiones dobles ni al principio o al final de la descripción.

Ejemplos ilustrativos:

```text
feat/SCRUM-123-Agregar-login
fix/SCRUM-124-corregir-sesion
release/SCRUM-125-Preparar-version
```

La validación de GitHub comprueba el formato, no la existencia ni el estado de la tarea en Jira. Tampoco comprueba todavía que una rama haya nacido de `develop` ni que un PR hacia `main` provenga de `release/`.

Se permiten los PRs de sincronización de `main` hacia `develop` dentro del mismo repositorio y los PRs de la cuenta oficial `dependabot[bot]` con ramas `dependabot/` de este repositorio. Estas excepciones solo afectan al nombre, no a la revisión humana ni a los controles de seguridad.

## Revisiones y comprobaciones

Las protecciones activas de `main` y `develop` exigen un PR, una aprobación y conversaciones resueltas. Nuevos cambios invalidan las aprobaciones anteriores. Están bloqueados el borrado y los force push, sin excepciones configuradas.

El workflow `PR branch naming` comprueba los nombres en PRs hacia ambas ramas. Para que un fallo impida fusionar, hay que agregar **Validar nombre de rama** como comprobación obligatoria del Ruleset después de su primera ejecución.

La excepción `[skip ci]` se usa solo para incorporar esta configuración inicial. No la uses en cambios posteriores: al ser obligatoria la comprobación, omitirla dejará el PR bloqueado.

## Secretos y configuración

- No subas archivos `.env`, claves privadas, tokens ni credenciales.
- Usa `.env.example` o `.env.<entorno>.example` con valores ficticios para documentar las variables.
- En desarrollo, mantén las credenciales del backend en archivos locales ignorados por Git.
- En CI, utiliza GitHub Actions Secrets cuando sea necesario. En AWS, mantén los secretos de ejecución en un gestor como Secrets Manager; las credenciales de despliegue se configurarán con roles y OIDC.
- Los valores incluidos en el frontend o la app móvil pueden extraerse de la aplicación. Un `.env` no protege una clave privada; deja esas operaciones en el backend.
- `.gitignore` no elimina archivos ya versionados ni su historial y no detecta todas las credenciales. Si publicas una credencial, revócala o rótala inmediatamente y avisa al otro integrante.

## Documentación y pruebas

Antes de cambiar `backend/` o `mobile/`, sigue las instrucciones de su `AGENTS.md`, constitución y especificaciones.

Describe en cada PR las pruebas que correspondan al cambio. La [CI del monorepo](docs/CI_MONOREPO.md) selecciona backend y mobile según los cambios y sus manifiestos. Mientras no exista código de aplicación, omite sus jobs y lo indica expresamente; al aparecer el proyecto, exige sus comandos de calidad, pruebas y revisión de dependencias. El check final `CI monorepo` debe ser obligatorio, no los jobs individuales que pueden omitirse.

El workflow `Repository security` detecta secretos con Gitleaks y analiza los workflows con zizmor. Dependabot revisa las acciones semanalmente. Consulta [SECURITY.md](SECURITY.md) para conocer el alcance, la activación de checks obligatorios y las siguientes fases.
