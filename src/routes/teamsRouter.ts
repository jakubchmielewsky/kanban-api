import Express from "express";
import boardsRouter from "./boardsRouter";
import labelsRouter from "./labelsRouter";
import {
  createTeam,
  deleteTeam,
  getUserTeams,
  updateTeam,
} from "../controllers/teamsController";
import protect from "../middlewares/protect";
import getRole from "../middlewares/getRole";
import { restrictToRole } from "../middlewares/restrictToRole";
import teamMembersRouter from "./teamMembersRouter";

const teamsRouter = Express.Router();

teamsRouter.use(protect);
teamsRouter.use(
  "/:teamId",
  getRole,
  restrictToRole("member", "admin", "owner")
);

teamsRouter.use("/:teamId/boards", boardsRouter);
teamsRouter.use("/:teamId/labels", labelsRouter);
teamsRouter.use("/:teamId/members", teamMembersRouter);

teamsRouter.get("/", getUserTeams);
teamsRouter.post("/", createTeam);
teamsRouter.patch("/:teamId", restrictToRole("owner"), updateTeam);
teamsRouter.delete("/:teamId", restrictToRole("owner"), deleteTeam);

export default teamsRouter;
