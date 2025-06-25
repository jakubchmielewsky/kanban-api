import mongoose from "mongoose";
import Board from "./board.model";
import { cascadeDeleteBoard } from "../../utils/cascadeDelete";
import Activity from "./board.model";
import AppError from "../../utils/AppError";

export const findAll = async (teamId: string) => {
  return await Board.find({ teamId }).lean();
};

export const create = async (
  teamId: string,
  name: string,
  user: Express.User
) => {
  const board = await Board.create({ teamId, name });
  await Activity.create({
    teamId: board.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Board.modelName,
    targetEntityId: board._id,
    targetEntityName: board.name,
  });
  return board;
};

export const update = async (
  boardId: string,
  name: string,
  user: Express.User
) => {
  const board = await Board.findByIdAndUpdate(
    boardId,
    { name },
    {
      new: true,
      runValidators: true,
      lean: true,
    }
  );

  if (!board) {
    throw new AppError("Board not found", 404);
  }

  await Activity.create({
    teamId: board.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Board.modelName,
    targetEntityId: board._id,
    targetEntityName: board.name,
  });

  return board;
};

export const remove = async (
  boardId: string,
  teamId: string,
  user: Express.User
) => {
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

  if (!board) {
    throw new AppError("Board not found", 404);
  }

  await Activity.create({
    teamId: teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Board.modelName,
    targetEntityId: boardId,
    targetEntityName: board.name,
  });
};
