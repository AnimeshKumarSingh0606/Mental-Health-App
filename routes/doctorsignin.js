const express = require("express");
const { doctorsignin } = require("../controllers/doctorsCotroller");

const router = express.Router();

router.route("/").get(doctorsignin);

module.exports = router;


