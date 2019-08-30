var mongoose = require('mongoose');

 var brandSchema = new mongoose.Schema({
     name: String,
 })

 module.exports = mongoose.model('brands',shoesSchema); 