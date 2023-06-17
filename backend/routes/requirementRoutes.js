const express = require("express");
const router = express.Router();
const {
  getRequirement,
} = require("../controllers/requirementController");

router.route("/").get(getRequirement)

module.exports = router;