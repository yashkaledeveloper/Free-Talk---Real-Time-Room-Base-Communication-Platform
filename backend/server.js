require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const app = require("./app");
const connectDB = require("./config/db");

const server = http.createServer(app);

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    credentials: true
  }
});

io.on("connection", (socket) => {

  // console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {

    socket.join(roomId);

    // console.log(`${socket.id} joined room ${roomId}`);

    socket.to(roomId).emit("user-joined", {
      socketId: socket.id
    });
    
  });


  // SEND MESSAGE
  // socket.on("send-msg", (data) => {

  //   console.log("Message received:", data);

  //   io.to(data.roomId).emit("receive-msg", {content: data.content, username: data.username})

  // });

  socket.on("send-msg", async (data) => {
    try {
      // console.log("Received message:", data);
      

      const newMessage = await Message.create({
        sender: data.senderId,
        room: data.roomId,
        content: data.content
      });

      const populatemsg = await Message.findById(newMessage).populate("sender","name")
      
      // console.log("Saved message:", newMessage);

      // console.log(newMessage.populate("sender"));
      

      io.to(data.roomId).emit("receive-msg", populatemsg);

    } catch (err) {
      console.error("MESSAGE ERROR:", err);
    }
  });


  // LEAVE ROOM
  socket.on("leave-room", (roomId) => {

    socket.leave(roomId);

    console.log(`${socket.id} left room ${roomId}`);

    socket.to(roomId).emit("user-left", {
      socketId: socket.id
    });

  });

});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});