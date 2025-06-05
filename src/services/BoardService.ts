import mongoose from "mongoose";
import Board from "../models/BoardModel";
import { cascadeDeleteBoard } from "../utils/cascadeDelete";

class BoardService {
  async findAll(teamId: string) {
    return await Board.find({ teamId }).lean();
  }

  async create(teamId: string, name: string) {
    return await Board.create({ teamId, name });
  }

  async update(boardId: string, name: string) {
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { name },
      {
        new: true,
        runValidators: true,
        lean: true,
      }
    );

    return updatedBoard;
  }

  async delete(boardId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await cascadeDeleteBoard(new mongoose.Types.ObjectId(boardId), session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new BoardService();
