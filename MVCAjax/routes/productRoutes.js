const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para productos
router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);

module.exports = router;