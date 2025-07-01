import { create, findAll, remove, update } from "./label.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { CreateLabelInput, UpdateLabelInput } from "./label.types";

export const getTeamLabels = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const labels = await findAll(teamId);

  res.status(200).json({ status: "success", data: labels });
});

export const createLabel = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const data: CreateLabelInput = { ...req.body, teamId };

  const label = await create(data);
  res.status(201).json({ status: "success", data: label });
});

export const updateLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const updates: UpdateLabelInput = req.body;

  const label = await update(labelId, updates);
  res.status(200).json({ status: "success", data: label });
});

export const deleteLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  await remove(labelId);
  res.status(204).send();
});
