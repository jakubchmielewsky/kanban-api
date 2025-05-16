import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Board name is required"],
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.index({ ownerId: 1 });

boardSchema.path("createdAt").select(false);

const Board = mongoose.model("board", boardSchema);
export default Board;
