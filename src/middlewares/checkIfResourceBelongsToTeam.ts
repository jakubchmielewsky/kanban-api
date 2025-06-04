import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import { Model } from "mongoose";
import AppError from "../utils/AppError";

const checkIfResourceBelongsToUsersTeam = (
  model: Model<any>,
  resourceIdName: string
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const resourceId = req.params[resourceIdName];

    const resource = await model.findById(resourceId);

    if (!resource || resource.teamId.toString() !== req.user?.teamId) {
      return next(
        new AppError("You don't have an access to that resource!", 403)
      );
    }

    next();
  });

export default checkIfResourceBelongsToUsersTeam;
