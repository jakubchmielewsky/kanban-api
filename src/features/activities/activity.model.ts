import mongoose from "mongoose";
import { ref } from "process";

const activitySchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "Team ID is required"],
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Performed By is required"],
  },
  action: {
    type: String,
    enum: ["create", "update", "delete", "add_label", "remove_label"],
    required: [true, "Action is required"],
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: [true, "Card ID is required"],
  },
  performedAt: {
    type: Date,
    default: Date.now,
    expires: "30d",
  },
});

activitySchema.index({ cardId: 1 });

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
