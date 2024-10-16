// controllers/productController.js
const Product = require('../models/productModels'); // Asegúrate de que el modelo está correctamente importado

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = await Product.create({ name, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.destroy({ where: { id } });
        if (deletedProduct) {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const updatedProduct = await Product.update({ name, price }, { where: { id } });
        if (updatedProduct[0] === 1) {
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
};
