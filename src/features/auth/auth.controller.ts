import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";
import {
  registerUser,
  loginUser,
  verifyUser,
  resendVerificationEmail,
  forgotPasswordService,
  resetPasswordService,
} from "./auth.service";
import { User } from "../users/user.types";

const sendToken = (user: User, token: string, res: Response) => {
  const { _id, email, name } = user;

  res.cookie("jwt", token);
  res.status(200).json({
    status: "success",
    token,
    data: { _id, email, name },
  });
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  const user = await registerUser({ email, password, confirmPassword });
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
    });
  }
);

export const verify = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { verificationToken } = req.body;
    if (!verificationToken)
      return next(new AppError("Please provide a verification token!", 400));

    await verifyUser(verificationToken);

    res.status(200).json({
      status: "success",
    });
  }
);

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) return next(new AppError("Please provide an email!", 400));

    await forgotPasswordService(email);

    res.status(200).json({
      status: "success",
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword, confirmNewPassword, resetToken } = req.body;

    if (!resetToken)
      return next(new AppError("Password reset token is required!", 400));

    const { user, token } = await resetPasswordService({
      newPassword,
      confirmNewPassword,
      resetToken,
    });

    sendToken(user, token, res);
  }
);
