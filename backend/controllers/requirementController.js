const asyncHandler = require("express-async-handler");
const Requirement = require("../models/requirementModel");

const getCore = asyncHandler(async (req, res) => {
    const requirements = await Requirement.find({ major: req.major });
  
    res.status(200).json(requirements);
  });

  module.exports = {
    getCore,
  }