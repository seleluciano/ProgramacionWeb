const tareas = []; // Cambia esto a un array vacío para permitir la simulación

// Función para listar tareas
const listarTareas = (req, res) => {
    res.json(tareas);
};

// Función para agregar una tarea
const agregarTarea = (req, res) => {
    const { nombre, descripcion, dificultad, fechaVencimiento, completada } = req.body;

    // Verificar que se haya enviado un nombre y fecha de vencimiento
    if (!nombre || !fechaVencimiento) {
        return res.status(400).json({ message: 'El nombre y la fecha de vencimiento son requeridos' });
    }

    const nuevaTarea = {
        id: tareas.length + 1, // Asegúrate de ajustar esto si usas una base de datos
        nombre,
        descripcion,
        dificultad,
        fechaVencimiento: new Date(fechaVencimiento),
        completada: completada === 'true' // Convierte el valor a booleano
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
};

// Función para eliminar una tarea
const eliminarTarea = (req, res) => {
    const { id } = req.params;
    const index = tareas.findIndex(t => t.id === parseInt(id));

    if (index !== -1) {
        tareas.splice(index, 1);
        return res.status(204).send(); // No content
    }

    res.status(404).json({ message: 'Tarea no encontrada' });
};

// Función para modificar una tarea
const modificarTarea = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, dificultad, fechaVencimiento, completada } = req.body;

    // Verificar que se haya enviado un nombre y fecha de vencimiento
    if (!nombre || !fechaVencimiento) {
        return res.status(400).json({ message: 'El nombre y la fecha de vencimiento son requeridos' });
    }

    const tarea = tareas.find(t => t.id === parseInt(id));
    if (tarea) {
        tarea.nombre = nombre;
        tarea.descripcion = descripcion;
        tarea.dificultad = dificultad;
        tarea.fechaVencimiento = new Date(fechaVencimiento);
        tarea.completada = completada === 'true'; // Convierte el valor a booleano
        return res.status(200).json(tarea);
    }

    res.status(404).json({ message: 'Tarea no encontrada' });
};

module.exports = {
    listarTareas,
    agregarTarea,
    eliminarTarea,
    modificarTarea
};
