const doctormodel=require("./../model/doctors");
const appointmentmodel=require("./../model/appointments");
const HttpError=require("../middlewares/http-error");
const newdoctorregistration=require("./../model/newdoctorrequest");
const {validationResult}=require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.doctorsignin = async (req, res, next)=>{

  const {email,password}=req.body;
  let existingUser=await doctormodel.findOne({email:email});
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
    console.log(err);
    return next(new HttpError("Could not log you in.Try Again", 500));
  }

  return res.json({
    id: existingUser.id,
    email: existingUser.email,
    token: token,
  });

}

exports.doctorregistration = async (req, res, next)=>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
          new HttpError("Invalid Inputs.Please fill the form correctly ", 406)
        );
    }

    const {name,email,role,country,state,street_address,phone,password,profile_picture,gender,doctor_License_Number,confirm_password}=req.body;
  
  if(password!=confirm_password){
    return next(
      new HttpError("Password and Confirm Password does not match", 406)
    )
  }

  let existingUser;
  try{
    existingUser = await newdoctorregistration.findOne({email:email});
  }catch(err){
    return next(
      new HttpError("Could not raise the request for your registration! please try again. ",406)
    )
  }

  if(existingUser){
    return next(
      new HttpError("You have already raised the request!! Sorry",406)
    )
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not raise your request.Try Again", 500));
  }

  const userDetails = new newdoctorregistration({
    name,
    email,
    role,
    country,
    state,
    street_address,
    phone,
    password:hashedPassword,
    profile_picture,
    gender,
    doctor_License_Number
  });

  try {
    await userDetails.save();
  } catch (err) {
    return next(new HttpError("Could not raise your request.Try Agains", 500));
  }

    return res.json({
      status_code:201,
      id:userDetails.id,
      doctordetails:userDetails
    });

};

exports.doctorgetprofile = async (req, res, next) => {
  const id=req.existingUser.id;
  let user;
  try{
    user=await doctormodel.findOne({id:id})
  }catch(err){
    return (next(new HttpError("Could not fetch your profile!! please try again",406)))
  }
  return res.json({"profile_Information":user});
};

exports.doctorupdateprofile = async (req, res, next) => {
  const id=req.existingUser.id;
    try{
      await doctormodel.findOneAndUpdate({id:id},{ $set:
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

exports.doctorappointmentdetails = async (req, res, next) => {
  const doctorid=req.existingUser.id;
    let approvedrequests;
    let pendingrequests;
    let deniedrequests;

    try{
      approvedrequests=await appointmentmodel.find({doctorid:doctorid,status:"YES"});
      pendingrequests=await appointmentmodel.find({doctorid:doctorid,status:"NA"});
      deniedrequests=await appointmentmodel.find({doctorid:doctorid,status:"NO"});
    }
    catch(err){
      console.log(err);
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


exports.doctorresponsetouser = async (req, res, next) => {
  const appointmentid=req.body.appointmentid;
  const changestatusto=req.body.changestatusto;
  try{
    await appointmentmodel.findOneAndUpdate({id:appointmentid},{$set:{status:changestatusto}});
  }
  catch(err){
    return next(new HttpError("could not respond to your appointment!! Try Again",406))
  }
  res.json({
    "status":"Your response has been seved successfully"
  })
};
