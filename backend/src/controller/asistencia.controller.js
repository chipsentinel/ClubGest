const service = require('../service/asistencia.service');
const jugadorService = require('../service/jugador.service');
const entrenamientoService = require('../service/entrenamiento.service');

// GET /entrenamientos/:idE/asistencias - Obtener asistencias de un entrenamiento
async function listarAsistenciasPorEntrenamiento(req, res) {
  try {
    const { idE } = req.params;

    // Verificar que el entrenamiento existe
    const entrenamiento = await entrenamientoService.getById(idE);
    if (!entrenamiento) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    const asistencias = await service.getAsistenciasPorEntrenamiento(idE);

    const formattedAsistencias = asistencias.map((a) => ({
      id: a.id,
      jugadorId: a.jugador_id,
      entrenamientoId: a.entrenamiento_id,
      nombre: a.nombre,
      apellidos: a.apellidos,
      posicion: a.posicion,
      dorsal: a.dorsal,
      sexo: a.sexo,
      asistencia: !!a.asistencia
    }));

    res.status(200).json(formattedAsistencias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo asistencias' });
  }
}

// GET /jugadores/:idJ/asistencias - Obtener asistencias de un jugador
async function listarAsistenciasPorJugador(req, res) {
  try {
    const { idJ } = req.params;

    // Verificar que el jugador existe
    const jugador = await jugadorService.getById(idJ);
    if (!jugador) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    const asistencias = await service.getAsistenciasPorJugador(idJ);

    const formattedAsistencias = asistencias.map((a) => ({
      id: a.id,
      jugadorId: a.jugador_id,
      entrenamientoId: a.entrenamiento_id,
      nombre: a.nombre,
      fechaHora: a.fecha_hora,
      lugar: a.lugar,
      tipo: a.tipo,
      asistencia: !!a.asistencia
    }));

    res.status(200).json(formattedAsistencias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo asistencias' });
  }
}

// POST /asistencias - Registrar asistencia
async function registrarAsistencia(req, res) {
  try {
    const { jugadorId, entrenamientoId, asistencia } = req.body;

    // Verificar que el jugador existe
    const jugador = await jugadorService.getById(jugadorId);
    if (!jugador) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    // Verificar que el entrenamiento existe
    const entrenamiento = await entrenamientoService.getById(entrenamientoId);
    if (!entrenamiento) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    const result = await service.registrarAsistencia(jugadorId, entrenamientoId, asistencia);

    res.status(201).json({
      id: result.id,
      jugadorId: result.jugador_id,
      entrenamientoId: result.entrenamiento_id,
      asistencia: !!result.asistencia
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registrando asistencia' });
  }
}

// PATCH /asistencias/:jugadorId/:entrenamientoId - Actualizar asistencia
async function actualizarAsistencia(req, res) {
  try {
    const { jugadorId, entrenamientoId } = req.params;
    const { asistencia } = req.body;

    // Verificar que el registro existe
    const existe = await service.getAsistencia(jugadorId, entrenamientoId);
    if (!existe) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Asistencia no encontrada'
      });
    }

    await service.registrarAsistencia(jugadorId, entrenamientoId, asistencia);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando asistencia' });
  }
}

// DELETE /asistencias/:jugadorId/:entrenamientoId - Eliminar asistencia
async function borrarAsistencia(req, res) {
  try {
    const { jugadorId, entrenamientoId } = req.params;

    // Verificar que existe
    const existe = await service.getAsistencia(jugadorId, entrenamientoId);
    if (!existe) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Asistencia no encontrada'
      });
    }

    await service.removeAsistencia(jugadorId, entrenamientoId);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando asistencia' });
  }
}

// GET /jugadores/:idJ/estadisticas - Obtener estadísticas de asistencia
async function obtenerEstadisticas(req, res) {
  try {
    const { idJ } = req.params;

    // Verificar que el jugador existe
    const jugador = await jugadorService.getById(idJ);
    if (!jugador) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    const stats = await service.getEstadisticasJugador(idJ);

    if (!stats || stats.total_entrenamientos === 0) {
      return res.status(200).json({
        jugadorId: idJ,
        totalEntrenamientos: 0,
        asistencias: 0,
        ausencias: 0,
        porcentajeAsistencia: 0
      });
    }

    res.status(200).json({
      jugadorId: idJ,
      totalEntrenamientos: stats.total_entrenamientos,
      asistencias: stats.asistencias,
      ausencias: stats.ausencias,
      porcentajeAsistencia: stats.porcentaje_asistencia
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo estadísticas' });
  }
}

module.exports = {
  listarAsistenciasPorEntrenamiento,
  listarAsistenciasPorJugador,
  registrarAsistencia,
  actualizarAsistencia,
  borrarAsistencia,
  obtenerEstadisticas
};
