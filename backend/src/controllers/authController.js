const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor, completa todos los campos obligatorios'
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        mensaje: 'Este email ya está registrado'
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
      telefono
    });

    await nuevoUsuario.save();

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error en el servidor',
      error: error.message
    });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor, introduce email y contraseña'
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Login exitoso
    res.status(200).json({
      success: true,
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error en el servidor',
      error: error.message
    });
  }
};
