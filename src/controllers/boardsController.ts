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
    const userId = res.locals.user._id;

    const docs = await Board.find({
      //$or: [{ owner: userId }, { members: userId }], members functionality will be added in future
      owner: userId,
    });

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  }
);

export const getBoard = getOne(Board);
export const createBoard = createOne(Board);
export const updateBoard = updateOne(Board);
export const deleteBoard = deleteOne(Board);
