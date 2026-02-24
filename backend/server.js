require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const viajeRoutes = require('./src/routes/viajeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: asegurar conexión a BD antes de cada petición
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection failed:', error.message);
    res.status(500).json({ success: false, mensaje: 'Error de conexión a la base de datos', detalle: error.message });
  }
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/viajes', viajeRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: '🚕 EasyTaxi Palma API',
    version: '1.0.0',
    estado: 'Activo'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Iniciar servidor solo en local (en Vercel se usa como función serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app;
