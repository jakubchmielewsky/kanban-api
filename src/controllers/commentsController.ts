import CommentService from "../services/CommentService";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const getTaskComments = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const comments = await CommentService.findAll(taskId);
    res.status(200).json({ status: "success", data: comments });
  }
);

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { teamId, taskId } = req.params;
    const { content } = req.body;
    const authorId = req.user?.id;

    if (!authorId) return next(new AppError("UserId must be specified", 401));

    const comment = await CommentService.create({
      teamId,
      content,
      taskId,
      authorId,
    });
    res.status(201).json({ status: "success", data: comment });
  }
);

export const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const commentUpdateAuthor = req.user?.id;
    const { content } = req.body;

    if (!commentUpdateAuthor)
      return next(new AppError("UserId must be specified", 401));

    const comment = await CommentService.update(
      commentId,
      commentUpdateAuthor,
      content
    );
    res.status(200).json({ status: "success", data: comment });
  }
);

export const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const commentUpdateAuthor = req.user?.id;

    if (!commentUpdateAuthor)
      return next(new AppError("UserId must be specified", 401));

    await CommentService.remove(commentId, commentUpdateAuthor);
    res.status(204).send();
  }
);
