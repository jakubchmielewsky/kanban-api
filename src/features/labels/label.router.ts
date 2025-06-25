import Express from "express";
import {
  createLabel,
  deleteLabel,
  getTeamLabels,
  updateLabel,
} from "./label.controller";
import checkIfResourceBelongsToUsersTeam from "../../middlewares/checkIfResourceBelongsToTeam";
import Label from "./label.model";

const labelsRouter = Express.Router({ mergeParams: true });

labelsRouter.get("/", getTeamLabels);
labelsRouter.post("/", createLabel);
labelsRouter.patch(
  "/:labelId",
  checkIfResourceBelongsToUsersTeam(Label, "labelId"),
  updateLabel
);
labelsRouter.delete(
  "/:labelId",
  checkIfResourceBelongsToUsersTeam(Label, "labelId"),
  deleteLabel
);

export default labelsRouter;
