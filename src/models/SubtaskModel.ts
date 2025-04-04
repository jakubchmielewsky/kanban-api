import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Subtask title is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    required: [true, "Subtask must belong to a task"],
  },
});

const Subtask = mongoose.model("subtask", subtaskSchema);
export default Subtask;
