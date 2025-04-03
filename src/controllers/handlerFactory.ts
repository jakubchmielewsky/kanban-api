import { Request, Response, NextFunction } from "express";
import { Model, PopulateOptions } from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import UserInterface from "../interfaces/UserInterface";
import Board from "../models/BoardModel";

export const getOne = (Model: Model<any>, populateOptions?: PopulateOptions) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let doc: UserInterface | null;
    if (populateOptions) {
      doc = await Model.findById(req.params.id).populate(populateOptions);
    } else {
      doc = await Model.findById(req.params.id);
    }

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    if (Model === Board)
      data = { ...req.body, owner: res.locals.user.id.toString() };

    const doc = await Model.create(data);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const updateOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

//only for testing
export const getAll = (Model: Model<any>, searchObject?: Object) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let docs;
    docs = searchObject ? await Model.find(searchObject) : await Model.find();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
