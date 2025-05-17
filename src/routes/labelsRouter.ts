import Express from "express";
import {
  createLabel,
  deleteLabel,
  getTeamLabels,
  updateLabel,
} from "../controllers/labelsController";

const labelsRouter = Express.Router({ mergeParams: true });

labelsRouter.get("/", getTeamLabels);
labelsRouter.post("/", createLabel);
labelsRouter.patch("/:labelId", updateLabel);
labelsRouter.delete("/:labelId", deleteLabel);

export default labelsRouter;
