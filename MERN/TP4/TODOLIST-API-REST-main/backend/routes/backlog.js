const express = require('express');
const router = express.Router();
const backlogController = require('../controllers/backlogController');

// GET /backlog
router.get('/', backlogController.getBacklog);

// POST /backlog
router.post('/', backlogController.createBacklog);

// PUT /backlog/add-task/:taskId
router.put('/add-task/:taskId', backlogController.addTaskToBacklog);

module.exports = router;
