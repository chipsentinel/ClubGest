const { run, get, all } = require('../../db/db');

// Devuelve todos los entrenamientos
async function getAll() {
  const sql = `
    SELECT id, nombre, descripcion, fecha_hora, duracion_minutos, lugar, tipo, estado
    FROM entrenamientos
  `;
  return await all(sql);
}

// Devuelve un entrenamiento por su ID
async function getById(id) {
  const sql = `
    SELECT id, nombre, descripcion, fecha_hora, duracion_minutos, lugar, tipo, estado
    FROM entrenamientos
    WHERE id = ?
  `;
  return await get(sql, [id]);
}

// Crea un nuevo entrenamiento
async function create(entrenamiento) {
  const sql = `
    INSERT INTO entrenamientos (nombre, descripcion, fecha_hora, duracion_minutos, lugar, tipo, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const estado = entrenamiento.estado ? 1 : 0;

  const result = await run(sql, [
    entrenamiento.nombre,
    entrenamiento.descripcion,
    entrenamiento.fecha_hora,
    entrenamiento.duracion_minutos,
    entrenamiento.lugar,
    entrenamiento.tipo,
    estado
  ]);

  return {
    id: result.lastID,
    ...entrenamiento,
    estado: !!estado
  };
}

// Actualiza todos los campos de un entrenamiento
async function update(id, entrenamiento) {
  const sql = `
    UPDATE entrenamientos
    SET nombre = ?, descripcion = ?, fecha_hora = ?, duracion_minutos = ?, lugar = ?, tipo = ?, estado = ?
    WHERE id = ?
  `;

  const estado = entrenamiento.estado ? 1 : 0;

  const result = await run(sql, [
    entrenamiento.nombre,
    entrenamiento.descripcion,
    entrenamiento.fecha_hora,
    entrenamiento.duracion_minutos,
    entrenamiento.lugar,
    entrenamiento.tipo,
    estado,
    id
  ]);

  return result.changes; // filas afectadas
}

// Actualiza solo el estado
async function updateEstado(id, estado) {
  const sql = `
    UPDATE entrenamientos
    SET estado = ?
    WHERE id = ?
  `;

  const estadoValue = estado ? 1 : 0;
  const result = await run(sql, [estadoValue, id]);
  return result.changes;
}

// Elimina un entrenamiento
async function remove(id) {
  const sql = `
    DELETE FROM entrenamientos
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
  updateEstado,
  remove 
};
