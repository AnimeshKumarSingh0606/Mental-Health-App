const { validationResult } = require("express-validator");
const HttpError=require("../middlewares/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const usermodel=require("./../model/user");
const doctormodel=require("./../model/doctors");
const appointmentmodel = require("../model/appointments");

const userproblemform = async (req, res, next) => {
    return res.json({"userproblemform":"userproblemform"});
  };
  const userproblemresponse = async (req, res, next) => {
    let doctors;
    try{
      doctors=await doctormodel.find({});
    }
    catch(err){
      return (next(new HttpError("Could not fetch the doctors for you!!",406)));
    }

    return res.json({"userproblemresponse":doctors});
  };
  const userprofileget = async (req, res, next) => {
    const id=req.existingUser.id;
    let user;
    try{
      user=await usermodel.findOne({id:id})
    }catch(err){
      return (next(new HttpError("Could not fetch your profile!! please try again",406)))
    }
    return res.json({"profile_Information":user});
  };
  

const usersignup = async (req, res, next) => {

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
    existingUser = await usermodel.findOne({email:email});
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

  const userDetails = new usermodel({
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
const usersignin = async (req, res, next) => {
    const {email,password}=req.body;
    let existingUser=await usermodel.findOne({email:email});
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
const userprofileupdate = async (req, res, next) => {
    const id=req.existingUser.id;
    try{
      await usermodel.findOneAndUpdate({id:id},{ $set:
        {
          name: req.body.name,
          country: req.body.country,
          state: req.body.state,
          street_address:req.body.street_address,
          phone:req.body.phone,
          profile_picture:req.body.profile_picture
        }
     })
    }catch(err){
      return (next(new HttpError("Could not update please try again",406)))
    }
    return res.json({"status":"Profile Updated Successfully"});
  };

  const userrequesttodoctor = async (req, res, next) => {
    const userid=req.existingUser.id;
    const doctorid=req.body.doctorid;
    const userrequest=req.body.userrequest;
    const appointmentdetails=new appointmentmodel({
      userid,
      doctorid,
      userrequest
    });

    try{
      await appointmentdetails.save();
    }
    catch(err){
      return next(new HttpError("could not book the appointment",406))
    }

    return res.json({"status":"Appointment booked successfully"});
  };

  const userappointmentdetails = async (req, res, next) => {
    const userid=req.existingUser.id;
    let approvedrequests;
    let pendingrequests;
    let deniedrequests;

    try{
      approvedrequests=await appointmentmodel.find({userid:userid,status:"YES"});
      pendingrequests=await appointmentmodel.find({userid:userid,status:"NA"});
      deniedrequests=await appointmentmodel.find({userid:userid,status:"NO"});
    }
    catch(err){
      return next(new HttpError("could not fetch your appointment details Try Again",406))
    }



    return res.json(
      {
        "status":"Appointment fetched successfully",
        "approvedrequests":approvedrequests,
        "pendingrequests":pendingrequests,
        "deniedrequests":deniedrequests
      }
  );
  };


  const userdeleterequesttodoctor=async(req,res,next)=>{
    const appointmentid=req.body.appointmentid;
    try{
      await appointmentmodel.deleteOne( { id: appointmentid } );
    }
    catch(err){
      return next(new HttpError("Could not delete the appointment please try again!!",406))
    }
    
    return res.json({"status":"Appointment deleted successfully"}); 
  }
  
  
module.exports.usersignup = usersignup;
module.exports.usersignin = usersignin;
module.exports.userprofileupdate = userprofileupdate;
module.exports.userappointmentdetails = userappointmentdetails;
module.exports.userdeleterequesttodoctor=userdeleterequesttodoctor;

module.exports.userrequesttodoctor = userrequesttodoctor;
  module.exports.userproblemform = userproblemform;
  module.exports.userproblemresponse = userproblemresponse;
  module.exports.userprofileget = userprofileget;

