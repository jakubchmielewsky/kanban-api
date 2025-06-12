import mongoose from "mongoose";
import Column from "../models/ColumnModel";
import { cascadeDeleteColumn } from "../utils/cascadeDelete";
import Activity from "../models/ActivityModel";
import AppError from "../utils/AppError";

export const findAll = async (boardId: string) => {
  return await Column.find({ boardId }).lean();
};

export const create = async (
  data: {
    teamId: string;
    boardId: string;
    name: string;
  },
  user: Express.User
) => {
  const column = await Column.create(data);
  await Activity.create({
    teamId: column.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Column.modelName,
    targetEntityId: column._id,
    targetEntityName: column.name,
  });
  return column;
};

export const update = async (
  columnId: string,
  updates: { name: string; order: number },
  user: Express.User
) => {
  const column = await Column.findByIdAndUpdate(columnId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  });

  if (!column) {
    throw new AppError("Column not found", 404);
  }

  await Activity.create({
    teamId: column.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Column.modelName,
    targetEntityId: column._id,
    targetEntityName: column.name,
  });

  return column;
};

export const remove = async (
  columnId: string,
  teamId: string,
  user: Express.User
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let column;
  try {
    column = await cascadeDeleteColumn(
      new mongoose.Types.ObjectId(columnId),
      session
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (!column) {
    throw new AppError("Column not found", 404);
  }

  await Activity.create({
    teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Column.modelName,
    targetEntityId: columnId,
    targetEntityName: column.name,
  });
};
