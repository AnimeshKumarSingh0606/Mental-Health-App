const { validationResult } = require("express-validator");
const HttpError=require("../middlewares/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const adminmodel=require("./../model/admin");
const doctormodel=require("./../model/doctors");
const newdoctorregistration=require("./../model/newdoctorrequest");
const usermodel=require("./../model/user");

const admingetdoctors = async (req, res, next) => {
    
    let doctorsdetails;

    try{
       doctorsdetails= await doctormodel.find({});
    }catch(err){
      return next(new HttpError("Could not fetch account details of the doctor.Try Agains", 500));
    }
    return res.json({"doctorsdetails":doctorsdetails});
  };

  const admingetsingledoctor = async (req, res, next) => {
    let doctorsdetails;
    const doctorid=req.body.doctorid;
    try{
       doctorsdetails= await doctormodel.find({id:doctorid});
    }catch(err){
      return next(new HttpError("Could not fetch account details of the doctor.Try Agains", 500));
    }
    return res.json({"doctorsdetails":doctorsdetails});
  };

  const admingetsingleuser = async (req, res, next) => {
    let userdetails;
    const useremail=req.body.useremail;
    try{
      userdetails= await usermodel.find({email:useremail});
    }catch(err){
      return next(new HttpError("Could not fetch account details of the doctor.Try Agains", 500));
    }
    return res.json({"userdetails":userdetails});
  };

  const admingetusers = async (req, res, next) => {
    let userdetails;
    try{
      userdetails= await usermodel.find({});
    }catch(err){
      return next(new HttpError("Could not fetch account details of the doctor.Try Agains", 500));
    }
    return res.json({"usersdetails":userdetails});
  };

  const adminapproveadoctor = async (req, res, next) => {
    let doctordetails;
    const demail=req.body.email;
    try{
       doctordetails= await newdoctorregistration.findOne({email:demail});
    }catch(err){
      return next(new HttpError("Could not fetch account details of the doctor.Try Agains", 500));
    }

    try{
      await newdoctorregistration.deleteOne({email:demail});
    }
    catch{
      return next(
        new HttpError("Could Not approve!! Please try again later",406)
      )
    }
    
    const {name,role,email,country,state,street_address,phone,password,profile_picture,gender,doctor_License_Number}=doctordetails;
    
    const doctor=new doctormodel({name,role,email,country,state,street_address,phone,password,profile_picture,gender,doctor_License_Number});
    
    try {
      await doctor.save();
    } catch (err) {
      console.log(err);
      return next(new HttpError("Could not create account.Try Agains", 500));
    }

    

    return res.json({"Status":"Doctor Approved successfully"});
  };

  const adminsignin = async (req, res, next) => {
    
    const {email,password}=req.body;
    let existingUser=await adminmodel.findOne({email:email});
    if(!existingUser){
      return next(
        new HttpError("User does not exist",406)
      )
    }

    let passIsValid = false;

  try {
    passIsValid = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError("Invalid credentials",401));
  }

  if (!passIsValid) {
    return next(new HttpError("Invalid credentials please enter in correct details",401));
  }

  let token;
  try {
    token = await jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Could not log you in.Try Again", 500));
  }

  return res.json({
    id: existingUser.id,
    email: existingUser.email,
    token: token,
  });

  };

  const adminsignup = async (req, res, next) => {
    
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid Inputs.Please fill the form correctly ", 406)
    );
  }

  const {name,role,email,country,state,street_address,phone,password,profile_picture,gender,confirm_password}=req.body;
  
  if(password!=confirm_password){
    return next(
      new HttpError("Password and Confirm Password does not match", 406)
    )
  }

  let existingUser;
  try{
    existingUser = await adminmodel.findOne({email:email});
  }catch(err){
    return next(
      new HttpError("Could not create the user! please try again. ",406)
    )
  }
    
  if(existingUser){
    return next(
      new HttpError("User already exists! Sorry",406)
    )
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create account.Try Again", 500));
  }

  const userDetails = new adminmodel({
    name,
    role,
    email,
    country,
    state,
    street_address,
    phone,
    password:hashedPassword,
    profile_picture,
    gender
  });

  try {
    await userDetails.save();
  } catch (err) {
    return next(new HttpError("Could not create account.Try Agains", 500));
  }

  return res.json({
    status_code:201,
    id:userDetails.id,
    user:userDetails
  });

  };
  
module.exports.admingetdoctors = admingetdoctors;
module.exports.admingetsingledoctor = admingetsingledoctor;
module.exports.admingetsingleuser = admingetsingleuser;
module.exports.admingetusers = admingetusers;
module.exports.adminsignup = adminsignup;
module.exports.adminsignin = adminsignin;
module.exports.adminapproveadoctor=adminapproveadoctor;

