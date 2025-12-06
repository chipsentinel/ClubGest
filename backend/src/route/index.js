const express = require('express');
const jugadoresRoutes = require('./jugadores');

const router = express.Router();

router.use('/jugadores', jugadoresRoutes);

// Ejemplo de ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ mensaje: 'pong' });
});

module.exports = router;
