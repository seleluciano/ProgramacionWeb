document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');

    // Cargar usuarios al cargar la página
    loadUsers();

    // Inicializar modal
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    // Agregar nuevo usuario con AJAX
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('user-id').value; // Obtener el ID
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (id) {
            // Si hay un ID, se está editando un usuario
            await updateUser(id, name, email);
        } else {
            // Si no hay ID, se está añadiendo un nuevo usuario
            await addUser(name, email);
        }

        // Reiniciar el formulario
        userForm.reset();
        loadUsers(); // Recargar la lista de usuarios
    });
});

// Función para cargar usuarios divididos en columnas de 10
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
                    <a class="btn red" onclick="deleteUser(${user.id})">
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
            M.toast({ html: 'Usuario agregado correctamente' }); // Materialize Toast
        } else {
            M.toast({ html: 'Error al agregar usuario' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para eliminar usuario
async function deleteUser(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/users/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({ html: 'Usuario eliminado correctamente' }); // Materialize Toast
            loadUsers();
        } else {
            M.toast({ html: 'Error al eliminar usuario' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para editar usuario
function editUser(id, name, email) {
    document.getElementById('user-id').value = id; // Establecer ID en el formulario
    document.getElementById('name').value = name;  // Establecer nombre en el formulario
    document.getElementById('email').value = email; // Establecer email en el formulario

    const modal = M.Modal.getInstance(document.getElementById('modal-edit'));
    modal.open(); // Abrir el modal de edición
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
            M.toast({ html: 'Usuario actualizado correctamente' }); // Materialize Toast
        } else {
            M.toast({ html: 'Error al actualizar usuario' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
