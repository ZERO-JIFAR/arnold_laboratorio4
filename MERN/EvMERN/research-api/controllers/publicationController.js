const Publication = require('../models/Publication');

exports.getAll = async (req, res) => {
    const publications = await Publication.find().populate('project').populate('authors');
    res.json(publications);
};

exports.getById = async (req, res) => {
    const publication = await Publication.findById(req.params.id).populate('project').populate('authors');
    if (!publication) return res.status(404).send('Publicación no encontrada');
    res.json(publication);
};

exports.create = async (req, res) => {
    const publication = new Publication(req.body);
    await publication.save();
    res.status(201).json(publication);
};

exports.update = async (req, res) => {
    const updated = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Publicación no encontrada');
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Publication.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};
