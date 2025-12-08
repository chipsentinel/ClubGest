// Script temporal para recrear la base de datos con los nuevos campos
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'clubgest.db');
const scriptPath = path.join(__dirname, 'db', 'script.sql');

// Eliminar BD anterior si existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('❌ Base de datos anterior eliminada');
}

// Crear nueva BD
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error creando BD:', err);
    process.exit(1);
  }
  console.log('✅ Nueva base de datos creada');
});

// Leer y ejecutar script SQL
const sql = fs.readFileSync(scriptPath, 'utf8');

db.exec(sql, (err) => {
  if (err) {
    console.error('Error ejecutando script SQL:', err);
    process.exit(1);
  }
  console.log('✅ Tabla jugadores creada con 6 atributos:');
  console.log('   - nombre (TEXT)');
  console.log('   - apellidos (TEXT)');
  console.log('   - posicion (TEXT)');
  console.log('   - dorsal (INTEGER)');
  console.log('   - fecha_nacimiento (DATE)');
  console.log('   - peso (REAL)');
  console.log('✅ Tabla entrenamientos creada con 7 atributos:');
  console.log('   - nombre (TEXT)');
  console.log('   - descripcion (TEXT)');
  console.log('   - fecha_hora (DATETIME)');
  console.log('   - duracion_minutos (INTEGER)');
  console.log('   - lugar (TEXT)');
  console.log('   - tipo (TEXT)');
  console.log('   - estado (BOOLEAN)');
  console.log('✅ Tabla asistencias creada como relación M2M:');
  console.log('   - jugador_id (FOREIGN KEY)');
  console.log('   - entrenamiento_id (FOREIGN KEY)');
  console.log('   - asistencia (BOOLEAN)');
  
  db.close(() => {
    console.log('✅ Base de datos lista para usar');
    process.exit(0);
  });
});
