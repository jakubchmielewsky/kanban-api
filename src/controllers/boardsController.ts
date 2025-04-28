import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from "./handlerFactory";
import Board from "../models/BoardModel";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const getAllBoards = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user.id;

    const docs = await Board.find({
      $or: [{ ownerId: userId }, { membersIds: { $in: [userId] } }],
    });

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  }
);

export const getBoard = getOne(Board);
export const createBoard = createOne(Board);
export const updateBoard = updateOne(Board);
export const deleteBoard = deleteOne(Board);
