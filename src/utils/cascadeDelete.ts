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
    const columns = await Column.find({ board: documentId }).session(session);
    const columnIds = columns.map((col) => col._id);

    const tasks = await Task.find({ column: { $in: columnIds } }).session(
      session
    );
    const taskIds = tasks.map((task) => task._id);

    await Task.deleteMany({ column: { $in: columnIds } }).session(session);
    await Column.deleteMany({ board: documentId }).session(session);
  }

  if (model === Column) {
    const tasks = await Task.find({ column: documentId }).session(session);
    const taskIds = tasks.map((task) => task._id);

    await Task.deleteMany({ column: documentId }).session(session);
  }
};
