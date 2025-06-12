import Activity from "../models/ActivityModel";
import Task from "../models/TaskModel";

export const addLabel = async (
  taskId: string,
  labelId: string,
  user: Express.User
) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $addToSet: { labels: labelId } },
    { new: true }
  ).populate("labels");

  if (!task) {
    throw new Error("Task not found");
  }

  await Activity.create({
    teamId: task.teamId,
    performedBy: user.name || user.email,
    action: "add_label",
    entityType: Task.modelName,
    targetEntityId: task._id,
    targetEntityName: task.title,
  });

  return task;
};

export const removeLabel = async (
  taskId: string,
  labelId: string,
  user: Express.User
) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $pull: { labels: labelId } },
    { new: true }
  ).populate("labels");

  if (!task) {
    throw new Error("Task not found");
  }

  await Activity.create({
    teamId: task.teamId,
    performedBy: user.name || user.email,
    action: "remove_label",
    entityType: Task.modelName,
    targetEntityId: task._id,
    targetEntityName: task.title,
  });

  return task;
};
