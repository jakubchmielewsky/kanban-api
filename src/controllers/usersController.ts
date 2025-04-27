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
    const newMemberId = req.body.newMemberId;

    if (!boardId) return next(new AppError("Board ID required", 400));
    if (!newMemberId) return next(new AppError("Member ID required", 400));

    const board = await Board.findById(boardId).select("membersIds");

    if (!board) {
      return next(new AppError("Board not found", 404));
    }

    console.log(board);

    if (board.membersIds.includes(newMemberId)) {
      return next(new AppError("User already a member of the board", 400));
    }

    board.membersIds.push(newMemberId);
    await board.save();

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
