import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import {
  registerUser,
  createAndSendToken,
  loginUser,
  logoutUser,
} from "./auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  createAndSendToken(user, 201, res);
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Please provide email and password!", 400));
    const user = await loginUser({ email, password });
    createAndSendToken(user, 200, res);
  }
);

export const logout = (req: Request, res: Response) => {
  logoutUser(res);
};
