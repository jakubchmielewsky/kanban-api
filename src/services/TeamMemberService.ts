import TeamMember from "../models/TeamMemberModel";
import User from "../models/UserModel";
import AppError from "../utils/AppError";

export const findAll = (teamId: string) => {
  return TeamMember.find({ teamId }).lean();
};

export const create = async (teamId: string, userQuery: string) => {
  const user = await User.findOne({
    $or: [{ email: userQuery }, { name: userQuery }],
  }).lean();

  if (!user) throw new AppError("User not found!", 404);

  return TeamMember.create({ teamId, userId: user._id, role: "member" });
};

export const update = (teamId: string, userId: string, role: string) => {
  return TeamMember.findOneAndUpdate(
    { teamId, userId },
    { role },
    { new: true, runValidators: true, lean: true }
  );
};

export const remove = (teamId: string, userId: string) => {
  return TeamMember.findOneAndDelete({ teamId, userId }).lean();
};
