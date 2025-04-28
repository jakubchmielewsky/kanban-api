import mongoose from "mongoose";
import Board from "../models/BoardModel";
import User from "../models/UserModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { getOne } from "./handlerFactory";
import { Request, Response, NextFunction } from "express";

export const getUser = getOne(User);

export const getBoardMembers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.id;

    if (!boardId) return next(new AppError("Board ID required", 400));

    const board = await Board.findById(boardId).select("membersIds").populate({
      path: "membersIds",
      select: "email _id",
    });

    if (!board) return next(new AppError("Board not found", 404));

    const members = board.membersIds;

    res.status(200).json({
      status: "success",
      results: members.length,
      data: members,
    });
  }
);

export const addBoardMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.id;
    const { newMemberEmail } = req.body;

    const board = await Board.findById(boardId).select("membersIds");
    if (!board) {
      return next(new AppError("Board not found", 404));
    }

    const user = await User.findOne({ email: newMemberEmail });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isAlreadyMember = board.membersIds.some((memberId) =>
      memberId.equals(user._id as mongoose.Types.ObjectId)
    );
    if (isAlreadyMember) {
      return next(new AppError("User is already a member of the board", 400));
    }

    board.membersIds.push(user._id as mongoose.Types.ObjectId);
    await board.save();

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);

export const removeBoardMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.id;
    const { memberEmail } = req.body;

    const board = await Board.findById(boardId).select("membersIds");

    if (!board) {
      return next(new AppError("Board not found", 404));
    }

    const user = await User.findOne({ email: memberEmail });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isMember = board.membersIds.some((id) =>
      id.equals(user._id as mongoose.Types.ObjectId)
    );
    if (!isMember) {
      return next(new AppError("User is not a member of this board", 400));
    }

    board.membersIds = board.membersIds.filter(
      (id) => !id.equals(user._id as mongoose.Types.ObjectId)
    );
    await board.save();
    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
