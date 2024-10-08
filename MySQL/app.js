const express = require('express');
const sequelize = require('./config/database'); // Archivo de configuración de Sequelize
const Usuario = require('./models/usuario');    // Modelo de Usuario
const Producto = require('./models/producto');  // Modelo de Producto
const Proveedor = require('./models/proveedor'); // Modelo de Proveedor

const app = express();
const port = 3000;

app.use(express.json()); // Para que Express pueda manejar JSON

// Sincronizar Sequelize con la base de datos
sequelize.sync({ force: false }) // 'force: true' recreará las tablas cada vez que corra la app
  .then(() => {
    console.log('Base de datos SQLite y tablas sincronizadas.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario.' });
  }
});

// Rutas para manejar productos

// Crear un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto.' });
  }
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Obtener un producto por su ID
app.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

// Actualizar un producto
app.put('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    await producto.update(req.body);
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el producto.' });
  }
});

// Eliminar un producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    await producto.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

// Rutas para manejar proveedores

// Crear un nuevo proveedor
app.post('/proveedores', async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el proveedor.' });
  }
});

// Obtener todos los proveedores
app.get('/proveedores', async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proveedores.' });
  }
});

// Obtener un proveedor por su ID
app.get('/proveedores/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proveedor.' });
  }
});

// Actualizar un proveedor
app.put('/proveedores/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    await proveedor.update(req.body);
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el proveedor.' });
  }
});

// Eliminar un proveedor
app.delete('/proveedores/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado.' });
    }
    await proveedor.destroy();
    res.status(200).json({ message: 'Proveedor eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proveedor.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
