import { Document } from "mongoose";

export default interface UserInterface extends Document {
  name: string;
  avatarUrl: string;
  email: string;
  password: string;
  active: boolean;
  passwordConfirm?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
