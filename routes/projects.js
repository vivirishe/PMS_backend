var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projects');
var token = require('../config/token_auth');

// API Routes, respond with JSON only
//dont need auth because we are creating an acct
router.route('/')
  .get(token.authenticate, projectsController.index)
  //Create new project
  .post(token.authenticate, projectsController.create);

router.route('/:id')
  .get(token.authenticate, projectsController.show)
  .patch(token.authenticate, projectsController.update)
  .delete(token.authenticate, projectsController.destroy);

router.route('/:project_id/task/:id')
  .delete(token.authenticate, projectsController.destroyTask);


module.exports = router;
