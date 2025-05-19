const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    estimatedEndDate: Date,
    status: { type: String, enum: ['propuesta', 'en curso', 'finaliazdo'], default: 'propuesta' },
    researchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Researcher' }]
});

module.exports = mongoose.model('Project', projectSchema);
