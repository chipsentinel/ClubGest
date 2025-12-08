// Script de prueba para crear un jugador con los nuevos campos
const baseURL = 'http://localhost:8080/api';

// Datos de prueba con los 7 atributos
const jugadorPrueba = {
  nombre: 'Test',
  apellidos: 'Jugador Prueba',
  posicion: 'Pilar',
  dorsal: 99,
  fechaNacimiento: '2000-01-15',
  peso: 95.5,
  asistenciaEntrenamientos: true
};

console.log('📤 Enviando jugador de prueba...');
console.log(JSON.stringify(jugadorPrueba, null, 2));

fetch(`${baseURL}/jugadores`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jugadorPrueba)
})
  .then(res => res.json())
  .then(data => {
    console.log('\n✅ Jugador creado:');
    console.log(JSON.stringify(data, null, 2));
    
    // Verificar que tenga los 7 atributos
    console.log('\n📊 Verificación de atributos:');
    console.log('✓ nombre (TEXT):', data.nombre);
    console.log('✓ apellidos (TEXT):', data.apellidos);
    console.log('✓ posicion (TEXT):', data.posicion);
    console.log('✓ dorsal (INTEGER):', data.dorsal);
    console.log('✓ fechaNacimiento (DATE):', data.fechaNacimiento);
    console.log('✓ peso (REAL):', data.peso);
    console.log('✓ asistenciaEntrenamientos (BOOLEAN):', data.asistenciaEntrenamientos);
  })
  .catch(err => console.error('❌ Error:', err));
