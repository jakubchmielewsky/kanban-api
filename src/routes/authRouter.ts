import Express from "express";
import {
  registerUser,
  //loginUser,
  //logoutUser,
} from "../controllers/authController.ts";

const authRouter = Express.Router();

authRouter.post("/register", registerUser);
//authRouter.post("/login", loginUser);
//authRouter.post("/logout", logoutUser);

export default authRouter;
