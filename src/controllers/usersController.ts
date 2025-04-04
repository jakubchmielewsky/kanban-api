import User from "../models/UserModel";
import { getOne } from "./handlerFactory";

export const getUser = getOne(User);
