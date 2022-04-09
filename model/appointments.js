const mongoose=require("mongoose");
const { stringify } = require("querystring");

const appointmentModel=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    doctorid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"NA"
    },
    userrequest:{
        type:String,
        required:true
    },
    doctorresponse:{
        type:String,
        default:""
    },
    
});


const appointmentmodel = new mongoose.model('appointmentmodel',appointmentModel);


module.exports = appointmentmodel;