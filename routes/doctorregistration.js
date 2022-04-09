const express = require("express");
const Router = express.Router();
const doctorsController = require("../controllers/doctorsController");

const { body } = require("express-validator");

Router.post("/",doctorsController.doctorregistration);

module.exports = Router;