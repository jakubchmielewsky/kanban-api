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

export const getAllBoards = getAll(Board);
export const getBoard = getOne(Board);
export const createBoard = createOne(Board);
export const updateBoard = updateOne(Board);
export const deleteBoard = deleteOne(Board);
