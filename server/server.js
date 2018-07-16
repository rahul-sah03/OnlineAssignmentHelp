const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
var {mongoose}=require('./db/mongoose.js');
var {User}=require('./models/Users');

var app=express();
const publicPath=path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/users',(req,res)=>{
    console.log(req.body.Student_Name);
    var user=new User({
        
        name:req.body.Student_Name,
        email:req.body.Email,
        contact:req.body.Phone_No

    });

   user.save().then((user)=>{
       user.generateAuthToken();
        res.send("You have signed up successfully");
   },(e)=>{
    res.status(400).send(e);
   }).then((token)=>{
        res.header('x-auth',token).send(user);
   });
});


//login route
app.get('/users/login',(req,res)=>{
    req.body.Email;
    req.body.Password;
     var email='rahul@gmail.com';
     var pass='12345'
     Users.findOne({email:email},(err,user)=>{
        if(err)
        {
           return res.status(400).send();
        }
        if(!user)
        {
           return res.send("Incorrect emailid");
        }
        if(pass===user.password)
        {
            res.send(user);
        }
     });
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});




