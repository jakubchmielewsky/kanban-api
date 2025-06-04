import LabelService from "../services/LabelService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getTeamLabels = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const labels = await LabelService.findAll(teamId);
  res.status(200).json({ status: "success", data: labels });
});

export const createLabel = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const comment = await LabelService.create({
    ...req.body,
    teamId,
  });
  res.status(201).json({ status: "success", data: comment });
});

export const updateLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  const comment = await LabelService.update(labelId, req.body);
  res.status(200).json({ status: "success", data: comment });
});

export const deleteLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  await LabelService.remove(labelId);
  res.status(204).send();
});
