import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
  resendVerificationEmail,
} from "./auth.service";
import UserDocument from "../users/user.types";

const sendToken = (user: UserDocument, token: string, res: Response) => {
  const { _id, email, name } = user;

  res.cookie("jwt", token);
  res.status(200).json({
    status: "success",
    token,
    data: { user: { _id, email, name } },
  });
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: "success",
  });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please provide email and password!", 400));

    const { user, token } = await loginUser({ email, password });

    sendToken(user, token, res);
  }
);

export const resend = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) return next(new AppError("Please provide an email!", 400));

    await resendVerificationEmail(email);

    res.status(200).json({
      status: "success",
      message: "Verification email sent successfully!",
    });
  }
);

export const verify = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { verificationToken } = req.body;
    if (!verificationToken)
      return next(new AppError("Please provide a verification token!", 400));

    const { user, token } = await verifyUser(verificationToken);

    sendToken(user, token, res);
  }
);

export const logout = (req: Request, res: Response) => {
  logoutUser(res);
};
