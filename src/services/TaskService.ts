import mongoose from "mongoose";
import { CreateTaskInput } from "../interfaces/task/CreateTaskInput";
import { UpdateTaskInput } from "../interfaces/task/UpdateTaskInput";
import Task from "../models/TaskModel";
import { cascadeDeleteTask } from "../utils/cascadeDelete";

export const findAll = async (columnId: string) => {
  return await Task.aggregate([
    {
      $match: { columnId: new mongoose.Types.ObjectId(columnId) },
    },
    {
      $lookup: {
        from: "labels",
        localField: "labels",
        foreignField: "_id",
        as: "labels",
      },
    },
  ]);
};

export const findOne = async (taskId: string) => {
  return await Task.findById(taskId).populate("labels").lean();
};

export const create = async (data: CreateTaskInput) => {
  return await Task.create(data);
};

export const update = async (taskId: string, updates: UpdateTaskInput) => {
  return await Task.findByIdAndUpdate(taskId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  }).populate("labels");
};

export const remove = async (taskId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteTask(new mongoose.Types.ObjectId(taskId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
