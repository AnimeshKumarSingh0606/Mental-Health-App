const express = require("express");
const { blogGetSingle }  = require("../controllers/blogController");
const router = express.Router();


router.route("/").get(blogGetSingle);

module.exports = router;
