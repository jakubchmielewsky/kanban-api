import { JwtPayload } from "jsonwebtoken";
import User from "../features/users/user.model";
import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import catchAsync from "../utils/catchAsync";

const protect = catchAsync(async (req, res, next) => {
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

  if (!decodedTokenData.id || !decodedTokenData.iat) {
    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  const currentUser = await User.findById(decodedTokenData.id).select(
    "_id email name"
  );

  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token no longer exists", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decodedTokenData.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = { ...currentUser, id: currentUser._id.toString() };

  next();
});

export default protect;
