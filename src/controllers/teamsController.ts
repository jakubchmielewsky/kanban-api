import TeamService from "../services/TeamService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getUserTeams = catchAsync(async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const teams = await TeamService.findAll({ userId });
  res.status(200).json({ status: "success", data: teams });
});
export const createTeam = catchAsync(async (req: Request, res: Response) => {
  const ownerId = res.locals.user.id;
  const team = await TeamService.create(req.body, ownerId);
  res.status(201).json({ status: "success", data: team });
});
export const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const team = await TeamService.update(teamId, req.body);
  res.status(200).json({ status: "success", data: team });
});
export const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  await TeamService.remove(teamId);
  res.status(204).send();
});
