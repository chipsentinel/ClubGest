/**
 * @author: Cristian G.Gz
 * Archivo: server.js
 * Descripción: Este archivo configura un servidor web básico utilizando Express.js.
 *              El servidor escucha en un puerto específico y maneja solicitudes GET
 *              para servir datos JSON.
 */


const express = require('express');     // Importar el módulo Express
const cors = require('cors');           // Importar el módulo CORS para manejar solicitudes de diferentes orígenes
const path = require('path');           // Importar el módulo Path para manejar rutas de archivos

const app = express();                  // Crear una instancia de la aplicación Express 
app.use(cors());                        // Habilitar CORS para todas las rutas
const PORT = 8080;                      // Definir el puerto en el que el servidor escuchará


// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

/*
req: Objeto de solicitud que contiene información sobre la solicitud HTTP entrante.
res: Objeto de respuesta que se utiliza para enviar una respuesta al cliente.
*/

// Definir una ruta para la raíz del servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));            
});

// Definir una ruta para manejar solicitudes GET en /api/data
app.get('/jugador', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'jugador.html'));
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
    node server.js          // Ejecutar el archivo server.js
4. Verificar que el servidor esté corriendo:
    curl http://localhost:8080/api/data

5. Instalar nodemon para desarrollo (opcional):
    npm install --save-dev nodemon
    npm run dev      // Ejecutar el servidor con nodemon para reinicios automáticos
    
*/