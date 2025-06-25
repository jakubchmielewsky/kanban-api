import Express from "express";
import {
  createList,
  deleteList,
  getBoardLists,
  updateList,
} from "./list.controller";
import { restrictToRoles } from "../../middlewares/restrictToRoles";
import checkIfResourceBelongsToUsersTeam from "../../middlewares/checkIfResourceBelongsToTeam";
import Board from "../boards/board.model";
import cardsRouter from "../cards/card.router";
import List from "./list.model";

const listsRouter = Express.Router({ mergeParams: true });

listsRouter.use("/:listId/cards", cardsRouter);

listsRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  getBoardLists
);
listsRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  restrictToRoles("admin", "owner"),
  createList
);
listsRouter.patch(
  "/:listId",
  checkIfResourceBelongsToUsersTeam(List, "listId"),
  restrictToRoles("admin", "owner"),
  updateList
);
listsRouter.delete(
  "/:listId",
  checkIfResourceBelongsToUsersTeam(List, "listId"),
  restrictToRoles("admin", "owner"),
  deleteList
);

export default listsRouter;
