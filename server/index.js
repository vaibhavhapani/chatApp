const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const PORT = process.env.PORT | 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected. id: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", data);
    await pub.publish(`${data.room}`, data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected. id: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
