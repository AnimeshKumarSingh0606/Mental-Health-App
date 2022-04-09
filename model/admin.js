const mongoose=require("mongoose");
const { stringify } = require("querystring");

const adminModel=new mongoose.Schema({
    name:{
        type:String,
        maxlength:30,
        required:true
    },
    role:{
        type:String,
        default:"admin"
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


const admin = new mongoose.model('adminmodel',adminModel);


module.exports = admin;