import catchAsync from "../utils/catchAsync";
import TaskService from "../services/TaskService";
import { Request, Response } from "express";

export const getBoardTasks = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  const tasks = await TaskService.findAll({ boardId });
  res.status(200).json({ status: "success", data: tasks });
});

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const data = {
    ...req.body,
    boardId: req.params.boardId,
    createdBy: res.locals.user.id,
  };
  const task = await TaskService.create(data);
  res.status(201).json({ status: "success", data: task });
});

export const getTaskDetails = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const task = await TaskService.findById(taskId);
    res.status(200).json({ status: "success", data: task });
  }
);

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const task = await TaskService.update(taskId, req.body);
  res.status(200).json({ status: "success", data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  await TaskService.remove(taskId);
  res.status(204).send();
});
