import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "comment must belong to a task"],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "comment must belong to a user"],
    },
    content: String,
  },
  { timestamps: true }
);

commentSchema.index({ taskId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
