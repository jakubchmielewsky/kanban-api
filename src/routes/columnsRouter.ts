import Express from "express";
import protect from "../middlewares/protect";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  updateColumn,
} from "../controllers/columnsController";
import tasksRouter from "./tasksRouter";
import setParentReferenceIds from "../middlewares/setParentReferenceIds";
import Column from "../models/ColumnModel";

const columnsRouter = Express.Router({ mergeParams: true }); //merge params gives access to params of previous router

columnsRouter.use("/:id/tasks", tasksRouter); //mounting tasksRouter on columnsRouter
// This means that when we access /columns/:id/tasks, it will use the tasksRouter

columnsRouter.use(protect);

columnsRouter.use(setParentReferenceIds(Column));

columnsRouter.get("/", getAllColumns);
columnsRouter.post("/", createColumn);
columnsRouter.patch("/:id", updateColumn);
columnsRouter.delete("/:id", deleteColumn);

export default columnsRouter;
