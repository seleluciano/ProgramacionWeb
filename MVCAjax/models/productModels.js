const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la ruta sea correcta

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Para almacenar precios con dos decimales
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Valor por defecto
    }
});

// Sincronizar el modelo con la base de datos
Product.sync().then(() => {
    console.log("Modelo de productos sincronizado con la base de datos.");
}).catch(error => console.error("Error al sincronizar el modelo de productos:", error));

module.exports = Product;

