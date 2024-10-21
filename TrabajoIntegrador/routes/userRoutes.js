const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers'); 

// Definir las rutas
router.post('/register', userControllers.registrarUsuario);
router.post('/login', userControllers.iniciarSesion);

module.exports = router;
