import { Router } from "express";
import {
  register,
  login,
  logout,
  verify,
  resend,
  forgotPassword,
  resetPassword,
} from "./auth.controller";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/resend", resend);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/logout", logout);

export default router;
