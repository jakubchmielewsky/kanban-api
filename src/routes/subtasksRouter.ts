import Express from "express";
import protect from "../middlewares/protect";
import {
  createSubtask,
  deleteSubtask,
  getAllSubtasks,
  updateSubtask,
} from "../controllers/subtasksController";
import setParentReferenceIds from "../middlewares/setParentReferenceIds";
import Subtask from "../models/SubtaskModel";

const subtasksRouter = Express.Router({ mergeParams: true }); //merge params gives access to params of previous router

subtasksRouter.use(protect);

subtasksRouter.use(setParentReferenceIds(Subtask));

subtasksRouter.get("/", getAllSubtasks);
subtasksRouter.post("/", createSubtask);
subtasksRouter.patch("/:id", updateSubtask);
subtasksRouter.delete("/:id", deleteSubtask);

export default subtasksRouter;
