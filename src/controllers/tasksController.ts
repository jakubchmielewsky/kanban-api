import catchAsync from "../utils/catchAsync";
import TaskService from "../services/TaskService";
import { NextFunction, Request, Response } from "express";

export const getBoardTasks = catchAsync(async (req: Request, res: Response) => {
  const columnId = req.params.columnId;

  const tasks = await TaskService.findAll(columnId);
  res.status(200).json({ status: "success", data: tasks });
});

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const { teamId, boardId, columnId } = req.params;
    const createdBy = req.user.id;

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
    const { taskId } = req.params;
    const task = await TaskService.findOne(taskId);
    res.status(200).json({ status: "success", data: task });
  }
);

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await TaskService.update(taskId, req.body);
  res.status(200).json({ status: "success", data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  await TaskService.remove(taskId);
  res.status(204).send();
});
