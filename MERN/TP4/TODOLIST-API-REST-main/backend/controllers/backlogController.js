const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

//Solo un backlog hace falta(?)
exports.getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate('tareas');
    if (!backlog) return res.status(404).json({ error: 'No se encontro....' });
    res.json(backlog);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el backlog....' });
  }
};

// Crear el backlog (primero)
exports.createBacklog = async (req, res) => {
  try {
    const existente = await Backlog.findOne();
    if (existente) return res.status(400).json({ error: 'Ya existe un backlog' });

    const nuevoBacklog = new Backlog(req.body); // puede venir vacío: { tareas: [] }
    const saved = await nuevoBacklog.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el backlog', detalles: error.message });
  }
};

// Agregar tarea
exports.addTaskToBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne();
    const task = await Task.findById(req.params.taskId);

    if (!backlog) return res.status(404).json({ error: 'Backlog no encontrado' });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    if (backlog.tareas.includes(task._id)) {
      return res.status(400).json({ error: 'La tarea ya está en el backlog' });
    }

    backlog.tareas.push(task._id);
    await backlog.save();

    res.json({ mensaje: 'Tarea agregada al backlog', backlog });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar tarea al backlog' });
  }
};
