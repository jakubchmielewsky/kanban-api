import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from "./handlerFactory";
import Board from "../models/BoardModel";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import Column from "../models/ColumnModel";

export const getAllColumns = getAll(Column);
export const createColumn = createOne(Column);
export const updateColumn = updateOne(Column);
export const deleteColumn = deleteOne(Column);
