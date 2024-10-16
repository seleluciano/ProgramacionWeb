const Product = require('../models/productModels');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        await Product.create({ name, description, price, stock });
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        res.status(500).send('Error al crear el producto');
    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await Product.destroy({ where: { id } });

        if (deletedCount > 0) {
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        await Product.update({ name, description, price, stock }, { where: { id } });
        res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
}