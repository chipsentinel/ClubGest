const express = require('express');
const jugadoresRoutes = require('./jugador.route');
const entrenamientosRoutes = require('./entrenamiento.route');
const asistenciasRoutes = require('./asistencia.route');

const router = express.Router();

router.use('/jugador', jugadoresRoutes);
router.use('/jugadores', jugadoresRoutes);
router.use('/entrenamiento', entrenamientosRoutes);
router.use('/entrenamientos', entrenamientosRoutes);
router.use('/asistencias', asistenciasRoutes);

// Aquí en el futuro: entrenadores, convocatorias, etc.
// router.use('/entrenadores', entrenadoresRouter);


module.exports = router;
