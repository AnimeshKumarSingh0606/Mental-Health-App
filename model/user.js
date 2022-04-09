const mongoose=require("mongoose");
const { stringify } = require("querystring");

const userModel=new mongoose.Schema({
    name:{
        type:String,
        maxlength:30,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    street_address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true 
    },
    password:{
        type:String,
        required:true,
        minlength:8, 
    },
    profile_picture:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        required:true
    }
});


const user = new mongoose.model('usermodel',userModel);


module.exports = user;