import Express from "express";
import protect from "../middlewares/protect";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasksController";
import setParentReferenceIds from "../middlewares/setParentReferenceIds";
import Task from "../models/TaskModel";

const tasksRouter = Express.Router({ mergeParams: true }); //merge params gives access to params of previous router

tasksRouter.use(protect);

tasksRouter.use(setParentReferenceIds(Task));

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", createTask);
tasksRouter.get("/:id", getTask);
tasksRouter.patch("/:id", updateTask);
tasksRouter.delete("/:id", deleteTask);

export default tasksRouter;
