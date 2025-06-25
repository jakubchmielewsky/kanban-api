import {
  addChecklistItemService,
  createChecklistService,
  deleteChecklistItemService,
  deleteChecklistService,
  getChecklistsService,
  updateChecklistItemService,
  updateChecklistService,
} from "./checklist.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";

export const getChecklists = catchAsync(async (req: Request, res: Response) => {
  const cardId = req.params.cardId;

  const checklists = await getChecklistsService(cardId);
  res.status(200).json({ status: "success", data: checklists });
});

export const createChecklist = catchAsync(
  async (req: Request, res: Response) => {
    const cardId = req.params.cardId;
    const { title, description } = req.body;

    const checklist = await createChecklistService({
      title,
      description,
      cardId,
    });
    res.status(201).json({ status: "success", data: checklist });
  }
);

export const updateChecklist = catchAsync(
  async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;
    const { title, description } = req.body;

    const updatedChecklist = await updateChecklistService(checklistId, {
      title,
      description,
    });
    res.status(200).json({ status: "success", data: updatedChecklist });
  }
);

export const deleteChecklist = catchAsync(
  async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;

    await deleteChecklistService(checklistId);
    res.status(204).send();
  }
);

export const addChecklistItem = catchAsync(
  async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;
    const { title, completed } = req.body;

    const updatedChecklist = await addChecklistItemService(checklistId, {
      title,
      completed,
    });
    res.status(200).json({ status: "success", data: updatedChecklist });
  }
);

export const updateChecklistItem = catchAsync(
  async (req: Request, res: Response) => {
    const { checklistId, itemId } = req.params;
    const { title, completed } = req.body;

    const updatedItem = await updateChecklistItemService(checklistId, itemId, {
      title,
      completed,
    });
    res.status(200).json({ status: "success", data: updatedItem });
  }
);

export const deleteChecklistItem = catchAsync(
  async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;
    const itemId = req.params.itemId;

    const updatedChecklist = await deleteChecklistItemService(
      checklistId,
      itemId
    );
    res.status(200).json({ status: "success", data: updatedChecklist });
  }
);
