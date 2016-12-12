var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users')
var token = require('../config/token_auth')

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
router.route('/api/users')
  .get(usersController.index)
  .post(usersController.create);

router.route('/api/users/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.destroy);

module.exports = router;
