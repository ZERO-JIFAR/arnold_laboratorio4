const Task = require('../models/Task');

// Obtener todas las tareas (con filtro opcional por estado y orden por fechaLimite)
const getAllTasks = async (req, res) => {
    try {
        const filtro = {};
        if (req.query.estado) {
        filtro.estado = req.query.estado;
        }

        const tareas = await Task.find(filtro).sort({ fechaLimite: 1 });
        res.json(tareas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Obtener tarea por ID
const getTaskById = async (req, res) => {
    try {
        const tarea = await Task.findById(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(tarea);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Crear tarea
const createTask = async (req, res) => {
    try {
        const nuevaTarea = new Task(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear la tarea' });
    }
};

// Editar tarea
const updateTask = async (req, res) => {
    try {
        const tarea = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(tarea);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar la tarea' });
    }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
    try {
        // Validación: ¿Está asignada a un sprint?
        const Sprint = require('../models/Sprint');
        const estaAsignada = await Sprint.findOne({ tareas: req.params.id });
        if (estaAsignada) {
        return res.status(400).json({ error: 'No se puede eliminar una tarea asignada a un sprint' });
        }

        const tarea = await Task.findByIdAndDelete(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
