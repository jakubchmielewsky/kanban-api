import Express from "express";
import protect from "../middlewares/protect";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  updateColumn,
} from "../controllers/columnsController";

const columnsRouter = Express.Router({ mergeParams: true }); //merge params gives access to params of previous router

columnsRouter.use(protect);

columnsRouter.get("/", getAllColumns);
columnsRouter.post("/", createColumn);
columnsRouter.patch("/:id", updateColumn);
columnsRouter.delete("/:id", deleteColumn);

export default columnsRouter;
