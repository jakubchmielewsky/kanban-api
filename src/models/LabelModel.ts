import mongoose, { Schema } from "mongoose";

const labelModal = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Label must belong to a team"],
  },
  name: {
    type: String,
    required: [true, "label must have a name"],
  },
  color: {
    type: String,
    required: [true, "label must have a color"],
  },
});

labelModal.index({ name: 1 });
labelModal.index({ teamId: 1 });

const Label = mongoose.model("Label", labelModal);

export default Label;
