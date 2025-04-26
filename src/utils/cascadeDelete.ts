import mongoose, { Model } from "mongoose";
import Board from "../models/BoardModel";
import Column from "../models/ColumnModel";
import Task from "../models/TaskModel";

export const cascadeDelete = async (
  session: mongoose.ClientSession,
  model: Model<any>,
  documentId: string
) => {
  if (model === Board) {
    await Task.deleteMany({ boardId: documentId }).session(session);
    await Column.deleteMany({ boardId: documentId }).session(session);
  }
};
