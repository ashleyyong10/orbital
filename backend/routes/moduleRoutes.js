const express = require("express");
const router = express.Router();
const {
  getModules,
  setModule,
  updateModule,
  deleteModule,
} = require("../controllers/moduleController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getModules).post(protect, setModule);
router.route("/:id").delete(protect, deleteModule).put(protect, updateModule);

module.exports = router;
