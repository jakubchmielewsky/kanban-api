import Express from "express";
import {
  getAllInvitations,
  createInvitation,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation,
} from "./invitation.controller";
import { restrictToRoles } from "../../middlewares/restrictToRoles";
import protect from "../../middlewares/protect";

const invitationsRouter = Express.Router({ mergeParams: true });

invitationsRouter.delete(
  "/:invitationId",
  restrictToRoles("admin", "owner"),
  cancelInvitation
);
invitationsRouter.post(
  "/",
  restrictToRoles("admin", "owner"),
  createInvitation
);

invitationsRouter.use(protect);
invitationsRouter.get("/", getAllInvitations);
invitationsRouter.patch("/:invitationId/accept", acceptInvitation);
invitationsRouter.patch("/:invitationId/reject", rejectInvitation);

export default invitationsRouter;
