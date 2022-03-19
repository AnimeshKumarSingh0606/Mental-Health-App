const express = require("express");
const { doctorsignup } = require("../controllers/doctorsCotroller");

const router = express.Router();

router.route("/").get(doctorsignup);

module.exports = router;


