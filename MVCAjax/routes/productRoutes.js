// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getProducts);

// Crear un nuevo producto
router.post('/add', productController.createProduct);

// Actualizar un producto
router.put('/update/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
