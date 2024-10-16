document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');

    // Cargar productos al cargar la página
    loadProducts();

    // Inicializar modal
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

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

        // Si hay un ID, se está editando, si no, se está agregando
        if (id) {
            await updateProduct(id, name, description, price, stock);
        } else {
            await addProduct(name, description, price, stock);
        }

        // Reiniciar el formulario
        productForm.reset();
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
                    <a class="btn red" onclick="deleteProduct(${product.id})">
                        <i class="material-icons">Eliminar</i> 
                    </a>
                    <a class="btn blue" onclick="editProduct(${product.id}, '${product.name}', '${product.description}', ${product.price}, ${product.stock})">
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

// Función para eliminar producto
async function deleteProduct(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/products/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({ html: 'Producto eliminado correctamente' }); // Materialize Toast
            loadProducts();
        } else {
            M.toast({ html: 'Error al eliminar producto' }); // Materialize Toast
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para editar producto
function editProduct(id, name, description, price, stock) {
    document.getElementById('product-id').value = id; // Establecer ID en el formulario
    document.getElementById('name').value = name; // Establecer nombre
    document.getElementById('description').value = description; // Establecer descripción
    document.getElementById('price').value = price; // Establecer precio
    document.getElementById('stock').value = stock; // Establecer stock

    const modal = M.Modal.getInstance(document.getElementById('modal-edit'));
    modal.open(); // Abrir el modal de edición
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
};