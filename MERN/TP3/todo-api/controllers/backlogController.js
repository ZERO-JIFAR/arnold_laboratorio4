const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

// Obtener el backlog
const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate('tareas');
        if (!backlog) return res.status(404).json({ error: 'No hay backlog creado' });
        res.json(backlog);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el backlog' });
    }
};

// Crear backlog (solo uno)
const createBacklog = async (req, res) => {
    try {
        const existe = await Backlog.findOne();
        if (existe) return res.status(400).json({ error: 'Ya existe un backlog' });

        const nuevoBacklog = new Backlog({ tareas: [] });
        await nuevoBacklog.save();
        res.status(201).json(nuevoBacklog);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el backlog' });
    }
};

// Agregar tarea al backlog
const addTaskToBacklog = async (req, res) => {
    try {
        const { taskId } = req.params;

        const tarea = await Task.findById(taskId);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

        const backlog = await Backlog.findOne();
        if (!backlog) return res.status(404).json({ error: 'No existe un backlog creado' });

        if (!backlog.tareas.includes(taskId)) {
        backlog.tareas.push(taskId);
        await backlog.save();
        }

        res.json({ mensaje: 'Tarea agregada al backlog', backlog });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar la tarea al backlog' });
    }
};

module.exports = {
    getBacklog,
    createBacklog,
    addTaskToBacklog
};
