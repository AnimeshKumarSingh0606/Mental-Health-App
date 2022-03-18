const express=require("express");
const app=express();
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const mongoose=require("mongoose");
const usermodel=require("./model/user");
const doctors=require("./model/doctors");
const blog=require("./model/blog");
const appointments=require("./model/appointments");
const PORT=process.env.PORT||3000;
const admingetdoctors=require("./routes/admingetdoctors");
// const admingetsingledoctor=require("./routes/admingetsingledoctor");
// const admingetsingleuser=require("./routes/admingetsingleuser");
// const admingetusers=require("./routes/admingetusers");
// const bloggetall=require("./routes/bloggetall");
// const bloggetsingle=require("./routes/bloggetsingle");
// const blogpost=require("./routes/blogpost");
// const botchat=require("./routes/botchat");
// const doctorsignin=require("./routes/doctorsignin");
// const doctorsignup=require("./routes/doctorsignup");
// const music=require("./routes/music");
// const userproblemform=require("./routes/userproblemform");
// const userproblemresponse=require("./routes/userproblemresponse");
// const userprofileget=require("./routes/userprofileget");
// const userprofileupdate=require("./routes/userprofileupdate");
// const usersignin=require("./routes/usersignin");
// const usersignup=require("./routes/usersignup");

app.use("/admingetdoctors/",admingetdoctors);
// app.use("/admingetsingledoctor",admingetsingledoctor);
// app.use("/admingetsingleuser",admingetsingleuser);
// app.use("/admingetusers",admingetusers);
// app.use("/bloggetall",bloggetall);
// app.use("/bloggetsingle",bloggetsingle);
// app.use("/blogpost",blogpost);
// app.use("/botchat",botchat);
// app.use("/doctorsignin",doctorsignin);
// app.use("/doctorsignup",doctorsignup);
// app.use("/music",music);
// app.use("/userproblemform",userproblemform);
// app.use("/userproblemresponse",userproblemresponse);
// app.use("/userprofileget",userprofileget);
// app.use("/userprofileupdate",userprofileupdate);
// app.use("/usersignin",usersignin);
// app.use("/usersignup",usersignup);

try {
    mongoose
      .connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
        app.listen(PORT, () => {
          console.log("Running on Port 3000");
        });
      });
  } catch (err) {
    console.log("error is"+err);
  }

app.get('/',(req,res)=>{
    res.json({"res":"backend working fine"});
});
