// app.js

//Cargar Variables de entorno en tu Aplicación
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const config = require('./config/config');

const app = express();



// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api', authRoutes);

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${config.port}`);
});
