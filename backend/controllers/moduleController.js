const asyncHandler = require("express-async-handler");

const Module = require("../models/moduleModel");
const User = require("../models/userModel");

// @desc    Get modules
// @route   GET /api/modules
// @access  Private
const getModules = asyncHandler(async (req, res) => {
  const modules = await Module.find({ user: req.user.id });

  res.status(200).json(modules);
});

// @desc    Set modules
// @route   POST /api/modules
// @access  Private
const setModule = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const module = await Module.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(module);
});

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private
const updateModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id);

  if (!module) {
    res.status(400);
    throw new Error("Module not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the module user
  if (module.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedModule = await Module.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedModule);
});

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private
const deleteModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id);

  if (!module) {
    res.status(400);
    throw new Error("Module not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the module user
  if (module.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await module.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getModules,
  setModule,
  updateModule,
  deleteModule,
};
