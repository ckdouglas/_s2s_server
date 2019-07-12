const
express = require('express'),
cors = require('cors'),
path  = require('path'),
bodyParser = require('body-parser'),
mongoose = require('mongoose')
app = express(),
http = require('http').Server(app),

Users = require('./models/users');
Shoes = require('./models/shoes');

mongoose.connect('mongodb://127.0.0.1/s2s', { useNewUrlParser:true});

app.use(cors());
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 3000;
http.listen(port, () => {
console.log('listening on port', port);
});

app.get('/',(req,res)=>{
    res.send('Site to Render');
})

app.post('/appApi',(req,res)=>{

    var body = req.body, credentials;
    if(body.action == 'signup' || body.action== 'login')
     credentials = body.data;
    switch (body.action) {
        case 'signup':
            fetchUser(credentials,(user)=>{
                if(!user)
                {   
                    var newUser = new Users();
                    newUser.username = credentials.Username;
                    newUser.email = credentials.Email;
                    newUser.password =newUser.generatHarsh(credentials.Password);
                    newUser.save((err, user)=>{
                        if(err)
                         throw err;
                         else
                         res.status(201).json(user);
                         //send mail to user using nodemailer
                    })
                }else{
                    var errReturn;
                     if(user.username == credentials.Username)
                      errReturn = {message:'Sorry the username has been taken', index:'0'};
                     else if(user.email == credentials.Email)
                     errReturn = {message:'The email already exists', index:1};
                     res.status(201).json(errReturn);
                }
            })
            break;
        case 'login':
            fetchUser(credentials,(user)=>{
                if (!user || (credentials.Email!= user.email)) {
                    res.status(201).json({message:'User does not exist,use correct credentials',index:'0'})
                }else if(!user.validPassword(credentials.Password)){
                    res.status(201).json({message:'Incorects Password',index:'1'})
                }else{
                    console.log('Login Success');
                    res.status(201).json(user);
                }       
            })
            break;
          case 'get_shoes':
              fetchShoes((shoes)=>{
                console.log(shoes);
                res.status(201).json(shoes)
              })
            break;
    }
   
})

 function  fetchUser(data,callback){
     Users.findOne({$or:[{username:data.Username},{email:data.Email} ]}, function(err, user){
        if(err)
             throw err;
        else
        callback(user)
     })
 }

 function fetchShoes(callback){
     Shoes.find({}, {_id:0}, function(err, shoes){
          if(err)
           throw err
           else
           callback(shoes)
     })

 }