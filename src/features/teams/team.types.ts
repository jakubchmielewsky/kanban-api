export interface CreateTeamInput {
  ownerId: string;
  name: string;
}

export interface UpdateTeamInput {
  name: string;
  logo?: string;
  description?: string;
}
