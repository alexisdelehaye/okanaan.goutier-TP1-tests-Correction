var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filmsSchema = new Schema({
  title: String,
  year: Number
});


module.exports = mongoose.model('films', filmsSchema);
