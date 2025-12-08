const express = require('express');
const controller = require('../controller/entrenamiento.controller');
const { validarCrearEntrenamiento, validarActualizarEntrenamiento, validarEstadoEntrenamiento } = require('../middleware/validaciones');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validarCrearEntrenamiento, controller.crear); 
router.put('/:id', validarActualizarEntrenamiento, controller.actualizar);
router.patch('/:id/estado', validarEstadoEntrenamiento, controller.actualizarEstado);
router.delete('/:id', controller.borrar);

module.exports = router;
