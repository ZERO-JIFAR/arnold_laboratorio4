const { validationResult, body } = require('express-validator');
const Task = require('../models/Task');
const Sprint = require('../models/Sprint');

// Validaciones
const validateTask = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('fechaLimite').isISO8601().withMessage('La fecha límite debe ser una fecha válida'),
  body('estado').isIn(['pendiente', 'en progreso', 'completado']).withMessage('Estado debe ser uno de: pendiente, en progreso, completado'),
  body('color').isHexColor().withMessage('El color debe ser un código hexadecimal válido'),
];

// validar errores de validación
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obtener todas las tareas (opcionalmente con filtro por estado y orden por fecha)
const getAllTasks = async (req, res) => {
  try {
    const { estado } = req.query;
    const filter = estado ? { estado } : {};
    const tasks = await Task.find(filter).sort({ fechaLimite: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    // Validar los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nuevaTarea = new Task(req.body);
    const savedTask = await nuevaTarea.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la tarea', detalles: error.message });
  }
};

// Editar una tarea existente
const updateTask = async (req, res) => {
  try {
    // Validar los datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedTask) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la tarea', detalles: error.message });
  }
};

// Eliminar una tarea (validación si está asignada a un sprint)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    // Verificar si la tarea está asignada a algún sprint
    const sprintAsociado = await Sprint.findOne({ tareas: task._id });
    if (sprintAsociado) {
      return res.status(400).json({ error: 'No se puede eliminar una tarea asignada a un sprint' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

// Exportar las validaciones y controlador para uso en rutas
module.exports = {
  validateTask,
  validateRequest,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
