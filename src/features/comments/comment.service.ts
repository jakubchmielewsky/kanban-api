import Comment from "./comment.model";
import {
  CreateCommentInput,
  DeleteCommentInput,
  UpdateCommentInput,
} from "./comment.types";

export const findAll = (cardId: string) => {
  return Comment.find({ cardId }).populate("authorId").lean();
};

export const createComment = async (input: CreateCommentInput) => {
  return await Comment.create(input);
};

export const updateComment = async ({
  commentId,
  authorId,
  content,
}: UpdateCommentInput) => {
  return await Comment.findOneAndUpdate(
    { _id: commentId, authorId },
    { content },
    { new: true, runValidators: true, lean: true }
  );
};

export const deleteComment = async ({
  commentId,
  authorId,
}: DeleteCommentInput) => {
  return await Comment.findOneAndDelete({
    _id: commentId,
    authorId,
  }).lean();
};
