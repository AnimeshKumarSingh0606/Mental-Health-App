const express = require("express");
const Router = express.Router();
const usercontroller = require("../controllers/usercontroller");

const { body } = require("express-validator");

Router.post("/",usercontroller.usersignin);

module.exports = Router;