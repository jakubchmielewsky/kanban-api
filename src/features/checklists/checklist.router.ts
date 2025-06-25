import Express from "express";

import {
  getChecklists,
  createChecklist,
  updateChecklist,
  deleteChecklist,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} from "./checklist.controller";

const checklistsRouter = Express.Router({ mergeParams: true });

checklistsRouter.get("/", getChecklists);
checklistsRouter.post("/", createChecklist);
checklistsRouter.patch("/:checklistId", updateChecklist);
checklistsRouter.delete("/:checklistId", deleteChecklist);
checklistsRouter.post("/:checklistId/items", addChecklistItem);
checklistsRouter.patch("/:checklistId/items/:itemId", updateChecklistItem);
checklistsRouter.delete("/:checklistId/items/:itemId", deleteChecklistItem);

export default checklistsRouter;
