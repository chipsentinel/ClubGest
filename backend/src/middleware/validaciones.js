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
  
  body('asistenciaEntrenamientos')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('La asistencia debe ser un booleano (true/false)'),
  
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
  
  body('asistenciaEntrenamientos')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage('La asistencia debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

/**
 * Validaciones para actualizar asistencia (PATCH)
 */
const validarAsistencia = [
  body('asistenciaEntrenamientos')
    .isBoolean().withMessage('La asistencia debe ser un booleano (true/false)'),
  
  handleValidationErrors
];

module.exports = {
  validarCrearJugador,
  validarActualizarJugador,
  validarAsistencia,
  handleValidationErrors
};
