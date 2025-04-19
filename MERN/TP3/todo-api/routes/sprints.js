const express = require('express');
const router = express.Router();
const controller = require('../controllers/sprintController');

router.get('/', controller.getSprints);
router.get('/:id', controller.getSprintById);
router.post('/', controller.createSprint);
router.put('/:id', controller.updateSprint);
router.delete('/:id', controller.deleteSprint);
router.put('/:id/add-task/:taskId', controller.addTaskToSprint);

module.exports = router;
