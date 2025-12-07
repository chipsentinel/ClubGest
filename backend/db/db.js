const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { config } = require('../src/configuration/configuration');

const dbPath = path.resolve(__dirname, '..', config.db.filename); // Ruta a la base de datos SQLite

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error conectando a SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos:', dbPath);
  }
});


// Helper para ejecutar consultas con Promesas async/await (lo que hace es que no tengas que estar creando nuevas Promesas cada vez)
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      }else { 
        resolve(this); // Devuelve el contexto de la función para acceder a lastID, changes, etc.
      }
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else { 
        resolve(row);
      }
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


module.exports = {
  db,
  run,
  get,
  all
};
