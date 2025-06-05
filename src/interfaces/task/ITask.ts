import mongoose, { Document } from "mongoose";

interface TaskInterface {
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

export interface TaskDocument extends TaskInterface, Document {
  _id: mongoose.Types.ObjectId;
}
