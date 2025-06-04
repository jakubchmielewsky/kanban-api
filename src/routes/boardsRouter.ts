import Express from "express";
import {
  createBoard,
  deleteBoard,
  getTeamBoards,
  updateBoard,
} from "../controllers/boardsController";
import columnsRouter from "./columnsRouter";
import tasksRouter from "./tasksRouter";
import { restrictToRole } from "../middlewares/restrictToRole";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import Board from "../models/BoardModel";

const boardsRouter = Express.Router({ mergeParams: true });

boardsRouter.use(
  "/:boardId",
  checkIfResourceBelongsToUsersTeam(Board, "boardId")
);

boardsRouter.use("/:boardId/columns", columnsRouter);
boardsRouter.use("/:boardId/tasks", tasksRouter);

boardsRouter.get("/", getTeamBoards);
boardsRouter.post("/", restrictToRole("admin", "owner"), createBoard);
boardsRouter.patch("/:boardId", restrictToRole("admin", "owner"), updateBoard);
boardsRouter.delete("/:boardId", restrictToRole("admin", "owner"), deleteBoard);

export default boardsRouter;
