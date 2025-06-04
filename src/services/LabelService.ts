import Label from "../models/LabelModel";

class LabelService {
  findAll(teamId: string) {
    return Label.find({ teamId }).lean();
  }

  create(data: { teamId: string; name: string; color: string }) {
    return Label.create(data);
  }

  update(labelId: string, updates: { name: string; color: string }) {
    return Label.findByIdAndUpdate(labelId, updates);
  }

  remove(labelId: string) {
    return Label.findByIdAndDelete(labelId);
  }
}

export default new LabelService();
