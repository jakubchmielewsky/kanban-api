import { create, findAll, remove, update } from "./board.service";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const getTeamBoards = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;

  const boards = await findAll(teamId);
  res.status(200).json({ status: "success", data: boards });
});

export const createBoard = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const { name } = req.body;

  const board = await create({ teamId, name });
  res.status(201).json({ status: "success", data: board });
});

export const updateBoard = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  const { name } = req.body;

  const board = await update({ boardId, name });
  res.status(200).json({ status: "success", data: board });
});

export const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  const { boardId, teamId } = req.params;

  await remove(boardId);
  res.status(204).send();
});
