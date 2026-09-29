const express = require("express");

const {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in user profile update
router.put("/profile", protect, updateProfile);

// Public profile
router.get("/:id", getUserProfile);

router.post("/:id/follow", protect, followUser);
router.delete("/:id/follow", protect, unfollowUser);


module.exports = router;