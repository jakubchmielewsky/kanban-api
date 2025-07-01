import Invitation from "./invitation.model";
import User from "../users/user.model";
import AppError from "../../utils/AppError";
import { createMember } from "../teamMembers/teamMember.service";
import { InviteInput, HandleInvitationInput } from "./invitation.types";

export const findAllInvitations = async (userId: string) => {
  return Invitation.aggregate([
    { $match: { inviteeId: userId } },
    {
      $match: { status: "pending" },
    },
  ]);
};

export const invite = async (data: InviteInput) => {
  const { userQuery, teamId, inviterId, role } = data;

  if (!userQuery) {
    throw new AppError("User query required!", 400);
  }

  const invitee = await User.findOne({
    $or: [{ email: userQuery }, { name: userQuery }],
  }).lean();

  if (!invitee) throw new AppError("User not found!", 404);

  return Invitation.create({
    teamId,
    inviteeId: invitee._id,
    inviterId,
    role,
  });
};

export const accept = async ({
  invitationId,
  userId,
}: HandleInvitationInput) => {
  const invitation = await Invitation.findById(invitationId);

  if (!invitation) throw new AppError("Invitation not found!", 404);

  if (invitation.inviteeId.toString() !== userId) {
    throw new AppError(
      "You are not authorized to accept this invitation!",
      403
    );
  }

  if (invitation.status !== "pending") {
    throw new AppError("Invitation is not pending!", 400);
  }

  await createMember({
    teamId: invitation.teamId.toString(),
    userId: invitation.inviteeId.toString(),
    role: invitation.role,
  });

  invitation.status = "accepted";
  return invitation.save();
};

export const reject = async ({
  invitationId,
  userId,
}: HandleInvitationInput) => {
  const invitation = await Invitation.findById(invitationId);

  if (!invitation) throw new AppError("Invitation not found!", 404);

  if (invitation.inviteeId.toString() !== userId) {
    throw new AppError(
      "You are not authorized to reject this invitation!",
      403
    );
  }

  if (invitation.status !== "pending") {
    throw new AppError("Invitation is not pending!", 400);
  }

  invitation.status = "rejected";
  return invitation.save();
};

export const cancel = async ({
  invitationId,
  userId,
}: HandleInvitationInput) => {
  const invitation = await Invitation.findById(invitationId);

  if (!invitation) throw new AppError("Invitation not found!", 404);

  if (invitation.status !== "pending") {
    throw new AppError("Invitation is not pending!", 400);
  }

  if (invitation.inviterId.toString() !== userId) {
    throw new AppError(
      "You are not authorized to cancel this invitation!",
      403
    );
  }

  return Invitation.findByIdAndDelete(invitationId).lean();
};
