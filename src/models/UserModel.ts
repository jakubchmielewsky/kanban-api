import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (this: any, val: string) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
