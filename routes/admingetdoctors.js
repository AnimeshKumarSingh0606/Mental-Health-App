const express = require("express");
const Router = express.Router();
const admincontroller = require("../controllers/admincontroller");
const adminauth=require("./../middlewares/adminauth");
const adminauthenticationfirst=require("./../middlewares/adminauthenticationfirst");

const { body } = require("express-validator");

Router.use(adminauth);
Router.use(adminauthenticationfirst); 


Router.get("/",admincontroller.admingetdoctors);

module.exports = Router;