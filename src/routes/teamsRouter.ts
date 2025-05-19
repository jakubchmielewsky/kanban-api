import Express from "express";
import teamMembersRouter from "./teamMembersRouter";
import boardsRouter from "./boardsRouter";
import labelsRouter from "./labelsRouter";
import {
  createTeam,
  deleteTeam,
  getUserTeams,
  updateTeam,
} from "../controllers/teamsController";
import protect from "../middlewares/protect";

const teamsRouter = Express.Router();

teamsRouter.use(protect);

teamsRouter.use("/:teamId/boards", boardsRouter);
teamsRouter.use("/:teamId/labels", labelsRouter);

teamsRouter.get("/", getUserTeams);
teamsRouter.post("/", createTeam);
teamsRouter.patch("/:teamId", updateTeam);
teamsRouter.delete("/:teamId", deleteTeam);

export default teamsRouter;
