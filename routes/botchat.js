const express = require("express");
const { botcontroller } = require("../controllers/botController");

const router = express.Router();

router.route("/").get(botcontroller);

module.exports = router;