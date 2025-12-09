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

---

## 1. Introducción

### ¿Qué es ClubGest?

ClubGest es una aplicación web para **gestión de clubes de fútbol** (o cualquier deporte). Permite administrar:
- 👥 **Jugadores** - Datos personales, fichas técnicas
- 🏋️ **Entrenamientos** - Sesiones programadas, resultados
- ✋ **Asistencias** - Control de presencia en entrenamientos

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Backend** | Node.js + Express | v20.x |
| **Base de Datos** | SQLite | v5.1.7 |
| **Frontend** | HTML5 + CSS3 + JavaScript | ES6+ |
| **Testing** | Postman | v11.x |
| **Control Versiones** | Git + GitHub | - |

### Estado Actual

- ✅ Backend MVP completo (CRUD funcional)
- ✅ API REST con 15 endpoints
- ✅ Base de datos con 3 tablas
- ✅ Postman collection lista
- 🔄 Frontend 25% completo
- 📋 Roadmap definido (6 fases)

### Carpetas del Proyecto

```
ClubGest/
├── backend/
│   ├── src/
│   │   ├── controller/     # Controladores (maneja requests)
│   │   ├── service/        # Servicios (lógica de negocio)
│   │   ├── route/          # Rutas (endpoints)
│   │   ├── middleware/     # Validaciones
│   │   ├── configuration/  # Config (YAML)
│   │   └── database/       # BD (SQLite)
│   ├── app.js              # Servidor Express
│   ├── package.json        # Dependencias
│   └── openapi.yaml        # Especificación API
├── frontend/
│   ├── js/
│   │   └── api.js          # Cliente HTTP
│   ├── css/                # Estilos
│   ├── pages/              # Páginas HTML
│   └── img/                # Imágenes
└── README.md
```

---

## 2. Instalación y Setup

### Requisitos Previos

```bash
# Node.js 18+ y npm
node --version   # Debe ser v18+
npm --version    # Debe ser v9+

# Git (para control de versiones)
git --version
```

### Instalación Paso a Paso

#### 1. Clonar el Repositorio
```bash
git clone https://github.com/chipsentinel/ClubGest.git
cd ClubGest
```

#### 2. Instalar Dependencias Backend
```bash
cd backend
npm install
```

**Dependencias instaladas:**
- `express` - Framework web
- `sqlite3` - Base de datos
- `cors` - Permitir requests de frontend
- `express-validator` - Validar datos
- `js-yaml` - Leer archivos YAML
- `nodemon` - Auto-reload (desarrollo)

#### 3. Crear Base de Datos
```bash
# Ejecutar el script SQL
node recreate-db.js

# Opcional: Llenar con datos de prueba
node seed-data.js
```

#### 4. Arrancar el Servidor
```bash
# Desarrollo (con nodemon, auto-reload)
npm run dev

# Producción
npm start
```

**Salida esperada:**
```
Server running on port 8080
Database connected
```

#### 5. Verificar que Funciona
```bash
# En otra terminal
curl http://localhost:8080/api/jugadores

# Respuesta esperada:
# {"data":[...], "status":"success"}
```

### Troubleshooting

| Problema | Solución |
|----------|----------|
| `EADDRINUSE: port 8080 already in use` | Cambiar puerto en `app.js` o matar proceso: `lsof -ti:8080 \| xargs kill -9` |
| `Cannot find module 'express'` | Ejecutar `npm install` |
| `Database file not found` | Ejecutar `node recreate-db.js` |
| `CORS errors en frontend` | Verificar que `cors()` está en `app.js` |

---

## 3. Arquitectura del Proyecto

### Patrón MVC + Service

La aplicación sigue el patrón **Model-View-Controller** con capa de **Servicios** adicional:

```
Request HTTP
    ↓
Route (rutas.js) - ¿A dónde va?
    ↓
Middleware (validaciones.js) - ¿Es válido?
    ↓
Controller (jugador.controller.js) - ¿Qué hacer?
    ↓
Service (jugador.service.js) - ¿Cómo hacerlo?
    ↓
Database (db.js) - Guardar datos
    ↓
Response JSON
```

