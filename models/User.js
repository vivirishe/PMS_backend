var mongoose = require('mongoose');

//reference projects
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  typeOfUser: {type: Boolean, default: false},
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));
// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User
