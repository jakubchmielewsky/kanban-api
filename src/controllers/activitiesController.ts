import { findAllActivities } from "../services/ActivityService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getActivities = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const activities = await findAllActivities(teamId);
  res.status(200).json({ status: "success", data: activities });
});
