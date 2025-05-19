import Express from "express";
import protect from "../middlewares/protect";
import {
  createBoard,
  deleteBoard,
  getBoardDetails,
  getTeamBoards,
  updateBoard,
} from "../controllers/boardsController";
import columnsRouter from "./columnsRouter";
import tasksRouter from "./tasksRouter";

const boardsRouter = Express.Router({ mergeParams: true });

boardsRouter.use("/:boardId/columns", columnsRouter);
boardsRouter.use("/:boardId/tasks", tasksRouter);

boardsRouter.get("/", getTeamBoards);
boardsRouter.post("/", createBoard);
boardsRouter.get("/:boardId", getBoardDetails);
boardsRouter.patch("/:boardId", updateBoard);
boardsRouter.delete("/:boardId", deleteBoard);

export default boardsRouter;
