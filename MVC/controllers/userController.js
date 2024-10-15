const UserModel = require('../models/userModels');

module.exports = {
  index: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.render('index', { users });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener usuarios.");
    }
  },

  create: async (req, res) => {
    const { name, email } = req.body;
    try {
      await UserModel.create({ name, email });
      res.redirect('/'); // Redirigir a la lista de usuarios después de crear
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear usuario.");
    }
  },

  delete: async (req, res) => {
    const { email } = req.params;
    try {
      const deletedCount = await UserModel.destroy({ where: { email } });
      if (deletedCount === 0) {
        return res.status(404).send("Usuario no encontrado.");
      }
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar usuario.");
    }
  },
};
