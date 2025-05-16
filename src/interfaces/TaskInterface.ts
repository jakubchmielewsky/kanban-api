import mongoose, { Document } from "mongoose";
import { SubtaskInterface } from "./SubtaskInterface";

export interface TaskInterface {
  title: string;
  description: string;
  columnId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  subtasks: SubtaskInterface[];
  order?: number;
  priority: string;
  labels: [mongoose.Types.ObjectId];
}
