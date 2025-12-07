const express = require('express');
const controller = require('../controller/jugador.controller');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', controller.crear); 
router.put('/:id', controller.actualizar);
router.patch('/:id/asistencia', controller.actualizarAsistencia);
router.delete('/:id', controller.borrar);

module.exports = router;