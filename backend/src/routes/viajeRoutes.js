const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const Usuario = require('../models/Usuario');

// Middleware temporal simple de autenticación
// TODO: Reemplazar con JWT en producción
const authMiddleware = async (req, res, next) => {
  const email = req.headers['x-user-email'];
  
  console.log('🔍 Middleware - Email recibido:', email);
  
  if (!email) {
    return res.status(401).json({
      success: false,
      mensaje: 'No autenticado. Inicia sesión primero.'
    });
  }
  
  try {
    // Buscar usuario por email y obtener su ObjectId
    const usuario = await Usuario.findOne({ email: email.trim() });
    
    console.log('👤 Usuario encontrado:', usuario ? usuario.nombre : 'NO ENCONTRADO');
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Usuario no encontrado. Por favor, cierra sesión y vuelve a iniciar sesión.'
      });
    }
    
    req.userId = usuario._id;
    next();
  } catch (error) {
    console.error('❌ Error en authMiddleware:', error);
    return res.status(500).json({
      success: false,
      mensaje: 'Error de autenticación'
    });
  }
};

// Rutas de viajes
router.post('/solicitar', authMiddleware, viajeController.solicitarViaje);
router.get('/:id/estado', viajeController.obtenerEstadoViaje);
router.get('/historial', authMiddleware, viajeController.obtenerHistorial);
router.post('/:id/cancelar', authMiddleware, viajeController.cancelarViaje);
router.post('/:id/valorar', authMiddleware, viajeController.valorarViaje);

module.exports = router;
