import Express from "express";
import {
  createLabel,
  deleteLabel,
  getTeamLabels,
  updateLabel,
} from "../controllers/labelsController";
import protect from "../middlewares/protect";

const labelsRouter = Express.Router({ mergeParams: true });

labelsRouter.get("/", getTeamLabels);
labelsRouter.post("/", createLabel);
labelsRouter.patch("/:labelId", updateLabel);
labelsRouter.delete("/:labelId", deleteLabel);

export default labelsRouter;
