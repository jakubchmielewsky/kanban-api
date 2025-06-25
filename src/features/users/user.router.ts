import Express from "express";
import { registerUser, loginUser, logoutUser } from "./auth.controller";
import { getUser } from "./user.controller";
import protect from "../../middlewares/protect";

const usersRouter = Express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/logout", logoutUser);
usersRouter.get("/me", protect, getUser);

export default usersRouter;
