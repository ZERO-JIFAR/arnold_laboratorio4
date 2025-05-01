const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completado'],
    default: 'pendiente'
  },
  fechaLimite: {
    type: Date,
    required: [true, 'La fecha límite es obligatoria']
  },
  color: {
    type: String,
    default: '#ffffff' // Valor por default, por defecto
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt auto
});

module.exports = mongoose.model('Task', taskSchema);
