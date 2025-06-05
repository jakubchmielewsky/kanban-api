import mongoose from "mongoose";
import { Document } from "mongoose";

interface IColumn {
  boardId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  name: string;
  order?: number;
}

export interface ColumnDocument extends IColumn, Document {
  _id: mongoose.Types.ObjectId;
}
