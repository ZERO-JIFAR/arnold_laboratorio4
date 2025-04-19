const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    fechaInicio: { type: Date, required: true },
    fechaCierre: { type: Date, required: true },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    color: String
});

module.exports = mongoose.model('Sprint', sprintSchema);
