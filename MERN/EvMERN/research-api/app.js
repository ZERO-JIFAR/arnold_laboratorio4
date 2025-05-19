require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const projectRoutes = require('./routes/projects');
const researcherRoutes = require('./routes/researchers');
const publicationRoutes = require('./routes/publications');

app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/researchers', researcherRoutes);
app.use('/publications', publicationRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(3000, () => console.log('API corriendo en puerto 3000'));
})
.catch(err => console.error(err));
