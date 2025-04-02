import Express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import protect from "../middlewares/protect";

const authRouter = Express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", protect, logoutUser);

export default authRouter;
