import catchAsync from "../../utils/catchAsync";
import {
  findAll,
  findOne,
  create,
  update,
  move,
  remove,
  addLabel,
  removeLabel,
} from "./card.service";

export const getBoardCards = catchAsync(async (req, res) => {
  const cards = await findAll(req.params.boardId);
  res.status(200).json({ status: "success", data: cards });
});

export const getCardDetails = catchAsync(async (req, res) => {
  const card = await findOne(req.params.cardId);
  res.status(200).json({ status: "success", data: card });
});

export const createCard = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const { listId, boardId, teamId } = req.params;
  const card = await create({
    title,
    description,
    listId,
    boardId,
    teamId,
  });
  res.status(201).json({ status: "success", data: card });
});

export const updateCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user.id;

  const result = await update({ cardId, updates: req.body, userId });
  res.status(200).json({ status: "success", data: result });
});

export const moveCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user.id;
  const { targetListId, newOrder } = req.body;

  const result = await move({
    cardId,
    targetListId,
    newOrder,
    userId,
  });
  res.status(200).json({ status: "success", data: result });
});

export const deleteCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user.id;
  await remove({ cardId, userId });
  res.status(204).send();
});

export const addLabelToCard = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user.id;
  const result = await addLabel({
    cardId,
    labelId: req.body.labelId,
    userId,
  });
  res.status(200).json({ status: "success", data: result });
});

export const removeLabelFromCard = catchAsync(async (req, res) => {
  const { cardId, labelId } = req.params;
  const userId = req.user.id;
  const result = await removeLabel({ cardId, labelId, userId });
  res.status(200).json({ status: "success", data: result });
});
