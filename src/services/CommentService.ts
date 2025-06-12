import Activity from "../models/ActivityModel";
import Comment from "../models/CommentModel";
import AppError from "../utils/AppError";

export const findAll = (taskId: string) => {
  return Comment.find({ taskId }).populate("authorId").lean();
};

export const create = async (
  data: {
    taskId: string;
    teamId: string;
    authorId: string;
    content: string;
  },
  user: Express.User
) => {
  const comment = await Comment.create(data);

  await Activity.create({
    teamId: comment.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Comment.modelName,
    targetEntityId: comment._id,
  });

  return comment;
};

export const update = async (
  commentId: string,
  authorId: string,
  content: string,
  user: Express.User
) => {
  const comment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      authorId,
    },
    { content },
    { new: true, runValidators: true, lean: true }
  );

  if (!comment) {
    throw new AppError("Comment not found or you are not the author", 403);
  }

  await Activity.create({
    teamId: comment.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Comment.modelName,
    targetEntityId: comment._id,
  });

  return comment;
};

export const remove = async (
  commentId: string,
  authorId: string,
  user: Express.User
) => {
  const comment = await Comment.findOneAndDelete({
    _id: commentId,
    authorId,
  }).lean();

  if (!comment) {
    throw new AppError("Comment not found or you are not the author", 403);
  }

  await Activity.create({
    teamId: comment.teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Comment.modelName,
    targetEntityId: comment._id,
  });

  return comment;
};
