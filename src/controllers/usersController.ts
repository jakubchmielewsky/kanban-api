import User from "../models/UserModel";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});
