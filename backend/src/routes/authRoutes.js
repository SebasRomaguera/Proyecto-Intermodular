const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de registro
router.post('/register', authController.registrarUsuario);

// Ruta de login
router.post('/login', authController.loginUsuario);

module.exports = router;
