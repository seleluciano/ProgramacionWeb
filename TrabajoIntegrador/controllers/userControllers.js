
const Usuario = require('../models/UserModels'); // Ajusta la ruta según tu estructura
const bcrypt = require('bcryptjs'); // Usa bcryptjs si lo instalaste
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El email ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente.', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

// Controlador para iniciar sesión
const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};