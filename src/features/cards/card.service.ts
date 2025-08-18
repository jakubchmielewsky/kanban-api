import mongoose from "mongoose";
import Card from "./card.model";
import Activity from "../activities/activity.model";
import AppError from "../../utils/AppError";
import {
  CreateCardInput,
  UpdateCardInput,
  MoveCardInput,
  RemoveCardInput,
  LabelCardInput,
} from "./card.types";

export const findAll = async (boardId: string) => {
  return Card.find({ boardId }).sort({ order: 1 }).lean();
};

export const findOne = async (cardId: string) => {
  const card = await Card.findById(cardId).populate("labels").lean();
  if (!card) throw new AppError("Card not found", 404);
  return card;
};

export const create = async ({
  title,
  description,
  listId,
  boardId,
  teamId,
}: CreateCardInput) => {
  const card = await Card.create({
    title,
    description,
    listId,
    boardId,
    teamId,
  });
  await Activity.create({
    teamId: card.teamId,
    performedBy: card.teamId.toString(),
    action: "create",
    cardId: card._id,
  });
  return card;
};

export const update = async ({ cardId, updates, userId }: UpdateCardInput) => {
  const card = await Card.findByIdAndUpdate(cardId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  }).populate("labels");
  if (!card) throw new AppError("Card not found", 404);

  await Activity.create({
    teamId: card.teamId,
    performedBy: userId,
    action: "update",
    cardId: card._id,
  });
  return card;
};

export const move = async ({
  cardId,
  targetListId,
  newOrder,
  userId,
}: MoveCardInput) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { listId: targetListId, order: newOrder },
    { new: true, runValidators: true, lean: true }
  );
  if (!card) throw new AppError("Card not found", 404);

  await Activity.create({
    teamId: card.teamId,
    performedBy: userId,
    action: "move",
    cardId: card._id,
  });
  return card;
};

export const remove = async ({ cardId, userId }: RemoveCardInput) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let card;
  try {
    card = await Card.findByIdAndDelete(cardId, { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
  if (!card) throw new AppError("Card not found", 404);

  await Activity.create({
    teamId: card.teamId,
    performedBy: userId,
    action: "delete",
    cardId: card._id,
  });
};

export const addLabel = async ({ cardId, labelId, userId }: LabelCardInput) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { labels: labelId } },
    { new: true }
  ).populate("labels");
  if (!card) throw new AppError("Card not found", 404);

  await Activity.create({
    teamId: card.teamId,
    performedBy: userId,
    action: "add_label",
    cardId: card._id,
  });
  return card;
};

export const removeLabel = async ({
  cardId,
  labelId,
  userId,
}: LabelCardInput) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { labels: labelId } },
    { new: true }
  ).populate("labels");
  if (!card) throw new AppError("Card not found", 404);

  await Activity.create({
    teamId: card.teamId,
    performedBy: userId,
    action: "remove_label",
    cardId: card._id,
  });
  return card;
};
