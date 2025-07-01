import * as CommentService from "./comment.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getCardComments = catchAsync(
  async (req: Request, res: Response) => {
    const cardId = req.params.cardId;

    const comments = await CommentService.findAll(cardId);
    res.status(200).json({ status: "success", data: comments });
  }
);

export const createComment = catchAsync(async (req: Request, res: Response) => {
  const { teamId, cardId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  const comment = await CommentService.createComment({
    teamId,
    cardId,
    content,
    authorId,
  });

  res.status(201).json({ status: "success", data: comment });
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  const comment = await CommentService.updateComment({
    commentId,
    authorId,
    content,
  });

  res.status(200).json({ status: "success", data: comment });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const authorId = req.user.id;

  await CommentService.deleteComment({
    commentId,
    authorId,
  });

  res.status(204).send();
});
