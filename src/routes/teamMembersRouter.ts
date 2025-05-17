import Express from "express";
import {
  addMember,
  changeMemberRole,
  deleteMember,
  getMemberDetails,
  getMembersList,
} from "../controllers/teamMembersController";

const teamMembersRouter = Express.Router({ mergeParams: true });

teamMembersRouter.get("/", getMembersList);
teamMembersRouter.post("/", addMember);
teamMembersRouter.get("/:userId", getMemberDetails);
teamMembersRouter.patch("/:userId", changeMemberRole);
teamMembersRouter.delete("/:userId", deleteMember);

export default teamMembersRouter;
