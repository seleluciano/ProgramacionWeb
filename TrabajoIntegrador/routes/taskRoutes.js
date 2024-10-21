const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');

// Ruta para listar todas las tareas
router.get('/', taskController.listarTareas);

// Ruta para agregar una nueva tarea
router.post('/', taskController.agregarTarea);

// Ruta para eliminar una tarea por ID
router.delete('/:id', taskController.eliminarTarea);
 //modificar las tareas 
 router.put('/tasks/:id', taskController.modificarTarea);

module.exports = router;
