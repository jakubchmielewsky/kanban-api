import { ColumnRepository } from "../repositories/repositories";

class ColumnService {
  findAll(filter: any) {
    return ColumnRepository.findAll(filter);
  }

  findById(id: string) {
    return ColumnRepository.findById(id);
  }

  create(data: any) {
    return ColumnRepository.create(data);
  }

  update(id: string, updates: any) {
    return ColumnRepository.update(id, updates);
  }

  remove(id: string) {
    return ColumnRepository.delete(id);
  }
}

export default new ColumnService();
