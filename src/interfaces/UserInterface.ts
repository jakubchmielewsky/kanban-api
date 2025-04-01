import { Document } from "mongoose";

export default interface UserInterface extends Document {
  email: string;
  password: string;
  passwordConfirm?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
