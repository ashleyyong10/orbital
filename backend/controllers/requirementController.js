const asyncHandler = require("express-async-handler");
const Requirement = require("../models/requirementModel");

// @desc    Get requirements
// @route   GET /api/requirements
// @access  Public

const getRequirement = asyncHandler(async (req, res) => {
    const {major} = req.query
    const requirements = await Requirement.find({major: major });
    console.log(major)
    console.log(requirements)
    res.status(200).json(requirements);
  });

  module.exports = {
    getRequirement,
  }