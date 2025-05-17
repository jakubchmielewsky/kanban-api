import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory";
import Team from "../models/TeamModel";

export const getUserTeams = getAll(Team);
export const createTeam = createOne(Team);
export const getTeamDetails = getOne(Team);
export const updateTeam = updateOne(Team);
export const deleteTeam = deleteOne(Team);