### Flujo de Datos: Ejemplo Crear Jugador

```javascript
// 1. ROUTE - Define el endpoint
app.post('/api/jugadores', createJugador);

// 2. MIDDLEWARE - Valida entrada
validaciones.body('nombre').notEmpty()

// 3. CONTROLLER - Procesa la request
async function createJugador(req, res) {
    const { nombre, email } = req.body;
    try {
        const result = await jugadorService.create(nombre, email);
        res.json({ data: result, status: 'success' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// 4. SERVICE - Lógica de negocio
async function create(nombre, email) {
    // Validaciones adicionales
    if (!nombre) throw new Error('Nombre requerido');
    // Guardar en BD
    return await database.insert('jugadores', { nombre, email });
}

// 5. DATABASE - Ejecuta SQL
async function insert(table, data) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO ${table} SET ?`, data, (err) => {
            if (err) reject(err);
            else resolve({ id, ...data });
        });
    });
}
```

### Estructura de Carpetas Explicada

#### `/src/route` - Definir Endpoints
```javascript
// jugador.route.js
const express = require('express');
const router = express.Router();
const jugadorController = require('../controller/jugador.controller');
const { validaciones } = require('../middleware/validaciones');

router.get('/', jugadorController.getAll);           // GET /api/jugadores
router.get('/:id', jugadorController.getById);       // GET /api/jugadores/:id
router.post('/', validaciones.create, 
            jugadorController.create);               // POST /api/jugadores
router.put('/:id', validaciones.update,
            jugadorController.update);               // PUT /api/jugadores/:id
router.delete('/:id', jugadorController.delete);     // DELETE /api/jugadores/:id

module.exports = router;
```

#### `/src/controller` - Procesar Requests
```javascript
// jugador.controller.js
const jugadorService = require('../service/jugador.service');

