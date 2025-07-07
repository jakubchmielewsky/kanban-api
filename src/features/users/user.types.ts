import mongoose, { Document } from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  email: string;
  password: string;
  confirmPassword?: string;
  active: boolean;
}

export interface UserInstanceMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createVerificationToken(): string;
  createPasswordResetToken(): string;
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

export type UserDocument = User & Document & UserInstanceMethods;
