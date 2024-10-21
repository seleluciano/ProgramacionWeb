const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

// Definir las rutas
router.post('/register', userControllers.registrarUsuario);
router.post('/login', userControllers.iniciarSesion);

// Si tienes una ruta GET para mostrar el formulario de registro, debe estar así:
router.get('/register', (req, res) => {
    res.send('Formulario de registro');
});

// Otras rutas GET deben seguir el mismo patrón
router.get('/login', (req, res) => {
    res.send('Formulario de inicio de sesión');
});

module.exports = router;
