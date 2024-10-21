const Usuario = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para registrar un usuario
const registrarUsuario = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    try {
        // Hashear la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const usuario = await Usuario.create({
            nombre,
            apellido,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Comparar contraseñas
        const esPasswordValido = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Inicio de sesión exitoso', accessToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion
};
