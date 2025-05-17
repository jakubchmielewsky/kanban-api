import Express from "express";
import protect from "../middlewares/protect";
import {
  createColumn,
  deleteColumn,
  getBoardColumns,
  getColumnDetails,
  updateColumn,
} from "../controllers/columnsController";
import setParentReferenceIds from "../middlewares/setParentReferenceIds";
import Column from "../models/ColumnModel";

const columnsRouter = Express.Router({ mergeParams: true });

columnsRouter.use(protect);

columnsRouter.use(setParentReferenceIds(Column));

columnsRouter.get("/", getBoardColumns);
columnsRouter.post("/", createColumn);
columnsRouter.get("/:columnId", getColumnDetails);
columnsRouter.patch("/:columnId", updateColumn);
columnsRouter.delete("/:columnId", deleteColumn);

export default columnsRouter;
