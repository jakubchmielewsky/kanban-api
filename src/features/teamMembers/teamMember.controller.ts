import {
  findAllMembers,
  updateMember,
  removeMember,
} from "./teamMember.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { UpdateMemberInput, RemoveMemberInput } from "./teamMember.types";

export const getMembersList = catchAsync(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const members = await findAllMembers(teamId);
    res.status(200).json({ status: "success", data: members });
  }
);

export const changeMemberRole = catchAsync(
  async (req: Request, res: Response) => {
    const input: UpdateMemberInput = {
      teamId: req.params.teamId,
      userId: req.params.userId,
      role: req.body.role,
    };
    const updated = await updateMember(input);
    res.status(200).json({ status: "success", data: updated });
  }
);

export const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const input: RemoveMemberInput = {
    teamId: req.params.teamId,
    userId: req.params.userId,
  };
  await removeMember(input);
  res.status(204).send();
});
