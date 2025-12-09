# Release v1.0

ClubGest v1.0 — Notas de la versión

Fecha: 2025-12-09

Resumen
- Entrega inicial (v1.0) de ClubGest: MVP funcional con backend, frontend y documentación básica.
- Backend: Node.js + Express + SQLite con endpoints CRUD para jugadores, entrenamientos y asistencias.
- Frontend: HTML/CSS/JS con páginas principales (index, registro de jugador, entrenamientos, fichas, etc.) y adaptaciones responsive.
- Documentación: `README.md` y `WIKI-ClubGest.md` con instrucciones de instalación y lista de endpoints.

Cambios principales
- Bumped backend a la versión `1.0.0` (`backend/package.json`).
- Mejoras responsive en `frontend/css/auth.css` para comportamiento móvil/tablet en la página principal.
- Se añadieron/actualizaron archivos de documentación y notas de release (`RELEASE-notes-v1.0.md`).
- Estructura del proyecto verificada y archivo de base de datos SQLite incluido (`backend/clubgest.db`).

Instalación rápida y ejecución local
1. Backend
```
cd backend
npm install
npm run dev    # para desarrollo (o `npm start` para producción)
```

2. Frontend
- Abrir `frontend/index.html` con un servidor estático (por ejemplo `npx http-server frontend`) o servirlo desde el backend.

Notas de despliegue y configuración
- Revisar `src/configuration/config.local.yaml` o `config.prod.yaml` para ajustar variables de entorno/configuración.
- La base de datos SQLite incluida es para pruebas locales; gestionar respaldos antes de reemplazarla en producción.

Archivos y ubicaciones relevantes
- `backend/package.json` — versión 1.0.0
- `RELEASE-notes-v1.0.md` — notas completas de la release
- `WIKI-ClubGest.md` — documentación extendida (si existe)
- `frontend/css/auth.css` — cambios importantes de responsive
- `backend/clubgest.db` — archivo de base de datos SQLite incluido (con datos de ejemplo)

Pruebas rápidas sugeridas (smoke tests)
- Iniciar backend y confirmar que los endpoints principales responden:
  - GET /jugadores
  - POST /jugadores
  - GET /entrenamientos
  - POST /asistencias
- Abrir `frontend/index.html` y verificar que las páginas principales cargan y los formularios envían peticiones (usar la consola del navegador).
- Revisar las rutas del API descritas en `WIKI-ClubGest.md` y validar 1-2 casos CRUD en Postman.

Compatibilidad / Breaking changes
- No se esperan breaking changes para esta versión inicial. Migraciones si se sustituyera la base de datos deben manejarse con cuidado.

Contacto
- Autor / mantenedor: Cristian G.Gz

---

Checklist (para el revisor)
- [ ] Verificar que `backend` inicia sin errores.
- [ ] Ejecutar las pruebas rápidas (endpoints CRUD).
- [ ] Revisar cambios CSS en móviles y tabletas.
- [ ] Confirmar que la documentación (README / WIKI) está actualizada.
- [ ] Si todo OK, aprobar y mergear `release/v1.0` -> `main`.
