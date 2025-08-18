import Express from "express";
import {
  createBoard,
  deleteBoard,
  getTeamBoards,
  updateBoard,
} from "./board.controller";
import listsRouter from "../lists/list.router";
import { restrictToRoles } from "../../middlewares/restrictToRoles";
import checkIfResourceBelongsToUsersTeam from "../../middlewares/checkIfResourceBelongsToTeam";
import Board from "./board.model";
import cardsRouter from "../cards/card.router";

const boardsRouter = Express.Router({ mergeParams: true });

boardsRouter.use(
  "/:boardId",
  checkIfResourceBelongsToUsersTeam(Board, "boardId")
);

boardsRouter.use("/:boardId/cards", cardsRouter);
boardsRouter.use("/:boardId/lists", listsRouter);

boardsRouter.get("/", getTeamBoards);
boardsRouter.post("/", restrictToRoles("admin", "owner"), createBoard);
boardsRouter.patch("/:boardId", restrictToRoles("admin", "owner"), updateBoard);
boardsRouter.delete(
  "/:boardId",
  restrictToRoles("admin", "owner"),
  deleteBoard
);

export default boardsRouter;
