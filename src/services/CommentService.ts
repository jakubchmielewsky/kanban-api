import { CommentRepository } from "../repositories/repositories";

class CommentService {
  findAll(filter: any) {
    return CommentRepository.findAll(filter);
  }

  findById(id: string) {
    return CommentRepository.findById(id);
  }

  create(data: any) {
    return CommentRepository.create(data);
  }

  update(id: string, updates: any) {
    return CommentRepository.update(id, updates);
  }

  remove(id: string) {
    return CommentRepository.delete(id);
  }
}

export default new CommentService();
