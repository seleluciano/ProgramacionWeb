const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Middleware para redirigir si el usuario no está autenticado
const verificarAutenticacion = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token && req.path !== '/usuarios/login' && req.path !== '/usuarios/register') {
        return res.redirect('/usuarios/login');
    }
    next();
};

// Middleware para manejar el body parser
app.use(express.urlencoded({ extended: true }));

// Rutas
const userRoutes = require('./routes/userRoutes');

// Aplicar middleware de autenticación a todas las rutas
app.use(verificarAutenticacion);
app.use('/usuarios', userRoutes);

// Servir vistas estáticas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
