import User from "../users/user.model";
import { signToken } from "../../utils/jwt";
import AppError from "../../utils/AppError";
import {
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "./auth.types";
import { queueEmail } from "../emails/email.queue";
import crypto from "crypto";
import { UserDocument } from "../users/user.types";

const sendVerificationEmail = async (user: UserDocument) => {
  const verificationToken = user.createVerificationToken();
  await user.save({ validateBeforeSave: false });

  try {
    await queueEmail({
      to: user.email,
      subject: "Verify your email",
      html: `<p>Click <a href="${process.env.CLIENT_URL}/verify-email?token=${verificationToken}">here</a> to verify your account</p>`, //TODO: create a proper email template
    });
  } catch (error) {
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError(
      "There was an error sending the verification email. Try again later.",
      500
    );
  }
};

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: RegisterPayload) => {
  const user = await User.create({ email, password, confirmPassword });

  await sendVerificationEmail(user);

  return user;
};

export const resendVerificationEmail = async (email: string) => {
  const user = await User.findOne({ email });

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

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    await queueEmail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">here</a> to reset your password</p>`, //TODO: create a proper email template
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError(
      "There was an error sending the email. Try again later.",
      500
    );
  }
};

export const resetPasswordService = async ({
  resetToken,
  newPassword,
  confirmNewPassword,
}: ResetPasswordPayload) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Reset token is invalid or has expired", 400);
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  const token = signToken(user._id.toString());

  return { user, token };
};
