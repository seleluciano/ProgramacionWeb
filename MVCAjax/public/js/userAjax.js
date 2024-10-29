document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    let userToDelete = null; // Variable para almacenar el ID del usuario a eliminar

    // Cargar usuarios al cargar la página
    loadUsers();

    // Inicializar modal de edición y guardar la instancia
    const modalEditElem = document.getElementById('modal-edit');
    const modalEditInstance = M.Modal.init(modalEditElem);

    // Inicializar modal de eliminación y guardar la instancia
    const modalDeleteElem = document.getElementById('modal-delete');
    const modalDeleteInstance = M.Modal.init(modalDeleteElem);

    // Agregar o actualizar un usuario con AJAX
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('user-id').value; // Obtener el ID
        const name = document.getElementById('edit-name').value.trim(); // Cambia 'name' a 'edit-name'
        const email = document.getElementById('edit-email').value.trim(); // Cambia 'email' a 'edit-email'

        // Verificar que todos los campos estén completos
        if (!name || !email) {
            M.toast({ html: 'Por favor, completa todos los campos correctamente.' });
            return;
        }

        // Si hay un ID, se está editando, si no, se está añadiendo un nuevo usuario
        if (id) {
            await updateUser(id, name, email);
        } else {
            await addUser(name, email);
        }

        // Reiniciar el formulario, cerrar el modal y recargar la lista de usuarios
        userForm.reset();
        modalEditInstance.close();
        loadUsers(); // Recargar la lista de usuarios
    });
});

// Función para cargar usuarios
async function loadUsers() {
    const userList = document.getElementById('user-list');
    try {
        const response = await fetch('/users');
        const data = await response.json();
        userList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos usuarios

        let col;
        data.forEach((user, index) => {
            if (index % 4 === 0) {
                col = document.createElement('div');
                col.classList.add('col', 's12', 'm6'); // Columnas en pantallas pequeñas y medianas
                userList.appendChild(col);
            }

            const userCard = document.createElement('div');
            userCard.classList.add('card', 'black', 'darken-1');
            userCard.innerHTML = `
                <div class="card-content white-text">
                    <span class="card-title">${user.name}</span>
                    <p>${user.email}</p>
                </div>
                <div class="card-action">
                    <a class="btn red" onclick="confirmDeleteUser(${user.id})">
                        <i class="material-icons">Eliminar</i> 
                    </a>
                    <a class="btn blue" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">
                        <i class="material-icons">Editar</i> 
                    </a>
                </div>
            `;
            col.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

// Función para agregar un nuevo usuario
async function addUser(name, email) {
    try {
        const response = await fetch('/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            M.toast({ html: 'Usuario agregado correctamente' });
        } else {
            M.toast({ html: 'Error al agregar usuario' });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Manejador de evento para confirmar la eliminación
document.getElementById('confirm-delete').addEventListener('click', async () => {
    await deleteUser(); // Llamar a la función de eliminación
});

// Función para confirmar la eliminación de un usuario
function confirmDeleteUser(id) {
    userToDelete = id; // Almacenar el ID del usuario a eliminar
    const modalInstance = M.Modal.getInstance(document.getElementById('modal-delete'));
    modalInstance.open(); // Abrir el modal de confirmación de eliminación
}

// Función para eliminar usuario
async function deleteUser() {
    if (!userToDelete) return; // Si no hay un usuario seleccionado, salir

    try {
        const response = await fetch(`/users/delete/${userToDelete}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({ html: 'Usuario eliminado correctamente' });
            loadUsers(); // Recargar la lista de usuarios
        } else {
            M.toast({ html: 'Error al eliminar usuario' });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        userToDelete = null; // Reiniciar la variable de usuario a eliminar
        const modalInstance = M.Modal.getInstance(document.getElementById('modal-delete'));
        modalInstance.close(); // Cerrar el modal de confirmación
    }
}

// Función para editar usuario
function editUser(id, name, email) {
    document.getElementById('user-id').value = id; // Establecer ID en el formulario
    document.getElementById('edit-name').value = name;  // Establecer nombre en el formulario
    document.getElementById('edit-email').value = email; // Establecer email en el formulario

    const modalEditInstance = M.Modal.getInstance(document.getElementById('modal-edit'));
    modalEditInstance.open(); // Abrir el modal de edición
}

// Función para actualizar un usuario
async function updateUser(id, name, email) {
    try {
        const response = await fetch(`/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            M.toast({ html: 'Usuario actualizado correctamente' });
        } else {
            M.toast({ html: 'Error al actualizar usuario' });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
