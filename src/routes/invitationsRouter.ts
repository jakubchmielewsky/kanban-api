import Express from "express";
import {
  getAllInvitations,
  createInvitation,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation,
} from "../controllers/invitationsController";
import { restrictToRole } from "../middlewares/restrictToRole";
import protect from "../middlewares/protect";

const invitationsRouter = Express.Router({ mergeParams: true });

invitationsRouter.delete(
  "/:invitationId",
  restrictToRole("admin", "owner"),
  cancelInvitation
);
invitationsRouter.post("/", restrictToRole("admin", "owner"), createInvitation);

invitationsRouter.use(protect);
invitationsRouter.get("/", getAllInvitations);
invitationsRouter.patch("/:invitationId/accept", acceptInvitation);
invitationsRouter.patch("/:invitationId/reject", rejectInvitation);

export default invitationsRouter;
