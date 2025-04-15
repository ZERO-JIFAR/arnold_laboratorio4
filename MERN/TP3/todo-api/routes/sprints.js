const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/sprintController');

// Endpoints de sprints
router.get('/', sprintController.getAllSprints);
router.get('/:id', sprintController.getSprintById);
router.post('/', sprintController.createSprint);
router.put('/:id', sprintController.updateSprint);
router.delete('/:id', sprintController.deleteSprint);
router.put('/:id/add-task/:taskId', sprintController.addTaskToSprint);

module.exports = router;
