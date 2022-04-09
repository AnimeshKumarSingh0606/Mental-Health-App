const mongoose=require("mongoose");
const { stringify } = require("querystring");

const newdoctorregistration=new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        required:true
    },
    role:{
        type:String,
        default:"doctor"
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
        minlength:8
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


const doctorregistration = new mongoose.model('newdoctorregistration',newdoctorregistration);


module.exports = doctorregistration;