var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projects');
var token = require('../config/token_auth');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


/* GET home page. */
// API Documentation Landing Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TPMS' });
});

// API Routes, respond with JSON only
//dont need auth because we are creating an acct
router.route('/api/projects')
  .get(token.authenticate, projectsController.index)
  //Create new project
  .post(token.authenticate, projectsController.create);

router.route('/api/projects/:id')
  .get(token.authenticate, projectsController.show)
  .patch(token.authenticate, projectsController.update)
  .delete(token.authenticate, projectsController.destroy);

module.exports = router;
