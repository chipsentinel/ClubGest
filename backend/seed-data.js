// Script para poblar la base de datos con datos de ejemplo
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'clubgest.db');
const db = new sqlite3.Database(dbPath);

// Datos de ejemplo
const jugadores = [
  { nombre: 'Carlos', apellidos: 'Martínez López', posicion: 'Pilar', dorsal: 1, fecha_nacimiento: '1995-03-15', peso: 105.5 },
  { nombre: 'Juan', apellidos: 'García Pérez', posicion: 'Hooker', dorsal: 2, fecha_nacimiento: '1996-07-22', peso: 98.0 },
  { nombre: 'Luis', apellidos: 'Fernández Ruiz', posicion: 'Pilar', dorsal: 3, fecha_nacimiento: '1994-11-10', peso: 110.2 },
  { nombre: 'Diego', apellidos: 'Rodríguez Sanz', posicion: 'Segunda Línea', dorsal: 4, fecha_nacimiento: '1997-02-18', peso: 112.5 },
  { nombre: 'Pablo', apellidos: 'López Díaz', posicion: 'Segunda Línea', dorsal: 5, fecha_nacimiento: '1995-09-05', peso: 108.0 },
  { nombre: 'Miguel', apellidos: 'Sánchez Torres', posicion: 'Ala', dorsal: 6, fecha_nacimiento: '1998-04-12', peso: 95.5 },
  { nombre: 'Javier', apellidos: 'Gómez Morales', posicion: 'Ala', dorsal: 7, fecha_nacimiento: '1996-12-30', peso: 92.0 },
  { nombre: 'Andrés', apellidos: 'Jiménez Castro', posicion: 'Octavo', dorsal: 8, fecha_nacimiento: '1997-06-25', peso: 100.0 },
  { nombre: 'Alberto', apellidos: 'Ruiz Navarro', posicion: 'Medio Melé', dorsal: 9, fecha_nacimiento: '1999-01-08', peso: 78.5 },
  { nombre: 'Fernando', apellidos: 'Hernández Vega', posicion: 'Apertura', dorsal: 10, fecha_nacimiento: '1998-08-14', peso: 82.0 },
  { nombre: 'Sergio', apellidos: 'Moreno Gil', posicion: 'Centro', dorsal: 12, fecha_nacimiento: '1997-10-03', peso: 88.5 },
  { nombre: 'David', apellidos: 'Romero Blanco', posicion: 'Centro', dorsal: 13, fecha_nacimiento: '1996-05-20', peso: 90.0 },
  { nombre: 'Raúl', apellidos: 'Álvarez Serrano', posicion: 'Ala', dorsal: 14, fecha_nacimiento: '1999-03-17', peso: 85.0 },
  { nombre: 'Jorge', apellidos: 'Ramírez Ortiz', posicion: 'Ala', dorsal: 11, fecha_nacimiento: '1998-11-28', peso: 84.5 },
  { nombre: 'Antonio', apellidos: 'Domínguez Moya', posicion: 'Zaguero', dorsal: 15, fecha_nacimiento: '1997-07-09', peso: 87.0 }
];

