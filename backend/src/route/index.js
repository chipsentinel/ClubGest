const express = require('express');
const jugadoresRoutes = require('./jugadores');

const router = express.Router();

router.use('/jugadores', jugadoresRoutes);

// Aquí en el futuro: entrenadores, entrenamientos, etc.
// router.use('/entrenadores', entrenadoresRouter);


module.exports = router;
