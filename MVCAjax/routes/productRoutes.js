const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para productos
router.get('/', productController.getProducts);           // Obtener todos los productos
router.post('/add', productController.createProduct);     // Crear un nuevo producto
router.delete('/delete/:id', productController.deleteProduct); // Eliminar un producto
router.put('/update/:id', productController.updateProduct);   // Actualizar un producto

module.exports = router;

