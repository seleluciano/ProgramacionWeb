// Inicializar select y modales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

// Función para mostrar un toast
function mostrarToast(mensaje) {
    M.toast({ html: mensaje });
}

// Función para abrir el modal de agregar tarea
function abrirModalAgregar() {
    const modal = document.getElementById('modal-agregar');
    const instance = M.Modal.init(modal);
    instance.open();
}

// Función para filtrar tareas
function filtrarTareas() {
    // Aquí implementa tu lógica de filtrado
    mostrarToast('Función de filtrado aún no implementada');
}

// Simulación de listado de tareas
let tareas = [
    { id: 1, nombre: 'Tarea 1', descripcion: 'Descripción 1', dificultad: 'Fácil', fechaVencimiento: '2024-10-31', completada: false },
    { id: 2, nombre: 'Tarea 2', descripcion: 'Descripción 2', dificultad: 'Media', fechaVencimiento: '2024-11-05', completada: false },
    { id: 3, nombre: 'Tarea 3', descripcion: 'Descripción 3', dificultad: 'Difícil', fechaVencimiento: '2024-11-10', completada: false }
];

// Función para mostrar tareas
function mostrarTareas() {
    const listado = document.getElementById('tareas-listado');
    listado.innerHTML = ''; // Limpiar listado

    tareas.forEach(tarea => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td style="font-size: 1.2em;">${tarea.nombre}</td>
            <td style="font-size: 1.2em;">${tarea.descripcion}</td>
            <td style="font-size: 1.2em;">${tarea.dificultad}</td>
            <td style="font-size: 1.2em;">${new Date(tarea.fechaVencimiento).toLocaleDateString()}</td>
            <td style="font-size: 1.2em;">${tarea.completada ? 'Sí' : 'No'}</td>
            <td>
               <a href="#!" onclick="eliminarTarea(${tarea.id})">
              <img src="/img/basurero.png" alt="Eliminar" style="width: 40px; height: 40px;">
              </a>
              <a href="#!" onclick="abrirModalModificar(${tarea.id})">
              <img src="/img/editar.png" alt="Modificar" style="width: 40px; height: 40px;">
              </a>
            </td>
        `;
        listado.appendChild(fila);
    });
}

// Función para guardar una nueva tarea
function guardarTarea() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const dificultad = document.getElementById('dificultad').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const completada = document.getElementById('completada').checked;

    const nuevaTarea = {
        id: tareas.length + 1, // Asume que ID se genera automáticamente
        nombre,
        descripcion,
        dificultad,
        fechaVencimiento,
        completada
    };

    tareas.push(nuevaTarea);
    mostrarTareas();
    mostrarToast('Tarea agregada exitosamente.');
    cerrarModalAgregar(); // Cerrar el modal después de agregar la tarea
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        mostrarTareas();
        mostrarToast('Tarea eliminada exitosamente.');
    }
}

// Función para abrir el modal de modificación
function abrirModalModificar(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        document.getElementById('modificar-id').value = tarea.id;
        document.getElementById('modificar-nombre').value = tarea.nombre;
        document.getElementById('modificar-descripcion').value = tarea.descripcion;
        document.getElementById('modificar-dificultad').value = tarea.dificultad;
        document.getElementById('modificar-fechaVencimiento').value = tarea.fechaVencimiento;
        document.getElementById('modificar-completada').checked = tarea.completada;

        const modal = document.getElementById('modal-modificar');
        const instance = M.Modal.init(modal);
        instance.open();
    }
}

// Función para modificar una tarea
function modificarTarea() {
    const id = parseInt(document.getElementById('modificar-id').value);
    const nombre = document.getElementById('modificar-nombre').value;
    const descripcion = document.getElementById('modificar-descripcion').value;
    const dificultad = document.getElementById('modificar-dificultad').value;
    const fechaVencimiento = document.getElementById('modificar-fechaVencimiento').value;
    const completada = document.getElementById('modificar-completada').checked;

    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.nombre = nombre;
        tarea.descripcion = descripcion;
        tarea.dificultad = dificultad;
        tarea.fechaVencimiento = fechaVencimiento;
        tarea.completada = completada;

        mostrarTareas();
        mostrarToast('Tarea modificada exitosamente.');
        cerrarModalModificar(); // Cerrar el modal después de modificar la tarea
    }
}

// Función para cerrar el modal de agregar
function cerrarModalAgregar() {
    const modal = document.getElementById('modal-agregar');
    const instance = M.Modal.getInstance(modal);
    instance.close();
}

// Función para cerrar el modal de modificar
function cerrarModalModificar() {
    const modal = document.getElementById('modal-modificar');
    const instance = M.Modal.getInstance(modal);
    instance.close();
}

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareas();
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});
