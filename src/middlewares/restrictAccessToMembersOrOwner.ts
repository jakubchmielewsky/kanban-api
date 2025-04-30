import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Board from "../models/BoardModel";
import mongoose from "mongoose";
import AppError from "../utils/AppError";

const restrictAccessToMembersOrOwner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.id;
    const userId = res.locals.user._id;

    if (!boardId) return next();

    const board = await Board.findById(boardId).select("membersIds ownerId");

    if (!board) {
      return next(new AppError("Board not found", 404));
    }

    const isOwner = board.ownerId.equals(userId as mongoose.Types.ObjectId);
    const isMember = board.membersIds.some((id) =>
      id.equals(userId as mongoose.Types.ObjectId)
    );

    if (!isOwner && !isMember) {
      return next(new AppError("You do not have access to this board", 403));
    }

    next();
  }
);

export default restrictAccessToMembersOrOwner;
