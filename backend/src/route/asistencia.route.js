const express = require('express');
const router = express.Router();
const controller = require('../controller/asistencia.controller');
const validaciones = require('../middleware/validaciones');

// GET /asistencias/entrenamiento/:idE - Listar asistencias de un entrenamiento
router.get('/entrenamiento/:idE', controller.listarAsistenciasPorEntrenamiento);

// GET /asistencias/jugador/:idJ - Listar asistencias de un jugador
router.get('/jugador/:idJ', controller.listarAsistenciasPorJugador);

// GET /asistencias/estadisticas/jugador/:idJ - Obtener estadísticas de un jugador
router.get('/estadisticas/jugador/:idJ', controller.obtenerEstadisticas);

// POST /asistencias - Registrar asistencia
router.post('/', validaciones.validarAsistencia, validaciones.handleValidationErrors, controller.registrarAsistencia);

// PATCH /asistencias/:jugadorId/:entrenamientoId - Actualizar asistencia
router.patch('/:jugadorId/:entrenamientoId', validaciones.validarAsistencia, validaciones.handleValidationErrors, controller.actualizarAsistencia);

// DELETE /asistencias/:jugadorId/:entrenamientoId - Eliminar asistencia
router.delete('/:jugadorId/:entrenamientoId', controller.borrarAsistencia);

module.exports = router;
