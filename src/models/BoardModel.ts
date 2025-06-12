import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "board must belong to a team"],
  },
  name: {
    type: String,
    required: [true, "Board name is required"],
  },
});

boardSchema.index({ _id: 1, teamId: 1 });
boardSchema.index({ teamId: 1, name: 1 }, { unique: true });

const Board = mongoose.model("Board", boardSchema);
export default Board;
