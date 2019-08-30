const
express = require('express'),
cors = require('cors'),
path  = require('path'),
bodyParser = require('body-parser'),
nodemailer = require("nodemailer"),
mongoose = require('mongoose'),
multer = require('multer'),
app = express(),
http = require('http').Server(app);

Users = require('./models/users');
Shoes = require('./models/shoes');
Prices = require('./models/prices');
Wear = require('./models/wear');

// mongoose.connect('mongodb://s2suser:s2spass@127.0.0.1/_s2s_',{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/_s2s_',{ useNewUrlParser: true });

app.use(cors());
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//images
const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './public/uploads')
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  })

const upload = multer({ storage:Storage}).single('image');

const port = process.env.PORT || 3000;
http.listen(port, () => {
console.log('listening on port', port);
});

app.get('/',(req,res)=>{
    res.send('Site to Render');
})

app.post('/appApi',(req,res)=>{
    var body = req.body, credentials;
    if(body.action == 'signup' || body.action== 'login' || body.action == 'social_auth' || body.action == 'update_user')
        credentials = body.data;
    switch (body.action) {
        case 'signup':
            fetchUser(credentials,(user)=>{
                if(!user)
                {   
                    var newUser = new Users();
                    newUser.username = credentials.username;
                    newUser.email = credentials.email;
                    newUser.photoUrl = credentials.photoUrl,
                    newUser.phoneNunber = credentials.phoneNunber
                    newUser.password =newUser.generatHarsh(credentials.password);
                    newUser.save((err, user)=>{
                        if(err)
                         throw err;
                         else
                         console.log(user)
                         res.status(201).json(user);
                         //send mail to user using nodemailer
                    })
                }else{
                    var errReturn;
                     if(user.username == credentials.username)
                      errReturn = {message:'Sorry the username has been taken', index:'0'};
                     else if(user.email == credentials.email)
                     errReturn = {message:'The email already exists', index:1};
                     res.status(201).json(errReturn);
                }
            })
            break;
        case 'login':
            fetchUser(credentials,(user)=>{
                if (!user || (credentials.email!= user.email)) {
                    res.status(201).json({message:'User does not exist,use correct credentials',index:'0'})
                }else if(!user.validPassword(credentials.password)){
                    res.status(201).json({message:'Incorects Password',index:'1'})
                }else{
                    console.log('Login Success');
                    res.status(201).json(user);
                }       
            })
            break;
        case 'social_auth':
            fetchUser(credentials,(user)=>{
                if (user) {
                    res.status(201).json(user)
                }else{
                    if (credentials.email == null) {
                        res.status(201).json({message:'No Email address found',index:'0'})
                    }else{
                        var newUser = new Users();
                        newUser.username = credentials.username;
                        newUser.email = credentials.email;
                        newUser.photoUrl = credentials.photoUrl,
                        newUser.phoneNunber = credentials.phoneNunber
                        newUser.password =newUser.generatHarsh(credentials.password);
                        newUser.save((err, user)=>{
                            if(err)
                                throw err;
                             else
                                res.status(201).json(user); 
                            })
                    }
                }
            })
            break;
          case 'get_shoes':
              fetchShoes((shoes)=>{
                // console.log(shoes);
                res.status(201).json(shoes)
              })
            break;
          case 'get_wears':
              fetchWears((wears)=>{
                // console.log(wears);
                res.status(201).json(wears)
              })
              break;
          case 'update_user':
            updateUser(credentials, function(){
                console.log(credentials);
                res.status(201).json({})
            })
               break;
    }
   
})

  app.post('/api/upload',(req, res)=>{
    upload(req, res, function (err) {
        if (err)
             console.log(err);
        else{
            var newWear = new Wear();
            newWear.shoesId = req.body.shoesId;
            // newWear.imageUrl  = 'http://'+req.headers.host+'/uploads/' + req.file.filename;
             newWear.imageUrl  = 'http://192.168.1.106:3000/uploads/' + req.file.filename;

            newWear.save((err,wear)=>{
                if (err) {
                    throw err
                } else {
                     res.status(201).json(wear);
                }
            })
        }
    
    })
})

 function  fetchUser(data,callback){
     Users.findOne({$or:[{username:data.username},{email:data.email} ]}, function(err, user){
        if(err)
             throw err;
        else
            callback(user)
     })
 }
 
 function fetchShoes(callback){
     Shoes.find({}, function(err, shoes){
        if(err)
            throw err
        else
           callback(shoes)
     });
 }

 function fetchWears(callback){
     Wear.find({},function(err, wears){
         if(err)
            throw err
        else 
          callback(wears)
     });
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

 function updateUser(user, callback){
    Users.updateOne({_id:user.ID},{$set:user}, function(err, res){
        if (err) throw err
        console.log(res)
        callback();
    })
}

function postItem(item, callback){

}

function updateItem(item, callback){
    
}