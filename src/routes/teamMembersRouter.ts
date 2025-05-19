import Express from "express";
import {
  addMember,
  changeMemberRole,
  deleteMember,
  getMembersList,
} from "../controllers/teamMembersController";

const teamMembersRouter = Express.Router({ mergeParams: true });

teamMembersRouter.get("/", getMembersList);
teamMembersRouter.post("/", addMember);
teamMembersRouter.patch("/:userId", changeMemberRole);
teamMembersRouter.delete("/:userId", deleteMember);

export default teamMembersRouter;
