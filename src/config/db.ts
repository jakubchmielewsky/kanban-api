import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("✅ MongoDB connected successfully!");
    })
    .catch((error: any) => {
      console.error("💥 MongoDB connection failed:", error.message);
    });
}
