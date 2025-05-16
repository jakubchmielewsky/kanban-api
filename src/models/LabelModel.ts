import mongoose, { Schema } from "mongoose";

const labelModal = new Schema({
  name: String,
  color: String,
});

labelModal.index({ name: 1 });

const Label = mongoose.model("Label", labelModal);

export default Label;
