const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de tener configurada tu conexión a la base de datos
const Usuario = require('./Usuario'); // Para la relación entre Usuario y Tareas

const Tarea = sequelize.define('Tarea', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dificultad: {
    type: DataTypes.ENUM('Fácil', 'Media', 'Difícil'),
    allowNull: false
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true, // Para agregar automáticamente campos de createdAt y updatedAt
  tableName: 'tareas'
});

// Relación: Un usuario puede tener muchas tareas
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });
Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Tarea;
