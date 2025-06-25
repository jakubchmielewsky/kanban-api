import { create, findAll, remove, update } from "./label.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getTeamLabels = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const labels = await findAll(teamId);
  res.status(200).json({ status: "success", data: labels });
});

export const createLabel = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const comment = await create(
    {
      ...req.body,
      teamId,
    },
    req.user
  );
  res.status(201).json({ status: "success", data: comment });
});

export const updateLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  const comment = await update(labelId, req.body, req.user);
  res.status(200).json({ status: "success", data: comment });
});

export const deleteLabel = catchAsync(async (req: Request, res: Response) => {
  const labelId = req.params.labelId;

  await remove(labelId, req.user);
  res.status(204).send();
});
