import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";

dotenv.config({ path: ".env" });

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught exception:", err);
  process.exit(1);
});

import app from "./app";

connectDB();

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(` New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(` Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

const server = httpServer.listen(PORT, () => {
  console.log(`🚀 Server started listening on port ${PORT}...`);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled rejection:", reason);
  server.close(() => {
    io.close(() => {
      process.exit(1);
    });
  });
});
