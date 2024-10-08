const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Archivo de configuración de Sequelize

const Proveedor = sequelize.define('Proveedor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El CUIT debe ser único
  },
  condicionFrenteAlIva: {
    type: DataTypes.ENUM(
      'Responsable Inscripto', 
      'Consumidor Final', 
      'Monotributista', 
      'Exento'
    ),
    allowNull: false,
  },
}, {
  tableName: 'proveedores',  // Nombre de la tabla en la base de datos
  timestamps: true,          // Manejar createdAt y updatedAt
});

module.exports = Proveedor;
