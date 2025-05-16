import { createOne, getAll, deleteOne, updateOne } from "./handlerFactory";
import Column from "../models/ColumnModel";

export const getAllColumns = getAll(Column);
export const createColumn = createOne(Column, "columns_updated", true);
export const updateColumn = updateOne(Column, "columns_updated", true);
export const deleteColumn = deleteOne(Column, "columns_updated", true);
