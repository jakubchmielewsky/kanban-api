import mongoose from "mongoose";
import { Document } from "mongoose";

interface IList {
  boardId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  name: string;
  order?: number;
}

export interface ListDocument extends IList, Document {
  _id: mongoose.Types.ObjectId;
}
