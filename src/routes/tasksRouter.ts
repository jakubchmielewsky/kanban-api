import Express from "express";
import {
  createTask,
  deleteTask,
  getBoardTasks,
  getTaskDetails,
  moveTaskToColumn,
  updateTask,
} from "../controllers/tasksController";
import commentsRouter from "./commentsRouter";
import { restrictToRole } from "../middlewares/restrictToRole";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import Task from "../models/TaskModel";
import taskLabelsRouter from "./taskLabelsRouter";
import Column from "../models/ColumnModel";

const tasksRouter = Express.Router({ mergeParams: true });

tasksRouter.use("/:taskId/comments", commentsRouter);
tasksRouter.use("/:taskId/labels", taskLabelsRouter);

tasksRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Column, "columnId"),
  getBoardTasks
);
tasksRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Column, "columnId"),
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
tasksRouter.patch(
  "/:taskId/move",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  moveTaskToColumn
);
tasksRouter.delete(
  "/:taskId",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  restrictToRole("admin", "owner"),
  deleteTask
);

export default tasksRouter;