const entrenamientos = [
  { nombre: 'Entrenamiento Técnico - Pases', descripcion: 'Trabajo de pases y recepciones de balón', fecha_hora: '2025-12-09T18:30:00', duracion_minutos: 90, lugar: 'Campo Principal', tipo: 'Técnico', estado: 1 },
  { nombre: 'Entrenamiento Físico - Cardio', descripcion: 'Diagonales y ruta de running hasta el parque', fecha_hora: '2025-12-11T19:00:00', duracion_minutos: 120, lugar: 'Campo Auxiliar', tipo: 'Físico', estado: 1 },
  { nombre: 'Entrenamiento Táctico - Defensas', descripcion: 'Trabajo de sistemas defensivos y alineamientos', fecha_hora: '2025-12-12T18:30:00', duracion_minutos: 90, lugar: 'Campo Principal', tipo: 'Táctico', estado: 1 },
  { nombre: 'Entrenamiento de Melé', descripcion: 'Entrenar a toda la delantera en formaciones de melé', fecha_hora: '2025-12-13T19:00:00', duracion_minutos: 90, lugar: 'Campo Principal', tipo: 'Técnico', estado: 1 },
  { nombre: 'Sesión Mixta - Ataque y Defensa', descripcion: 'Combinación de trabajo ofensivo y defensivo', fecha_hora: '2025-12-16T18:30:00', duracion_minutos: 105, lugar: 'Campo Principal', tipo: 'Mixto', estado: 1 },
  { nombre: 'Entrenamiento Físico - Fuerza', descripcion: 'Trabajo en gimnasio y ejercicios de potencia', fecha_hora: '2025-12-18T17:00:00', duracion_minutos: 75, lugar: 'Gimnasio', tipo: 'Físico', estado: 1 },
  { nombre: 'Entrenamiento Técnico - Patadas', descripcion: 'Trabajo de patadas de despeje y precisión', fecha_hora: '2025-12-19T18:30:00', duracion_minutos: 60, lugar: 'Campo Auxiliar', tipo: 'Técnico', estado: 1 },
  { nombre: 'Sesión Cancelada por Lluvia', descripcion: 'Entrenamiento cancelado por condiciones meteorológicas', fecha_hora: '2025-12-20T18:30:00', duracion_minutos: 90, lugar: 'Campo Principal', tipo: 'Mixto', estado: 0 }
];

async function insertJugadores() {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO jugadores (nombre, apellidos, posicion, dorsal, fecha_nacimiento, peso) VALUES (?, ?, ?, ?, ?, ?)');
    
    jugadores.forEach(j => {
      stmt.run(j.nombre, j.apellidos, j.posicion, j.dorsal, j.fecha_nacimiento, j.peso);
    });
    
    stmt.finalize((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function insertEntrenamientos() {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO entrenamientos (nombre, descripcion, fecha_hora, duracion_minutos, lugar, tipo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    entrenamientos.forEach(e => {
      stmt.run(e.nombre, e.descripcion, e.fecha_hora, e.duracion_minutos, e.lugar, e.tipo, e.estado);
    });
    
    stmt.finalize((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function insertAsistencias() {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO asistencias (jugador_id, entrenamiento_id, asistencia) VALUES (?, ?, ?)');
    
    // Asistencias para el primer entrenamiento (la mayoría asisten)
    for (let jugadorId = 1; jugadorId <= 15; jugadorId++) {
      const asiste = jugadorId <= 12 ? 1 : 0; // Primeros 12 asisten
      stmt.run(jugadorId, 1, asiste);
    }
    
    // Asistencias para el segundo entrenamiento
    for (let jugadorId = 1; jugadorId <= 15; jugadorId++) {
      const asiste = jugadorId % 2 === 0 ? 1 : 0; // Solo pares asisten
      stmt.run(jugadorId, 2, asiste);
    }
    
    // Asistencias para el tercer entrenamiento (todos asisten)
    for (let jugadorId = 1; jugadorId <= 15; jugadorId++) {
      stmt.run(jugadorId, 3, 1);
    }
    
    // Asistencias para el cuarto entrenamiento (delantera: 1-8)
    for (let jugadorId = 1; jugadorId <= 8; jugadorId++) {
      stmt.run(jugadorId, 4, 1);
    }
    
    // Asistencias para el quinto entrenamiento (casi todos)
    for (let jugadorId = 1; jugadorId <= 15; jugadorId++) {
      const asiste = jugadorId !== 5 && jugadorId !== 11 ? 1 : 0;
      stmt.run(jugadorId, 5, asiste);
    }
    
    stmt.finalize((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function seed() {
  try {
    console.log('📊 Insertando jugadores...');
    await insertJugadores();
    console.log('✅ 15 jugadores insertados');
    
    console.log('📊 Insertando entrenamientos...');
    await insertEntrenamientos();
    console.log('✅ 8 entrenamientos insertados');
    
    console.log('📊 Insertando asistencias...');
    await insertAsistencias();
    console.log('✅ Asistencias registradas');
    
    console.log('\n🎉 Base de datos poblada exitosamente con:');
    console.log('   - 15 jugadores');
    console.log('   - 8 entrenamientos');
    console.log('   - ~60 registros de asistencia');
    
    db.close();
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
    db.close();
    process.exit(1);
  }
}

seed();
