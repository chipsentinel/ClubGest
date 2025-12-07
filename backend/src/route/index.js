const express = require('express');
const jugadoresRoutes = require('./jugador.route');

const router = express.Router();

router.use('/jugador', jugadoresRoutes);
router.use('/jugadores', jugadoresRoutes);

// Aquí en el futuro: entrenadores, entrenamientos, etc.
// router.use('/entrenadores', entrenadoresRouter);


module.exports = router;
