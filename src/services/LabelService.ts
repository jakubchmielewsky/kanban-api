import Activity from "../models/ActivityModel";
import Label from "../models/LabelModel";
import AppError from "../utils/AppError";

export const findAll = (teamId: string) => {
  return Label.find({ teamId }).lean();
};

export const create = async (
  data: {
    teamId: string;
    name: string;
    color: string;
  },
  user: Express.User
) => {
  const label = await Label.create(data);

  await Activity.create({
    teamId: label.teamId,
    performedBy: user.name || user.email,
    action: "create",
    entityType: Label.modelName,
    targetEntityId: label._id,
  });

  return label;
};

export const update = async (
  labelId: string,
  updates: { name: string; color: string },
  user: Express.User
) => {
  const label = await Label.findByIdAndUpdate(labelId, updates);

  if (!label) {
    throw new AppError("Label not found", 404);
  }

  await Activity.create({
    teamId: label.teamId,
    performedBy: user.name || user.email,
    action: "update",
    entityType: Label.modelName,
    targetEntityId: label._id,
    targetEntityName: label.name,
  });

  return label;
};

export const remove = async (labelId: string, user: Express.User) => {
  const label = await Label.findByIdAndDelete(labelId);

  if (!label) {
    throw new AppError("Label not found", 404);
  }

  await Activity.create({
    teamId: label.teamId,
    performedBy: user.name || user.email,
    action: "delete",
    entityType: Label.modelName,
    targetEntityId: label._id,
  });

  return label;
};
