import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { User, UserInstanceMethods } from "./user.types";
import crypto from "crypto";

type UserModel = Model<User, {}, UserInstanceMethods>;

const userSchema = new Schema<User, UserModel, UserInstanceMethods>(
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
    verificationToken: String,
    verificationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    active: { type: Boolean, default: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minLength: [8, "Password must be at least 8 characters"],
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (this, val) {
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
userSchema.index({ name: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  //false means NOT changed
  return false;
};

userSchema.methods.createVerificationToken = function () {
  const userVerificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(userVerificationToken)
    .digest("hex");
  this.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return userVerificationToken;
};

userSchema.methods.createPasswordResetToken = function () {
  const userPasswordResetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(userPasswordResetToken)
    .digest("hex");
  this.passwordResetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);

  return userPasswordResetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
