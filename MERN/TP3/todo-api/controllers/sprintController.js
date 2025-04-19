const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

exports.getSprints = async (req, res) => {
    const sprints = await Sprint.find().populate('tareas');
    res.json(sprints);
};

exports.getSprintById = async (req, res) => {
    const sprint = await Sprint.findById(req.params.id).populate('tareas');
    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json(sprint);
};

exports.createSprint = async (req, res) => {
    const sprint = new Sprint(req.body);
    await sprint.save();
    res.status(201).json(sprint);
};

exports.updateSprint = async (req, res) => {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json(sprint);
};

exports.deleteSprint = async (req, res) => {
    const sprint = await Sprint.findByIdAndDelete(req.params.id);
    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json({ mensaje: 'Sprint eliminado' });
};

exports.addTaskToSprint = async (req, res) => {
    const { id, taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const sprint = await Sprint.findById(id);
    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });

    sprint.tareas.push(taskId);
    await sprint.save();
    res.json(sprint);
};
