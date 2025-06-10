import { Document } from "mongoose";

export interface ITeamService {
  findAll(userId: string): Promise<Document[]>;
  create(ownerId: string, name: string): Promise<Document>;
  update(teamId: string, name: string): Promise<Document | null>;
  remove(teamId: string): Promise<void>;
}
