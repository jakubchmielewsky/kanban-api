import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "comment must belong to a task"],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Comment must belong to a team"],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "comment must belong to a user"],
    },
    content: {
      type: String,
      required: [true, "comment must have a content"],
    },
  },
  { timestamps: true }
);

commentSchema.index({ taskId: 1 });
commentSchema.index({ taskId: 1, authorId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
