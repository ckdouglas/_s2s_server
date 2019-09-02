Users = require('./models/users');

function updateUser(user, callback){
    Users.updateOne({_id:user.ID},{$set:user}, function(err, res){
        if (err) throw err
        console.log(res)
        callback();
    })
}

function  fetchUser(data,callback){
     Users.findOne({$or:[{username:data.username},{email:data.email} ]}, function(err, user){
        if(err)
             throw err;
        else
            callback(user)
            console.log(user)
     })
 }
 function createUser(credentials, callback){
    var newUser = new Users();
    newUser.username = credentials.username;
    newUser.email = credentials.email;
    newUser.photoUrl = credentials.photoUrl,
    newUser.phoneNunber = credentials.phoneNunber
    newUser.password =newUser.generatHarsh(credentials.password);
    newUser.save((err)=>{
        if(err)
            throw err;
         else
         callback(newUser)
        })
 }
 module.exports = {
     updateUser:updateUser,
     fetchUser:fetchUser,
     createUser:createUser
 }
