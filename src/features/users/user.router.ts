import { Router } from "express";
import { getMe } from "./user.controller";
import protect from "../../middlewares/protect";

const router = Router();

router.use(protect);
router.get("/me", getMe);

export default router;
