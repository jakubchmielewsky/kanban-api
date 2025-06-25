import { Request, Response } from "express";
import * as userService from "./user.service";
import catchAsync from "../../utils/catchAsync";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user.id);
  res.status(200).json({ status: "success", data: user });
});
