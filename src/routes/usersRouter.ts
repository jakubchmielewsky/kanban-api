import Express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { getMe, getUser } from "../controllers/usersController";
import protect from "../middlewares/protect";

const usersRouter = Express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/logout", logoutUser);
usersRouter.get("/me", protect, getMe, getUser);

export default usersRouter;
