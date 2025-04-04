import { createOne, getAll, deleteOne, updateOne } from "./handlerFactory";
import Task from "../models/TaskModel";

export const getAllTasks = getAll(Task);
export const createTask = createOne(Task);
export const updateTask = updateOne(Task);
export const deleteTask = deleteOne(Task);
