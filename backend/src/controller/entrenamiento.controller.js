const service = require('../service/entrenamiento.service');

// GET /entrenamientos
async function listar(req, res) {
  try {
    const entrenamientosDB = await service.getAll();

    const entrenamientos = entrenamientosDB.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      fechaHora: e.fecha_hora,
      duracionMinutos: e.duracion_minutos,
      lugar: e.lugar,
      tipo: e.tipo,
      estado: !!e.estado
    }));

    res.status(200).json(entrenamientos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo entrenamientos' });
  }
}

// GET /entrenamientos/:id
async function obtener(req, res) {
  try {
    const e = await service.getById(req.params.id);

    if (!e) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    const entrenamiento = {
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      fechaHora: e.fecha_hora,
      duracionMinutos: e.duracion_minutos,
      lugar: e.lugar,
      tipo: e.tipo,
      estado: !!e.estado
    };

    res.status(200).json(entrenamiento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo entrenamiento' });
  }
}

// POST /entrenamientos
async function crear(req, res) {
  try {
    const {
      nombre,
      descripcion,
      fechaHora,
      duracionMinutos,
      lugar,
      tipo,
      estado
    } = req.body;

    // Las validaciones ya se hicieron en el middleware (express-validator)
    const estadoBD = estado ? 1 : 0;

    const nuevo = await service.create({
      nombre,
      descripcion,
      fecha_hora: fechaHora,
      duracion_minutos: duracionMinutos,
      lugar,
      tipo,
      estado: estadoBD
    });

    res.status(201).json({
      id: nuevo.id,
      nombre,
      descripcion,
      fechaHora,
      duracionMinutos,
      lugar,
      tipo,
      estado: !!estadoBD
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando entrenamiento' });
  }
}

// PUT /entrenamientos/:id (actualizar todo)
async function actualizar(req, res) {
  try {
    const id = req.params.id;
    const {
      nombre,
      descripcion,
      fechaHora,
      duracionMinutos,
      lugar,
      tipo,
      estado
    } = req.body;

    // Las validaciones ya se hicieron en el middleware
    const entrenamientoDB = await service.getById(id);
    if (!entrenamientoDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    const cambios = await service.update(id, {
      nombre,
      descripcion,
      fecha_hora: fechaHora,
      duracion_minutos: duracionMinutos,
      lugar,
      tipo,
      estado: estado ? 1 : 0
    });

    if (cambios === 0) {
      return res.status(304).json({
        status: 'not-modified'
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando entrenamiento' });
  }
}

// PATCH /entrenamientos/:id/estado (solo estado)
async function actualizarEstado(req, res) {
  try {
    const id = req.params.id;
    const { estado } = req.body;

    // Las validaciones ya se hicieron en el middleware
    const entrenamientoDB = await service.getById(id);
    if (!entrenamientoDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    await service.updateEstado(id, estado);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando estado del entrenamiento' });
  }
}

// DELETE /entrenamientos/:id
async function borrar(req, res) {
  try {
    const id = req.params.id;

    const entrenamientoDB = await service.getById(id);
    if (!entrenamientoDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Entrenamiento no encontrado'
      });
    }

    await service.remove(id);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando entrenamiento' });
  }
}

module.exports = { 
  listar,
  obtener,
  crear,
  actualizar,
  actualizarEstado,
  borrar
};
