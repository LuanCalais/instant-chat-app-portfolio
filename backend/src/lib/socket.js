import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const onlineUsersSocket = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsersSocket[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(onlineUsersSocket));

  socket.on("disconnect", () => {
    delete onlineUsersSocket[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsersSocket));
  });
});

const getReceiverSocketId = (receiverId) => {
  return onlineUsersSocket[receiverId];
};

export { server, io, app, getReceiverSocketId };
