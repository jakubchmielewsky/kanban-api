import Express from "express";
import boardsRouter from "./boardsRouter";
import labelsRouter from "./labelsRouter";
import { TeamsController } from "../controllers/teamsController";
import protect from "../middlewares/protect";
import getRole from "../middlewares/getRole";
import { restrictToRole } from "../middlewares/restrictToRole";
import teamMembersRouter from "./teamMembersRouter";
import { container } from "../container";

const teamsController = container.resolve(TeamsController);

const teamsRouter = Express.Router();

teamsRouter.use(protect);
teamsRouter.use("/:teamId", getRole);
teamsRouter.use("/:teamId", restrictToRole("member", "admin", "owner"));

teamsRouter.use("/:teamId/boards", boardsRouter);
teamsRouter.use("/:teamId/labels", labelsRouter);
teamsRouter.use("/:teamId/members", teamMembersRouter);

teamsRouter.get("/", teamsController.getUserTeams);
teamsRouter.post("/", teamsController.createTeam);
teamsRouter.patch(
  "/:teamId",
  restrictToRole("owner"),
  teamsController.updateTeam
);
teamsRouter.delete(
  "/:teamId",
  restrictToRole("owner"),
  teamsController.deleteTeam
);

export default teamsRouter;
