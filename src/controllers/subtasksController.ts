import { createOne, getAll, deleteOne, updateOne } from "./handlerFactory";
import Subtask from "../models/SubtaskModel";

export const getAllSubtasks = getAll(Subtask);
export const createSubtask = createOne(Subtask);
export const updateSubtask = updateOne(Subtask);
export const deleteSubtask = deleteOne(Subtask);
