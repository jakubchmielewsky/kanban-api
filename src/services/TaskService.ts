import mongoose from "mongoose";
import { CreateTaskInput } from "../interfaces/task/CreateTaskInput";
import { UpdateTaskInput } from "../interfaces/task/UpdateTaskInput";
import Task from "../models/TaskModel";
import { cascadeDeleteTask } from "../utils/cascadeDelete";

class TaskService {
  async findAll(boardId: string) {
    return await Task.aggregate([
      {
        $match: { boardId: new mongoose.Types.ObjectId(boardId) },
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
  }

  async findOne(taskId: string) {
    return await Task.findById(taskId).populate("labels").lean();
  }

  async create(data: CreateTaskInput) {
    return await Task.create(data);
  }

  async update(taskId: string, updates: UpdateTaskInput) {
    return await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
      lean: true,
    }).populate("labels");
  }

  async remove(taskId: string) {
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
  }
}

export default new TaskService();
