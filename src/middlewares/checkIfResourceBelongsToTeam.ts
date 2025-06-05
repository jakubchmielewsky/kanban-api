import { NextFunction, Response, Request } from "express";
import catchAsync from "../utils/catchAsync";
import { Model } from "mongoose";
import AppError from "../utils/AppError";
import { cache } from "../utils/cache";

const checkIfResourceBelongsToUsersTeam = (
  model: Model<any>,
  resourceIdName: string
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const resourceId = req.params[resourceIdName];

    const cacheKey = `${model.modelName}${resourceId}`;

    const cachedTeamId = cache.get(cacheKey);

    if (cachedTeamId && cachedTeamId.toString() === req.user?.teamId) {
      return next();
    }

    const resource = await model.findById(resourceId).select("teamId");
    cache.set(cacheKey, resource.teamId);

    if (resource && resource.teamId.toString() !== req.user?.teamId) {
      return next(
        new AppError("You don't have an access to that resource", 403)
      );
    }

    next();
  });

export default checkIfResourceBelongsToUsersTeam;
