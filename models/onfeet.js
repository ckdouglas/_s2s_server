var mongoose = require('mongoose');

 var onfeetSchema = new mongoose.Schema({
     customer_id:String,
     brand_id: String,
     images:Array
 })

 module.exports = mongoose.model('onFeet',onfeetSchema); 