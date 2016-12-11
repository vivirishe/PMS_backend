var User = require('../models/User');

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

function index(req, res, next) {
  User.find({}, function(err, users) {
    if(err) next(err);

    res.json(users)
  }).select('-__v');
}

function create(req, res, next) {
  var user = new User(req.body);

  user.save(function(err, savedUser) {
    if(err) next(err);

    res.json(savedUser);
  });
}

function show(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    if(err) next(err);

    res.json(user);
  });
}

function update(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.typeOfUser = req.body.typeOfUser;
    user.projects = req.body.projects;

    user.save(function(err, updateUser) {
      if(err) next(err);

      res.json(updateUser);
    });
  });
}

function destroy(req, res, next) {
  var id = req.params.id;

  User.remove({_id: id}, function(err) {
    if(err) next(err);

    res.json({message: 'User successfully deleted.'})
  });
}
