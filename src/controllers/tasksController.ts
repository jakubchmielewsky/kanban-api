import {
  getAll,
  deleteOne,
  updateOne,
  getOne,
  createOne,
} from "./handlerFactory";
import Task from "../models/TaskModel";

export const getBoardTasks = getAll(Task);
export const getTaskDetails = getOne(Task);
export const createTask = createOne(Task, "task_created", true);
export const updateTask = updateOne(Task, "task_updated", true);
export const deleteTask = deleteOne(Task, "task_deleted", true);
