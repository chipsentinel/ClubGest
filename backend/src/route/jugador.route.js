const express = require('express');
const controller = require('../controller/jugador.controller');
const { validarCrearJugador, validarActualizarJugador, validarAsistencia } = require('../middleware/validaciones');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validarCrearJugador, controller.crear); 
router.put('/:id', validarActualizarJugador, controller.actualizar);
router.patch('/:id/asistencia', validarAsistencia, controller.actualizarAsistencia);
router.delete('/:id', controller.borrar);

module.exports = router;