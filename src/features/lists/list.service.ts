import mongoose from "mongoose";
import List from "./list.model";
import { cascadeDeleteList } from "../../utils/cascadeDelete";
import Activity from "../activities/activity.model";
import AppError from "../../utils/AppError";

export const findAll = async (boardId: string) => {
  return await List.find({ boardId }).lean();
};

export const create = async (
  data: {
    teamId: string;
    boardId: string;
    name: string;
  },
  user: Express.User
) => {
  const list = await List.create(data);
  await Activity.create({
    teamId: list.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: List.modelName,
    targetEntityId: list._id,
    targetEntityName: list.name,
  });
  return list;
};

export const update = async (
  listId: string,
  updates: { name: string; order: number },
  user: Express.User
) => {
  const list = await List.findByIdAndUpdate(listId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  });

  if (!list) {
    throw new AppError("List not found", 404);
  }

  await Activity.create({
    teamId: list.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: List.modelName,
    targetEntityId: list._id,
    targetEntityName: list.name,
  });

  return list;
};

export const remove = async (
  listId: string,
  teamId: string,
  user: Express.User
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let list;
  try {
    list = await cascadeDeleteList(
      new mongoose.Types.ObjectId(listId),
      session
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  if (!list) {
    throw new AppError("List not found", 404);
  }

  await Activity.create({
    teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: List.modelName,
    targetEntityId: listId,
    targetEntityName: list.name,
  });
};
