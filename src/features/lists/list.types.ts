import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ListDocument extends Document {
  _id: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  name: string;
  order: number;
}

export interface CreateListInput {
  teamId: string;
  boardId: string;
  name: string;
}

export interface UpdateListInput {
  name: string;
  order: number;
}
