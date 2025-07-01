import { Checklist } from "./checklist.model";
import {
  CreateChecklistInput,
  UpdateChecklistInput,
  AddChecklistItemInput,
  UpdateChecklistItemInput,
  DeleteChecklistItemInput,
} from "./checklist.types";

export const getChecklistsService = async (cardId: string) => {
  return await Checklist.find({ cardId }).lean();
};

export const createChecklistService = async ({
  cardId,
  title,
  description,
}: CreateChecklistInput) => {
  return await Checklist.create({ cardId, title, description });
};

export const updateChecklistService = async ({
  checklistId,
  title,
  description,
}: UpdateChecklistInput) => {
  return await Checklist.findByIdAndUpdate(
    checklistId,
    { title, description },
    { new: true }
  ).lean();
};

export const deleteChecklistService = async (checklistId: string) => {
  return await Checklist.findByIdAndDelete(checklistId);
};

export const addChecklistItemService = async ({
  checklistId,
  item,
}: AddChecklistItemInput) => {
  return await Checklist.findByIdAndUpdate(
    checklistId,
    { $push: { items: item } },
    { new: true }
  ).lean();
};

export const updateChecklistItemService = async ({
  checklistId,
  itemId,
  updates,
}: UpdateChecklistItemInput) => {
  return await Checklist.findOneAndUpdate(
    { _id: checklistId, "items._id": itemId },
    { $set: { "items.$": updates } },
    { new: true }
  ).lean();
};

export const deleteChecklistItemService = async ({
  checklistId,
  itemId,
}: DeleteChecklistItemInput) => {
  return await Checklist.findByIdAndUpdate(
    checklistId,
    { $pull: { items: { _id: itemId } } },
    { new: true }
  ).lean();
};
