require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('🟢 Conectado a MongoDB'))
    .catch(err => console.error('🔴 Error al conectar:', err));

app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

app.listen(3000, () => console.log('🚀 Servidor corriendo en puerto 3000'));
