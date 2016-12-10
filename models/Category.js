var mongoose = require('mongoose');

//
var categorySchema = new mongoo.Schema({
  title: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category
