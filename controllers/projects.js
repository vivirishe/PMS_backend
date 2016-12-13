var Project = require('../models/Project');

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  Project.find({}, function(err, projects) {
    if(err) next(err);

    res.json(projects)
  }).select('-__v');
}

function create(req, res, next) {
  var project = new Project(req.body);

  project.save(function(err, savedProject) {
    if(err) next(err);

    res.json(savedProject);
  });
}

function show(req, res, next) {
  var id = req.params.id;

  Project.findById(id, function(err, project) {
    if(err) next(err);

    res.json(project);
  });
}

function update(req, res, next) {
  var id = req.params.id;

  Project.findById(id, function(err, project) {
    project.name = req.body.name;
    project.description = req.body.description;
    project.categories = req.body.categories;
    project.users = req.body.users;
    project.tasks = req.body.tasks;

    project.save(function(err, updateProject) {
      if(err) next(err);

      res.json(updateProject);
    });
  });
}

function destroy(req, res, next) {
  var id = req.params.id;

  Project.remove({_id: id}, function(err) {
    if(err) next(err);

    res.json({message: 'Project successfully deleted.'})
  });
}
