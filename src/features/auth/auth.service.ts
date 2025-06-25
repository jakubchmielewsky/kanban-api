import User from "../users/user.model";
import { signToken } from "../../utils/jwt";
import AppError from "../../utils/AppError";
import { Response } from "express";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  return await User.create({ email, password, passwordConfirm });
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password!", 401);
  }
  return user;
};

export const createAndSendToken = (
  user: any,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id.toString());
  res.cookie("jwt", token, {
    /* opcje cookie */
  });
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user: { id: user._id, email: user.email } },
  });
};

export const logoutUser = (res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
