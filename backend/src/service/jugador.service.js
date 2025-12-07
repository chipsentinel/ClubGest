const { run, get, all } = require('../../db/db');


// Devuelve todos los jugadores async es para usar await
async function getAll() {
  const sql = `
    SELECT id, nombre, apellidos, posicion, dorsal, asistencia_entrenamientos
    FROM jugadores
  `;
  return await all(sql);
}

// Devuelve un jugador por su ID
async function getById(id) {
  const sql = `
    SELECT id, nombre, apellidos, posicion, dorsal, asistencia_entrenamientos
    FROM jugadores
    WHERE id = ?
  `;
  return await get(sql, [id]);
}

// Crea un nuevo jugador
async function create(jugador) {
  const sql = `
    INSERT INTO jugadores (nombre, apellidos, posicion, dorsal, asistencia_entrenamientos)
    VALUES (?, ?, ?, ?, ?)
  `;

  const asistencia = jugador.asistencia_entrenamientos ? 1 : 0;

  const result = await run(sql, [
    jugador.nombre,
    jugador.apellidos,
    jugador.posicion,
    jugador.dorsal,
    asistencia
  ]);

  return {
    id: result.lastID,
    ...jugador,
    asistencia_entrenamientos: asistencia
  };
}

// Actualiza todos los campos de un jugador
async function update(id, jugador) {
  const sql = `
    UPDATE jugadores
    SET nombre = ?, apellidos = ?, posicion = ?, dorsal = ?, asistencia_entrenamientos = ?
    WHERE id = ?
  `;

  const asistencia = jugador.asistencia_entrenamientos ? 1 : 0;

  const result = await run(sql, [
    jugador.nombre,
    jugador.apellidos,
    jugador.posicion,
    jugador.dorsal,
    asistencia,
    id
  ]);

  return result.changes; // filas afectadas
}

// Actualiza solo la asistencia
async function updateAsistencia(id, asistencia_entrenamientos) {
  const sql = `
    UPDATE jugadores
    SET asistencia_entrenamientos = ?
    WHERE id = ?
  `;

  const asistencia = asistencia_entrenamientos ? 1 : 0;
  const result = await run(sql, [asistencia, id]);
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
  updateAsistencia,
  remove 
};