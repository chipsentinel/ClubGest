const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'clubgest.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error conectando a SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos:', dbPath);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jugadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL,
      posicion TEXT NOT NULL,
      tiene_seguro INTEGER NOT NULL DEFAULT 0 CHECK (tiene_seguro IN (0,1)),
      esta_lesionado INTEGER NOT NULL DEFAULT 0 CHECK (esta_lesionado IN (0,1)),
      activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0,1))
    );
  `);
});

module.exports = db;
