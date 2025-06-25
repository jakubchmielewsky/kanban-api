import Express from "express";
import {
  createComment,
  deleteComment,
  getCardComments,
  updateComment,
} from "./comment.controller";
import checkIfResourceBelongsToUsersTeam from "../../middlewares/checkIfResourceBelongsToTeam";
import Comment from "./comment.model";
import Card from "../cards/card.model";

const commentsRouter = Express.Router({ mergeParams: true });

commentsRouter.get(
  "/",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  getCardComments
);
commentsRouter.post(
  "/",
  checkIfResourceBelongsToUsersTeam(Card, "cardId"),
  createComment
);
//TODO: check if user is the author of the comment
commentsRouter.patch(
  "/:commentId",
  checkIfResourceBelongsToUsersTeam(Comment, "commentId"),
  updateComment
);
commentsRouter.delete(
  "/:commentId",
  checkIfResourceBelongsToUsersTeam(Comment, "commentId"),
  deleteComment
);

export default commentsRouter;
