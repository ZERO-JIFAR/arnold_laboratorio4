const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

// Obtener todos los sprints
const getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find().populate('tareas');
        res.json(sprints);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los sprints' });
    }
};

// Obtener un sprint por ID
const getSprintById = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id).populate('tareas');
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json(sprint);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el sprint' });
    }
};

// Crear un sprint
const createSprint = async (req, res) => {
    try {
        const nuevoSprint = new Sprint(req.body);
        await nuevoSprint.save();
        res.status(201).json(nuevoSprint);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el sprint' });
    }
};

// Editar un sprint
const updateSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json(sprint);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el sprint' });
    }
};

// Eliminar un sprint
const deleteSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json({ mensaje: 'Sprint eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el sprint' });
    }
};

// Agregar una tarea a un sprint
const addTaskToSprint = async (req, res) => {
    try {
        const { id, taskId } = req.params;

        // Verificar si la tarea existe
        const tarea = await Task.findById(taskId);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

        // Agregar si no está ya en el sprint
        const sprint = await Sprint.findById(id);
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });

        if (!sprint.tareas.includes(taskId)) {
        sprint.tareas.push(taskId);
        await sprint.save();
        }

        res.json({ mensaje: 'Tarea agregada al sprint', sprint });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar la tarea al sprint' });
    }
};

module.exports = {
    getAllSprints,
    getSprintById,
    createSprint,
    updateSprint,
    deleteSprint,
    addTaskToSprint
};
