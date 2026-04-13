const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conductor',
    required: true
  },
  origen: {
    type: String,
    required: [true, 'El origen es obligatorio'],
    trim: true
  },
  destino: {
    type: String,
    required: [true, 'El destino es obligatorio'],
    trim: true
  },
  estado: {
    type: String,
    enum: ['programado', 'asignado', 'en_camino', 'llegando', 'completado', 'cancelado'],
    default: 'asignado'
  },
  precioEstimado: {
    type: Number,
    required: true
  },
  tiempoEstimadoMinutos: {
    type: Number,
    required: true
  },
  esReserva: {
    type: Boolean,
    default: false
  },
  horaInicio: {
    type: Date,
    default: Date.now
  },
  horaFinEstimada: {
    type: Date,
    required: true
  },
  horaLlegada: {
    type: Date
  },
  progreso: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  valoracionUsuario: {
    type: Number,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Método para calcular el progreso actual
viajeSchema.methods.calcularProgreso = function() {
  // No modificar estado si ya es terminal
  if (this.estado === 'cancelado' || this.estado === 'completado') {
    return this.progreso;
  }

  const ahora = new Date();
  if (ahora < this.horaInicio) {
    this.estado = 'programado';
    this.progreso = 0;
    return this.progreso;
  }

  const tiempoTranscurrido = ahora - this.horaInicio;
  const duracionTotal = this.horaFinEstimada - this.horaInicio;
  
  let progreso = Math.min((tiempoTranscurrido / duracionTotal) * 100, 100);
  
  // Actualizar estado según progreso
  if (progreso >= 100) {
    this.estado = 'completado';
    this.progreso = 100;
  } else if (progreso >= 80) {
    this.estado = 'llegando';
    this.progreso = progreso;
  } else if (progreso >= 20) {
    this.estado = 'en_camino';
    this.progreso = progreso;
  } else {
    this.estado = 'asignado';
    this.progreso = progreso;
  }
  
  return this.progreso;
};

// Método para calcular tiempo restante
viajeSchema.methods.tiempoRestante = function() {
  const ahora = new Date();
  const milisegundosRestantes = this.horaFinEstimada - ahora;
  const minutosRestantes = Math.max(Math.ceil(milisegundosRestantes / 60000), 0);
  return minutosRestantes;
};

module.exports = mongoose.model('Viaje', viajeSchema);
