/**
 * @author: Cristian G.Gz
 * Archivo: app.js
 * Descripción: Servidor Express.js para la API REST de ClubGest.
 *              - Sirve la API REST con endpoints CRUD de jugadores
 *              - Sirve archivos estáticos del frontend
 *              - Usa express-validator para validar entrada de datos en los endpoints
 *              - Integrado con SQLite para persistencia de datos
 *              - Configuración externa via archivos YAML (local/producción)
 */


const express = require('express');
const cors = require('cors');
const {config} = require('./src/configuration/configuration');
const path = require('path');
const routes = require('./src/route');               // Importar las rutas definidas en otro archivo (si existen)
const PORT = config?.service?.port ?? 8080;          // Definir el puerto en el que el servidor escuchará - ?? cambia la escucha para yaml

const app = express();                  // Crear una instancia de la aplicación Express 

app.use(cors());                        // Habilitar CORS para todas las rutas
app.use(express.json());                // Habilitar el análisis de JSON en las solicitudes entrantes que comienzan con /api
app.use(express.urlencoded({ extended: true })); // Aceptar formularios HTML (application/x-www-form-urlencoded)


// Servir archivos estáticos del frontend (si existe carpeta frontend)
// Esto es opcional y solo sirve archivos estáticos, no la API.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Usar las rutas definidas en src/route para las solicitudes de la API
// Las rutas incluyen validación con express-validator en el middleware
// Ejemplo: /api/jugadores, /api/entrenamientos, etc.
app.use('/api', routes);

/*
req: Objeto de solicitud que contiene información sobre la solicitud HTTP entrante.
res: Objeto de respuesta que se utiliza para enviar una respuesta al cliente.
*/

// Ruta sencilla de estado
app.get('/status', (req, res) => {
  res.json({ message: 'API ClubGest funcionando' });
});

// Configurar middleware (intermediarios)  que procesan las solicitudes entrantes
app.listen(PORT, () => {
    console.log(`Se ha iniciado la aplicación en el puerto ${PORT}`); // Mensaje en consola cuando el servidor está activo
});



/*
Comandos node.js para ejecutar el servidor:
cd .\backend\

1. Instalar dependencias:
    npm install
    // Esto instala:
    // - express: framework web
    // - cors: habilitar CORS
    // - sqlite3: base de datos
    // - js-yaml: leer configuración YAML
    // - yargs: parsear argumentos de línea de comandos
    // - express-validator: validación de datos en endpoints
    // - nodemon (dev): reload automático en desarrollo

2. Iniciar el servidor en desarrollo (con nodemon):
    npx nodemon app.js -- --config src/configuration/config.local.yaml

3. Iniciar el servidor en producción:
    node app.js --config src/configuration/config.prod.yaml

4. Verificar que el servidor está corriendo:
    http://localhost:8080/status

5. Endpoints disponibles:
    GET    /api/jugadores          - Listar todos los jugadores
    GET    /api/jugadores/:id      - Obtener un jugador por ID
    POST   /api/jugadores          - Crear nuevo jugador (validado con express-validator)
    PUT    /api/jugadores/:id      - Actualizar jugador completo (validado)
    PATCH  /api/jugadores/:id/asistencia - Actualizar solo asistencia (validado)
    DELETE /api/jugadores/:id      - Eliminar jugador

NOTA: Todos los endpoints POST, PUT y PATCH usan express-validator para validar:
    - Tipos de datos (TEXT, INTEGER, REAL, DATE, BOOLEAN)
    - Longitud de cadenas
    - Rangos numéricos
    - Fechas válidas (no futuras)
    - Campos booleanos
*/