import Express from "express";
import {
  changeMemberRole,
  deleteMember,
  getMembersList,
} from "../controllers/teamMembersController";
import { restrictToRole } from "../middlewares/restrictToRole";

const teamMembersRouter = Express.Router({ mergeParams: true });

teamMembersRouter.get("/", getMembersList);
teamMembersRouter.patch(
  "/:userId",
  restrictToRole("owner", "admin"),
  changeMemberRole
);
teamMembersRouter.delete(
  "/:userId",
  restrictToRole("owner", "admin"),
  deleteMember
);

export default teamMembersRouter;
