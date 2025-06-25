import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const restrictToRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          `You as (${req.user?.role}) do not have permission to perform this action. Need to be: ${roles}`,
          403
        )
      );
    }
    next();
  };
