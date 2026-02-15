const projectModel = require('../models/projectModel');

// GET /projects → all projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.getAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// GET /projects/:id → single project
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await projectModel.getById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

// POST /projects → create new project
exports.createProject = async (req, res, next) => {
  try {
    const newProject = await projectModel.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

// DELETE /projects/:id → delete project
exports.deleteProject = async (req, res, next) => {
  try {
    const rowsDeleted = await projectModel.deleteById(req.params.id);
    if (rowsDeleted === 0) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

// PUT /projects/:id → update project
exports.updateProject = async (req, res, next) => {
  try {
    const updatedProject = await projectModel.updateById(req.params.id, req.body);
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
};