import mongoose, { Document } from "mongoose";

export default interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  verificationToken?: String;
  verificationTokenExpires?: Date;
  email: string;
  password: string;
  active: boolean;
  passwordConfirm?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createVerificationToken(): string;
}
