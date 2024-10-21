// models/UserModels.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios' // Asegúrate de que este nombre coincida con tu base de datos
});

module.exports = Usuario;
