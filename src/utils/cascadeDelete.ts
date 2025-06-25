import mongoose, { ClientSession } from "mongoose";
import Team from "../features/teams/team.model";
import Label from "../features/labels/label.model";
import Board from "../features/boards/board.model";
import Comment from "../features/comments/comment.model";
import TeamMember from "../features/teamMembers/teamMember.model";
import List from "../features/lists/list.model";
import Card from "../features/cards/card.model";

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

  const team = await Team.findOneAndDelete({ _id: teamId }).session(session);
  await TeamMember.deleteMany({ teamId }).session(session);

  return team;
}

export async function cascadeDeleteBoard(
  boardId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  const lists = await List.find({ boardId })
    .select("_id")
    .lean()
    .session(session);
  for (const list of lists) {
    await cascadeDeleteList(list._id, session);
  }

  return await Board.findOneAndDelete({ _id: boardId }).session(session);
}

export async function cascadeDeleteList(
  listId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  const cards = await Card.find({ listId })
    .select("_id")
    .lean()
    .session(session);
  for (const card of cards) {
    await cascadeDeleteCard(card._id as mongoose.Types.ObjectId, session);
  }

  return await List.findOneAndDelete({ _id: listId }).session(session);
}

export async function cascadeDeleteCard(
  cardId: mongoose.Types.ObjectId,
  session: ClientSession
) {
  await Comment.deleteMany({ cardId }).session(session);

  return await Card.findOneAndDelete({ _id: cardId }).session(session);
}
