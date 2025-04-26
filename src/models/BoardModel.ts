import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Board name is required"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Board must belong to a owner"],
    },
    membersIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.index({ ownerId: 1 });
boardSchema.index({ membersIds: 1 });

boardSchema.path("createdAt").select(false);

const Board = mongoose.model("board", boardSchema);
export default Board;
