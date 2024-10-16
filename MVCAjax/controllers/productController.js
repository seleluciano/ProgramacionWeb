// controllers/productController.js
const { Product } = require('../models/productModels');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = await Product.create({ name, price, description });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

// Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.destroy({ where: { id } });
        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

// Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, description } = req.body;
        await Product.update({ name, price, description }, { where: { id } });
        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

