import mongoose from "mongoose";
import TeamMember from "../models/TeamMemberModel";
import Team from "../models/TeamModel";

class TeamService {
  async findAll(userId: string) {
    return await TeamMember.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teamId",
          foreignField: "_id",
          as: "teamData",
        },
      },
      { $unwind: "$teamData" },
      {
        $project: {
          teamId: 0,
          userId: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          "teamData.createdAt": 0,
          "teamData.updatedAt": 0,
          "teamData.__v": 0,
        },
      },
    ]);
  }

  async create(ownerId: string, name: string) {
    ///TODO: implement sessions here

    const team = await Team.create({ name });
    await TeamMember.create({
      teamId: team._id,
      userId: ownerId,
      role: "owner",
    });

    return team;
  }

  update(teamId: string, name: string) {
    return Team.findByIdAndUpdate(
      teamId,
      { name },
      { runValidators: true, new: true, lean: true }
    );
  }

  //TODO: cascade delete
  remove(teamId: string) {
    return Team.findByIdAndDelete(teamId).lean();
  }
}

export default new TeamService();
