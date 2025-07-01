import mongoose from "mongoose";
import Board from "./board.model";
import { cascadeDeleteBoard } from "../../utils/cascadeDelete";
import Activity from "./board.model";
import AppError from "../../utils/AppError";
import { CreateBoardPayload, UpdateBoardPayload } from "./board.types";

export const findAll = async (teamId: string) => {
  return await Board.find({ teamId }).lean();
};

export const create = async ({ teamId, name }: CreateBoardPayload) => {
  return await Board.create({ teamId, name });
};

export const update = async ({ boardId, name }: UpdateBoardPayload) => {
  return await Board.findByIdAndUpdate(
    boardId,
    { name },
    {
      new: true,
      runValidators: true,
      lean: true,
    }
  );
};

export const remove = async (boardId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let board;
  try {
    board = await cascadeDeleteBoard(
      new mongoose.Types.ObjectId(boardId),
      session
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
