import User from "../users/user.model";
import { signToken } from "../../utils/jwt";
import AppError from "../../utils/AppError";
import { Response } from "express";
import { LoginPayload, RegisterPayload } from "./auth.types";
import { queueEmail } from "../emails/email.queue";
import crypto from "crypto";
import UserDocument from "../users/user.types";

const sendVerificationEmail = async (user: UserDocument) => {
  const verificationToken = user.createVerificationToken();
  await user.save({ validateBeforeSave: false });

  await queueEmail({
    to: user.email,
    subject: "Verify your email",
    html: `<p>Your verification token is: <strong>${verificationToken}</strong></p>`, //TODO: create a proper email template
  });
};

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: RegisterPayload) => {
  const user = await User.create({ email, password, passwordConfirm });

  await sendVerificationEmail(user);

  return user;
};

export const resendVerificationEmail = async (email: string) => {
  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isVerified) {
    throw new AppError("User is already verified", 400);
  }
  await sendVerificationEmail(user);
};

export const loginUser = async ({ email, password }: LoginPayload) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password!", 401);
  }
  if (!user.isVerified) {
    throw new AppError("Please verify your email before logging in", 403);
  }

  const token = signToken(user._id.toString());

  return { user, token };
};

export const verifyUser = async (verificationToken: string) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Verification token is invalid or has expired", 400);
  }
  if (user.isVerified) {
    throw new AppError("User is already verified", 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });

  const token = signToken(user._id.toString());

  return { user, token };
};

export const logoutUser = (res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
