const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: String,
    publishDate: { type: Date, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Researcher' }]
});

module.exports = mongoose.model('Publication', publicationSchema);
