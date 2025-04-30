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
import usersRouter from "./usersRouter";
import restrictAccessToMembersOrOwner from "../middlewares/restrictAccessToMembersOrOwner";

const boardsRouter = Express.Router();

boardsRouter.use(protect);
columnsRouter.use(restrictAccessToMembersOrOwner);

//redirects /api/boards/:id/columns to columns router and allows to grab board id param
boardsRouter.use("/:id/columns", columnsRouter);

boardsRouter.use("/:id/tasks", tasksRouter);

boardsRouter.use("/:id/members", usersRouter);

boardsRouter.use(setParentReferenceIds(Board));

boardsRouter.get("/", getAllBoards);
boardsRouter.get("/:id", getBoard);
boardsRouter.post("/", createBoard);
boardsRouter.patch("/:id", updateBoard);
boardsRouter.delete("/:id", deleteBoard);

export default boardsRouter;
