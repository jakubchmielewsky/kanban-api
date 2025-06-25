import Express from "express";
import {
  addLabelToCard,
  createCard,
  deleteCard,
  getBoardCards,
  getCardDetails,
  moveCardToList,
  removeLabelFromCard,
  updateCard,
} from "./card.controller";
import commentsRouter from "../comments/comment.router";
import { restrictToRoles } from "../../middlewares/restrictToRoles";
import checkIfResourceBelongsToUsersTeam from "../../middlewares/checkIfResourceBelongsToTeam";
import Card from "./card.model";
import List from "../lists/list.model";
import Label from "../labels/label.model";

const cardsRouter = Express.Router({ mergeParams: true });

cardsRouter.use("/:cardId/comments", commentsRouter);

cardsRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(List, "listId"),
  getBoardCards
);
cardsRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(List, "listId"),
  createCard
);
cardsRouter.get(
  "/:cardId",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  getCardDetails
);
cardsRouter.patch(
  "/:cardId",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  updateCard
);
cardsRouter.delete(
  "/:cardId",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  restrictToRoles("admin", "owner"),
  deleteCard
);

// Move card to another list
cardsRouter.patch(
  "/:cardId/move",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  moveCardToList
);

// Card labels routes
cardsRouter.patch(
  "/:cardId/labels/",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  addLabelToCard
);
cardsRouter.delete(
  "/:cardId/labels/:labelId",
  checkIfResourceBelongsToUsersTeam(Label, "labelId"),
  removeLabelFromCard
);

export default cardsRouter;
