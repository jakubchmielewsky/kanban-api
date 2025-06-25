import { Checklist } from "./checklist.model";

export const getChecklistsService = async (cardId: string) => {
  return await Checklist.find({ cardId }).lean();
};

export const createChecklistService = async (checklistData: {
  cardId: string;
  title: string;
  description: string;
}) => {
  return await Checklist.create(checklistData);
};

export const updateChecklistService = async (
  checklistId: string,
  updateData: { title?: string; description?: string }
) => {
  return await Checklist.findByIdAndUpdate(checklistId, updateData, {
    new: true,
  }).lean();
};

export const deleteChecklistService = async (checklistId: string) => {
  return await Checklist.findByIdAndDelete(checklistId);
};

export const addChecklistItemService = async (
  checklistId: string,
  itemData: { title: string; completed?: boolean }
) => {
  return await Checklist.findByIdAndUpdate(
    checklistId,
    { $push: { items: itemData } },
    { new: true }
  ).lean();
};

export const updateChecklistItemService = async (
  checklistId: string,
  itemId: string,
  updateData: { title?: string; completed?: boolean }
) => {
  return await Checklist.findOneAndUpdate(
    { _id: checklistId, "items._id": itemId },
    { $set: { "items.$": updateData } },
    { new: true }
  ).lean();
};

export const deleteChecklistItemService = async (
  checklistId: string,
  itemId: string
) => {
  return await Checklist.findByIdAndUpdate(
    checklistId,
    { $pull: { items: { _id: itemId } } },
    { new: true }
  ).lean();
};
