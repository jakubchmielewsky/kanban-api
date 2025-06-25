import User from "./user.model";
import { Request, Response } from "express";
import { signToken } from "../../utils/jwt";
import UserInterface from "./types/IUser";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/AppError";

const createAndSendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id as string);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN as string) *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "none" as "none",
  };

  res.cookie("jwt", token, cookieOptions);

  const responseData: any = {
    status: "success",
    data: {
      user: {
        _id: user._id,
        email: user.email,
      },
    },
  };

  if (process.env.NODE_ENV === "development") {
    responseData.token = token;
  }

  res.status(statusCode).json(responseData);
};

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    email,
    password,
    passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);
});

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Please provide email and password!", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect email or password!", 401));

    createAndSendToken(user, 200, res);
  }
);

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};
