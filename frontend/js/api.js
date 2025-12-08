/**
 * @file api.js
 * @description Servicio centralizado de API REST para ClubGest
 * Centraliza todas las llamadas HTTP hacia el backend en Express
 * 
 * Uso:
 *   import { jugadorService, entrenamientoService } from '../js/api.js';
 *   const jugadores = await jugadorService.listar();
 */

// ========== CONFIGURACIÓN BASE ==========
const API_BASE = '/api'; // Base URL relativa (Express sirve frontend)
const TIMEOUT = 5000;    // Timeout en ms

/**
 * Wrapper para fetch con timeout y manejo de errores
 * @param {string} url - URL a consultar
 * @param {object} options - Opciones de fetch
 * @returns {Promise<object>} - JSON response
 */
async function fetchAPI(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
  
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error en ${url}:`, error);
    throw error;
  }
}

// ========== SERVICIO: JUGADORES ==========
export const jugadorService = {
  /**
   * Obtener lista completa de jugadores
   * GET /api/jugadores
   */
  listar: async () => {
    return fetchAPI(`${API_BASE}/jugadores`);
  },

  /**
   * Obtener jugador por ID
   * GET /api/jugadores/:id
   */
  obtener: async (id) => {
    return fetchAPI(`${API_BASE}/jugadores/${id}`);
  },

  /**
   * Crear nuevo jugador (POST desde formulario HTML)
   * POST /api/jugadores (application/x-www-form-urlencoded)
   */
  crear: async (formData) => {
    return fetchAPI(`${API_BASE}/jugadores`, {
      method: 'POST',
      body: formData instanceof FormData ? formData : new FormData(formData)
    });
  },

  /**
   * Actualizar jugador existente
   * PUT /api/jugadores/:id
   */
  actualizar: async (id, datos) => {
    return fetchAPI(`${API_BASE}/jugadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  },

  /**
   * Marcar asistencia a entrenamiento
   * PATCH /api/jugadores/:id/asistencia
   */
  marcarAsistencia: async (id, asiste) => {
    return fetchAPI(`${API_BASE}/jugadores/${id}/asistencia`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asistencia: asiste })
    });
  },

  /**
   * Eliminar jugador
   * DELETE /api/jugadores/:id
   */
  eliminar: async (id) => {
    return fetchAPI(`${API_BASE}/jugadores/${id}`, { method: 'DELETE' });
  }
};

// ========== SERVICIO: ENTRENAMIENTOS ==========
export const entrenamientoService = {
  /**
   * Obtener lista de entrenamientos
   * GET /api/entrenamientos
   * TODO: Implementar en backend
   */
  listar: async () => {
    console.warn('entrenamientoService.listar() - endpoint no implementado en backend');
    return [];
  },

  /**
   * Marcar asistencia a entrenamiento
   * PATCH /api/entrenamientos/:id/asistencia
   * TODO: Implementar en backend
   */
  marcarAsistencia: async (id, estado) => {
    console.warn(`entrenamientoService.marcarAsistencia(${id}, ${estado}) - endpoint no implementado`);
    return { id, estado };
  }
};

// ========== SERVICIO: CONVOCATORIAS ==========
export const convocatoriaService = {
  /**
   * Obtener lista de convocatorias
   * GET /api/convocatorias
   * TODO: Implementar en backend
   */
  listar: async () => {
    console.warn('convocatoriaService.listar() - endpoint no implementado en backend');
    return [];
  }
};

// ========== SERVICIO: ESTADO ==========
export const statusService = {
  /**
   * Comprobar si API está disponible
   * GET /status
   */
  ping: async () => {
    try {
      return await fetchAPI('/status');
    } catch (error) {
      return { error: 'API no disponible' };
    }
  }
};

// ========== HELPERS: RENDERIZADO ==========
/**
 * Renderizar tabla HTML a partir de datos
 * @param {string} containerId - ID del contenedor
 * @param {array} datos - Array de objetos
 * @param {function} formatFila - Función para formatear cada fila
 */
export function renderTabla(containerId, datos, formatFila) {
  const container = document.getElementById(containerId);
  if (!container) return console.error(`Contenedor ${containerId} no encontrado`);
  
  container.innerHTML = datos.map(formatFila).join('');
}

/**
 * Mostrar spinner de carga
 * @param {string} containerId - ID del contenedor
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
export function toggleSpinner(containerId, mostrar) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (mostrar) {
    container.innerHTML = '<p style="text-align:center">Cargando...</p>';
  }
}

/**
 * Mostrar error amigable
 * @param {string} containerId - ID del contenedor
 * @param {string} mensaje - Mensaje de error
 */
export function mostrarError(containerId, mensaje) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `<p style="color:red; text-align:center">Error: ${mensaje}</p>`;
}

// ========== EXPORTAR PARA USO EN HTML ==========
window.APIServices = {
  jugadorService,
  entrenamientoService,
  convocatoriaService,
  statusService,
  renderTabla,
  toggleSpinner,
  mostrarError
};
