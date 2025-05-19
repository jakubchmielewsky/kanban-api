import { TaskRepository } from "../repositories/repositories";

class TaskService {
  findAll(filter: any) {
    return TaskRepository.findAll(filter);
  }

  findById(id: string) {
    return TaskRepository.findById(id);
  }

  create(data: any) {
    return TaskRepository.create(data);
  }

  update(id: string, updates: any) {
    return TaskRepository.update(id, updates);
  }

  remove(id: string) {
    return TaskRepository.delete(id);
  }
}

export default new TaskService();
