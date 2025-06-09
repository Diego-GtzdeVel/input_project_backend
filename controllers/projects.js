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
        return next(new BadRequestError('Data for new project not valid'));
      }
      return next(err);
    });
};

module.exports.deleteProject = (req, res, next) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .then((project) => {
      if (!project) {
        throw new NotFoundError('Project not found');
      }

      if (project.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You cannot delete this project');
      }

      return Project.findByIdAndDelete(projectId)
        .then (() => res.send({ message: 'Project deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid project ID'));
      }
      return next(err);
    });
};
