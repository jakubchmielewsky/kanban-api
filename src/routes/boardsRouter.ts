import Express from "express";
import protect from "../middlewares/protect";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoard,
  updateBoard,
} from "../controllers/boardsController";
import columnsRouter from "./columnsRouter";
import setParentReferenceIds from "../middlewares/setParentReferenceIds";
import Board from "../models/BoardModel";
import tasksRouter from "./tasksRouter";
import restrictAccessToMembersOrOwner from "../middlewares/restrictAccessToMembersOrOwner";

const boardsRouter = Express.Router({ mergeParams: true });

boardsRouter.use(protect);
//columnsRouter.use(restrictAccessToMembersOrOwner);

//redirects /api/boards/:id/columns to columns router and allows to grab board id param
boardsRouter.use("/:boardId/columns", columnsRouter);

boardsRouter.use("/:boardId/tasks", tasksRouter);

boardsRouter.use(setParentReferenceIds(Board));

boardsRouter.get("/", getTeamBoards);
boardsRouter.post("/", createBoard);
boardsRouter.get("/:boardId", getBoardDetails);
boardsRouter.patch("/:boardId", updateBoard);
boardsRouter.delete("/:boardId", deleteBoard);

export default boardsRouter;
