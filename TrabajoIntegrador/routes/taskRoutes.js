// taskRoutes.js
const express = require('express');
const router = express.Router();
const verificarAutenticacion = require('../middlewares/authMiddleware');

// Aquí irían tus controladores de tareas
const taskControllers = require('../controllers/taskControllers');

// Rutas de tareas
router.get('/', verificarAutenticacion, taskControllers.listarTareas); // Proteger esta ruta
router.post('/', verificarAutenticacion, taskControllers.agregarTarea); // Proteger esta ruta
router.delete('/:id', verificarAutenticacion, taskControllers.eliminarTarea); // Proteger esta ruta
router.put('/:id', verificarAutenticacion, taskControllers.modificarTarea); // Proteger esta ruta

module.exports = router;
