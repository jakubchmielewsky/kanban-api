import mongoose from "mongoose";
import TeamMember from "../teamMembers/teamMember.model";
import Team from "./team.model";
import { cascadeDeleteTeam } from "../../utils/cascadeDelete";

export const findAll = async (userId: string) => {
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
};

export const create = async (ownerId: string, name: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let team;
  try {
    team = new Team({ name });
    await team.save({ session });

    await TeamMember.create(
      [
        {
          teamId: team._id,
          userId: ownerId,
          role: "owner",
        },
      ],
      { session }
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return team;
};

export const update = async (teamId: string, name: string) => {
  return await Team.findByIdAndUpdate(
    teamId,
    { name },
    { runValidators: true, new: true, lean: true }
  );
};

export const remove = async (teamId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await cascadeDeleteTeam(new mongoose.Types.ObjectId(teamId), session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
