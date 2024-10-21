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

// Rutas
app.use('/usuarios', userRoutes);
app.use('/tareas', taskRoutes);

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

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
