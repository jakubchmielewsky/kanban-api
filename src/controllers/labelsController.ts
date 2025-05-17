import { createOne, deleteOne, updateOne, getAll } from "./handlerFactory";
import Label from "../models/LabelModel";

export const getTeamLabels = getAll(Label);
export const createLabel = createOne(Label);
export const updateLabel = updateOne(Label);
export const deleteLabel = deleteOne(Label);
