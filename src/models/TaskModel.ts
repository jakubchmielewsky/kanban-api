import mongoose, { Schema } from "mongoose";
import { TaskDocument } from "../interfaces/task/ITask";

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
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Task must belong to a team"],
    },
    order: Number,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must have author"],
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

taskSchema.index({ columnId: 1 });

taskSchema.path("createdAt").select(false);
//taskSchema.path("updatedAt").select(false);

taskSchema.pre("save", async function (next) {
  if (!this.isNew || (this.order !== undefined && this.order !== null)) {
    return next();
  }

  try {
    const maxOrderTask = await mongoose
      .model<TaskDocument>("Task")
      .findOne({ columnId: this.columnId })
      .sort("-order")
      .select("order")
      .lean();

    this.order = maxOrderTask ? maxOrderTask.order! + 1024 : 1024;
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
