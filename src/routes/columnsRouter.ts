import Express from "express";
import protect from "../middlewares/protect";
import {
  createColumn,
  deleteColumn,
  getBoardColumns,
  getColumnDetails,
  updateColumn,
} from "../controllers/columnsController";
import Column from "../models/ColumnModel";

const columnsRouter = Express.Router({ mergeParams: true });

columnsRouter.get("/", getBoardColumns);
columnsRouter.post("/", createColumn);
columnsRouter.get("/:columnId", getColumnDetails);
columnsRouter.patch("/:columnId", updateColumn);
columnsRouter.delete("/:columnId", deleteColumn);

export default columnsRouter;
