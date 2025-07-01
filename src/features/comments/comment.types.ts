export interface CreateCommentInput {
  teamId: string;
  cardId: string;
  authorId: string;
  content: string;
}

export interface UpdateCommentInput {
  commentId: string;
  authorId: string;
  content: string;
}

export interface DeleteCommentInput {
  commentId: string;
  authorId: string;
}
