import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from "./handlerFactory";
import Task from "../models/TaskModel";

export const getAllTasks = getAll(Task);
export const getTask = getOne(Task);
export const createTask = createOne(Task);
export const updateTask = updateOne(Task);
export const deleteTask = deleteOne(Task);
