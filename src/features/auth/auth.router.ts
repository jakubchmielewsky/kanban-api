import { Router } from "express";
import { register, login, logout, verify } from "./auth.controller";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.get("/logout", logout);

export default router;
