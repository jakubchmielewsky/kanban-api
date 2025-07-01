import Label from "./label.model";
import { CreateLabelInput, UpdateLabelInput } from "./label.types";

export const findAll = (teamId: string) => {
  return Label.find({ teamId }).lean();
};

export const create = async (data: CreateLabelInput) => {
  return Label.create(data);
};

export const update = async (labelId: string, updates: UpdateLabelInput) => {
  return Label.findByIdAndUpdate(labelId, updates, { new: true });
};

export const remove = async (labelId: string) => {
  return Label.findByIdAndDelete(labelId);
};
