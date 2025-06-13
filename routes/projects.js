const router = require('express').Router();
const {
  getProjects,
  createProject,
  deleteProject,
} = require('../controllers/projects');

router.get('/', getProjects);

router.post('/', createProject);

router.delete('/:projectId', deleteProject);

module.exports = router;
