import { LabelRepository } from "../repositories/repositories";

class LabelService {
  findAll(filter: any) {
    return LabelRepository.findAll(filter);
  }

  findById(id: string) {
    return LabelRepository.findById(id);
  }

  create(data: any) {
    return LabelRepository.create(data);
  }

  update(id: string, updates: any) {
    return LabelRepository.update(id, updates);
  }

  remove(id: string) {
    return LabelRepository.delete(id);
  }
}

export default new LabelService();
