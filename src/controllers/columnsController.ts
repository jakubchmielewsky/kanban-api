import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from "./handlerFactory";
import Column from "../models/ColumnModel";

export const getBoardColumns = getAll(Column);
export const createColumn = createOne(Column, "columns_updated", true);
export const getColumnDetails = getOne(Column);
export const updateColumn = updateOne(Column, "columns_updated", true);
export const deleteColumn = deleteOne(Column, "columns_updated", true);
