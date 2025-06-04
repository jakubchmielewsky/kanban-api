import mongoose, { Document } from "mongoose";

export interface TaskInterface extends Document {
  title: string;
  description: string;
  columnId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  order?: number;
  priority: string;
  labels: [mongoose.Types.ObjectId];
}
