import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: [true, "Team name is required"] },
    description: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner must be specified"],
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.index({ ownerId: 1, name: 1 }, { unique: true });

teamSchema.path("createdAt").select(false);
teamSchema.path("updatedAt").select(false);

const Team = mongoose.model("team", teamSchema);
export default Team;
