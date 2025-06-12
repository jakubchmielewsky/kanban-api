import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "Team ID is required"],
  },
  performedBy: {
    type: String,
    required: [true, "Performed By is required"],
  },
  action: {
    type: String,
    enum: ["create", "update", "delete"],
    required: [true, "Action is required"],
  },
  entityType: {
    type: String,
    required: [true, "Entity Type is required"],
  },
  targetEntityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Entity ID is required"],
  },
  targetEntityName: {
    type: String,
  },
  performedAt: {
    type: Date,
    default: Date.now,
    expires: "30d",
  },
});

activitySchema.index({ teamId: 1 });

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
