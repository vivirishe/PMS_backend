var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var token = require('../config/token_auth');

// API Routes, respond with JSON only
//dont need auth because we are creating an acct
router.route('/')
  .get(token.authenticate, usersController.index)
  //SIGN UP
  .post(usersController.create);


router.route('/:id')
  .get(token.authenticate, usersController.show)
  .patch(token.authenticate, usersController.update)
  .delete(token.authenticate, usersController.destroy);

//SIGN IN
router.route('/token')
  .post(token.create)

module.exports = router;
