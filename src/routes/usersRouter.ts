import Express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import {
  addBoardMember,
  getBoardMembers,
  getUser,
  removeBoardMember,
} from "../controllers/usersController";
import protect from "../middlewares/protect";
import getMe from "../middlewares/getMe";

const usersRouter = Express.Router({ mergeParams: true });

usersRouter.get("/", getBoardMembers);
usersRouter.post("/", addBoardMember);
usersRouter.delete("/", removeBoardMember);

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/logout", logoutUser);
usersRouter.get("/me", protect, getMe, getUser);

export default usersRouter;
