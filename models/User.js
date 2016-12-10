var mongoose = require('mongoose');

//reference projects
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  typeOfUser: {type: Boolean, default: false},
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User : User
}
