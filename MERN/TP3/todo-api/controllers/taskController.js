const Task = require('../models/Task');
const Sprint = require('../models/Sprint');

exports.getTasks = async (req, res) => {
    try {
        const filter = req.query.estado ? { estado: req.query.estado } : {};
        const tasks = await Task.find(filter).sort({ fechaLimite: 1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const assigned = await Sprint.findOne({ tareas: req.params.id });
        if (assigned) return res.status(400).json({ error: 'No se puede eliminar una tarea asignada a un sprint' });

        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
