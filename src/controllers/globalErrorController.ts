import { Request, Response } from "express";
import AppError from "../utils/AppError";

const sendErrorDevelopment = (err: any, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleDuplicateFieldsErrorDB = (err: any) => {
  const value = err.errmsg.match(/{\s*name:\s*"([^"]+)"\s*}/)[1];

  const message = `Duplicate field value: ${value} `;

  return new AppError(message, 400);
};

const globalErrorController = (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Unspecified error";

  switch (process.env.NODE_ENV) {
    case "development":
      sendErrorDevelopment(err, req, res);
      break;
    case "production":
      if (err.code === 11000) err = handleDuplicateFieldsErrorDB(err);
    default:
      next();
  }
};

export default globalErrorController;
