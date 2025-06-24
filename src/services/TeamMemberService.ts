import TeamMember from "../models/TeamMemberModel";

export const findAllMembers = (teamId: string) => {
  return TeamMember.find({ teamId }).lean();
};

export const createMember = async (
  teamId: string,
  userId: string,
  role: string = "member"
) => {
  return TeamMember.create({ teamId, userId, role });
};

export const updateMember = (teamId: string, userId: string, role: string) => {
  return TeamMember.findOneAndUpdate(
    { teamId, userId },
    { role },
    { new: true, runValidators: true, lean: true }
  );
};

export const removeMember = (teamId: string, userId: string) => {
  return TeamMember.findOneAndDelete({ teamId, userId }).lean();
};
