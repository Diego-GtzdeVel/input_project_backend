const Project = require('../models/project');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getProjects = (req, res, next) => {
  Project.find({})
    .then((projects) => res.send(projects))
    .catch(next);
};

module.exports.createProject = (req, res, next) => {
  Project.create({ title, text, owner: req.user._id })
    .then((project) => res.status(201).send(project))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Datos invalidos al crea el proyecto'));
      }
      return next(err);
    });
};

module.exports.deleteProject = (req, res, send) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .then((project))
}