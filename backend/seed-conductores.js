// Script para crear conductores de prueba
require('dotenv').config();
const mongoose = require('mongoose');
const Conductor = require('./src/models/Conductor');

const conductoresPrueba = [
  {
    nombre: 'Juan',
    apellidos: 'García López',
    telefono: '+34 671 234 567',
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Prius',
      color: 'Blanco',
      matricula: '7892KLM'
    },
    valoracion: 4.8,
    totalViajes: 245
  },
  {
    nombre: 'María',
    apellidos: 'Rodríguez Martín',
    telefono: '+34 682 345 678',
    vehiculo: {
      marca: 'Seat',
      modelo: 'León',
      color: 'Negro',
      matricula: '4561BCD'
    },
    valoracion: 4.9,
    totalViajes: 312
  },
  {
    nombre: 'Pedro',
    apellidos: 'Sánchez Fernández',
    telefono: '+34 693 456 789',
    vehiculo: {
      marca: 'Volkswagen',
      modelo: 'Passat',
      color: 'Gris',
      matricula: '2345FGH'
    },
    valoracion: 4.7,
    totalViajes: 189
  },
  {
    nombre: 'Ana',
    apellidos: 'Martínez Díaz',
    telefono: '+34 604 567 890',
    vehiculo: {
      marca: 'Nissan',
      modelo: 'Leaf',
      color: 'Azul',
      matricula: '8901JKL'
    },
    valoracion: 5.0,
    totalViajes: 421
  },
  {
    nombre: 'Carlos',
    apellidos: 'López Ruiz',
    telefono: '+34 615 678 901',
    vehiculo: {
      marca: 'Ford',
      modelo: 'Mondeo',
      color: 'Rojo',
      matricula: '5678MNO'
    },
    valoracion: 4.6,
    totalViajes: 156
  }
];

async function crearConductores() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar conductores existentes (opcional)
    await Conductor.deleteMany({});
    console.log('🗑️  Conductores anteriores eliminados');

    // Insertar conductores de prueba
    const result = await Conductor.insertMany(conductoresPrueba);
    console.log(`✅ ${result.length} conductores creados correctamente:`);
    
    result.forEach(conductor => {
      console.log(`   - ${conductor.nombre} ${conductor.apellidos} (${conductor.vehiculo.marca} ${conductor.vehiculo.modelo})`);
    });

    console.log('\n🎉 ¡Base de datos lista para usar!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

crearConductores();
