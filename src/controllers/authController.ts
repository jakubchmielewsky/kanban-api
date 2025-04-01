import User from "../models/UserModel";
import { Request, Response } from "express";
import { signToken } from "../utils/jwt.ts";

const createAndSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_EXPIRES_IN as string) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as "none",
  };

  res.cookie("jwt", token, cookieOptions);

  const responseData: any = {
    status: "success",
    data: {
      user: {
        id: user._id,
        email: user.email,
      },
    },
  };

  if (process.env.NODE_ENV === "development") {
    responseData.token = token;
  }

  res.status(statusCode).json(responseData);
};

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      email,
      password,
      passwordConfirm,
    });

    createAndSendToken(newUser, 201, res);
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function loginUser(req: Request, res: Response, next: any) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new Error("Please provide email and password!"));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new Error("Incorrect email or password!"));

    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );
  } catch (error) {}
}
