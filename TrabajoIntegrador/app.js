const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Rutas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del body parser para formularios
app.use(express.urlencoded({ extended: true }));

// Uso de rutas
app.use('/usuarios', userRoutes);  // Rutas de usuarios
app.use('/tareas', taskRoutes);    // Rutas de tareas

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Servir vistas de login y register
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
