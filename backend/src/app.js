import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";


import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: "40kb",extended: true}));


app.get("/home", (req, res) => {
    res.send("Hello world!");
})

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: req.message
    })
})

const start = async () => { 
    const connectDB = await mongoose.connect("mongodb://127.0.0.1:27017/apnacall")
    console.log(`DB Connected: ${connectDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("PORT Sucessfully Running!");
    })
}

start();