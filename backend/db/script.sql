-- Script de creación de tablas para ClubGest

CREATE TABLE IF NOT EXISTS jugadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    posicion TEXT,
    dorsal INTEGER,
    sexo TEXT,
    fecha_nacimiento DATE,
    peso REAL
);

CREATE TABLE IF NOT EXISTS entrenamientos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha_hora DATETIME NOT NULL,
    duracion_minutos INTEGER,
    lugar TEXT,
    tipo TEXT,
    -- 0 = cancelado, 1 = programado
    estado BOOLEAN NOT NULL DEFAULT 1 CHECK (estado IN (0,1))
);

-- Tabla de relación muchos-a-muchos para asistencias
CREATE TABLE IF NOT EXISTS asistencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jugador_id INTEGER NOT NULL,
    entrenamiento_id INTEGER NOT NULL,
    -- 0 = ausente, 1 = presente
    asistencia BOOLEAN NOT NULL DEFAULT 1 CHECK (asistencia IN (0,1)),
    FOREIGN KEY (jugador_id) REFERENCES jugadores(id) ON DELETE CASCADE,
    FOREIGN KEY (entrenamiento_id) REFERENCES entrenamientos(id) ON DELETE CASCADE,
    UNIQUE(jugador_id, entrenamiento_id)
);
