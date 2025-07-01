export interface CreateMemberInput {
  teamId: string;
  userId: string;
  role?: string;
}

export interface UpdateMemberInput {
  teamId: string;
  userId: string;
  role: string;
}

export interface RemoveMemberInput {
  teamId: string;
  userId: string;
}
