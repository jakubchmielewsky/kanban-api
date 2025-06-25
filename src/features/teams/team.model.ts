import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
  name: { type: String, required: [true, "Team name is required"] },
  description: String,
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
