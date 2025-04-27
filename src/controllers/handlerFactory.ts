import { Request, Response, NextFunction } from "express";
import mongoose, { Model, PopulateOptions } from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import UserInterface from "../interfaces/UserInterface";
import { cascadeDelete } from "../utils/cascadeDelete";

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
      data: doc,
    });
  });

export const createOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...res.locals.parentReference };

    const doc = await Model.create(data);

    res.status(201).json({
      status: "success",
      data: doc,
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
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const doc = await Model.findById(req.params.id).session(session);

      if (!doc) {
        await session.abortTransaction();
        return next(new AppError("No document found with that ID", 404));
      }

      await cascadeDelete(session, Model, req.params.id);

      await Model.findByIdAndDelete(req.params.id).session(session);

      await session.commitTransaction();

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      await session.abortTransaction();

      return next(error);
    } finally {
      await session.endSession();
    }
  });

export const getAll = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const searchObject = res.locals.parentReference;

    const docs = await Model.find(searchObject);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
