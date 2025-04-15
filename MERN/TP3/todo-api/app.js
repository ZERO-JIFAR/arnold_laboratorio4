// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Conectado a MongoDB');
app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
})
.catch(err => console.error('Error al conectar con MongoDB', err));
