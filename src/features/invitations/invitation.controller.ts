import {
  findAllInvitations,
  invite,
  accept,
  reject,
  cancel,
} from "./invitation.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getAllInvitations = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const invitations = await findAllInvitations(userId);

    res.status(200).json({ status: "success", data: invitations });
  }
);

export const createInvitation = catchAsync(
  async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const { role, userQuery } = req.body;
    const inviterId = req.user.id;

    const invitation = await invite(teamId, userQuery, inviterId, role);
    res.status(201).json({ status: "success", data: invitation });
  }
);

export const acceptInvitation = catchAsync(
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const userId = req.user.id;

    const updatedInvitation = await accept(invitationId, userId);
    res.status(200).json({ status: "success", data: updatedInvitation });
  }
);

export const rejectInvitation = catchAsync(
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const userId = req.user.id;

    const updatedInvitation = await reject(invitationId, userId);
    res.status(200).json({ status: "success", data: updatedInvitation });
  }
);

export const cancelInvitation = catchAsync(
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const userId = req.user.id;

    await cancel(invitationId, userId);
    res.status(204).send();
  }
);
