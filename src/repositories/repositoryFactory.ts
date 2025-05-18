import { Model, PopulateOptions } from "mongoose";

export class RepositoryFactory<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  findAll(filter: any) {
    return this.model.find(filter);
  }

  findById(id: string, populateOptions?: PopulateOptions) {
    let query = this.model.findById(id);
    if (populateOptions) query = query.populate(populateOptions);
    return query;
  }

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  update(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
