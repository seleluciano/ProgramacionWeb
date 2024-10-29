document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');

    // Cargar productos al cargar la página
    loadProducts();

    // Inicializar modal de edición
    const modalEditElem = document.getElementById('modal-edit');
    const modalEditInstance = M.Modal.init(modalEditElem);

    // Inicializar modal de confirmación de eliminación
    const modalDeleteElem = document.getElementById('modal-delete');
    const modalDeleteInstance = M.Modal.init(modalDeleteElem);

    // Agregar o actualizar un producto con AJAX
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);

        // Verificar que todos los campos estén completos
        if (!name || !description || isNaN(price) || isNaN(stock)) {
            M.toast({ html: 'Por favor, completa todos los campos correctamente.' });
            return;
        }

        // Si hay un ID, se está editando; si no, se está agregando
        if (id) {
            await updateProduct(id, name, description, price, stock);
        } else {
            await addProduct(name, description, price, stock);
        }

        // Reiniciar el formulario, cerrar el modal y recargar la lista de productos
        productForm.reset();
        modalEditInstance.close();
        loadProducts(); // Recargar la lista de productos
    });
});

// Función para cargar productos divididos en columnas
async function loadProducts() {
    const productList = document.getElementById('product-list');
    try {
        const response = await fetch('/products');
        const data = await response.json();
        productList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

        let col;
        data.forEach((product, index) => {
            if (index % 4 === 0) {
                col = document.createElement('div');
                col.classList.add('col', 's12', 'm6'); // Columnas en pantallas pequeñas y medianas
                productList.appendChild(col);
            }

            const productCard = document.createElement('div');
            productCard.classList.add('card', 'black', 'darken-1');
            productCard.innerHTML = `
                <div class="card-content white-text">
                    <span class="card-title">${product.name}</span>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                </div>
                <div class="card-action">
                    <a class="btn red" onclick="openDeleteProductModal(${product.id})">
                        <i class="material-icons">Eliminar</i> 
                    </a>
                    <a class="btn blue" onclick='editProduct(${JSON.stringify(product)})'>
                        <i class="material-icons">Editar</i> 
                    </a>
                </div>
            `;
            col.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función para agregar un nuevo producto
async function addProduct(name, description, price, stock) {
    try {
        const response = await fetch('/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, stock })
        });

        if (response.ok) {
            M.toast({ html: 'Producto agregado correctamente' }); // Materialize Toast
        } else {
            M.toast({ html: 'Error al agregar producto' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para abrir el modal de confirmación de eliminación
let productIdToDelete; // Variable global para el ID del producto a eliminar
function openDeleteProductModal(id) {
    productIdToDelete = id; // Almacenar el ID del producto
    const modalDeleteInstance = M.Modal.getInstance(document.getElementById('modal-delete'));
    modalDeleteInstance.open(); // Abrir el modal
}

// Manejador de evento para confirmar la eliminación
document.getElementById('confirm-delete').addEventListener('click', async () => {
    await deleteProduct(productIdToDelete); // Llamar a la función de eliminación
    const modalDeleteInstance = M.Modal.getInstance(document.getElementById('modal-delete'));
    modalDeleteInstance.close(); // Cerrar el modal
});

// Función para eliminar producto
async function deleteProduct(id) {
    try {
        const response = await fetch(`/products/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({ html: 'Producto eliminado correctamente' }); // Materialize Toast
            loadProducts(); // Recargar la lista de productos
        } else {
            M.toast({ html: 'Error al eliminar producto' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para editar producto
function editProduct(product) {
    const { id, name, description, price, stock } = product;
    document.getElementById('product-id').value = id; // Establecer ID en el formulario
    document.getElementById('product-name').value = name; // Establecer nombre
    document.getElementById('product-description').value = description; // Establecer descripción
    document.getElementById('product-price').value = price; // Establecer precio
    document.getElementById('product-stock').value = stock; // Establecer stock

    const modalEditInstance = M.Modal.getInstance(document.getElementById('modal-edit'));
    modalEditInstance.open(); // Abrir el modal de edición
}

// Función para actualizar un producto
async function updateProduct(id, name, description, price, stock) {
    try {
        const response = await fetch(`/products/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, stock })
        });

        if (response.ok) {
            M.toast({ html: 'Producto actualizado correctamente' }); // Materialize Toast
        } else {
            M.toast({ html: 'Error al actualizar producto' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
