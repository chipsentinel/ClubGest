const { run, get, all } = require('../../db/db');


// Devuelve todos los jugadores async es para usar await
async function getAll() {
  const sql = `
    SELECT id, nombre, apellidos, posicion, dorsal, fecha_nacimiento, peso
    FROM jugadores
  `;
  return await all(sql);
}

// Devuelve un jugador por su ID
async function getById(id) {
  const sql = `
    SELECT id, nombre, apellidos, posicion, dorsal, fecha_nacimiento, peso
    FROM jugadores
    WHERE id = ?
  `;
  return await get(sql, [id]);
}

// Crea un nuevo jugador
async function create(jugador) {
  const sql = `
    INSERT INTO jugadores (nombre, apellidos, posicion, dorsal, fecha_nacimiento, peso)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await run(sql, [
    jugador.nombre,
    jugador.apellidos,
    jugador.posicion,
    jugador.dorsal,
    jugador.fecha_nacimiento,
    jugador.peso
  ]);

  return {
    id: result.lastID,
    ...jugador
  };
}

// Actualiza todos los campos de un jugador
async function update(id, jugador) {
  const sql = `
    UPDATE jugadores
    SET nombre = ?, apellidos = ?, posicion = ?, dorsal = ?, fecha_nacimiento = ?, peso = ?
    WHERE id = ?
  `;

  const result = await run(sql, [
    jugador.nombre,
    jugador.apellidos,
    jugador.posicion,
    jugador.dorsal,
    jugador.fecha_nacimiento,
    jugador.peso,
    id
  ]);

  return result.changes;
}

// Elimina un jugador
async function remove(id) {
  const sql = `
    DELETE FROM jugadores
    WHERE id = ?
  `;
  const result = await run(sql, [id]);
  return result.changes;
}

module.exports = {   
  getAll,
  getById,
  create,
  update,
  remove 
};