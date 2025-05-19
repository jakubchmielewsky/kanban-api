import Express from "express";
import protect from "../middlewares/protect";
import {
  createTask,
  deleteTask,
  getBoardTasks,
  getTaskDetails,
  updateTask,
} from "../controllers/tasksController";
import commentsRouter from "./commentsRouter";

const tasksRouter = Express.Router({ mergeParams: true });

tasksRouter.use("/:taskId/comments", commentsRouter);

tasksRouter.use(protect);

tasksRouter.get("/", getBoardTasks);
tasksRouter.post("/", createTask);
tasksRouter.get("/:taskId", getTaskDetails);
tasksRouter.patch("/:taskId", updateTask);
tasksRouter.delete("/:taskId", deleteTask);

export default tasksRouter;
