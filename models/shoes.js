var mongoose = require('mongoose');

 var shoesSchema = new mongoose.Schema({
     brand_id:String,
     name: String,
     designer:String,
     nickname:String,
     colors:Array,
     story:String,
     silhoulette:String,
     release_date:String,
     price:Number,
     images:Array,
     sold:Number,
     
 })

 module.exports = mongoose.model('shoes',shoesSchema); 