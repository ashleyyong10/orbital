const express = require("express");
const router = express.Router();
const {
  getCore,
} = require("../controllers/requirementController");

router.route("/core").get(getCore)

module.exports = router;