import TeamMemberService from "../services/TeamMemberService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getMembersList = catchAsync(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;

    const teamMember = await TeamMemberService.findAll(teamId);
    res.status(200).json({ status: "success", data: teamMember });
  }
);
export const addMember = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const { userQuery } = req.body;

  const teamMember = await TeamMemberService.create(teamId, userQuery);
  res.status(201).json({ status: "success", data: teamMember });
});
export const changeMemberRole = catchAsync(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const userId = req.params.userId;
    const { role } = req.body;

    const teamMember = await TeamMemberService.update(teamId, userId, role);
    res.status(200).json({ status: "success", data: teamMember });
  }
);
export const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const userId = req.params.userId;

  await TeamMemberService.remove(teamId, userId);
  res.status(204).send();
});
