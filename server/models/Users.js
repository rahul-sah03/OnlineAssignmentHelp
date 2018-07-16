var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
var UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }],
    contact:{
        type:Number
    }
});
UserSchema.methods.generateAuthToken=function()
{
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens=user.tokens.concat([{access,token}]);
   return user.save().then(()=>{
        return token;
    
    });
};
var User=mongoose.model('User',UserSchema);
module.exports={User};