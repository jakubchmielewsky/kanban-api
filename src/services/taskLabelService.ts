import Task from "../models/TaskModel";

class TaskLabelService {
  addLabelToTask(taskId: string, labelId: string) {
    return Task.findByIdAndUpdate(
      taskId,
      { $addToSet: { labels: labelId } },
      { new: true }
    ).populate("labels");
  }

  removeLabelFromTask(taskId: string, labelId: string) {
    return Task.findByIdAndUpdate(
      taskId,
      { $pull: { labels: labelId } },
      { new: true }
    ).populate("labels");
  }
}

export default new TaskLabelService();
