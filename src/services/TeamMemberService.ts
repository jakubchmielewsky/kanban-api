import TeamMember from "../models/TeamMemberModel";
import User from "../models/UserModel";
import AppError from "../utils/AppError";

class TeamMemberService {
  findAll(teamId: string) {
    return TeamMember.find({ teamId }).lean();
  }

  async create(teamId: string, userQuery: string) {
    const user = await User.findOne({
      $or: [{ email: userQuery }, { name: userQuery }],
    }).lean();

    if (!user) throw new AppError("User not found!", 404);

    return TeamMember.create({ teamId, userId: user._id, role: "member" });
  }

  update(teamId: string, userId: string, role: string) {
    return TeamMember.findOneAndUpdate(
      { teamId, userId },
      { role },
      { new: true, runValidators: true, lean: true }
    );
  }

  remove(teamId: string, userId: string) {
    return TeamMember.findOneAndDelete({ teamId, userId }).lean();
  }
}

export default new TeamMemberService();
