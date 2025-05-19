import CommentService from "../services/CommentService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getTaskComments = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const comments = await CommentService.findAll({ taskId });
    res.status(200).json({ status: "success", data: comments });
  }
);

export const createComment = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const authorId = res.locals.user.id;
  const comment = await CommentService.create({
    ...req.body,
    taskId,
    authorId,
  });
  res.status(201).json({ status: "success", data: comment });
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const comment = await CommentService.update(commentId, req.body);
  res.status(200).json({ status: "success", data: comment });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  await CommentService.remove(commentId);
  res.status(204).send();
});
