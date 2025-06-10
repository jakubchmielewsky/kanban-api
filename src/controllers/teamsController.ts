import { inject, injectable } from "tsyringe";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { ITeamService } from "../services/TeamService.interface";

@injectable()
export class TeamsController {
  constructor(
    @inject("ITeamService") private readonly teamService: ITeamService
  ) {}

  getUserTeams = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?.id;

      if (!userId) return next(new AppError("userId must be specified", 400));

      const teams = await this.teamService.findAll(userId);
      res.status(200).json({ status: "success", data: teams });
    }
  );

  createTeam = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const ownerId = req.user?.id;
      const { name } = req.body;

      if (!ownerId) return next(new AppError("You are not logged in", 401));
      const team = await this.teamService.create(ownerId, name);
      res.status(201).json({ status: "success", data: team });
    }
  );

  updateTeam = catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const { name } = req.body;

    const team = await this.teamService.update(teamId, name);
    res.status(200).json({ status: "success", data: team });
  });

  deleteTeam = catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    await this.teamService.remove(teamId);
    res.status(204).send();
  });
}
