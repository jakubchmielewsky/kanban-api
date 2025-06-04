import Column from "../models/ColumnModel";

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
    return await Column.findByIdAndDelete(columnId).lean();
  }
}

export default new ColumnService();
