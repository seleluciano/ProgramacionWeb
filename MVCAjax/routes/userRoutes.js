const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas
router.get('/', userController.getUsers);
router.post('/add', userController.createUser);
// Ruta para eliminar un usuario
router.delete('/delete/:id', userController.deleteUser);
// Ruta para actualizar un usuario
router.put('/update/:id', userController.updateUser);
module.exports = router;