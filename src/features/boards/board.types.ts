export interface CreateBoardPayload {
  teamId: string;
  name: string;
}

export interface UpdateBoardPayload {
  boardId: string;
  name: string;
}
