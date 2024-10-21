// userRoutes.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers'); // Asegúrate de que este sea el nombre correcto

// Definir las rutas
router.post('/register', userControllers.registrarUsuario);
router.post('/login', userControllers.iniciarSesion);

module.exports = router;
