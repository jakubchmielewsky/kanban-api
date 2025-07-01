import TeamMember from "./teamMember.model";
import {
  CreateMemberInput,
  UpdateMemberInput,
  RemoveMemberInput,
} from "./teamMember.types";

export const findAllMembers = (teamId: string) => {
  return TeamMember.find({ teamId }).lean();
};

export const createMember = async (input: CreateMemberInput) => {
  const { teamId, userId, role = "member" } = input;
  return TeamMember.create({ teamId, userId, role });
};

export const updateMember = (input: UpdateMemberInput) => {
  const { teamId, userId, role } = input;
  return TeamMember.findOneAndUpdate(
    { teamId, userId },
    { role },
    { new: true, runValidators: true, lean: true }
  );
};

export const removeMember = (input: RemoveMemberInput) => {
  const { teamId, userId } = input;
  return TeamMember.findOneAndDelete({ teamId, userId }).lean();
};
