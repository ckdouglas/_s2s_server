var mongoose = require('mongoose');

 var shoesSchema = new mongoose.Schema({
     brand_id:String,
     prices:{
         '7':Number,
         '7.5':Number,
         '8':Number,
         '8.5':Number,
         '9':Number,
         '9.5':Number,
         '10':Number,
         '10.5':Number,
         '11':Number,
         '11.5':Number,
         '12':Number,
         '12.5':Number,
         '13':Number,
     }

 })

 module.exports = mongoose.model('shoes',shoesSchema);