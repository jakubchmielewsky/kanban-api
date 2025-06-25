import User from "./user.model";

export const getUserById = async (id: string) => {
  return await User.findById(id);
};
