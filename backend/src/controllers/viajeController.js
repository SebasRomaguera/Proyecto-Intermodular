const Viaje = require('../models/Viaje');
const Conductor = require('../models/Conductor');

// Función para calcular precio estimado (simplificado)
const calcularPrecio = (distanciaKm) => {
  const tarifaBase = 4; // €
  const precioKm = 1.2; // € por km
  const precio = tarifaBase + (distanciaKm * precioKm);
  return Math.round(precio * 100) / 100; // Redondear a 2 decimales
};

// Función para calcular tiempo estimado (simplificado)
const calcularTiempo = (distanciaKm) => {
  const velocidadPromedio = 60; // km/h en ciudad (aumentado para viajes más rápidos)
  const minutos = (distanciaKm / velocidadPromedio) * 60;
  return Math.max(Math.round(minutos), 1); // Mínimo 1 minuto
};

// Función para estimar distancia (simplificado - en producción usar API)
const estimarDistancia = (origen, destino) => {
  // Simulación: distancia aleatoria entre 1-5 km (reducido para viajes más cortos)
  return Math.random() * (5 - 1) + 1;
};

// Solicitar un viaje
exports.solicitarViaje = async (req, res) => {
  try {
    const { origen, destino, fechaRecogida } = req.body;
    const usuarioId = req.userId; // Del middleware de autenticación (lo crearemos)

    // Validación básica
    if (!origen || !destino) {
      return res.status(400).json({
        success: false,
        mensaje: 'Origen y destino son obligatorios'
      });
    }

    // Buscar conductor disponible
    const conductor = await Conductor.findOne({ estado: 'disponible' });
    
    if (!conductor) {
      return res.status(404).json({
        success: false,
        mensaje: 'No hay conductores disponibles en este momento'
      });
    }

    // Calcular datos del viaje
    const distanciaKm = estimarDistancia(origen, destino);
    const precioEstimado = calcularPrecio(distanciaKm);
    const tiempoEstimadoMinutos = calcularTiempo(distanciaKm);

    const ahora = new Date();
    let horaInicio = ahora;
    let estadoInicial = 'asignado';
    let esReserva = false;

    if (fechaRecogida) {
      const fechaProgramada = new Date(fechaRecogida);
      if (Number.isNaN(fechaProgramada.getTime())) {
        return res.status(400).json({
          success: false,
          mensaje: 'La fecha de recogida no es valida'
        });
      }

      if (fechaProgramada > ahora) {
        horaInicio = fechaProgramada;
        estadoInicial = 'programado';
        esReserva = true;
      }
    }

    const horaFinEstimada = new Date(horaInicio.getTime() + tiempoEstimadoMinutos * 60000);

    // Crear el viaje
    const viaje = new Viaje({
      usuario: usuarioId,
      conductor: conductor._id,
      origen,
      destino,
      estado: estadoInicial,
      esReserva,
      precioEstimado,
      tiempoEstimadoMinutos,
      horaInicio,
      horaFinEstimada
    });

    await viaje.save();

    // Actualizar estado del conductor
    conductor.estado = 'ocupado';
    await conductor.save();

    // Populate para devolver datos completos
    await viaje.populate('conductor');

    res.status(201).json({
      success: true,
      mensaje: '¡Viaje solicitado con éxito!',
      viaje: {
        id: viaje._id,
        origen: viaje.origen,
        destino: viaje.destino,
        precioEstimado: viaje.precioEstimado,
        tiempoEstimadoMinutos: viaje.tiempoEstimadoMinutos,
        estado: viaje.estado,
        horaInicio: viaje.horaInicio,
        conductor: {
          nombre: viaje.conductor.nombre,
          apellidos: viaje.conductor.apellidos,
          telefono: viaje.conductor.telefono,
          vehiculo: viaje.conductor.vehiculo,
          valoracion: viaje.conductor.valoracion
        }
      }
    });

  } catch (error) {
    console.error('Error al solicitar viaje:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al solicitar el viaje',
      error: error.message
    });
  }
};

