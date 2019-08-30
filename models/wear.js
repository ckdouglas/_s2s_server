const mongose = require('mongoose');
const Schema = mongose.Schema;

var WearSchema = new Schema({

    imageUrl:{
        type:String,
        required:true
    },
    shoesId:{
        type:String,
        required:true
    }
});

var Wear = mongose.model("Wear", WearSchema);
module.exports = Wear;