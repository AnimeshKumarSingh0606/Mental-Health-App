const express = require("express");
const Router = express.Router();
const doctorcontroller = require("../controllers/doctorsController");
const doctorauth= require("./../middlewares/doctorauth");
const doctorauthenticationfirst=require("./../middlewares/doctorauthenticationfirst");

const { body } = require("express-validator");

Router.use(doctorauth);
Router.use(doctorauthenticationfirst);

Router.get("/",doctorcontroller.doctorappointmentdetails);

module.exports = Router;