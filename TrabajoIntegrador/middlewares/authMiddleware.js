const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']; // Se espera que el token venga en el encabezado de autorización

  if (!token) {
    return res.status(403).json({ message: 'Se requiere un token.' });
  }

  // Eliminar el prefijo "Bearer" del token (si está presente)
  const tokenSinBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

  jwt.verify(tokenSinBearer, 'tu_secreto', (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    req.userId = decoded.id; // Se puede almacenar el ID del usuario en la solicitud para uso posterior
    next(); // Llamar al siguiente middleware o ruta
  });
};

module.exports = verificarToken;
