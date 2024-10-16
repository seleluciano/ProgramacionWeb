document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Cargar productos al cargar la página
    loadProducts();

    // Agregar nuevo producto con AJAX
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('product-id').value; // Obtener el ID
        const name = document.getElementById('product-name').value;
        const description = document.getElementById('product-description').value;
        const price = document.getElementById('product-price').value;
        const stock = document.getElementById('product-stock').value;

        if (id) {
            // Si hay un ID, se está editando un producto
            await updateProduct(id, name, description, price, stock);
        } else {
            // Si no hay ID, se está añadiendo un nuevo producto
            await addProduct(name, description, price, stock);
        }

        // Reiniciar el formulario
        productForm.reset();
        loadProducts(); // Recargar la lista de productos
    });
});

// Función para cargar productos
async function loadProducts() {
    const productList = document.getElementById('product-list');
    try {
        const response = await fetch('/products');
        const data = await response.json();
        productList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos productos

        data.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - ${product.description} - $${product.price} - Stock: ${product.stock}
                <button class="btn red" onclick="deleteProduct(${product.id})"><i class="material-icons">delete</i></button>
                <button class="btn blue" onclick="editProduct(${product.id}, '${product.name}', '${product.description}', ${product.price}, ${product.stock})"><i class="material-icons">edit</i></button>
                <br><br>`;
            productList.appendChild(li);
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
            M.toast({html: 'Producto agregado correctamente'}); // Mensaje de éxito
        } else {
            M.toast({html: 'Error al agregar producto'}); // Mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para eliminar producto
async function deleteProduct(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return; // Si el usuario cancela, no hacer nada

    try {
        const response = await fetch(`/products/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({html: 'Producto eliminado'}); // Mensaje de éxito
            loadProducts();  // Recargar lista de productos
        } else {
            M.toast({html: 'Error al eliminar producto'}); // Mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para editar producto
function editProduct(id, name, description, price, stock) {
    document.getElementById('product-id').value = id; // Establecer ID en el formulario
    document.getElementById('product-name').value = name; // Establecer nombre en el formulario
    document.getElementById('product-description').value = description; // Establecer descripción
    document.getElementById('product-price').value = price; // Establecer precio
    document.getElementById('product-stock').value = stock; // Establecer stock
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
            M.toast({html: 'Producto actualizado correctamente'}); // Mensaje de éxito
        } else {
            M.toast({html: 'Error al actualizar producto'}); // Mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

