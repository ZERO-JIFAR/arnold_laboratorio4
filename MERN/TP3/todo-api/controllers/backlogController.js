const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

exports.getBacklog = async (req, res) => {
    const backlog = await Backlog.findOne().populate('tareas');
    res.json(backlog);
};

exports.createBacklog = async (req, res) => {
    const existing = await Backlog.findOne();
    if (existing) return res.status(400).json({ error: 'Ya existe un backlog' });

    const backlog = new Backlog({ tareas: [] });
    await backlog.save();
    res.status(201).json(backlog);
};

exports.addTaskToBacklog = async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ error: 'No hay backlog creado' });

    backlog.tareas.push(taskId);
    await backlog.save();
    res.json(backlog);
};
