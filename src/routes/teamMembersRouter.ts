import Express from "express";
import {
  addMember,
  changeMemberRole,
  deleteMember,
  getMembersList,
} from "../controllers/teamMembersController";
import { restrictToRole } from "../middlewares/restrictToRole";

const teamMembersRouter = Express.Router({ mergeParams: true });

teamMembersRouter.get("/", getMembersList);
teamMembersRouter.post("/", restrictToRole("owner", "admin"), addMember);
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
