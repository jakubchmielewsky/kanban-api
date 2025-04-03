import User from "../models/UserModel";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { getOne } from "./handlerFactory";

export const getUser = getOne(User);

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.id = res.locals.user.id.toString();

    next();
  }
);
