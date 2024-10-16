const User = require('../models/userModels');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        await User.create({ name, email });
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};
// Controlador para eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await User.destroy({ where: { id } });

        if (deletedCount > 0) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        await User.update({ name, email }, { where: { id } });
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
};
