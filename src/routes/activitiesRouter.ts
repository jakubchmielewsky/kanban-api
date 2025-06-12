import express from "express";
import { getActivities } from "../controllers/activitiesController";

const activitiesRouter = express.Router({ mergeParams: true });

activitiesRouter.get("/", getActivities);

export default activitiesRouter;
