import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModel";
import AppError from "../utils/AppError";
import { AuthRequest } from "../types/custom";
import { verifyToken } from "../utils/jwt";

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string;
  if (
    process.env.NODE_ENV === "development" &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return next(new AppError("You are not logged in!", 401));
  }

  const decodedTokenData: JwtPayload = (await verifyToken(
    token,
    process.env.JWT_SECRET as string
  )) as JwtPayload;

  const currentUser = await User.findById(decodedTokenData.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token no longer exists", 401)
    );
  }

  req.user = currentUser;

  next();
};

export default protect;
