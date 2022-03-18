const mongoose=require("mongoose");
const { stringify } = require("querystring");

const blogModel=new mongoose.Schema({
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
    profile_picture:{
        type:String,
        default:""
    },
    heading:{
        type:String,
        required:true,
        minlength:5
    },
    content:{
        type:String,
        required:true,
        minlength:30
    }
});


const blogmodel = new mongoose.model('blogmodel',blogModel);


module.exports = blogmodel;