exports.getAll = async (req, res) => {
    try {
        const jugadores = await jugadorService.getAll();
        res.json({ data: jugadores, status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, email, posicion } = req.body;
        const result = await jugadorService.create(nombre, email, posicion);
        res.status(201).json({ data: result, status: 'success' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

#### `/src/service` - Lógica de Negocio
```javascript
// jugador.service.js
const database = require('../database/db');

exports.getAll = async () => {
    return new Promise((resolve, reject) => {
        database.db.all('SELECT * FROM jugadores', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

exports.create = async (nombre, email, posicion) => {
    // Validar
    if (!nombre || !email) throw new Error('Datos incompletos');
    
    // Guardar
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO jugadores (nombre, email, posicion) VALUES (?, ?, ?)';
        database.db.run(sql, [nombre, email, posicion], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nombre, email, posicion });
        });
    });
};
```

### Configuración (YAML)

```yaml
# config.local.yaml (desarrollo)
database:
  file: 'clubgest.db'
  
server:
  port: 8080
  host: 'localhost'
  
cors:
  origin: '*'
  
logging:
  level: 'debug'
```

```yaml
# config.prod.yaml (producción)
database:
  file: '/var/data/clubgest.db'
  
server:
  port: 3000
  host: '0.0.0.0'
  
cors:
  origin: 'https://clubgest.app'
  
logging:
  level: 'error'
```

---

## 4. Endpoints API REST

La API tiene **15 endpoints CRUD** para 3 recursos principales.

### Convenciones

- `GET /api/resource` - Listar todos
- `GET /api/resource/:id` - Obtener uno
- `POST /api/resource` - Crear
- `PUT /api/resource/:id` - Actualizar
- `DELETE /api/resource/:id` - Eliminar

### Base URL
```
http://localhost:8080/api
```

---

### 👥 JUGADORES (Players)

#### GET /jugadores
**Listar todos los jugadores**

```bash
curl http://localhost:8080/api/jugadores
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Juan García",
      "email": "juan@example.com",
      "posicion": "Delantero",
      "numero": 9,
      "fecha_nacimiento": "2000-05-15",
      "telefono": "123456789",
      "creado_en": "2025-12-09T10:30:00Z"
    }
  ],
  "status": "success"
}
```

#### GET /jugadores/:id
**Obtener un jugador por ID**

```bash
curl http://localhost:8080/api/jugadores/1
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "nombre": "Juan García",
    "email": "juan@example.com",
    "posicion": "Delantero",
    "numero": 9,
    "fecha_nacimiento": "2000-05-15",
    "telefono": "123456789",
    "creado_en": "2025-12-09T10:30:00Z"
  },
  "status": "success"
}
```

#### POST /jugadores
**Crear un nuevo jugador**

```bash
curl -X POST http://localhost:8080/api/jugadores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos López",
    "email": "carlos@example.com",
    "posicion": "Portero",
    "numero": 1,
    "fecha_nacimiento": "1995-08-20",
    "telefono": "987654321"
  }'
```

**Response:**
```json
{
  "data": {
    "id": 2,
    "nombre": "Carlos López",
    "email": "carlos@example.com",
    "posicion": "Portero",
    "numero": 1,
    "fecha_nacimiento": "1995-08-20",
    "telefono": "987654321"
  },
  "status": "success"
}
```

#### PUT /jugadores/:id
**Actualizar un jugador**

```bash
curl -X PUT http://localhost:8080/api/jugadores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan García Actualizado",
    "posicion": "Centrocampista"
  }'
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "nombre": "Juan García Actualizado",
    "posicion": "Centrocampista"
  },
  "status": "success"
}
```

#### DELETE /jugadores/:id
**Eliminar un jugador**

```bash
curl -X DELETE http://localhost:8080/api/jugadores/1
```

**Response:**
```json
{
  "data": { "id": 1 },
  "status": "success"
}
```

---

### 🏋️ ENTRENAMIENTOS (Trainings)

#### GET /entrenamientos
**Listar todos los entrenamientos**

```bash
curl http://localhost:8080/api/entrenamientos
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Sesión de Técnica",
      "descripcion": "Trabajo de pase y control",
      "fecha": "2025-12-10",
      "hora_inicio": "18:00",
      "hora_fin": "19:30",
      "lugar": "Campo Municipal",
      "cantidad_jugadores": 15,
      "creado_en": "2025-12-09T10:30:00Z"
    }
  ],
  "status": "success"
}
```

#### POST /entrenamientos
**Crear un entrenamiento**

```bash
curl -X POST http://localhost:8080/api/entrenamientos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Partido Amistoso",
    "descripcion": "Preparación para la próxima competición",
    "fecha": "2025-12-12",
    "hora_inicio": "19:00",
    "hora_fin": "20:30",
    "lugar": "Estadio Central",
    "cantidad_jugadores": 20
  }'
```

#### PUT /entrenamientos/:id
**Actualizar un entrenamiento**

```bash
curl -X PUT http://localhost:8080/api/entrenamientos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Sesión de Táctica"
  }'
```

#### DELETE /entrenamientos/:id
**Eliminar un entrenamiento**

```bash
curl -X DELETE http://localhost:8080/api/entrenamientos/1
```

---

### ✋ ASISTENCIAS (Attendance)

#### GET /asistencias
**Listar todas las asistencias**

```bash
curl http://localhost:8080/api/asistencias
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "id_jugador": 1,
      "id_entrenamiento": 1,
      "presente": 1,
      "fecha_registro": "2025-12-09T10:30:00Z"
    }
  ],
  "status": "success"
}
```

#### POST /asistencias
**Registrar asistencia**

```bash
curl -X POST http://localhost:8080/api/asistencias \
  -H "Content-Type: application/json" \
  -d '{
    "id_jugador": 1,
    "id_entrenamiento": 1,
    "presente": 1
  }'
```

#### PUT /asistencias/:id
**Actualizar asistencia**

```bash
curl -X PUT http://localhost:8080/api/asistencias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "presente": 0
  }'
```

---

### Códigos de Estado HTTP

| Código | Significado | Ejemplo |
|--------|-----------|---------|
| 200 | OK - Operación exitosa | GET, PUT funcionó |
| 201 | Created - Recurso creado | POST exitoso |
| 400 | Bad Request - Datos inválidos | Faltan campos |
| 404 | Not Found - No existe | ID no encontrado |
| 500 | Server Error - Error del servidor | Error en BD |

---

## 5. Base de Datos

### Esquema E-R (Entidad-Relación)

```
┌──────────────┐         ┌─────────────────┐         ┌──────────────┐
│   JUGADORES  │◄───┐    │  ASISTENCIAS    │    ┌───►│ENTRENAMIENTOS│
├──────────────┤    │    ├─────────────────┤    │    ├──────────────┤
│ id (PK)      │    └────│ id_jugador (FK) │    │    │ id (PK)      │
│ nombre       │         │ id_entrenamiento├────┘    │ nombre       │
│ email        │         │ presente        │         │ fecha        │
│ posicion     │         │ fecha_registro  │         │ hora_inicio  │
│ numero       │         └─────────────────┘         │ hora_fin     │
│ teléfono     │                                     │ lugar        │
└──────────────┘                                     └──────────────┘
```

### Tablas

#### JUGADORES
```sql
CREATE TABLE jugadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  posicion TEXT,
  numero INTEGER,
  fecha_nacimiento DATE,
  telefono TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Índices:**
- `nombre` - Para búsquedas rápidas por nombre
- `email` - Único, para evitar duplicados

#### ENTRENAMIENTOS
```sql
CREATE TABLE entrenamientos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  hora_inicio TIME,
  hora_fin TIME,
  lugar TEXT,
  cantidad_jugadores INTEGER,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### ASISTENCIAS
```sql
CREATE TABLE asistencias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_jugador INTEGER NOT NULL,
  id_entrenamiento INTEGER NOT NULL,
  presente BOOLEAN DEFAULT 1,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_jugador) REFERENCES jugadores(id),
  FOREIGN KEY (id_entrenamiento) REFERENCES entrenamientos(id)
);
```

### Consultas Comunes

**Obtener jugadores de un entrenamiento:**
```sql
SELECT j.* FROM jugadores j
JOIN asistencias a ON j.id = a.id_jugador
WHERE a.id_entrenamiento = 1 AND a.presente = 1;
```

**Contar asistencias de un jugador:**
```sql
SELECT j.nombre, COUNT(a.id) as asistencias
FROM jugadores j
LEFT JOIN asistencias a ON j.id = a.id_jugador
WHERE a.presente = 1
GROUP BY j.id;
```

**Entrenamientos de hoy:**
```sql
SELECT * FROM entrenamientos
WHERE DATE(fecha) = DATE('now');
```

---

## 6. Guía de Postman

### Importar la Colección

1. **Descargar colección:**
   - Archivo: `/backend/ClubGest-API-CRUD.postman_collection.json`

2. **En Postman:**
   - Click en "Import"
   - Seleccionar el archivo JSON
   - Click "Import"

3. **Verificar:**
   - Deberías ver 15 requests en el panel izquierdo
   - 5 para Jugadores
   - 5 para Entrenamientos
   - 5 para Asistencias

### Variables Postman

Puedes configurar variables para reutilizar en requests:

```json
{
  "base_url": "http://localhost:8080/api",
  "jugador_id": "1",
  "entrenamiento_id": "1"
}
```

**Uso en requests:**
```
{{base_url}}/jugadores/{{jugador_id}}
```

### Probar un Endpoint

1. **GET Jugadores:**
   - Seleccionar "GET /jugadores"
   - Click "Send"
   - Ver respuesta en el panel derecho

2. **POST Crear Jugador:**
   - Seleccionar "POST /jugadores"
   - Tab "Body"
   - Seleccionar "raw" y "JSON"
   - Pegar:
     ```json
     {
       "nombre": "Test Player",
       "email": "test@example.com",
       "posicion": "Delantero",
       "numero": 9
     }
     ```
   - Click "Send"

### Tests Automáticos

Agregar en tab "Tests":

```javascript
// Verificar que el status es 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Verificar que existe el campo "data"
pm.test("Response has data field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});

// Guardar ID para siguiente request
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.globals.set("last_id", jsonData.data.id);
}
```

---

## 7. Integración Frontend-Backend

### Fetch API en JavaScript

#### GET - Obtener Jugadores
```javascript
// api.js
const BASE_URL = 'http://localhost:8080/api';

async function getJugadores() {
    try {
        const response = await fetch(`${BASE_URL}/jugadores`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jugadores:', error);
        return [];
    }
}

// Usar en HTML
getJugadores().then(jugadores => {
    const tabla = document.getElementById('tabla-jugadores');
    jugadores.forEach(jugador => {
        tabla.innerHTML += `
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.posicion}</td>
                <td>${jugador.numero}</td>
            </tr>
        `;
    });
});
```

#### POST - Crear Jugador
```javascript
async function createJugador(nombre, email, posicion, numero) {
    try {
        const response = await fetch(`${BASE_URL}/jugadores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                posicion,
                numero
            })
        });
        
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating jugador:', error);
        return null;
    }
}

