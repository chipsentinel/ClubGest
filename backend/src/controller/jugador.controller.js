const service = require('../service/jugador.service');


// GET /jugadores
async function listar(req, res) {
  try {
    const jugadoresDB = await service.getAll();

    const jugadores = jugadoresDB.map((j) => ({
      id: j.id,
      nombre: j.nombre,
      apellidos: j.apellidos,
      posicion: j.posicion,
      dorsal: j.dorsal,
      fechaNacimiento: j.fecha_nacimiento,
      peso: j.peso,
      // 0/1 → true/false
      asistenciaEntrenamientos: !!j.asistencia_entrenamientos
    }));

    res.status(200).json(jugadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo jugadores' });
  }
}

// GET /jugadores/:id
async function obtener(req, res) {
  try {
    const j = await service.getById(req.params.id);

    if (!j) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    const jugador = {
      id: j.id,
      nombre: j.nombre,
      apellidos: j.apellidos,
      posicion: j.posicion,
      dorsal: j.dorsal,
      fechaNacimiento: j.fecha_nacimiento,
      peso: j.peso,
      asistenciaEntrenamientos: !!j.asistencia_entrenamientos
    };

    res.status(200).json(jugador);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo jugador' });
  }
}


// POST /jugadores
async function crear(req, res) {
  try {
    const {
      nombre,
      apellidos,
      posicion,
      dorsal,
      fechaNacimiento,
      peso,
      asistenciaEntrenamientos
    } = req.body;

    // Validaciones básicas
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        status: 'bad-request',
        message: "El campo 'nombre' es obligatorio"
      });
    }

    if (dorsal !== undefined && Number(dorsal) <= 0) {
      return res.status(400).json({
        status: 'bad-request',
        message: 'El dorsal debe ser mayor que 0'
      });
    }

    const asistenciaBD = asistenciaEntrenamientos ? 1 : 0;

    const nuevo = await service.create({
      nombre,
      apellidos,
      posicion,
      dorsal,
      fecha_nacimiento: fechaNacimiento,
      peso,
      asistencia_entrenamientos: asistenciaBD
    });

    res.status(201).json({
      id: nuevo.id,
      nombre,
      apellidos,
      posicion,
      dorsal,
      fechaNacimiento,
      peso,
      asistenciaEntrenamientos: !!asistenciaBD
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando jugador' });
  }
}

// PUT /jugadores/:id  (actualizar todo)
async function actualizar(req, res) {
  try {
    const id = req.params.id;
    const {
      nombre,
      apellidos,
      posicion,
      dorsal,
      fechaNacimiento,
      peso,
      asistenciaEntrenamientos
    } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        status: 'bad-request',
        message: "El campo 'nombre' es obligatorio"
      });
    }

    const jugadorDB = await service.getById(id);
    if (!jugadorDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    const cambios = await service.update(id, {
      nombre,
      apellidos,
      posicion,
      dorsal,
      fecha_nacimiento: fechaNacimiento,
      peso,
      asistencia_entrenamientos: asistenciaEntrenamientos ? 1 : 0
    });

    if (cambios === 0) {
      return res.status(304).json({
        status: 'not-modified'
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando jugador' });
  }
}

// PATCH /jugadores/:id/asistencia  (solo asistencia)
async function actualizarAsistencia(req, res) {
  try {
    const id = req.params.id;
    const { asistenciaEntrenamientos } = req.body;

    if (typeof asistenciaEntrenamientos !== 'boolean') {
      return res.status(400).json({
        status: 'bad-request',
        message: "El campo 'asistenciaEntrenamientos' debe ser booleano"
      });
    }

    const jugadorDB = await service.getById(id);
    if (!jugadorDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    await service.updateAsistencia(id, asistenciaEntrenamientos);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando asistencia' });
  }
}

// DELETE /jugadores/:id
async function borrar(req, res) {
  try {
    const id = req.params.id;

    const jugadorDB = await service.getById(id);
    if (!jugadorDB) {
      return res.status(404).json({
        status: 'not-found',
        message: 'Jugador no encontrado'
      });
    }

    await service.remove(id);

    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando jugador' });
  }
}

module.exports = { 
  listar,
  obtener,
  crear,
  actualizar,
  actualizarAsistencia,
  borrar
};
