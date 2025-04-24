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
});

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "column",
    required: [true, "Task must belong to a column"],
  },
  subtasks: [subtaskSchema],
});

const Task = mongoose.model("task", taskSchema);
export default Task;
