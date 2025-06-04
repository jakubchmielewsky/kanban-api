import catchAsync from "../utils/catchAsync";
import TaskService from "../services/TaskService";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const getBoardTasks = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;

  const tasks = await TaskService.findAll(boardId);
  res.status(200).json({ status: "success", data: tasks });
});

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, columnId } = req.body;
    const { teamId, boardId } = req.params;
    const createdBy = req.user?.id;

    if (!createdBy) return next(new AppError("User ID must be specified", 400));

    const task = await TaskService.create({
      title,
      description,
      teamId,
      boardId,
      columnId,
      createdBy,
    });
    res.status(201).json({ status: "success", data: task });
  }
);

export const getTaskDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { teamId, taskId } = req.params;
    const task = await TaskService.findOne(taskId);
    res.status(200).json({ status: "success", data: task });
  }
);

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { teamId, taskId } = req.params;
  const task = await TaskService.update(taskId, req.body);
  res.status(200).json({ status: "success", data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { teamId, taskId } = req.params;
  await TaskService.remove(taskId);
  res.status(204).send();
});
