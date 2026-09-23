const express = require("express");

const {
  createRoom,
  getRooms,
  getRoomById,
  joinRoom,
  leaveRoom,
  deleteRoom,
  getRoomMessages,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// ROOM ROUTES
// ========================================

// Create a new room
router.post("/", protect, createRoom);

// Get all rooms + search + filters
router.get("/", protect, getRooms);

// Get single room
router.get("/:id", protect, getRoomById);

// Join room
router.post("/:id/join", protect, joinRoom);

// Leave room
router.post("/:id/leave", protect, leaveRoom);

// get room messages
router.get("/:id/msg", getRoomMessages)

// Delete room
router.delete("/:id", protect, deleteRoom);



module.exports = router;