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

const boardsRouter = Express.Router();

//redirects /api/boards/:id/columns to columns router and allows to grab board id param
boardsRouter.use("/:id/columns", columnsRouter);

boardsRouter.use(protect);

boardsRouter.use(setParentReferenceIds(Board));

boardsRouter.get("/", getAllBoards);
boardsRouter.get("/:id", getBoard);
boardsRouter.post("/", createBoard);
boardsRouter.patch("/:id", updateBoard);
boardsRouter.delete("/:id", deleteBoard);

export default boardsRouter;
