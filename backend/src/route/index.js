const express = require('express');
const jugadoresRoutes = require('./jugadore.route');

const router = express.Router();

router.use('/jugadores', jugadoresRoutes);

// Aquí en el futuro: entrenadores, entrenamientos, etc.
// router.use('/entrenadores', entrenadoresRouter);


module.exports = router;
