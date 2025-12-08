-- Script de creación de tablas para ClubGest

CREATE TABLE IF NOT EXISTS jugadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    posicion TEXT,
    dorsal INTEGER,
    fecha_nacimiento DATE,
    peso REAL,
    -- 0 = no asiste habitualmente, 1 = sí asiste habitualmente
    asistencia_entrenamientos BOOLEAN NOT NULL DEFAULT 0 CHECK (asistencia_entrenamientos IN (0,1))
);
