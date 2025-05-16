import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import UserInterface from "../interfaces/UserInterface";

const userSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    name: String,
    avatarUrl: String,
    active: { type: Boolean, default: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [8, "Password must be at least 8 characters"],
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (this: UserInterface, val: string) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ status: 1 });

userSchema.pre("save", async function (this: UserInterface, next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
