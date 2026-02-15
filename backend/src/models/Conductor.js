const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  vehiculo: {
    marca: {
      type: String,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    matricula: {
      type: String,
      required: true,
      uppercase: true
    }
  },
  ubicacionActual: {
    lat: {
      type: Number,
      default: 39.5696 // Centro de Palma
    },
    lng: {
      type: Number,
      default: 2.6502
    }
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupado', 'desconectado'],
    default: 'disponible'
  },
  valoracion: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5
  },
  totalViajes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Conductor', conductorSchema);
