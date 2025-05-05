import { getAll, deleteOne, updateOne, getOne } from "./handlerFactory";
import Task from "../models/TaskModel";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { io } from "../server";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import { cascadeDelete } from "../utils/cascadeDelete";

export const getAllTasks = getAll(Task);

export const getTask = getOne(Task);

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...res.locals.parentReference };

    const task = await Task.create(data);

    io.to(task.boardId.toString()).emit("task_created", task);

    res.status(201).json({
      status: "success",
      data: task,
    });
  }
);
export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return next(new AppError("No document found with that ID", 404));
    }

    const socketId = req.headers["x-socket-id"];

    if (typeof socketId === "string") {
      io.to(task.boardId.toString())
        .except(socketId)
        .emit("task_updated", task);
    }

    res.status(200).json({
      status: "success",
      data: {
        data: task,
      },
    });
  }
);
export const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const task = await Task.findById(req.params.id).session(session);

      if (!task) {
        await session.abortTransaction();
        return next(new AppError("No document found with that ID", 404));
      }

      await cascadeDelete(session, Task, req.params.id);

      await Task.findByIdAndDelete(req.params.id).session(session);

      await session.commitTransaction();

      const socketId = req.headers["x-socket-id"];

      if (typeof socketId === "string") {
        io.to(task.boardId.toString())
          .except(socketId)
          .emit("task_deleted", task._id);
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      await session.abortTransaction();

      return next(error);
    } finally {
      await session.endSession();
    }
  }
);
