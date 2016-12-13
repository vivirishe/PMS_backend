var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
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
router.route('/api/users')
  .get(token.authenticate, usersController.index)
  //SIGN UP
  .post(usersController.create);


router.route('/api/users/:id')
  .get(token.authenticate, usersController.show)
  .patch(token.authenticate, usersController.update)
  .delete(token.authenticate, usersController.destroy);

//SIGN IN
router.route('/api/token')
  .post(token.create)

module.exports = router;
