const Room = require("../models/Room");

// ========================================
// CREATE ROOM
// POST /api/rooms
// ========================================
const createRoom = async (req, res) => {
    try {
        const {
            name,
            description,
            topic,
            language,
            level,
            maxUsers,
            isPrivate,
        } = req.body;

        // Basic validation
        if (!name || !topic || !language) {
            return res.status(400).json({
                message: "Name, topic and language are required",
            });
        }

        // Create room
        const room = await Room.create({
            name,
            description,
            topic,
            language,
            level,
            maxUsers,
            isPrivate,
            admin: req.user.userId,
            members: [req.user.userId],
        });

        res.status(201).json({
            message: "Room created successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create room",
            error: error.message,
        });
    }
};


// ========================================
// GET ALL ROOMS
// GET /api/rooms
// ========================================
const getRooms = async (req, res) => {
    try {
        const { search, language, topic, level } = req.query;

        // Build filter dynamically
        const filter = {};

        // Search by room name, description or topic
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { topic: { $regex: search, $options: "i" } },
            ];
        }

        // Filters
        if (language) {
            filter.language = language;
        }

        if (topic) {
            filter.topic = topic;
        }

        if (level) {
            filter.level = level;
        }

        const rooms = await Room.find(filter)
            .populate("admin", "name username avatar")
            .populate("members", "name username avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: rooms.length,
            rooms,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch rooms",
            error: error.message,
        });
    }
};


// ========================================
// GET SINGLE ROOM
// GET /api/rooms/:id
// ========================================
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate("admin", "name username avatar bio")
            .populate("members", "name username avatar");

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        res.status(200).json({
            room,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch room",
            error: error.message,
        });
    }
};


// ========================================
// JOIN ROOM
// POST /api/rooms/:id/join
// ========================================
const joinRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // Check if already a member
        
        const alreadyMember = room.members.some(
            (memberId) => memberId.toString() === req.user.userId.toString()
        );

       
        if (alreadyMember) {
            return res.status(400).json({
                message: "You are already a member of this room",
            });
        }

        // Check room capacity
        if (room.members.length >= room.maxUsers) {
            return res.status(400).json({
                message: "Room is full",
            });
        }

        // Check private room
        if (room.isPrivate) {
            return res.status(403).json({
                message: "This is a private room",
            });
        }

        room.members.push(req.user.userId);

        await room.save();

        res.status(200).json({
            message: "Joined room successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to join room",
            error: error.message,
        });
    }
};


// ========================================
// LEAVE ROOM
// POST /api/rooms/:id/leave
// ========================================
const leaveRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // Check membership
        const isMember = room.members.some(
            (memberId) => memberId.toString() === req.user.userId.toString()
        );

        if (!isMember) {
            return res.status(400).json({
                message: "You are not a member of this room",
            });
        }

        // Admin cannot leave directly
        if (room.admin.toString() === req.user.userId.toString()) {
            return res.status(400).json({
                message: "Room admin cannot leave the room. Delete the room instead.",
            });
        }

        // Remove user from members
        room.members = room.members.filter(
            (memberId) => memberId.toString() !== req.user.userId.toString()
        );

        await room.save();

        res.status(200).json({
            message: "Left room successfully",
            room,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to leave room",
            error: error.message,
        });
    }
};


// ========================================
// DELETE ROOM
// DELETE /api/rooms/:id
// ========================================
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        // Only admin can delete
        if (room.admin.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "Only room admin can delete the room",
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Room deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete room",
            error: error.message,
        });
    }
};


module.exports = {
    createRoom,
    getRooms,
    getRoomById,
    joinRoom,
    leaveRoom,
    deleteRoom,
};
