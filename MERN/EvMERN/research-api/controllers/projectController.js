const Project = require('../models/Project');
const Researcher = require('../models/Researcher');

exports.getAll = async (req, res) => {
    const projects = await Project.find().populate('researchers');
    res.json(projects);
};

exports.getById = async (req, res) => {
    const project = await Project.findById(req.params.id).populate('researchers');
    if (!project) return res.status(404).send('Proyecto no encontrado');
    res.json(project);
};

exports.create = async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
};

exports.update = async (req, res) => {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Proyecto no encontrado');
    res.json(updated);
};

exports.remove = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};

exports.addResearcher = async (req, res) => {
    const { id, researcherId } = req.params;
    const project = await Project.findById(id);
    const researcher = await Researcher.findById(researcherId);
    if (!project || !researcher) return res.status(404).send('Proyecto o Investigador no encontrado');

    project.researchers.push(researcherId);
    researcher.projects.push(id);
    await project.save();
    await researcher.save();

    res.json(project);
};
