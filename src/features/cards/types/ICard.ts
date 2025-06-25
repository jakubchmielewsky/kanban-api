import mongoose, { Document } from "mongoose";

interface CardInterface {
  title: string;
  description: string;
  listId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  order?: number;
  priority: string;
  labels: [mongoose.Types.ObjectId];
}

export interface CardDocument extends CardInterface, Document {
  _id: mongoose.Types.ObjectId;
}
