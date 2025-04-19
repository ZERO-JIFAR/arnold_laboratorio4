const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    estado: {
        type: String,
        enum: ['pendiente', 'en progreso', 'completado'],
        default: 'pendiente'
    },
    fechaLimite: { type: Date, required: true },
    color: String
});

module.exports = mongoose.model('Task', taskSchema);
