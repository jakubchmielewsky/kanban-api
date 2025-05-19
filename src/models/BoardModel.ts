import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "board must belong to a team"],
    },
    name: {
      type: String,
      required: [true, "Board name is required"],
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.index({ teamId: 1 });
boardSchema.index({ teamId: 1, name: 1 }, { unique: true });

boardSchema.path("createdAt").select(false);
boardSchema.path("updatedAt").select(false);

const Board = mongoose.model("Board", boardSchema);
export default Board;
