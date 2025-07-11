const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.put('/:id/add-researcher/:researcherId', controller.addResearcher);

module.exports = router;
