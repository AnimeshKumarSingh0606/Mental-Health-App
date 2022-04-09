const express = require("express");
const Router = express.Router();
const { blogPost }  = require("../controllers/blogController");
const auth= require("./../middlewares/auth");
const authenticationfirst=require("./../middlewares/authenticationfirst");

const { body } = require("express-validator");

Router.use(auth);
Router.use(authenticationfirst);

Router.post("/",blogPost);

module.exports = Router;