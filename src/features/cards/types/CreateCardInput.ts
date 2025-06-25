export interface CreateCardInput {
  title: string;
  description?: string;
  listId: string;
  boardId: string;
  teamId: string;
  createdBy: string;
  order?: number;
  labels?: string[];
}
