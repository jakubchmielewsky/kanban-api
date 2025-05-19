import ColumnService from "../services/ColumnService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getBoardColumns = catchAsync(
  async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const columns = await ColumnService.findAll({ boardId });
    res.status(200).json({ status: "success", data: columns });
  }
);

export const createColumn = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  const column = await ColumnService.create({ ...req.body, boardId });
  res.status(201).json({ status: "success", data: column });
});

export const getColumnDetails = catchAsync(
  async (req: Request, res: Response) => {
    const columnId = req.params.columnId;
    const column = await ColumnService.findById(columnId);
    res.status(200).json({ status: "success", data: column });
  }
);

export const updateColumn = catchAsync(async (req: Request, res: Response) => {
  const columnId = req.params.columnId;
  const column = await ColumnService.update(columnId, req.body);
  res.status(200).json({ status: "success", data: column });
});

export const deleteColumn = catchAsync(async (req: Request, res: Response) => {
  const columnId = req.params.columnId;
  await ColumnService.remove(columnId);
  res.status(204).send();
});