// Usar en formulario
document.getElementById('form-jugador').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const posicion = document.getElementById('posicion').value;
    const numero = document.getElementById('numero').value;
    
    const result = await createJugador(nombre, email, posicion, numero);
    if (result) {
        alert('Jugador creado exitosamente');
        location.reload();
    } else {
        alert('Error al crear jugador');
    }
});
```

#### PUT - Actualizar Jugador
```javascript
async function updateJugador(id, nombre, posicion) {
    try {
        const response = await fetch(`${BASE_URL}/jugadores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, posicion })
        });
        
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating jugador:', error);
        return null;
    }
}
```

#### DELETE - Eliminar Jugador
```javascript
async function deleteJugador(id) {
    try {
        const response = await fetch(`${BASE_URL}/jugadores/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return true;
    } catch (error) {
        console.error('Error deleting jugador:', error);
        return false;
    }
}

// Usar en botón
document.getElementById('btn-delete').addEventListener('click', async () => {
    const id = document.getElementById('jugador-id').value;
    const confirm = window.confirm('¿Estás seguro de eliminar?');
    if (confirm) {
        const success = await deleteJugador(id);
        if (success) {
            alert('Jugador eliminado');
            location.reload();
        }
    }
});
```

### CORS (Cross-Origin Resource Sharing)

Para que el frontend (ej: `http://localhost:3000`) pueda acceder al backend (`http://localhost:8080`):

```javascript
// backend/app.js
const cors = require('cors');

// Permitir todos los orígenes (desarrollo)
app.use(cors());

// O específicamente (producción)
app.use(cors({
    origin: ['http://localhost:3000', 'https://clubgest.app']
}));
```

### Manejo de Errores Completo

```javascript
async function operacionAPI(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        // Verificar status HTTP
        if (response.status === 404) throw new Error('Recurso no encontrado');
        if (response.status === 500) throw new Error('Error del servidor');
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        // Parsear respuesta
        const data = await response.json();
        
        // Verificar estructura de respuesta
        if (!data.status) throw new Error('Respuesta inválida del servidor');
        
        return data.data;
        
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Error de red:', error);
        } else if (error instanceof SyntaxError) {
            console.error('Error al parsear JSON:', error);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}
```

---

## 8. Git y GitHub Workflow

### Configuración Inicial

```bash
# Configurar nombre y email global
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar
git config --list
```

### Flujo de Trabajo

#### 1. Crear Feature Branch
```bash
# Obtener última versión del main
git checkout main
git pull origin main

# Crear rama para tu feature
git checkout -b feature/agregar-login
```

**Convención de nombres:**
- `feature/descripcion` - Nueva feature
- `bugfix/descripcion` - Corrección de bug
- `hotfix/descripcion` - Fix urgente de producción
- `docs/descripcion` - Documentación

#### 2. Hacer Cambios
```bash
# Ver archivos modificados
git status

# Agregar archivos
git add src/auth/login.js

# O todos los cambios
git add .
```

#### 3. Commit con Mensaje Claro
```bash
# Commit
git commit -m "feat: agregar login con validación de email"

# Ver el commit
git log --oneline -3
```

**Formato de mensaje:**
- `feat:` - Nueva feature
- `fix:` - Corrección de bug
- `docs:` - Documentación
- `style:` - Cambios de formato
- `refactor:` - Refactorizar código
- `test:` - Tests
- `chore:` - Cambios de dependencias

#### 4. Push a GitHub
```bash
# Enviar rama
git push origin feature/agregar-login
```

#### 5. Pull Request en GitHub

1. Ir a `https://github.com/chipsentinel/ClubGest`
2. Ver botón "Compare & pull request"
3. Llenar:
   - **Title:** `feat: agregar login con validación`
   - **Description:** Explicar qué hace y por qué
   ```markdown
   ## Cambios
   - Agregar página de login
   - Validar email y contraseña
   - Guardar sesión en localStorage
   
   ## Testing
   - Probado en Chrome y Firefox
   - Login/logout funciona correctamente
   ```
4. Click "Create Pull Request"

#### 6. Code Review
- Esperar que otros revisen
- Responder comentarios
- Hacer cambios si es necesario
- Click "Re-request review"

#### 7. Merge a Main
```bash
# Una vez aprobado, merge en GitHub o local
git checkout main
git pull origin main
git merge feature/agregar-login
git push origin main
```

#### 8. Limpiar
```bash
# Eliminar rama local
git branch -d feature/agregar-login

# Eliminar rama remota
git push origin --delete feature/agregar-login
```

### Resolver Conflictos

Si hay conflictos al hacer merge:

```bash
# Ver conflictos
git status

# Abrir archivo y resolver manualmente
# Buscar: <<<<<<< HEAD ... ======= ... >>>>>>>

# Después de resolver:
git add .
git commit -m "fix: resolver conflictos de merge"
git push origin main
```

---

## 9. Roadmap y Planificación

### Fases del Proyecto

#### 📍 Fase 1: MVP Backend ✅ COMPLETO
**Duración:** 3 semanas | **Estado:** Lanzado

- ✅ API REST con 15 endpoints
- ✅ Base de datos SQLite
- ✅ Validaciones básicas
- ✅ Postman collection
- ✅ Documentación

#### 🔄 Fase 2: Frontend Básico (25% completado)
**Duración:** 3-4 semanas | **Próximo**

- [ ] Dashboard principal
- [ ] Página de jugadores (listar, crear, editar, eliminar)
- [ ] Página de entrenamientos
- [ ] Página de asistencias
- [ ] Navegación y layout responsivo
- [ ] Estilos CSS mejorados

**Tareas:**
1. Crear componentes reutilizables (tablas, formularios, modales)
2. Implementar CRUD UI para jugadores
3. Agregar filtros y búsqueda
4. Tests en el navegador

#### 🔐 Fase 3: Autenticación (Próximo)
**Duración:** 2 semanas

- [ ] Crear tabla de usuarios
- [ ] Implementar JWT (JSON Web Tokens)
- [ ] Login / Register endpoints
- [ ] Proteger rutas con middleware
- [ ] Página de login en frontend

**Tecnologías:**
- `jsonwebtoken`
- `bcryptjs` (hashear contraseñas)
- `localStorage` (guardar token en frontend)

#### 👥 Fase 4: Roles y Permisos
**Duración:** 2 semanas

- [ ] Sistema RBAC (Role-Based Access Control)
- [ ] Roles: Admin, Entrenador, Jugador
- [ ] Permisos por rol
- [ ] Auditoría de cambios

#### 📱 Fase 5: Aplicación Móvil
**Duración:** 4-6 semanas

- [ ] App React Native
- [ ] Notificaciones push
- [ ] Sincronización offline

#### 📊 Fase 6: Analytics y Reportes
**Duración:** 3 semanas

- [ ] Dashboard de estadísticas
- [ ] Reportes PDF
- [ ] Gráficos de desempeño
- [ ] Exportar datos

### Timeline

```
Dic 2025:   [████████] Fase 1 ✅
Ene 2026:   [████] Fase 2 (en progreso)
Feb 2026:   [    ] Fase 3
Mar 2026:   [    ] Fase 4
Abr-May:    [    ] Fase 5
Jun 2026:   [    ] Fase 6
```

---

## 10. Contribuir al Proyecto

### Código de Conducta

- ✅ Sé respetuoso y colaborativo
- ✅ Comparte conocimiento
- ✅ Ayuda a otros cuando puedas
- ❌ No hagas spam o promoción
- ❌ No insultes o discrimines

### Estándares de Código

#### JavaScript/Node.js

```javascript
// ✅ BIEN
async function createJugador(nombre, email) {
    if (!nombre || !email) {
        throw new Error('Nombre y email son requeridos');
    }
    
    const jugador = await database.create('jugadores', { nombre, email });
    return jugador;
}

// ❌ MAL
function cj(n,e){
    return db.c('j',{n,e});
}
```

**Convenciones:**
- Usar `camelCase` para variables
- Usar `PascalCase` para clases
- Comentar funciones complejas
- Máximo 80 caracteres por línea
- 2 espacios de indentación

#### HTML/CSS

```html
<!-- ✅ BIEN -->
<div class="player-card">
    <h2 class="player-name">{{ nombre }}</h2>
    <p class="player-position">{{ posicion }}</p>
</div>

<!-- ❌ MAL -->
<div style="color: red; font-size: 20px;">
    <h2>{{ nombre }}</h2>
</div>
```

### Checklist para Pull Request

- [ ] Código funciona correctamente
- [ ] Sin console.log() de debug
- [ ] Comentarios útiles (no obvios)
- [ ] Sigue los estándares de código
- [ ] Testing manual realizado
- [ ] Mensajes de commit claros
- [ ] Sin conflictos con main
- [ ] Documentación actualizada

### Proceso para Contribuir

1. **Fork el repositorio**
   ```bash
   Click "Fork" en GitHub
   ```

2. **Clonar tu fork**
   ```bash
   git clone https://github.com/TU_USERNAME/ClubGest.git
   cd ClubGest
   ```

3. **Crear rama**
   ```bash
   git checkout -b feature/mi-feature
   ```

4. **Hacer cambios**
   ```bash
   # Editar archivos
   git add .
   git commit -m "feat: descripción"
   ```

5. **Push**
   ```bash
   git push origin feature/mi-feature
   ```

6. **Pull Request**
   - Ir a tu fork en GitHub
   - Click "New Pull Request"
   - Comparar `main` del original con tu rama

7. **Esperar review**
   - Los mantenedores revisarán
   - Hacen comentarios si es necesario
   - Una vez aprobado, se hace merge

### Reportar Bugs

**Usa GitHub Issues:**

1. Click "Issues"
2. Click "New Issue"
3. Título claro: `[BUG] Login no funciona`
4. Descripción:
   ```markdown
   ## Descripción
   El login falla cuando uso caracteres especiales en la contraseña
   
   ## Pasos para Reproducir
   1. Ir a /login
   2. Ingresar usuario: test@example.com
   3. Contraseña: pass@123!
   4. Click "Entrar"
   
   ## Resultado Esperado
   Debe permitir login
   
   ## Resultado Actual
   Error 400: Invalid password
   
   ## Ambiente
   - OS: macOS 14
   - Navegador: Chrome 120
   - Versión: v1.0.0
   ```

### Solicitar Features

**Usa GitHub Discussions o Issues:**

```markdown
## Feature Request: Notificaciones por Email

### Descripción
Los usuarios deberían recibir email cuando se les añade a un entrenamiento

### Caso de Uso
1. Admin crea nuevo entrenamiento
2. Sistema envía email a todos los jugadores
3. Jugadores reciben notificación

### Beneficio
Mayor comunicación y menos olvidos
```

---

## 📞 Soporte y Preguntas

### ¿Dónde preguntar?

1. **GitHub Discussions** - Preguntas generales
2. **GitHub Issues** - Bugs específicos
3. **Wiki** - Documentación (este archivo)

### Links Útiles

- 📖 [Documentación Express](https://expressjs.com)
- 💾 [SQLite Docs](https://www.sqlite.org/docs.html)
- 🌐 [Fetch API MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- 🚀 [Git Guide](https://git-scm.com/doc)
- 📮 [Postman Learning](https://learning.postman.com)

---

## 📝 Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2025-12-09 | Wiki inicial creada |

---

**Última actualización:** 9 de diciembre de 2025

*Creado para la comunidad de ClubGest* ⚽
