export interface InviteInput {
  teamId: string;
  userQuery: string;
  inviterId: string;
  role: string;
}

export interface HandleInvitationInput {
  invitationId: string;
  userId: string;
}
