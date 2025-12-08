const express = require('express');
const controller = require('../controller/jugador.controller');
const { validarCrearJugador, validarActualizarJugador } = require('../middleware/validaciones');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validarCrearJugador, controller.crear); 
router.put('/:id', validarActualizarJugador, controller.actualizar);
router.delete('/:id', controller.borrar);

module.exports = router;