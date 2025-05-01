const { validationResult, param } = require('express-validator');
const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

// Validar
const validateSprintId = [
  param('id').isMongoId().withMessage('El ID del sprint debe ser un ID de Mongo válido'),
];

const validateTaskId = [
  param('taskId').isMongoId().withMessage('El ID de la tarea debe ser un ID de Mongo válido'),
];

// validar los errores de la solicitud
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obtener todos los sprints
const getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tareas');
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los sprints...' });
  }
};

// Obtener un sprint por ID
const getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate('tareas');
    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el sprint......' });
  }
};

// Crear un nuevo sprint
const createSprint = async (req, res) => {
  try {
    const nuevoSprint = new Sprint(req.body);
    const savedSprint = await nuevoSprint.save();
    res.status(201).json(savedSprint);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el sprint', detalles: error.message });
  }
};

// Actualizar un sprint
const updateSprint = async (req, res) => {
  try {
    const updated = await Sprint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el sprint', detalles: error.message });
  }
};

// Eliminar un sprint
const deleteSprint = async (req, res) => {
  try {
    const deleted = await Sprint.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Sprint no encontrado' });
    res.json({ mensaje: 'Sprint eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el sprint' });
  }
};

// Agregar una tarea a un sprint
const addTaskToSprint = async (req, res) => {
  try {
    // Validar los parámetros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sprint = await Sprint.findById(req.params.id);
    const task = await Task.findById(req.params.taskId);

    if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    // Verificar que la tarea no esté ya asignada al sprint
    if (sprint.tareas.includes(req.params.taskId)) {
      return res.status(400).json({ error: 'La tarea ya está en el sprint' });
    }

    sprint.tareas.push(req.params.taskId);
    await sprint.save();

    res.json({ mensaje: 'Tarea agregada al sprint', sprint });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar tarea al sprint' });
  }
};

// Exportar las validaciones y controlador para su uso en rutas
module.exports = {
  validateSprintId,
  validateTaskId,
  validateRequest,
  getAllSprints,  // Asegúrate de que esta función esté exportada
  getSprintById,
  createSprint,
  updateSprint,
  deleteSprint,
  addTaskToSprint,
};
