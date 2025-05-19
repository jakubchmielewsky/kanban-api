import BoardService from "../services/BoardService";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

export const getTeamBoards = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const boards = await BoardService.findAll({ teamId });
  res.status(200).json({ status: "success", data: boards });
});
export const createBoard = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params.teamId;
  const board = await BoardService.create({ ...req.body, teamId });
  res.status(201).json({ status: "success", data: board });
});
export const getBoardDetails = catchAsync(
  async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const board = await BoardService.findById(boardId);
    res.status(200).json({ status: "success", data: board });
  }
);
export const updateBoard = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  const board = await BoardService.update(boardId, req.body);
  res.status(200).json({ status: "success", data: board });
});
export const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  await BoardService.remove(boardId);
  res.status(204).send();
});
