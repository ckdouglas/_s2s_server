var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email:{type:String,require:true},
    username: String,
    password: String,
    seller:Boolean,
    phone_number:String,
    photoUrl:String,
    firstName: String,
    lastName: String,
    dob:String,
<<<<<<< HEAD
    return_address:String,
    seller101:Boolean,
=======
    return_address:Array,
    seller101:String,
>>>>>>> d896576aa79df19f0259a849474d34e35cb96342
});
userSchema.methods.generatHarsh = function (password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};
userSchema.methods.validPassword =function (password) {
return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('users', userSchema); 