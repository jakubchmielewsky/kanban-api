import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import TeamMember from "../models/TeamMemberModel";
import mongoose from "mongoose";
import { param } from "express-validator";

const getRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const teamId = req.params.teamId;

    //TODO: implement cache for team members with invalidation when member's role changes

    const teamMember = await TeamMember.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      teamId: new mongoose.Types.ObjectId(teamId),
    });

    if (!teamMember || !req.user)
      return next(new AppError("You don't have access to that resource", 403));

    req.user.role = teamMember.role;
    next();
  }
);

export default getRole;
