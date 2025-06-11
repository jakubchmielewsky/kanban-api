import mongoose from "mongoose";
import Board from "../models/BoardModel";
import { cascadeDeleteBoard } from "../utils/cascadeDelete";

export const findAll = async (teamId: string) => {
  return await Board.find({ teamId }).lean();
};

export const create = async (teamId: string, name: string) => {
  return await Board.create({ teamId, name });
};

export const update = async (boardId: string, name: string) => {
  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    { name },
    {
      new: true,
      runValidators: true,
      lean: true,
    }
  );

  return updatedBoard;
};

export const remove = async (boardId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteBoard(new mongoose.Types.ObjectId(boardId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
