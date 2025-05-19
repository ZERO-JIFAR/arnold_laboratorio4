const Researcher = require('../models/Researcher');

exports.getAll = async (req, res) => {
    const researchers = await Researcher.find().populate('projects');
    res.json(researchers);
};

exports.getById = async (req, res) => {
    const researcher = await Researcher.findById(req.params.id).populate('projects');
    if (!researcher) return res.status(404).send('Investigador no encontrado');
    res.json(researcher);
};

exports.create = async (req, res) => {
    const researcher = new Researcher(req.body);
    await researcher.save();
    res.status(201).json(researcher);
};

exports.update = async (req, res) => {
    const updated = await Researcher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Investigador no encontrado');
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Researcher.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};
