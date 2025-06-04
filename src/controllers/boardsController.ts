import BoardService from "../services/BoardService";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export const getTeamBoards = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    const boards = await BoardService.findAll(teamId);
    res.status(200).json({ status: "success", data: boards });
  }
);

export const createBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;
    const { name } = req.body;

    const board = await BoardService.create(teamId, name);
    res.status(201).json({ status: "success", data: board });
  }
);

export const updateBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.boardId;
    const { name } = req.body;

    const board = await BoardService.update(boardId, name);
    res.status(200).json({ status: "success", data: board });
  }
);

export const deleteBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.boardId;

    await BoardService.delete(boardId);
    res.status(204).send();
  }
);
