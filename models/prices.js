var mongoose = require('mongoose');

 var pricesSchema = new mongoose.Schema({
     shoes_id:String,
     prices:{},
 })

 module.exports = mongoose.model('prices',pricesSchema); 