const db = require('../configuration/database');

function getAll() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM jugadores', [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM jugadores WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function create({ nombre, edad, posicion, tiene_seguro = 0, esta_lesionado = 0, activo = 1 }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO jugadores (nombre, edad, posicion, tiene_seguro, esta_lesionado, activo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, edad, posicion, tiene_seguro, esta_lesionado, activo],
      function (err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          nombre,
          edad,
          posicion,
          tiene_seguro,
          esta_lesionado,
          activo
        });
      }
    );
  });
}

module.exports = { getAll, getById, create };
