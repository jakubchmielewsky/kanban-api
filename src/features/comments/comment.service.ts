import Activity from "../activities/activity.model";
import Comment from "./comment.model";
import AppError from "../../utils/AppError";

export const findAll = (cardId: string) => {
  return Comment.find({ cardId }).populate("authorId").lean();
};

export const create = async (
  data: {
    cardId: string;
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
