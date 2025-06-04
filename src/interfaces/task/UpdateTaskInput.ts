export interface UpdateTaskInput {
  title?: string;
  description?: string;
  columnId?: string;
  createdBy?: string;
  order?: number;
  labels?: string[];
}
