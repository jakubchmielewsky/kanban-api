import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory";
import TeamMember from "../models/TeamMemberModel";

export const getMembersList = getAll(TeamMember);
export const addMember = createOne(TeamMember);
export const getMemberDetails = getOne(TeamMember);
export const changeMemberRole = updateOne(TeamMember);
export const deleteMember = deleteOne(TeamMember);
