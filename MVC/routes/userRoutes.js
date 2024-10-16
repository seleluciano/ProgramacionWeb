const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para manejar usuarios
router.get('/', userController.index); // Ruta para listar usuarios
router.post('/users/create', userController.create); // Ruta para crear un usuario
router.post('/users/delete/:email', userController.delete); // Ruta para eliminar un usuario por email

module.exports = router;
