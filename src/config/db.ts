import mongoose from "mongoose";
import Board from "../models/BoardModel";
import Column from "../models/ColumnModel";
import Task from "../models/TaskModel";

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(async () => {
      console.log("🚀 MongoDB connected successfully!");

      // await Promise.all([
      //   Board.syncIndexes(),
      //   Column.syncIndexes(),
      //   Task.syncIndexes(),
      // ]);

      // console.log("Indexes synchronized");
    })
    .catch((error: any) => {
      console.error("💥 MongoDB connection failed:", error.message);
    });
}
