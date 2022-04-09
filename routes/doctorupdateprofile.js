const express = require("express");
const doctorsController = require("../controllers/doctorsController");
const Router = express.Router();
const doctorauth=require("./../middlewares/doctorauth");
const doctorauthenticationfirst=require("./../middlewares/doctorauthenticationfirst");

const { body } = require("express-validator");

Router.use(doctorauth);
Router.use(doctorauthenticationfirst);

Router.post("/",doctorsController.doctorupdateprofile);

module.exports = Router;


