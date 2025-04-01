import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config({ path: ".env" });

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught exception:", err);
  process.exit(1);
});

import app from "./app";

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}...`);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled rejection:", reason);
  server.close(() => {
    process.exit(1);
  });
});
