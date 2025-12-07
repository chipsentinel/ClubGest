/**
 * @author: Cristian G.Gz
 * Archivo: app.js
 * Descripción: Este archivo configura un servidor web básico utilizando Express.js.
 *              El servidor escucha en un puerto específico y maneja solicitudes GET
 *              para servir datos JSON.
 */


const express = require('express');
const cors = require('cors');
const {config} = require('./src/configuration/configuration');
const path = require('path');
const routes = require('./src/route');  // Importar las rutas definidas en otro archivo (si existen)
const PORT = config?.port ?? 8080;                      // Definir el puerto en el que el servidor escuchará

const app = express();                  // Crear una instancia de la aplicación Express 

app.use(cors());                        // Habilitar CORS para todas las rutas
app.use(express.json());                // Habilitar el análisis de JSON en las solicitudes entrantes que comienzan con /api

app.use('/', routes);                // Usar las rutas definidas en el archivo routes.js para las solicitudes

// Servir archivos estáticos del frontend (si existe carpeta frontend)
// Esto es opcional y solo sirve archivos estáticos, no la API.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Usar las rutas definidas en src/route para las solicitudes de la API
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
1. Iniciar node.js en el terminal:
    node
2. Instalar dependencias:
    npm init -y             // Inicializar un nuevo proyecto Node.js
    npm install express     // Instalar Express.js
    npm install cors        // Instalar CORS
3. Iniciar el servidor:
    node app.js          // Ejecutar el archivo app.js
    
4. Verificar que el servidor esté corriendo:
    curl http://localhost:8080/api/data
5. Instalar sqlite3 para la base de datos:
    npm install sqlite3
6. Instalar yaml para guardar configuraciones externas al código y permitir distintos ajustes para desarrollo (local) y producción (prod).
    npm install js-yaml yargs

X. Instalar nodemon para desarrollo (opcional):
    npm install --save-dev nodemon
    npm run dev      // Ejecutar el servidor con nodemon para reinicios automáticos
    
*/