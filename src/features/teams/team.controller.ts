import AppError from "../../utils/AppError";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { create, findAll, remove, update } from "./team.service";
import { CreateTeamInput, UpdateTeamInput } from "./team.types";

export const getUserTeams = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) return next(new AppError("userId must be specified", 400));

    const teams = await findAll(userId);
    res.status(200).json({ status: "success", data: teams });
  }
);

export const createTeam = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.user?.id;
    if (!ownerId) return next(new AppError("You are not logged in", 401));

    const input: CreateTeamInput = { ownerId, name: req.body.name };
    const team = await create(input);
    res.status(201).json({ status: "success", data: team });
  }
);

export const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const input: UpdateTeamInput = {
    teamId: req.params.teamId,
    name: req.body.name,
  };
  const team = await update(input);
  res.status(200).json({ status: "success", data: team });
});

export const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  await remove(teamId);
  res.status(204).send();
});
