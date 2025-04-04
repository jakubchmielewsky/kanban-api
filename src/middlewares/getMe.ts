import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.id = res.locals.user.id.toString();

    next();
  }
);

export default getMe;
