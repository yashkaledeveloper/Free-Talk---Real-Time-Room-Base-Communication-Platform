const express = require("express");

const {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFriends,
  getallUsers,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in user profile update
router.put("/profile", protect, updateProfile);

router.get("/allusers", protect, getallUsers)

router.get("/followers", protect, getFollowers);
router.get("/following", protect, getFollowing);
router.get("/friends", protect, getFriends);

// Public profile
router.get("/:id", getUserProfile);

router.post("/:id/follow", protect, followUser);
router.delete("/:id/follow", protect, unfollowUser);

module.exports = router;