import Express from "express";
import {
  createColumn,
  deleteColumn,
  getBoardColumns,
  updateColumn,
} from "../controllers/columnsController";
import { restrictToRole } from "../middlewares/restrictToRole";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import Column from "../models/ColumnModel";
import Board from "../models/BoardModel";

const columnsRouter = Express.Router({ mergeParams: true });

columnsRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  getBoardColumns
);
columnsRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  restrictToRole("admin", "owner"),
  createColumn
);
columnsRouter.patch(
  "/:columnId",
  checkIfResourceBelongsToUsersTeam(Column, "columnId"),
  restrictToRole("admin", "owner"),
  updateColumn
);
columnsRouter.delete(
  "/:columnId",
  checkIfResourceBelongsToUsersTeam(Column, "columnId"),
  restrictToRole("admin", "owner"),
  deleteColumn
);

export default columnsRouter;
