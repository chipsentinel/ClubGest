# ClubGest
Plataforma web para clubes deportivos amateurs. Frontend HTML/CSS/JS estatico y backend Express + SQLite sirviendo API REST. Pensado para levantar rapido, entender facil y extender a mas entidades.

## 1. Idea y criterios de diseno
- Simplicidad: sin frameworks en frontend; solo HTML/CSS/JS para facilitar contribuciones.
- Responsive real: layouts apilados en movil y side-by-side en desktop/tablet con CSS modular.
- API limpia: Express con CORS + JSON, configuracion externa YAML, SQLite embebido para no depender de servicios externos.
- Paginacion ligera: radios + CSS para mostrar/ocultar; JS solo sincroniza contadores y crea radios extra.
- Ruta base automatica: `API_BASE` elige `/api` si sirves estaticos desde el backend o `http://localhost:8080/api` si abres el HTML suelto.
- Flujos guiados: formularios de registro interceptados en `index.html` para enviar por `fetch` y redirigir a `pages/home.html` al exito.

## 2. Tecnologias
- Frontend: HTML5, CSS3 modular, SVG inline, JS vanilla.
- Backend: Node.js + Express, CORS, `express.json`, `express.urlencoded`.
- BD: SQLite (`backend/clubgest.db`), script inicial en `backend/db/script.sql`.
- Config: YAML (`config.local.yaml`, `config.prod.yaml`) leido por `src/configuration/configuration.js` (prod es el default; puedes pasar `--config` para cambiarlo).
- Dev tooling: `nodemon`, `js-yaml`, `yargs`.

## 3. Estructura de carpetas
```
backend/
  app.js                     # Servidor Express: CORS, estaticos frontend, rutas /api
  package.json               # Scripts dev/start
  db/                        # SQLite y script.sql
  src/
    configuration/           # Carga YAML local/prod
    controller/jugador.controller.js
    service/jugador.service.js
    route/index.js           # monta /api/{jugadores,entrenamientos,asistencias}
    route/jugador.route.js   # CRUD jugadores (singular y plural expuestos)
frontend/
  index.html                 # Login/registro (tabs)
  pages/                     # home, convocatorias, entrenamientos, lesiones, seguros, fichas, registro-jugador, future/*
  css/                       # variables.css, layout.css, components.css, pages.css, auth.css, style.css (import)
  js/                        # api.js (servicios centralizados)
  img/                       # logos e iconos
```

## 4. Backend (API REST)
- Rutas jugador (`/api/jugadores`, alias `/api/jugador`): GET `/`, GET `/:id`, POST `/`, PUT `/:id`, PATCH `/:id/asistencia` (placeholder), DELETE `/:id`.
- Estado: GET `/status`  `{ "message": "API ClubGest funcionando" }`.
- Config YAML: `--config src/configuration/config.local.yaml` (dev) o `config.prod.yaml` (prod) define puerto y DB.
- Respuesta API en camelCase; la base usa snake_case y se mapea en el controlador.

### Levantar en desarrollo
```bash
cd backend
npm install
npm run dev   # nodemon app.js --config src/configuration/config.local.yaml
```

### Levantar en produccion local
```bash
cd backend
npm install --omit=dev
npm start    # node app.js --config src/configuration/config.prod.yaml
```

### Checks rapidos
1) Backend vivo: `http://localhost:8080/status`.
2) Lista jugadores: `curl http://localhost:8080/api/jugadores`.
3) Frontend servido por Express: `http://localhost:8080/` abre el login.

## 5. Frontend y flujos
- Login/Registro (`index.html`): tabs para login y registro (club/jugador/entrenador). Los formularios se interceptan con `fetch`; si responde OK, se redirige a `pages/home.html`. Usa `API_BASE` dinamica.
- Paginacion ligera (convocatorias, lesiones, seguros, fichas, entrenamientos): radios ocultos controlan que tarjetas/filas se ven. JS sincroniza el numero mostrado y anade radios extra cuando hay mas paginas. 
- Fichas: consume `/api/jugadores`, muestra 20 por pagina, permite eliminar y actualiza contadores.
- Entrenamientos: consume `/api/entrenamientos` y `/api/asistencias/jugador/:id`, muestra badges de estado/asistencia, permite marcar asistencia y pagina 10 items.
- Convocatorias/Lesiones/Seguros: maquetados estaticos con paginacion sincronizada (listos para conectar a API).

## 6. Criterios aplicados en este trabajo
- HTML limpio con IDs/clases claros para JS/CSS.
- Comentarios solo donde la intencion no es obvia (API_BASE dinamica, paginacion con radios, interceptacion de formularios).
- Sin dependencias nuevas en frontend; todo en vanilla.
- Compatibilidad local: si abres el HTML fuera del servidor, se usa `http://localhost:8080/api`.

## 7. Comandos usados habitualmente
- `npm run dev` (backend con nodemon + config local).
- `npm start` (backend con config prod).
- `curl http://localhost:8080/api/jugadores` (ver datos rapido).
- `git status -sb`, `git add ...`, `git commit -m "..."`, `git push origin dev` (flujo git).

## 8. Tutorial rapido de uso
1) Instalar deps: `cd backend && npm install`.
2) Arrancar backend: `npm run dev` (sirve API y frontend en `http://localhost:8080/`).
3) Registrar (club/jugador/entrenador): abre `http://localhost:8080/`, pestana Registro; al exito redirige a `pages/home.html`.
4) Crear jugadores: desde Registro de jugador o via API POST `/api/jugadores`.
5) Ver fichas: `pages/fichas.html` lista jugadores, 20 por pagina; eliminar actualiza contadores.
6) Gestionar entrenamientos: `pages/entrenamientos.html` crea entrenamientos, marca asistencia y pagina 10 items.
7) Comprobar estado: `http://localhost:8080/status`.

## 9. Proximos pasos sugeridos
- Anadir API real para convocatorias, lesiones y seguros y conectar las tablas maquetadas.
- Integrar autenticacion (JWT) y roles.
- Anadir tests (unit/e2e) y documentacion OpenAPI.
- Automatizar despliegue/CI y migrar SQLite a un RDBMS gestionado si crece.

## 10. Rubrica de terminos y siglas (glosario rapido)
- API: interfaz para que otro sistema consuma datos. Aqui es REST sobre HTTP (JSON).
- CRUD: Create, Read, Update, Delete (alta, consulta, actualizar, borrar).
- CORS: Cross-Origin Resource Sharing; permite que el navegador llame a la API desde otro origen.
- YAML: formato de configuracion legible; define puerto, base de datos, etc.
- SQLite: base de datos ligera en un archivo (`backend/clubgest.db`).
- Express: framework minimalista para crear APIs en Node.js.
- Middleware: funcion que intercepta una request antes del handler (ej: validaciones).
- express-validator: libreria para validar inputs HTTP.
- nodemon: reinicia el servidor al guardar cambios en dev.
- Endpoint: URL de la API (ej: `/api/jugadores`).
- Status 2xx/4xx/5xx: codigos HTTP de exito, error cliente, error servidor.
- camelCase vs snake_case: estilo de nombres; la API responde camelCase, la DB guarda snake_case.
- API_BASE: constante JS que elige `http://localhost:8080/api` o `/api` segun donde abras el HTML.
- Paginacion con radios: tecnica en frontend usando inputs type radio y CSS para mostrar/ocultar paginas.
- Asistencia: relacion jugador-entrenamiento que marca si asistio (endpoint placeholder).
