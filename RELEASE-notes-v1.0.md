ClubGest v1.0 — Release notes

Fecha: 2025-12-09

Resumen
- Release inicial v1.0: entrega mínima viable del proyecto ClubGest.
- Backend: Node.js + Express + SQLite. CRUD completos para jugadores, entrenamientos y asistencias.
- Frontend: HTML/CSS/JS con integración a la API, páginas principales y formularios (index, registro, entrenamientos, fichas, etc.).
- Documentación: `README.md` y `WIKI-ClubGest.md` con instrucciones de instalación, uso y endpoints.

Cambios principales
- Actualizada la versión del backend a `1.0.0`.
- Mejoras responsive en `frontend/css/auth.css` (index) para móvil/tablet.
- Estructura de proyecto verificada y archivos de configuración incluidos.

Instalación rápida
1. Backend

```bash
cd backend
npm install
npm run dev # o npm start para producción
```

2. Frontend

Abrir `frontend/index.html` en un servidor estático (por ejemplo, `npx http-server frontend` o servir desde el backend).

Notas de despliegue
- Asegúrate de configurar `src/configuration/config.local.yaml` o `config.prod.yaml` según corresponda.
- La base de datos SQLite se incluye como `clubgest.db` en `backend/`.

Contacto
- Autor: Cristian G.Gz

Archivos relacionados
- `backend/package.json` (versión 1.0.0)
- `WIKI-ClubGest.md`
- `README.md`
