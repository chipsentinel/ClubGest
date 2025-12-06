const express = require('express');
const router = express.Router();

// Ejemplo de ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ mensaje: 'pong' });
});

module.exports = router;
