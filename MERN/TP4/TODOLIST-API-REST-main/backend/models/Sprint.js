const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  fechaCierre: {
    type: Date,
    required: [true, 'La fecha de cierre es obligatoria']
  },
  tareas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  color: {
    type: String,
    default: '#cccccc'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sprint', sprintSchema);
