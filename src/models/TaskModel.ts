import mongoose, { Schema, Model } from "mongoose";
import { SubtaskInterface } from "../interfaces/SubtaskInterface";
import { TaskInterface } from "../interfaces/TaskInterface";
import { TaskDocument } from "../interfaces/TaskDocument";

const subtaskSchema = new Schema<SubtaskInterface>({
  title: {
    type: String,
    required: [true, "Subtask title is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: [true, "Task must belong to a column"],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Task must belong to a board"],
    },
    subtasks: [subtaskSchema],
    order: Number,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must have author"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    labels: {
      type: [Schema.Types.ObjectId],
      ref: "Label",
    },
  },
  {
    timestamps: true,
  }
);

//TODO: in the future add assigned members and deadline date

taskSchema.index({ boardId: 1 });
taskSchema.index({ columnId: 1, order: 1 });

taskSchema.path("createdAt").select(false);

taskSchema.pre<TaskDocument>("save", async function (next) {
  if (!this.isNew || (this.order !== undefined && this.order !== null)) {
    return next();
  }

  try {
    const maxOrderTask = await mongoose
      .model<TaskDocument>("Task")
      .findOne({ columnId: this.columnId })
      .sort("-order")
      .select("order");

    this.order = maxOrderTask ? maxOrderTask.order! + 1024 : 1024;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const Task = mongoose.model<TaskDocument>("Task", taskSchema);

export default Task;
