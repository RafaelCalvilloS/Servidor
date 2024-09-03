// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware para proteger rutas
module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Guardar el ID del usuario en la solicitud para su uso en las siguientes rutas
    req.userId = decoded.userId;
    req.userRoles = decoded.roles;
    next();
  });
};
