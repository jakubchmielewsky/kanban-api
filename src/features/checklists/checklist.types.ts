export interface CreateChecklistInput {
  cardId: string;
  title: string;
  description: string;
}

export interface UpdateChecklistInput {
  checklistId: string;
  title?: string;
  description?: string;
}

export interface AddChecklistItemInput {
  checklistId: string;
  item: {
    title: string;
    completed?: boolean;
  };
}

export interface UpdateChecklistItemInput {
  checklistId: string;
  itemId: string;
  updates: {
    title?: string;
    completed?: boolean;
  };
}

export interface DeleteChecklistItemInput {
  checklistId: string;
  itemId: string;
}
