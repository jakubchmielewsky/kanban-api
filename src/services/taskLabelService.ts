import Task from "../models/TaskModel";

export const addLabel = (taskId: string, labelId: string) => {
  return Task.findByIdAndUpdate(
    taskId,
    { $addToSet: { labels: labelId } },
    { new: true }
  ).populate("labels");
};

export const removeLabel = (taskId: string, labelId: string) => {
  return Task.findByIdAndUpdate(
    taskId,
    { $pull: { labels: labelId } },
    { new: true }
  ).populate("labels");
};
