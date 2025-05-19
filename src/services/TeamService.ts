import mongoose from "mongoose";
import {
  TeamMemberRepository,
  TeamRepository,
} from "../repositories/repositories";
import TeamMember from "../models/TeamMemberModel";

class TeamService {
  findAll(filter: any) {
    const userId = new mongoose.Types.ObjectId(filter.userId);

    return TeamMember.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "team",
        },
      },
      { $unwind: "$team" },
      {
        $project: {
          teamId: 0,
          userId: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          "team.createdAt": 0,
          "team.updatedAt": 0,
          "team.__v": 0,
        },
      },
    ]);
  }

  async create(data: any, ownerId: string) {
    ///TODO:implement sessions here
    const team = await TeamRepository.create(data);
    await TeamMemberRepository.create({
      teamId: team._id,
      userId: new mongoose.Types.ObjectId(ownerId),
      role: "owner",
    });

    return team;
  }

  update(id: string, updates: any) {
    return TeamRepository.update(id, updates);
  }

  remove(id: string) {
    return TeamRepository.delete(id);
  }
}

export default new TeamService();
