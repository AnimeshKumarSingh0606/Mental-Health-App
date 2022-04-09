const mongoose=require("mongoose");
const { stringify } = require("querystring");

const blogModel=new mongoose.Schema({
    useridwhopostedtheblog:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:new Date()
    },
    picture:{
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
    },
    likes:[{
        type:String
    }],
    comments : [
        {
            comment_content:{
                type: String,
                required:true,
                minlength:4
            },
            date:{
                type:Date,
                default:new Date()
            },
            usernamewhoposted:{
                type:String,
                required:true
            },
            userid:{
                type:String,
                required:true
            }
        }
    ]
});


const blogmodel = new mongoose.model('blogmodel',blogModel);


module.exports = blogmodel;