import Express from "express";
import boardsRouter from "../boards/board.router";
import labelsRouter from "../labels/label.router";
import {
  createTeam,
  deleteTeam,
  getUserTeams,
  updateTeam,
} from "./team.controller";
import protect from "../../middlewares/protect";
import getRole from "../../middlewares/getRole";
import { restrictToRoles } from "../../middlewares/restrictToRoles";
import teamMembersRouter from "../teamMembers/teamMember.router";
import activitiesRouter from "../activities/activity.router";
import invitationsRouter from "../invitations/invitation.router";

const teamsRouter = Express.Router();

teamsRouter.use(protect);
teamsRouter.use("/:teamId", getRole);
teamsRouter.use("/:teamId", restrictToRoles("member", "admin", "owner"));

teamsRouter.use("/:teamId/boards", boardsRouter);
teamsRouter.use("/:teamId/labels", labelsRouter);
teamsRouter.use("/:teamId/members", teamMembersRouter);
teamsRouter.use("/:teamId/activities", activitiesRouter);
teamsRouter.use("/:teamId/invitations", invitationsRouter);

teamsRouter.get("/", getUserTeams);
teamsRouter.post("/", createTeam);
teamsRouter.patch("/:teamId", restrictToRoles("owner"), updateTeam);
teamsRouter.delete("/:teamId", restrictToRoles("owner"), deleteTeam);

export default teamsRouter;
