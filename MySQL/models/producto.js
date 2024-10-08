const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Archivo de configuración de Sequelize

const Producto = sequelize.define('Producto', {
  codigoProducto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,        // Código de producto único
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'productos',  // Nombre de la tabla en la base de datos
  timestamps: true,        // Manejar createdAt y updatedAt
});

module.exports = Producto;
