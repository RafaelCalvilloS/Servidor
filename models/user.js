// models/user.js

const bcrypt = require('bcryptjs');

// Simulación de base de datos de usuarios
const users = [
  {
    id: '12345',
    userName: 'John Doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('password123', 8), // Contraseña hasheada
    roles: ['USER', 'ADMIN'],
  },
];

// Función para encontrar un usuario por email (simulación)
module.exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.email === query.email);
    if (user) {
      resolve(user);
    } else {
      reject(new Error('User not found'));
    }
  });
};
