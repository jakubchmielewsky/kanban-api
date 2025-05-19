import { BoardRepository } from "../repositories/repositories";

class BoardService {
  findAll(filter: any) {
    return BoardRepository.findAll(filter);
  }

  findById(id: string) {
    return BoardRepository.findById(id);
  }

  create(data: any) {
    return BoardRepository.create(data);
  }

  update(id: string, updates: any) {
    return BoardRepository.update(id, updates);
  }

  remove(id: string) {
    return BoardRepository.delete(id);
  }
}

export default new BoardService();
