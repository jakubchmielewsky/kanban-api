import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import TaskLabelService from "../services/taskLabelService";

export const addLabelToTask = catchAsync(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { labelId } = req.body;

    const task = await TaskLabelService.addLabelToTask(taskId, labelId);
    res.status(200).json(task);
  }
);

export const removeLabelFromTask = catchAsync(
  async (req: Request, res: Response) => {
    const { taskId, labelId } = req.params;

    const task = await TaskLabelService.removeLabelFromTask(taskId, labelId);
    res.status(200).json(task);
  }
);
