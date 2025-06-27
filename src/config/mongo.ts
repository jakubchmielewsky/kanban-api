import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(async () => {
      console.log("🚀 Connected to MongoDB");

      // await Promise.all([
      //   Board.syncIndexes(),
      //   List.syncIndexes(),
      //   Card.syncIndexes(),
      // ]);

      // console.log("Indexes synchronized");
    })
    .catch((error: any) => {
      console.error("💥 MongoDB connection failed:", error.message);
    });
}
