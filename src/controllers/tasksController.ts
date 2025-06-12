import catchAsync from "../utils/catchAsync";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../services/TaskService";
import { NextFunction, Request, Response } from "express";

export const getBoardTasks = catchAsync(async (req: Request, res: Response) => {
  const columnId = req.params.columnId;

  const tasks = await findAll(columnId);
  res.status(200).json({ status: "success", data: tasks });
});

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const { teamId, boardId, columnId } = req.params;
    const createdBy = req.user.id;

    const task = await create(
      {
        title,
        description,
        teamId,
        boardId,
        columnId,
        createdBy,
      },
      req.user
    );
    res.status(201).json({ status: "success", data: task });
  }
);

export const getTaskDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await findOne(taskId);
    res.status(200).json({ status: "success", data: task });
  }
);

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await update(taskId, req.body, req.user);
  res.status(200).json({ status: "success", data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId, teamId } = req.params;
  await remove(taskId, teamId, req.user);
  res.status(204).send();
});
