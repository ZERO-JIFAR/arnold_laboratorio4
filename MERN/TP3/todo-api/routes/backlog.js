const express = require('express');
const router = express.Router();
const controller = require('../controllers/backlogController');

router.get('/', controller.getBacklog);
router.post('/', controller.createBacklog);
router.put('/add-task/:taskId', controller.addTaskToBacklog);

module.exports = router;
