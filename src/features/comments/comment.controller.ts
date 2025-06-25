import { create, findAll, remove, update } from "./comment.service";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const getCardComments = catchAsync(
  async (req: Request, res: Response) => {
    const cardId = req.params.cardId;

    const comments = await findAll(cardId);
    res.status(200).json({ status: "success", data: comments });
  }
);

export const createComment = catchAsync(async (req: Request, res: Response) => {
  const { teamId, cardId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  const comment = await create(
    {
      teamId,
      content,
      cardId,
      authorId,
    },
    req.user
  );
  res.status(201).json({ status: "success", data: comment });
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const commentUpdateAuthor = req.user.id;
  const { content } = req.body;

  const comment = await update(
    commentId,
    commentUpdateAuthor,
    content,
    req.user
  );
  res.status(200).json({ status: "success", data: comment });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const commentUpdateAuthor = req.user.id;

  await remove(commentId, commentUpdateAuthor, req.user);
  res.status(204).send();
});
