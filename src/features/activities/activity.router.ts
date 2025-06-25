import express from "express";
import { getActivities } from "./activity.controller";

const activitiesRouter = express.Router({ mergeParams: true });

activitiesRouter.get("/", getActivities);

export default activitiesRouter;
