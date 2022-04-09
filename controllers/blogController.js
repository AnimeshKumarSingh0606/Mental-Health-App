const { validationResult } = require("express-validator");
const HttpError=require("../middlewares/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const blogmodel=require("./../model/blog");
const doctormodel=require("./../model/doctors");

exports.blogGetAll = async (req, res, next)=>{
    let blogdetails;
    try{
        
     blogdetails=await blogmodel.find({});
    }
    catch(err){
        return next(new HttpError("COuld not get the blogs for you please try again"))
    }
    return res.json({"Allblogs": blogdetails});
}

exports.bloglike = async (req, res, next)=>{
    const blogid=req.body.blogid;
    const userid=req.existingUser.id;
    const blogdetails=await blogmodel.findOne({id:blogid});
    const likedusers=blogdetails.likes;
    
    if(likedusers.includes(userid)){
        try{
            await blogmodel.updateOne(
            { id: blogid },
            { $pull: { likes: userid } }
         )}
         catch(err){
             return (next(new HttpError("Could not unlike the post !! Please tyr again",406)));
         }
        return res.json({"status": "You have unliked this blog post successfully"});
    }
    else{
        try{
            await blogmodel.updateOne(
            { id: blogid },
            { $push: { likes: userid } }
         )}
         catch(err){
             return (next(new HttpError("Could not like the post !! Please tyr again",406)));
         }
        return res.json({"status": "You have liked this blog post successfully"});
    }
    
}

exports.blogGetSingle = async (req, res, next)=>{
    const blogid=req.body.blogid;
    let blogdetails;
    try{
        
     blogdetails=await blogmodel.findOne({id:blogid});
    }
    catch(err){
        return next(new HttpError("COuld not get the blogs for you please try again"))
    }
    return res.json({"blogGetSingle": blogdetails});
}

exports.blogPost = async (req, res, next)=>{

    const userid=req.existingUser.id;
    const username=req.existingUser.name;
    const {heading,content,picture}=req.body;
    const blogdetails=new blogmodel({
        useridwhopostedtheblog:userid,
        username,
        picture,
        heading,
        content
    }) ;

    try {
        await blogdetails.save();
      } catch (err) {
        return next(new HttpError("Could not post your blog.Please Try Agains", 500));
      }

    return res.json({"blogPost": "successfully posted your blog"});
}


exports.blogcomment = async (req, res, next)=>{
    const blogid=req.body.blogid;
    
    const userid=req.existingUser.id;
    const username=req.existingUser.name;
    const comment_content=req.body.comment_content;
    try{
        await blogmodel.updateOne(
        { id: blogid },
        { $push: { comments: {
            comment_content:comment_content,
            userid:userid,
            usernamewhoposted:username
        } } }
     )}
     catch(err){
         return (next(new HttpError("Could not like the post !! Please tyr again",406)));
     }
    return res.json({"Status": "You commented on the post successfully"});
}
