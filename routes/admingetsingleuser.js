const express = require("express");
const Router = express.Router();
const admincontroller = require("../controllers/admincontroller");

const { body } = require("express-validator");

Router.get("/",admincontroller.admingetsingleuser);

module.exports = Router;