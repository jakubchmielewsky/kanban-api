import type { Types } from "mongoose";

export interface CardDocument {
  _id: Types.ObjectId;
  title: string;
  description: string;
  listId: Types.ObjectId;
  boardId: Types.ObjectId;
  teamId: Types.ObjectId;
  order: number;
  labels: Types.ObjectId[];
}

export interface CreateCardInput {
  title: string;
  description?: string;
  listId: string;
  boardId: string;
  teamId: string;
}

export interface UpdateCardInput {
  cardId: string;
  updates: {
    title?: string;
    description?: string;
    order?: number;
  };
  userId: string;
}

export interface MoveCardInput {
  cardId: string;
  targetListId: string;
  newOrder: number;
  userId: string;
}

export interface RemoveCardInput {
  cardId: string;
  userId: string;
}

export interface LabelCardInput {
  cardId: string;
  labelId: string;
  userId: string;
}
