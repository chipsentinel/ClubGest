# ClubGest
Plataforma web para la gestión de clubes deportivos amateurs. Incluye frontend responsive y backend API REST en Express + SQLite. Nació para rugby, pero es extensible a otros deportes y clubes.

## Características principales
- **Frontend responsive**: login/registro y 6 secciones de navegación (Inicio, Convocatorias, Entrenamientos, Lesiones, Seguros, Fichas). CSS modular (variables, layout, componentes, páginas, auth) e iconos SVG integrados.
- **Diseño adaptativo**: breakpoints para desktop, tablet y móvil, con layouts apilados en móvil y lado a lado en tablet/desktop.
- **Backend Express**: API REST con endpoints de jugadores (`/api/jugadores` y alias `/api/jugador`), CORS habilitado y configuración externa via YAML (local/prod).
- **Base de datos SQLite**: script de inicialización y conexión integrada; pensado para despliegues ligeros.
- **Listo para ampliar**: rutas comentadas para futuras entidades (entrenadores, entrenamientos, etc.).

## Tecnologías utilizadas
- **Frontend**: HTML5, CSS3 modular, SVG inline; sin frameworks para mantenerlo simple y didáctico.
- **Backend**: Node.js + Express, CORS, json parsing.
- **Base de datos**: SQLite (ligero y embebido para desarrollo rápido).
- **Config**: Archivos YAML separados (`config.local.yaml` y `config.prod.yaml`) preparados para futuros entornos; hoy solo se usa local, pero queda listo para escalar a prod.
- **Herramientas**: Nodemon para desarrollo, Yargs + js-yaml para leer configuración externa.

## Estructura del proyecto
```
backend/
	app.js                     # Servidor Express, CORS, estáticos frontend y /api
	package.json               # Scripts: dev (nodemon) y start (config prod)
	db/                        # SQLite + script.sql
	src/
		configuration/           # config.local.yaml, config.prod.yaml, loader JS
		controller/jugador.controller.js
		service/jugador.service.js
		route/index.js           # monta /jugador y /jugadores
		route/jugador.route.js   # CRUD + asistencia
frontend/
	index.html                 # Login/registro
	pages/                     # home, entrenamientos, convocatorias, fichas, seguros, lesiones, register-jugador (+ future/* borradores)
	css/                       # variables.css, layout.css, components.css, pages.css, auth.css, style.css (importador)
	img/                       # logos y svg de iconos
```

## Backend
- **Rutas base**: `/api/jugadores` y `/api/jugador` (alias)
	- GET `/` lista
	- GET `/:id` detalle
	- POST `/` crear
	- PUT `/:id` actualizar
	- PATCH `/:id/asistencia` actualizar asistencia
	- DELETE `/:id` borrar
- **Estado**: `/status` devuelve `{ message: 'API ClubGest funcionando' }`
- **Configuración**: `src/configuration/configuration.js` carga YAML (local/prod) para puerto y DB.

### Ejecutar en desarrollo
```bash
cd backend
npm install
npm run dev          # nodemon app.js --config src/configuration/config.local.yaml
```

### Ejecutar en producción (local)
```bash
cd backend
npm install --omit=dev
npm start            # node app.js --config src/configuration/config.prod.yaml
```

## Frontend
- Login/registro en `index.html` con tabs y estilos en `auth.css`.
- Páginas: `home.html`, `convocatorias.html`, `entrenamientos.html`, `lesiones.html`, `seguros.html`, `fichas.html`, `register-jugador.html` (y borradores en `future/`).
- Navegación unificada de 6 enlaces y sistema de iconos SVG (24x24, `currentColor`).
- CSS modular importado desde `css/style.css`.

### Visualización rápida
Puedes servir el frontend estático desde el backend (ya configurado con `express.static`) o abrir los HTML directamente en el navegador.

## Registro de cambios (resumen de commits recientes)
- `style: optimize responsive design for tablet and mobile layouts`
- `feat: frontend architecture with modular CSS and responsive design`
- `style: ajustes estéticos index.html y auth.css`
- `feat: tabs al panel derecho y colores dinámicos de registro`
- `docs: comentarios en el frontend para facilitar edición`
- `feat: conectar formulario registro jugador con backend API`
- `feat: integración base backend (Express + SQLite + rutas jugador)`
- `docs: 0.1.4 v` (backend)

## Próximos pasos sugeridos
- Añadir entidades restantes: entrenamientos, convocatorias, seguros, lesiones, fichas (API + UI).
- Integrar autenticación real (JWT) y proteger rutas.
- Añadir tests (unitarios y e2e) y documentación OpenAPI/Swagger.
- Automatizar despliegue y CI.
