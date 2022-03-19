const express = require("express");
const {blogGetDetails}  = require("../controllers/blogController");
const router = express.Router();


router.route("/").get(blogGetDetails);

module.exports = router;

