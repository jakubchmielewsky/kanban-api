import {
  findAllMembers,
  removeMember,
  updateMember,
} from "./teamMember.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getMembersList = catchAsync(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;

    const teamMember = await findAllMembers(teamId);
    res.status(200).json({ status: "success", data: teamMember });
  }
);

export const changeMemberRole = catchAsync(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const userId = req.params.userId;
    const { role } = req.body;

    const teamMember = await updateMember(teamId, userId, role);
    res.status(200).json({ status: "success", data: teamMember });
  }
);
export const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const userId = req.params.userId;

  await removeMember(teamId, userId);
  res.status(204).send();
});
