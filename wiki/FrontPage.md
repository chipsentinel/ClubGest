# ClubGest

ClubGest es un sistema MVP para la gestión de clubes deportivos: backend en Node.js + Express con SQLite y frontend estático (HTML/CSS/JS). Proporciona CRUD para jugadores, entrenamientos y asistencias, documentación y un conjunto básico de pruebas/manuales para desplegar localmente.

## Resumen rápido
- Backend: Node.js + Express, base de datos SQLite (`backend/clubgest.db`).
- Frontend: archivos estáticos en `frontend/` (páginas principales, formularios y CSS responsive).
- Documentación y colecciones: `WIKI-ClubGest.md`, `RELEASE-notes-v1.0.md`, Postman collection disponible en el repo.

## Instalación rápida (desarrollador)
1. Clonar el repositorio:
```
git clone https://github.com/chipsentinel/ClubGest.git
cd ClubGest
```
2. Backend:
```
cd backend
npm install
npm run dev   # o `npm start` para producción
```
3. Frontend:
- Servir `frontend/` con un servidor estático (p. ej. `npx http-server frontend`) o abrir `frontend/index.html` desde un servidor.

## Endpoints y pruebas
- Archivo OpenAPI: `backend/openapi.yaml` (o `openapi.yaml` en la raíz del backend).
- Colecciones Postman: `ClubGest-API.postman_collection.json` y `backend/ClubGest.postman_collection.json`.
- Pruebas rápidas sugeridas:
  - GET /jugadores
  - POST /jugadores
  - GET /entrenamientos
  - POST /asistencias

## Cómo contribuir
1. Crea una rama a partir de `main`: `git checkout -b feat/mi-cambio`
2. Haz commits pequeños y descriptivos.
3. Abre Pull Request hacia `main` con descripción y pruebas realizadas.
4. Agrega tests o instrucciones de verificación cuando corresponda.

## Lanzamiento / Versionado
- Release actual: v1.0 (ver `RELEASE-notes-v1.0.md`).
- Para nuevas versiones, crear branch `release/x.y` y PR hacia `main`.

## Contacto / Mantenedor
- Autor / Mantenedor: Cristian G.Gz
- Para dudas o PRs, abrir issue en el repositorio.
