import Express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

const authRouter = Express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);

export default authRouter;
