import mongoose from "mongoose";
import List from "./list.model";
import { CreateListInput, UpdateListInput } from "./list.types";
import { cascadeDeleteList } from "../../utils/cascadeDelete";

export const findAll = async (boardId: string) => {
  return await List.find({ boardId }).lean();
};

export const create = async (data: CreateListInput) => {
  return await List.create(data);
};

export const update = async (listId: string, updates: UpdateListInput) => {
  return await List.findByIdAndUpdate(listId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  });
};

export const remove = async (listId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteList(new mongoose.Types.ObjectId(listId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
