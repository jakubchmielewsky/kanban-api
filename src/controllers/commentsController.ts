import { createOne, deleteOne, updateOne, getAll } from "./handlerFactory";
import Comment from "../models/CommentModel";

export const getTaskComments = getAll(Comment);
export const createComment = createOne(Comment);
export const updateComment = updateOne(Comment);
export const deleteComment = deleteOne(Comment);
