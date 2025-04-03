import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Board name is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Board must belong to a owner"],
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  columns: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "column",
  },
});

const Board = mongoose.model("board", boardSchema);
export default Board;
