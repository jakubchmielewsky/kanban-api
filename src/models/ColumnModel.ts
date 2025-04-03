import mongoose, { Schema } from "mongoose";

const columnSchema = new Schema({
  name: {
    type: String,
    required: [true, "Column name is required"],
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
    required: [true, "Column must belong to a board"],
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "task",
  },
});

const Column = mongoose.model("column", columnSchema);
export default Column;