// Obtener estado del viaje
exports.obtenerEstadoViaje = async (req, res) => {
  try {
    const { id } = req.params;

    const viaje = await Viaje.findById(id).populate('conductor');

    if (!viaje) {
      return res.status(404).json({
        success: false,
        mensaje: 'Viaje no encontrado'
      });
    }

    // Guardar el estado anterior
    const estadoAnterior = viaje.estado;

    // Calcular progreso actual
    viaje.calcularProgreso();
    await viaje.save();

    // Si el viaje acaba de completarse, liberar al conductor
    if (estadoAnterior !== 'completado' && viaje.estado === 'completado') {
      await Conductor.findByIdAndUpdate(viaje.conductor._id, { estado: 'disponible' });
      console.log(`🚕 Conductor ${viaje.conductor.nombre} liberado (viaje completado)`);
    }

    const tiempoRestante = viaje.tiempoRestante();

    res.json({
      success: true,
      viaje: {
        id: viaje._id,
        estado: viaje.estado,
        progreso: Math.round(viaje.progreso),
        tiempoRestante,
        horaInicio: viaje.horaInicio,
        origen: viaje.origen,
        destino: viaje.destino,
        precioEstimado: viaje.precioEstimado,
        conductor: {
          nombre: viaje.conductor.nombre,
          apellidos: viaje.conductor.apellidos,
          telefono: viaje.conductor.telefono,
          vehiculo: viaje.conductor.vehiculo,
          valoracion: viaje.conductor.valoracion
        }
      }
    });

  } catch (error) {
    console.error('Error al obtener estado del viaje:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el estado del viaje',
      error: error.message
    });
  }
};

// Obtener historial de viajes del usuario
exports.obtenerHistorial = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const viajes = await Viaje.find({ usuario: usuarioId })
      .populate('conductor')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      viajes: viajes.map(v => ({
        id: v._id,
        origen: v.origen,
        destino: v.destino,
        fecha: v.createdAt,
        horaInicio: v.horaInicio,
        esReserva: v.esReserva,
        precioEstimado: v.precioEstimado,
        estado: v.estado,
        conductor: {
          nombre: v.conductor.nombre,
          apellidos: v.conductor.apellidos,
          vehiculo: v.conductor.vehiculo
        }
      }))
    });

  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el historial',
      error: error.message
    });
  }
};

// Consultar conductores disponibles
exports.consultarConductoresDisponibles = async (req, res) => {
  try {
    const totalDisponibles = await Conductor.countDocuments({ estado: 'disponible' });

    res.json({
      success: true,
      totalDisponibles
    });
  } catch (error) {
    console.error('Error al consultar conductores disponibles:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al consultar los taxistas disponibles',
      error: error.message
    });
  }
};

// Cancelar viaje
exports.cancelarViaje = async (req, res) => {
  try {
    const { id } = req.params;

    const viaje = await Viaje.findById(id);

    if (!viaje) {
      return res.status(404).json({
        success: false,
        mensaje: 'Viaje no encontrado'
      });
    }

    // Solo se puede cancelar si no está completado
    if (viaje.estado === 'completado') {
      return res.status(400).json({
        success: false,
        mensaje: 'No se puede cancelar un viaje completado'
      });
    }

    viaje.estado = 'cancelado';
    await viaje.save();

    // Liberar al conductor
    await Conductor.findByIdAndUpdate(viaje.conductor, { estado: 'disponible' });
    console.log(`🚕 Conductor liberado (viaje cancelado)`);

    res.json({
      success: true,
      mensaje: 'Viaje cancelado correctamente'
    });

  } catch (error) {
    console.error('Error al cancelar viaje:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al cancelar el viaje',
      error: error.message
    });
  }
};

// Valorar viaje
exports.valorarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { valoracion, comentario } = req.body;

    if (!valoracion || valoracion < 1 || valoracion > 5) {
      return res.status(400).json({
        success: false,
        mensaje: 'La valoración debe ser entre 1 y 5'
      });
    }

    const viaje = await Viaje.findById(id);

    if (!viaje) {
      return res.status(404).json({
        success: false,
        mensaje: 'Viaje no encontrado'
      });
    }

    viaje.valoracionUsuario = valoracion;
    if (comentario) viaje.comentario = comentario;
    await viaje.save();

    // Actualizar valoración del conductor
    const conductor = await Conductor.findById(viaje.conductor);
    const totalViajes = conductor.totalViajes + 1;
    const nuevaValoracion = ((conductor.valoracion * conductor.totalViajes) + valoracion) / totalViajes;
    
    conductor.valoracion = Math.round(nuevaValoracion * 10) / 10;
    conductor.totalViajes = totalViajes;
    await conductor.save();

    res.json({
      success: true,
      mensaje: '¡Gracias por tu valoración!'
    });

  } catch (error) {
    console.error('Error al valorar viaje:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al valorar el viaje',
      error: error.message
    });
  }
};
