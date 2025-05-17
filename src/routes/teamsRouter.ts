import Express from "express";
import teamMembersRouter from "./teamMembersRouter";
import boardsRouter from "./boardsRouter";
import labelsRouter from "./labelsRouter";
import {
  createTeam,
  deleteTeam,
  getTeamDetails,
  getUserTeams,
  updateTeam,
} from "../controllers/teamsController";

const teamsRouter = Express.Router();

//protect,restrict

teamsRouter.use("/:teamId/members", teamMembersRouter);
teamsRouter.use("/:teamId/boards", boardsRouter);
teamsRouter.use("/:teamId/labels", labelsRouter);

teamsRouter.get("/", getUserTeams);
teamsRouter.post("/", createTeam);
teamsRouter.get("/:teamId", getTeamDetails);
teamsRouter.patch("/:teamId", updateTeam);
teamsRouter.delete("/:teamId", deleteTeam);

export default teamsRouter;
