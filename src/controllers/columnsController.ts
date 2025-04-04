import { createOne, getAll, deleteOne, updateOne } from "./handlerFactory";
import Column from "../models/ColumnModel";

export const getAllColumns = getAll(Column);
export const createColumn = createOne(Column);
export const updateColumn = updateOne(Column);
export const deleteColumn = deleteOne(Column);
