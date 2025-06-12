import mongoose from "mongoose";
import { CreateTaskInput } from "../interfaces/task/CreateTaskInput";
import { UpdateTaskInput } from "../interfaces/task/UpdateTaskInput";
import Task from "../models/TaskModel";
import { cascadeDeleteTask } from "../utils/cascadeDelete";
import Activity from "../models/ActivityModel";
import AppError from "../utils/AppError";

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

export const create = async (data: CreateTaskInput, user: Express.User) => {
  const task = await Task.create(data);
  await Activity.create({
    teamId: task.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Task.modelName,
    targetEntityId: task._id,
  });

  return task;
};

export const update = async (
  taskId: string,
  updates: UpdateTaskInput,
  user: Express.User
) => {
  const task = await Task.findByIdAndUpdate(taskId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  }).populate("labels");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await Activity.create({
    teamId: task.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Task.modelName,
    targetEntityId: task._id,
  });

  return task;
};

export const remove = async (
  taskId: string,
  teamId: string,
  user: Express.User
) => {
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

  await Activity.create({
    teamId: teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Task.modelName,
    targetEntityId: taskId,
  });
};
