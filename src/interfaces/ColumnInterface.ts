import mongoose from "mongoose";

export interface ColumnInterface {
  boardId: mongoose.Types.ObjectId;
  name: string;
  order?: number;
}
