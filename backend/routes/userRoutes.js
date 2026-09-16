const express = require("express");

const {
  getUserProfile,
  updateProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in user profile update
router.put("/profile", protect, updateProfile);

// Public profile
router.get("/:id", getUserProfile);


module.exports = router;