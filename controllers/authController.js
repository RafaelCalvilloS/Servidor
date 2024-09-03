// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config/config');

// Endpoint de login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verificar la contraseña
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generar un token
      const token = jwt.sign(
        { userId: user.id, email: user.email, roles: user.roles },
        config.secretKey,
        { expiresIn: '1h' }
      );

      // Responder con el token y la información del usuario
      res.json({
        token,
        userId: user.id,
        userName: user.userName,
        email: user.email,
        roles: user.roles,
        message: 'Login successful',
        status: 'OK'
      });
    })
    .catch(err => res.status(500).json({ message: 'Server error' }));
};
