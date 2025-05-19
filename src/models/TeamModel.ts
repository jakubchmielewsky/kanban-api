import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: [true, "Team name is required"] },
    description: String,
  },
  {
    timestamps: true,
  }
);

teamSchema.path("createdAt").select(false);
teamSchema.path("updatedAt").select(false);

const Team = mongoose.model("Team", teamSchema);
export default Team;
