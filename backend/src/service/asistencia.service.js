const { run, get, all } = require('../../db/db');

// Obtiene todas las asistencias de un entrenamiento
async function getAsistenciasPorEntrenamiento(entrenamientoId) {
  const sql = `
    SELECT 
      a.id,
      a.jugador_id,
      a.entrenamiento_id,
      a.asistencia,
      j.nombre,
      j.apellidos,
      j.posicion,
      j.dorsal
    FROM asistencias a
    JOIN jugadores j ON a.jugador_id = j.id
    WHERE a.entrenamiento_id = ?
    ORDER BY j.nombre, j.apellidos
  `;
  return await all(sql, [entrenamientoId]);
}

// Obtiene todas las asistencias de un jugador
async function getAsistenciasPorJugador(jugadorId) {
  const sql = `
    SELECT 
      a.id,
      a.jugador_id,
      a.entrenamiento_id,
      a.asistencia,
      e.nombre,
      e.fecha_hora,
      e.lugar,
      e.tipo
    FROM asistencias a
    JOIN entrenamientos e ON a.entrenamiento_id = e.id
    WHERE a.jugador_id = ?
    ORDER BY e.fecha_hora DESC
  `;
  return await all(sql, [jugadorId]);
}

// Obtiene una asistencia específica
async function getAsistencia(jugadorId, entrenamientoId) {
  const sql = `
    SELECT id, jugador_id, entrenamiento_id, asistencia
    FROM asistencias
    WHERE jugador_id = ? AND entrenamiento_id = ?
  `;
  return await get(sql, [jugadorId, entrenamientoId]);
}

// Registra o actualiza asistencia
async function registrarAsistencia(jugadorId, entrenamientoId, asistencia) {
  // Primero verificar si ya existe
  const existe = await getAsistencia(jugadorId, entrenamientoId);
  
  if (existe) {
    // Actualizar
    const sql = `
      UPDATE asistencias
      SET asistencia = ?
      WHERE jugador_id = ? AND entrenamiento_id = ?
    `;
    const result = await run(sql, [asistencia ? 1 : 0, jugadorId, entrenamientoId]);
    return { id: existe.id, jugador_id: jugadorId, entrenamiento_id: entrenamientoId, asistencia };
  } else {
    // Crear
    const sql = `
      INSERT INTO asistencias (jugador_id, entrenamiento_id, asistencia)
      VALUES (?, ?, ?)
    `;
    const result = await run(sql, [jugadorId, entrenamientoId, asistencia ? 1 : 0]);
    return { id: result.lastID, jugador_id: jugadorId, entrenamiento_id: entrenamientoId, asistencia };
  }
}

// Elimina una asistencia
async function removeAsistencia(jugadorId, entrenamientoId) {
  const sql = `
    DELETE FROM asistencias
    WHERE jugador_id = ? AND entrenamiento_id = ?
  `;
  const result = await run(sql, [jugadorId, entrenamientoId]);
  return result.changes;
}

// Obtiene estadísticas de asistencia de un jugador
async function getEstadisticasJugador(jugadorId) {
  const sql = `
    SELECT 
      COUNT(*) as total_entrenamientos,
      SUM(CASE WHEN asistencia = 1 THEN 1 ELSE 0 END) as asistencias,
      SUM(CASE WHEN asistencia = 0 THEN 1 ELSE 0 END) as ausencias,
      ROUND(SUM(CASE WHEN asistencia = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as porcentaje_asistencia
    FROM asistencias
    WHERE jugador_id = ?
  `;
  return await get(sql, [jugadorId]);
}

module.exports = {
  getAsistenciasPorEntrenamiento,
  getAsistenciasPorJugador,
  getAsistencia,
  registrarAsistencia,
  removeAsistencia,
  getEstadisticasJugador
};
