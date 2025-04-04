import Express from "express";
import protect from "../middlewares/protect";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasksController";

const tasksRouter = Express.Router({ mergeParams: true }); //merge params gives access to params of previous router

tasksRouter.use(protect);

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", createTask);
tasksRouter.patch("/:id", updateTask);
tasksRouter.delete("/:id", deleteTask);

export default tasksRouter;
