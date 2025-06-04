import Express from "express";
import {
  createTask,
  deleteTask,
  getBoardTasks,
  getTaskDetails,
  updateTask,
} from "../controllers/tasksController";
import commentsRouter from "./commentsRouter";
import { restrictToRole } from "../middlewares/restrictToRole";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import Task from "../models/TaskModel";
import Board from "../models/BoardModel";
import taskLabelsRouter from "./taskLabelsRouter";

const tasksRouter = Express.Router({ mergeParams: true });

tasksRouter.use("/:taskId/comments", commentsRouter);
tasksRouter.use("/:taskId/labels", taskLabelsRouter);

tasksRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  getBoardTasks
);
tasksRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Board, "boardId"),
  createTask
);
tasksRouter.get(
  "/:taskId",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  getTaskDetails
);
tasksRouter.patch(
  "/:taskId",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  updateTask
);
tasksRouter.delete(
  "/:taskId",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  restrictToRole("admin", "owner"),
  deleteTask
);

export default tasksRouter;
