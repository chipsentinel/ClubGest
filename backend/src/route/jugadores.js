const express = require('express');
const controller = require('../controller/jugador.controller');

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', controller.crear); 

module.exports = router;