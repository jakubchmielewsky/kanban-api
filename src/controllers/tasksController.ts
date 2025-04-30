import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from "./handlerFactory";
import Task from "../models/TaskModel";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { io } from "../server";

export const getAllTasks = getAll(Task);
export const getTask = getOne(Task);
export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...res.locals.parentReference };

    const task = await Task.create(data);

    const socketId = req.headers["x-socket-id"];

    console.log("Request comes from socket:", socketId);

    if (typeof socketId === "string") {
      io.to(task.boardId.toString())
        .except(socketId)
        .emit("task_created", task);
    } else {
      io.to(task.boardId.toString()).emit("task_created", task);
    }

    res.status(201).json({
      status: "success",
      data: task,
    });
  }
);
export const updateTask = updateOne(Task);
export const deleteTask = deleteOne(Task);
