import mongoose, { ClientSession } from "mongoose";
import Team from "../models/TeamModel";
import Label from "../models/LabelModel";
import Board from "../models/BoardModel";
import Column from "../models/ColumnModel";
import Task from "../models/TaskModel";
import Comment from "../models/CommentModel";
import TeamMember from "../models/TeamMemberModel";

export async function cascadeDeleteTeam(
  teamId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  await Label.deleteMany({ teamId }).session(session);

  const boards = await Board.find({ teamId })
    .select("_id")
    .lean()
    .session(session);
  for (const board of boards) {
    await cascadeDeleteBoard(board._id, session);
  }

  await Team.deleteOne({ _id: teamId }).session(session);
  await TeamMember.deleteMany({ teamId }).session(session);
}

export async function cascadeDeleteBoard(
  boardId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  const columns = await Column.find({ boardId })
    .select("_id")
    .lean()
    .session(session);
  for (const column of columns) {
    await cascadeDeleteColumn(column._id, session);
  }

  await Board.deleteOne({ _id: boardId }).session(session);
}

export async function cascadeDeleteColumn(
  columnId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  const tasks = await Task.find({ columnId })
    .select("_id")
    .lean()
    .session(session);
  for (const task of tasks) {
    await cascadeDeleteTask(task._id, session);
  }

  await Column.deleteOne({ _id: columnId }).session(session);
}

export async function cascadeDeleteTask(
  taskId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  await Comment.deleteMany({ taskId }).session(session);

  await Task.deleteOne({ taskId }).session(session);
}
