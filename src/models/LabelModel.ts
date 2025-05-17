import mongoose, { Schema } from "mongoose";

const labelModal = new Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Label must belong to a team"],
  },
  name: String,
  color: String,
});

labelModal.index({ name: 1 });
labelModal.index({ boardId: 1 });

const Label = mongoose.model("Label", labelModal);

export default Label;
