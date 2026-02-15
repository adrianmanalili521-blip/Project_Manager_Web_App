const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

// GET all projects
router.get('/', controller.getAllProjects);

// GET a single project by ID
router.get('/:id', controller.getProjectById);

// POST a new project
router.post('/', controller.createProject);

// DELETE a project by ID
router.delete('/:id', controller.deleteProject);

// PUT (optional: update project by ID)
router.put('/:id', controller.updateProject);

module.exports = router;