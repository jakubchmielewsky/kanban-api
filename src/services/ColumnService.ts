import mongoose from "mongoose";
import Column from "../models/ColumnModel";
import { cascadeDeleteColumn } from "../utils/cascadeDelete";

export const findAll = async (boardId: string) => {
  return await Column.find({ boardId }).lean();
};

export const create = async (data: {
  teamId: string;
  boardId: string;
  name: string;
}) => {
  return await Column.create(data);
};

export const update = async (
  columnId: string,
  updates: { name: string; order: number }
) => {
  return await Column.findByIdAndUpdate(columnId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  });
};

export const remove = async (columnId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteColumn(new mongoose.Types.ObjectId(columnId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
