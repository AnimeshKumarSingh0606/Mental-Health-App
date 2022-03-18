const mongoose=require("mongoose");
const { stringify } = require("querystring");

const appointmentModel=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    doctorname:{
        type:String,
        maxlength:2,
        required:true
    },
    doctor_License_Number:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    doctoremail:{
        type:String,
        required:true
    },
    user_profile_picture:{
        type:String,
        default:""
    },
    doctor_profile_picture:{
        type:String,
        required:true
    },
    query_heading:{
        type:String,
        required:true,
        minlength:5
    },
    query_content:{
        type:String,
        required:true,
        minlength:30
    }
});


const appointmentmodel = new mongoose.model('appointmentmodel',appointmentModel);


module.exports = appointmentmodel;