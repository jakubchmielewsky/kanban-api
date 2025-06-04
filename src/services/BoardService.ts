import Board from "../models/BoardModel";

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

  //TODO: cascade delete
  async delete(boardId: string) {
    const deletedBoard = await Board.findOneAndDelete({
      _id: boardId,
    }).lean();

    return deletedBoard;
  }
}

export default new BoardService();
