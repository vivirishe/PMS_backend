var Project = require('../models/Project');
var User = require('../models/User');

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  // Project.find({}, function(err, projects) {
  //   if(err) next(err);
  //
  //   res.json(projects)
  // }).select('-__v');

  Project.find({})
  .exec(function(err, projects) {
    if(err) next(err);
    Project.populate(projects, {
      path: 'tasks.user',
      model: 'User'
    }, function(err, projects) {
      res.json(projects)
    })
  });
}

function create(req, res, next) {
  var project = new Project(req.body);

  project.save(function(err, savedProject) {
    if(err) next(err);

    var users = savedProject.tasks.map(function(task) {
      return task.user.toString();
    }).filter(function(id, index, self) {
      return self.indexOf(id) === index;
    });

    users.forEach(function(userId) {
      User.findById(userId, function(err, user) {
        user.projects.push(savedProject._id);
        user.save();
      });
    });

    res.json(savedProject);
  });
}

function show(req, res, next) {
  var id = req.params.id;

  // Project.findById(id, function(err, project) {
  //   if(err) next(err);
  //
  //   res.json(project);
  // });
  Project.findById(id)
  .exec(function(err, projects) {
    if(err) next(err);
    Project.populate(projects, {
      path: 'tasks.user',
      model: 'User'
    }, function(err, projects) {
      res.json(projects)
    })
  });
}

function update(req, res, next) {
  var id = req.params.id;

  Project.findById(id, function(err, project) {
    project.name = req.body.name;
    project.description = req.body.description;
    project.tasks = req.body.tasks;

    project.save(function(err, updateProject) {
      if(err) next(err);

      var users = updateProject.tasks.map(function(task) {
        return task.user.toString();
      }).filter(function(id, index, self) {
        return self.indexOf(id) === index;
      });

      users.forEach(function(userId) {
        User.findById(userId, function(err, user) {
          if(!user.projects.includes(updateProject._id)) {
            user.projects.push(updateProject._id);
            user.save();
          }
        });
      });
      res.json(updateProject);
    });
  });

  // Project.findById(id)
  //  .exec(function(err, project) {
  //    Project.populate(projects, {
  //      path: 'tasks.user',
  //      model: 'User'
  //    }, function(err, projects) {
  //      project.name = req.body.name;
  //      project.description = req.body.description;
  //      project.users = req.body.users;
  //      project.tasks = req.body.tasks;
  //
  //      project.save(function(err, updateProject) {
  //        if(err) next(err);
  //
  //        res.json(updateProject);
  //      });
  //    })
  //
  // });
}

function destroy(req, res, next) {
  var id = req.params.id;

  Project.remove({_id: id}, function(err) {
    if(err) next(err);

    res.json({message: 'Project successfully deleted.'})
  });
}
