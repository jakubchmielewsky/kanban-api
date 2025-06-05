import mongoose from "mongoose";
import Column from "../models/ColumnModel";
import { cascadeDeleteColumn } from "../utils/cascadeDelete";

class ColumnService {
  async findAll(boardId: string) {
    return await Column.find({ boardId }).lean();
  }

  async create(data: { teamId: string; boardId: string; name: string }) {
    return await Column.create(data);
  }

  async update(columnId: string, updates: { name: string; order: number }) {
    return await Column.findByIdAndUpdate(columnId, updates, {
      new: true,
      runValidators: true,
      lean: true,
    });
  }

  async remove(columnId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await cascadeDeleteColumn(new mongoose.Types.ObjectId(columnId), session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new ColumnService();
