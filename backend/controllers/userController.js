const User = require("../models/User");

// =========================
// GET USER PROFILE
// =========================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -email");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =========================
// UPDATE MY PROFILE
// =========================
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const {
      name,
      username,
      avatar,
      bio,
    } = req.body;

    // Update only provided fields
    if (name !== undefined) {
      user.name = name;
    }

    if (username !== undefined) {
      user.username = username.toLowerCase();
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        friends: user.friends,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    // Duplicate username
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  getUserProfile,
  updateProfile,
};