const mongoose=require("mongoose");
const { stringify } = require("querystring");

const doctorModel=new mongoose.Schema({
    name:{
        type:String,
        maxlength:2,
        required:true
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
        select: false
    },
    profile_picture:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    doctor_License_Number:{
        type:String,
        required:true
    },

});


const doctormodel = new mongoose.model('doctormodel',doctorModel);


module.exports = doctormodel;