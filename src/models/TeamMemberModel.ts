import mongoose, { Schema } from "mongoose";

const teamMemberSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "teamId must be specified"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId must be specified"],
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      required: [true, "role must be specified"],
    },
  },
  {
    timestamps: true,
  }
);

teamMemberSchema.index({ userId: 1 });
teamMemberSchema.index({ teamId: 1, userId: 1 }, { unique: true });

teamMemberSchema.path("createdAt").select(false);
teamMemberSchema.path("updatedAt").select(false);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;
