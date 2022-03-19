const express = require("express");
const { music } = require("../controllers/musicController");


const router = express.Router();

router.route("/").get(music);

module.exports = router;


