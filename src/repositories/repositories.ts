import Board from "../models/BoardModel";
import Column from "../models/ColumnModel";
import Task from "../models/TaskModel";
import TeamMember from "../models/TeamMemberModel";
import Team from "../models/TeamModel";
import Comment from "../models/CommentModel";
import { RepositoryFactory } from "./repositoryFactory";
import Label from "../models/LabelModel";
import User from "../models/UserModel";

export const UserRepository = new RepositoryFactory(User);
export const TeamRepository = new RepositoryFactory(Team);
export const TeamMemberRepository = new RepositoryFactory(TeamMember);
export const BoardRepository = new RepositoryFactory(Board);
export const ColumnRepository = new RepositoryFactory(Column);
export const TaskRepository = new RepositoryFactory(Task);
export const CommentRepository = new RepositoryFactory(Comment);
export const LabelRepository = new RepositoryFactory(Label);
