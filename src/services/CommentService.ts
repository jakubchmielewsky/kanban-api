import Comment from "../models/CommentModel";
import AppError from "../utils/AppError";

export const findAll = (taskId: string) => {
  return Comment.find({ taskId }).populate("authorId").lean();
};

export const create = (data: {
  taskId: string;
  teamId: string;
  authorId: string;
  content: string;
}) => {
  return Comment.create(data);
};

export const update = async (
  commentId: string,
  authorId: string,
  content: string
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

  return comment;
};

export const remove = async (commentId: string, authorId: string) => {
  const comment = await Comment.findOneAndDelete({
    _id: commentId,
    authorId,
  }).lean();

  if (!comment) {
    throw new AppError("Comment not found or you are not the author", 403);
  }

  return comment;
};
