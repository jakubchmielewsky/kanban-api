import { create, findAll, remove, update } from "./list.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getBoardLists = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;

  const lists = await findAll(boardId);
  res.status(200).json({ status: "success", data: lists });
});

export const createList = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const boardId = req.params.boardId;
  const { name } = req.body;

  const list = await create({ teamId, boardId, name }, req.user);
  res.status(201).json({ status: "success", data: list });
});

export const updateList = catchAsync(async (req: Request, res: Response) => {
  const listId = req.params.listId;

  const list = await update(listId, req.body, req.user);
  res.status(200).json({ status: "success", data: list });
});

export const deleteList = catchAsync(async (req: Request, res: Response) => {
  const { listId, teamId } = req.params;

  await remove(listId, teamId, req.user);
  res.status(204).send();
});
