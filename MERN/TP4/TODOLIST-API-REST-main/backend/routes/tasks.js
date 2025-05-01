const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks?estado=pendiente
router.get('/', taskController.getAllTasks);

// GET /tasks/:id
router.get('/:id', taskController.getTaskById);

// POST /tasks
router.post('/', taskController.createTask);

// PUT /tasks/:id
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id
router.delete('/:id', taskController.deleteTask);

module.exports = router;
