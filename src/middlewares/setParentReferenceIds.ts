import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import Board from "../models/BoardModel";
import Column from "../models/ColumnModel";
import Task from "../models/TaskModel";

// This middleware sets the reference IDs for the models based on the request parameters and the user ID
// It is used to ensure that the correct parent ID is set for each model when creating or updating documents
export const setParentReferenceIds =
  (Model: Model<any>) => (req: Request, res: Response, next: NextFunction) => {
    const parentReference: Record<string, string> = {};

    if (Model === Board) {
      parentReference.ownerId = res.locals.user.id;
    } else if (Model === Column || Model === Task) {
      parentReference.boardId = req.params.id;
    }

    res.locals.parentReference = parentReference;

    next();
  };

export default setParentReferenceIds;
