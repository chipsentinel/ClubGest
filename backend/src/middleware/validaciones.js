/**
 * @file validaciones.js
 * @description Middleware de validación centralizado usando express-validator
 * Centraliza todas las reglas de validación para la entidad jugadores
 */

const { body, validationResult } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 * Si hay errores, retorna 400 con detalles
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'bad-request',
      message: 'Errores de validación',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

/**
 * Validaciones para crear un jugador (POST)
 * Todos los campos se validan aquí
 */
const validarCrearJugador = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
  
  body('apellidos')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 }).withMessage('Los apellidos no pueden exceder 150 caracteres'),
  
  body('posicion')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage('La posición no puede exceder 50 caracteres'),
  
  body('dorsal')
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 99 }).withMessage('El dorsal debe ser un número entre 1 y 99'),

  body('sexo')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 6 }).withMessage('El sexo no pueden exceder 6 caracteres'),
  
  body('fechaNacimiento')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('La fecha de nacimiento debe estar en formato ISO8601 (YYYY-MM-DD)')
    .custom(value => {
      const fecha = new Date(value);
      const hoy = new Date();
      if (fecha > hoy) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }
      return true;
    }),
  
  body('peso')
    .optional({ checkFalsy: true })
    .isFloat({ min: 30, max: 250 }).withMessage('El peso debe estar entre 30 y 250 kg'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar un jugador (PUT)
 * Similar a crear, pero todos son opcionales
 */
const validarActualizarJugador = [
  body('nombre')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
  
  body('apellidos')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 }).withMessage('Los apellidos no pueden exceder 150 caracteres'),
  
  body('posicion')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage('La posición no puede exceder 50 caracteres'),
  
  body('dorsal')
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 99 }).withMessage('El dorsal debe ser un número entre 1 y 99'),

  body('sexo')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 6 }).withMessage('El sexo no pueden exceder 6 caracteres'),
  
  body('fechaNacimiento')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('La fecha de nacimiento debe estar en formato ISO8601 (YYYY-MM-DD)')
    .custom(value => {
      const fecha = new Date(value);
      const hoy = new Date();
      if (fecha > hoy) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }
      return true;
    }),
  
  body('peso')
    .optional({ checkFalsy: true })
    .isFloat({ min: 30, max: 250 }).withMessage('El peso debe estar entre 30 y 250 kg'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar asistencia (PATCH)
 */
const validarAsistencia = [
  body('jugadorId')
    .notEmpty().withMessage('El jugadorId es obligatorio')
    .isInt({ min: 1 }).withMessage('El jugadorId debe ser un número positivo'),
  
  body('entrenamientoId')
    .notEmpty().withMessage('El entrenamientoId es obligatorio')
    .isInt({ min: 1 }).withMessage('El entrenamientoId debe ser un número positivo'),
  
  body('asistencia')
    .notEmpty().withMessage('La asistencia es obligatoria')
    .isBoolean().withMessage('La asistencia debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

/**
 * Validaciones para crear un entrenamiento (POST)
 */
const validarCrearEntrenamiento = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del entrenamiento es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
  
  body('descripcion')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('fechaHora')
    .notEmpty().withMessage('La fecha y hora del entrenamiento es obligatoria')
    .isISO8601().withMessage('La fecha debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)'),
  
  body('duracionMinutos')
    .optional({ checkFalsy: true })
    .isInt({ min: 15, max: 300 }).withMessage('La duración debe estar entre 15 y 300 minutos'),
  
  body('lugar')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('El lugar no puede exceder 100 caracteres'),
  
  body('tipo')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Técnico', 'Táctico', 'Físico', 'Mixto']).withMessage('El tipo debe ser: Técnico, Táctico, Físico o Mixto'),
  
  body('estado')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('El estado debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar un entrenamiento (PUT)
 */
const validarActualizarEntrenamiento = [
  body('nombre')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
  
  body('descripcion')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('fechaHora')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('La fecha debe estar en formato ISO8601 (YYYY-MM-DDTHH:mm:ss)'),
  
  body('duracionMinutos')
    .optional({ checkFalsy: true })
    .isInt({ min: 15, max: 300 }).withMessage('La duración debe estar entre 15 y 300 minutos'),
  
  body('lugar')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('El lugar no puede exceder 100 caracteres'),
  
  body('tipo')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Técnico', 'Táctico', 'Físico', 'Mixto']).withMessage('El tipo debe ser: Técnico, Táctico, Físico o Mixto'),
  
  body('estado')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('El estado debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar estado de entrenamiento (PATCH)
 */
const validarEstadoEntrenamiento = [
  body('estado')
    .isBoolean().withMessage('El estado debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

module.exports = {
  validarCrearJugador,
  validarActualizarJugador,
  validarAsistencia,
  validarCrearEntrenamiento,
  validarActualizarEntrenamiento,
  validarEstadoEntrenamiento,
  handleValidationErrors
};
