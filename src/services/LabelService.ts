import Label from "../models/LabelModel";

export const findAll = (teamId: string) => {
  return Label.find({ teamId }).lean();
};

export const create = (data: {
  teamId: string;
  name: string;
  color: string;
}) => {
  return Label.create(data);
};

export const update = (
  labelId: string,
  updates: { name: string; color: string }
) => {
  return Label.findByIdAndUpdate(labelId, updates);
};

export const remove = (labelId: string) => {
  return Label.findByIdAndDelete(labelId);
};
