import Express from "express";
import checkIfResourceBelongsToUsersTeam from "../middlewares/checkIfResourceBelongsToTeam";
import {
  addLabelToTask,
  removeLabelFromTask,
} from "../controllers/taskLabelsController";
import Task from "../models/TaskModel";
import Label from "../models/LabelModel";

const taskLabelsRouter = Express.Router({ mergeParams: true });

taskLabelsRouter.patch(
  "/",
  checkIfResourceBelongsToUsersTeam(Task, "taskId"),
  addLabelToTask
);
taskLabelsRouter.delete(
  "/:labelId",
  checkIfResourceBelongsToUsersTeam(Label, "labelId"),
  removeLabelFromTask
);

export default taskLabelsRouter;
