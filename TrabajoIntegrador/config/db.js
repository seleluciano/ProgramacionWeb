const { Sequelize } = require('sequelize');

// Configura la conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Este es el archivo donde se almacenará la base de datos
  logging: false  // Desactiva los logs de SQL para evitar mostrar consultas en consola
});

// Prueba la conexión para asegurarte de que la configuración es correcta
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos SQLite establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos SQLite:', err);
  });

module.exports = sequelize;
