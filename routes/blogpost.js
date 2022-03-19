const express = require("express");
const { blogPost }  = require("../controllers/blogController");
const router = express.Router();


router.route("/").get(blogPost);

module.exports = router;
