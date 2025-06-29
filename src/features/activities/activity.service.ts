import Activity from "./activity.model";

export const findAllActivities = async (teamId: string) => {
  return await Activity.find({ teamId }).sort({ performedAt: "desc" }).lean();
};
