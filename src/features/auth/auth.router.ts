import { Router } from "express";
import { register, login, logout, verify, resend } from "./auth.controller";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/resend", resend);
router.get("/logout", logout);

export default router;
