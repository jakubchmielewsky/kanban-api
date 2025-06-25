import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "comment must belong to a card"],
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

commentSchema.index({ cardId: 1 });
commentSchema.index({ cardId: 1, authorId: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
