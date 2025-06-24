import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: [true, "teamId is required"],
  },
  inviteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Invitee ID is required"],
  },
  inviterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Inviter ID is required"],
  },
  role: {
    type: String,
    enum: ["owner", "admin", "member", "guest"],
    required: [true, "Role is required"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
    required: [true, "Status is required"],
  },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

invitationSchema.index({ inviteeId: 1 });
invitationSchema.index({ teamId: 1, inviteeId: 1 }, { unique: true });

const Invitation = mongoose.model("Invitation", invitationSchema);
export default Invitation;
