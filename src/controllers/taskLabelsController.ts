import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { addLabel, removeLabel } from "../services/taskLabelService";

export const addLabelToTask = catchAsync(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { labelId } = req.body;

    const task = await addLabel(taskId, labelId, req.user);
    res.status(200).json(task);
  }
);

export const removeLabelFromTask = catchAsync(
  async (req: Request, res: Response) => {
    const { taskId, labelId } = req.params;

    const task = await removeLabel(taskId, labelId, req.user);
    res.status(200).json(task);
  }
);
