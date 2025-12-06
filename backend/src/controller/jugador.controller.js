const service = require('../service/jugador.service');

async function listar(req, res) {
  try {
    const jugadores = await service.getAll();
    res.json(jugadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo jugadores' });
  }
}

async function obtener(req, res) {
  try {
    const jugador = await service.getById(req.params.id);
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(jugador);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo jugador' });
  }
}

async function crear(req, res) {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando jugador' });
  }
}

module.exports = { listar, obtener, crear };
