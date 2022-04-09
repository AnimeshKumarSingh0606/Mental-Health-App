const express = require("express");
const doctorsController = require("../controllers/doctorsController");
const Router = express.Router();

const { body } = require("express-validator");

Router.post("/",doctorsController.doctorsignin);

module.exports = Router;


