import catchAsync from "../../utils/catchAsync";
import {
  addLabel,
  create,
  findAll,
  findOne,
  moveToList,
  remove,
  removeLabel,
  update,
} from "./card.service";
import { NextFunction, Request, Response } from "express";

export const getBoardCards = catchAsync(async (req: Request, res: Response) => {
  const listId = req.params.listId;

  const cards = await findAll(listId);
  res.status(200).json({ status: "success", data: cards });
});

export const createCard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const { teamId, boardId, listId } = req.params;
    const createdBy = req.user.id;

    const card = await create(
      {
        title,
        description,
        teamId,
        boardId,
        listId,
        createdBy,
      },
      req.user
    );
    res.status(201).json({ status: "success", data: card });
  }
);

export const getCardDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { cardId } = req.params;
    const card = await findOne(cardId);
    res.status(200).json({ status: "success", data: card });
  }
);

export const updateCard = catchAsync(async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const card = await update(cardId, req.body, req.user);
  res.status(200).json({ status: "success", data: card });
});

export const moveCardToList = catchAsync(
  async (req: Request, res: Response) => {
    const { cardId } = req.params;
    const { targetListId } = req.body;

    const card = await moveToList(cardId, targetListId);
    res.status(200).json({ status: "success", data: card });
  }
);

export const deleteCard = catchAsync(async (req: Request, res: Response) => {
  const { cardId, teamId } = req.params;
  await remove(cardId, teamId, req.user);
  res.status(204).send();
});

export const addLabelToCard = catchAsync(
  async (req: Request, res: Response) => {
    const { cardId } = req.params;
    const { labelId } = req.body;

    const card = await addLabel(cardId, labelId, req.user);
    res.status(200).json(card);
  }
);

export const removeLabelFromCard = catchAsync(
  async (req: Request, res: Response) => {
    const { cardId, labelId } = req.params;

    const card = await removeLabel(cardId, labelId, req.user);
    res.status(200).json(card);
  }
);
