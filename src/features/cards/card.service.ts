import mongoose from "mongoose";
import { CreateCardInput } from "./types/CreateCardInput";
import { UpdateCardInput } from "./types/UpdateCardInput";
import Card from "./card.model";
import { cascadeDeleteCard } from "../../utils/cascadeDelete";
import Activity from "../activities/activity.model";
import AppError from "../../utils/AppError";
import Label from "../labels/label.model";

export const findAll = async (listId: string) => {
  return await Card.aggregate([
    {
      $match: { listId: new mongoose.Types.ObjectId(listId) },
    },
    {
      $lookup: {
        from: "labels",
        localField: "labels",
        foreignField: "_id",
        as: "labels",
      },
    },
  ]);
};

export const findOne = async (cardId: string) => {
  return await Card.findById(cardId).populate("labels").lean();
};

export const create = async (data: CreateCardInput, user: Express.User) => {
  const card = await Card.create(data);
  await Activity.create({
    teamId: card.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Card.modelName,
    targetEntityId: card._id,
  });

  return card;
};

export const update = async (
  cardId: string,
  updates: UpdateCardInput,
  user: Express.User
) => {
  const card = await Card.findByIdAndUpdate(cardId, updates, {
    new: true,
    runValidators: true,
    lean: true,
  }).populate("labels");

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await Activity.create({
    teamId: card.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Card.modelName,
    targetEntityId: card._id,
  });

  return card;
};

export const moveToList = async (cardId: string, targetListId: string) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { listId: targetListId },
    { new: true, runValidators: true, lean: true }
  );
};

export const remove = async (
  cardId: string,
  teamId: string,
  user: Express.User
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteCard(new mongoose.Types.ObjectId(cardId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  await Activity.create({
    teamId: teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Card.modelName,
    targetEntityId: cardId,
  });
};

export const addLabel = async (
  cardId: string,
  labelId: string,
  user: Express.User
) => {
  if (!(await Label.findById(labelId))) {
    throw new AppError("Label not found", 404);
  }

  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { labels: labelId } },
    { new: true }
  ).populate("labels");

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await Activity.create({
    teamId: card.teamId,
    performedBy: user.name || user.email,
    action: "add_label",
    entityType: Card.modelName,
    targetEntityId: card._id,
    targetEntityName: card.title,
  });

  return card;
};

export const removeLabel = async (
  cardId: string,
  labelId: string,
  user: Express.User
) => {
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { labels: labelId } },
    { new: true }
  ).populate("labels");

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await Activity.create({
    teamId: card.teamId,
    performedBy: user.name || user.email,
    action: "remove_label",
    entityType: Card.modelName,
    targetEntityId: card._id,
    targetEntityName: card.title,
  });

  return card;
};
