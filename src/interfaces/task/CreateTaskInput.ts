export interface CreateTaskInput {
  title: string;
  description?: string;
  columnId: string;
  boardId: string;
  teamId: string;
  createdBy: string;
  order?: number;
  labels?: string[];
}
