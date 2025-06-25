import Express from "express";
import {
  changeMemberRole,
  deleteMember,
  getMembersList,
} from "./teamMember.controller";
import { restrictToRoles } from "../../middlewares/restrictToRoles";

const teamMembersRouter = Express.Router({ mergeParams: true });

teamMembersRouter.get("/", getMembersList);
teamMembersRouter.patch(
  "/:userId",
  restrictToRoles("owner", "admin"),
  changeMemberRole
);
teamMembersRouter.delete(
  "/:userId",
  restrictToRoles("owner", "admin"),
  deleteMember
);

export default teamMembersRouter;
