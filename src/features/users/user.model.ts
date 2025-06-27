import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import UserDocument from "./user.types";
import crypto from "crypto";

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    name: String,
    avatarUrl: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: {
      type: String,
      required: false,
      default: undefined,
    },
    verificationTokenExpires: {
      type: Date,
      required: false,
      default: undefined,
    },
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
        validator: function (this: UserDocument, val: string) {
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

userSchema.pre("save", async function (this: UserDocument, next) {
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

userSchema.methods.createVerificationToken = function () {
  const userVerificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(userVerificationToken)
    .digest("hex");
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  return userVerificationToken;
};

const User = mongoose.model("User", userSchema);
export default User;
