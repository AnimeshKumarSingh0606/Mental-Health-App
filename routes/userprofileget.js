const express = require("express");
const Router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const auth= require("./../middlewares/auth");
const authenticationfirst=require("./../middlewares/authenticationfirst");

const { body } = require("express-validator");

Router.use(auth);
Router.use(authenticationfirst);

Router.get("/",usercontroller.userprofileget);

module.exports = Router;