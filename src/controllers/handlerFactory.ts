import { Request, Response, NextFunction } from "express";
import mongoose, { Model, PopulateOptions } from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import UserInterface from "../interfaces/UserInterface";
import { cascadeDelete } from "../utils/cascadeDelete";
import { io } from "../server";

interface HandlerOptions {
  idName?: string;
  parentParam?: string;
  populate?: PopulateOptions | PopulateOptions[];
  pipeline?: any[];
  eventName?: string;
  sendEventData?: boolean;
}

export const getOne = (Model: Model<any>, options: HandlerOptions = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!options.idName) {
      return next(new AppError("Incorrect ID", 400));
    }

    let doc: UserInterface | null;
    if (options.populate) {
      doc = await Model.findById(req.params[options.idName]).populate(
        options.populate
      );
    } else {
      doc = await Model.findById(req.params[options.idName]);
    }

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const createOne = (Model: Model<any>, options: HandlerOptions = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data: any = { ...req.body };
    if (options.parentParam) {
      if (options.parentParam === "ownerId") {
        data[options.parentParam] = res.locals.user.id;
      } else data[options.parentParam] = req.params[options.parentParam];
    }

    console.log(data);

    const doc = await Model.create(data);

    console.log(doc);

    if (options.eventName) {
      const roomId = (doc as any)[options.parentParam!].toString();
      if (options.sendEventData) {
        io.to(roomId).emit(options.eventName, doc);
      } else {
        io.to(roomId).emit(options.eventName);
      }
    }

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const updateOne = (Model: Model<any>, options: HandlerOptions = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!options.idName) {
      return next(new AppError("Incorrect ID", 400));
    }

    const doc = await Model.findByIdAndUpdate(
      req.params[options.idName],
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    if (options.eventName) {
      const roomId = (doc as any)[options.parentParam!].toString();
      if (options.sendEventData) {
        io.to(roomId).emit(options.eventName, doc);
      } else {
        io.to(roomId).emit(options.eventName);
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: Model<any>, options: HandlerOptions = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!options.idName) {
      return next(new AppError("Incorrect ID", 400));
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      console.log(req.params[options.idName]);
      const doc = await Model.findById(req.params[options.idName]).session(
        session
      );

      if (!doc) {
        await session.abortTransaction();
        return next(new AppError("No document found with that ID", 404));
      }

      //await cascadeDelete(session, Model, req.params.id);

      await Model.findByIdAndDelete(req.params[options.idName]).session(
        session
      );

      await session.commitTransaction();

      if (options.eventName) {
        const socketId = req.headers["x-socket-id"];

        if (typeof socketId === "string") {
          if (options.sendEventData) {
            io.to(doc.boardId.toString())
              .except(socketId)
              .emit(options.eventName, doc._id);
          } else {
            io.to(doc.boardId.toString())
              .except(socketId)
              .emit(options.eventName);
          }
        }
      }

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

export const getAll = (Model: Model<any>, options: HandlerOptions = {}) =>
export const getAll = (Model: Model<any>, options: HandlerOptions = {}) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (options.parentParam) {
      if (options.parentParam === "ownerId") {
        filter = { [options.parentParam]: res.locals.user.id };
      } else
        filter = { [options.parentParam]: req.params[options.parentParam] };
    }

    let docs;
    if (options.pipeline) {
      const agg = [...options.pipeline];
      if (options.parentParam) {
        agg.unshift({ $match: filter });
      }
      docs = await Model.aggregate(agg);
    } else {
      let query = Model.find(filter);
      if (options.populate) {
        query = query.populate(options.populate);
      }
      docs = await query;
    }

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });
